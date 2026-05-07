const DEFAULT_CONFIG = Object.freeze({
  companyName: "ProjetLD",
  googleMapsApiKey: "",
  googleMapsLanguage: "fr",
  googleMapsRegion: "CA",
  countryRestriction: "ca",
  pricePerHundredSqFt: 100,
  leadWebhookUrl: "",
  leadWebhookFormat: "json",
  leadSuccessMessage: "Merci. Votre demande a bien été envoyée.",
  demoStorageKey: "projetld_demo_leads"
});

const CONFIG = Object.freeze({
  ...DEFAULT_CONFIG,
  ...(window.PROJET_LD_CONFIG || {})
});

const METERS_TO_SQ_FEET = 10.76391041671;

const state = {
  geocoder: null,
  map: null,
  mapsPromise: null,
  outline: null,
  polygon: null,
  polygonListeners: [],
  propertyLocation: null,
  propertyMarker: null,
  quoteAmount: 0,
  resultsReady: false,
  selectedAddress: "",
  streetViewPanorama: null,
  streetViewService: null,
  drawingMode: false,
  drawingPath: [],
  areaSqFeet: 0,
  areaSqMeters: 0
};

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  if (!elements.addressForm) {
    return;
  }
  applyBranding();
  bindEvents();
  renderQuoteState();
  revealLeadSection(false);
  if (!hasUsableApiKey(CONFIG.googleMapsApiKey)) {
    toggleAddressLookup(true);
    setGlobalStatus(
      "Ajoutez une clé Google Maps valide dans config.js pour activer l'estimateur.",
      "warning"
    );
    return;
  }

  initializeGoogleExperience().catch((error) => {
    console.error(error);
    toggleAddressLookup(true);
    setGlobalStatus(
      "Google Maps n'a pas pu être chargé. Vérifiez la clé API, la facturation et les restrictions de domaine.",
      "error"
    );
  });
});

function cacheElements() {
  elements.addressForm = document.getElementById("address-form");
  elements.addressInput = document.getElementById("address-input");
  elements.lookupButton = document.getElementById("lookup-button");
  elements.globalStatus = document.getElementById("global-status");
  elements.resultsSection = document.getElementById("results-section");
  elements.areaValue = document.getElementById("area-value");
  elements.areaDetail = document.getElementById("area-detail");
  elements.priceValue = document.getElementById("price-value");
  elements.priceDetail = document.getElementById("price-detail");
  elements.quoteAddress = document.getElementById("quote-address");
  elements.startDrawingButton = document.getElementById("start-drawing");
  elements.finishDrawingButton = document.getElementById("finish-drawing");
  elements.resetPolygonButton = document.getElementById("reset-polygon");
  elements.aerialMap = document.getElementById("aerial-map");
  elements.aerialMapEmpty = document.getElementById("aerial-map-empty");
  elements.streetView = document.getElementById("street-view");
  elements.streetViewEmpty = document.getElementById("street-view-empty");
  elements.leadSection = document.getElementById("lead-section");
  elements.leadSummaryPrice = document.getElementById("lead-summary-price");
  elements.leadSummaryArea = document.getElementById("lead-summary-area");
  elements.leadSummaryAddress = document.getElementById("lead-summary-address");
  elements.leadForm = document.getElementById("lead-form");
  elements.submitLeadButton = document.getElementById("submit-lead");
  elements.leadStatus = document.getElementById("lead-status");
  elements.leadAddressHidden = document.getElementById("lead-address-hidden");
  elements.leadAreaHidden = document.getElementById("lead-area-hidden");
  elements.leadPriceHidden = document.getElementById("lead-price-hidden");
}

function bindEvents() {
  elements.addressForm.addEventListener("submit", handleAddressSubmit);
  elements.startDrawingButton.addEventListener("click", handleStartDrawing);
  elements.finishDrawingButton.addEventListener("click", handleFinishDrawing);
  elements.resetPolygonButton.addEventListener("click", () => resetPolygon(true));
  elements.leadForm.addEventListener("submit", handleLeadSubmit);
}

function applyBranding() {
  document.querySelectorAll("[data-company-name]").forEach((node) => {
    node.textContent = CONFIG.companyName;
  });
}

function hasUsableApiKey(apiKey) {
  return Boolean(apiKey) && !String(apiKey).includes("REPLACE_WITH");
}

function toggleAddressLookup(disabled) {
  elements.addressInput.disabled = disabled;
  elements.lookupButton.disabled = disabled;
}

async function initializeGoogleExperience() {
  toggleAddressLookup(true);
  setGlobalStatus("Chargement de Google Maps...", "info");
  await loadGoogleMapsApi(CONFIG.googleMapsApiKey);

  state.geocoder = new google.maps.Geocoder();
  state.streetViewService = new google.maps.StreetViewService();
  state.map = new google.maps.Map(elements.aerialMap, {
    center: { lat: 45.5017, lng: -73.5673 },
    zoom: 18,
    mapTypeId: "satellite",
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    rotateControl: false
  });

  state.outline = new google.maps.Polyline({
    map: state.map,
    path: [],
    clickable: false,
    strokeColor: "#ef7f45",
    strokeOpacity: 0.95,
    strokeWeight: 3
  });

  state.streetViewPanorama = new google.maps.StreetViewPanorama(elements.streetView, {
    addressControl: false,
    fullscreenControl: false,
    motionTracking: false,
    showRoadLabels: false,
    zoomControl: true,
    visible: false
  });

  state.map.addListener("click", handleMapClick);
  toggleAddressLookup(false);
  setGlobalStatus(
    "Entrez une adresse pour charger la propriété, puis tracez le stationnement sur la vue satellite.",
    "info"
  );
}

function loadGoogleMapsApi(apiKey) {
  if (window.google && window.google.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (state.mapsPromise) {
    return state.mapsPromise;
  }

  state.mapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const params = new URLSearchParams({
      key: apiKey,
      loading: "async",
      libraries: "geometry",
      v: "weekly",
      language: CONFIG.googleMapsLanguage,
      region: CONFIG.googleMapsRegion
    });

    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = () => reject(new Error("Google Maps failed to load."));
    document.head.appendChild(script);
  });

  return state.mapsPromise;
}

async function handleAddressSubmit(event) {
  event.preventDefault();

  if (!state.geocoder) {
    setGlobalStatus("Google Maps n'est pas encore prêt.", "warning");
    return;
  }

  const rawAddress = elements.addressInput.value.trim();

  if (!rawAddress) {
    setGlobalStatus("Entrez une adresse civique avant de lancer la recherche.", "warning");
    return;
  }

  setGlobalStatus("Recherche de l'adresse et des vues Google Maps...", "info");
  elements.lookupButton.disabled = true;

  try {
    const request = { address: rawAddress };

    if (CONFIG.countryRestriction) {
      request.componentRestrictions = { country: CONFIG.countryRestriction };
    }

    const response = await state.geocoder.geocode(request);
    const result = response.results && response.results[0];

    if (!result) {
      throw new Error("ADDRESS_NOT_FOUND");
    }

    state.selectedAddress = result.formatted_address;
    state.propertyLocation = result.geometry.location;
    state.resultsReady = true;

    resetPolygon(false);
    updatePropertyMarker(result.geometry.location, result.formatted_address);
    updateMapViewport(result.geometry.location);
    renderResultsSection();
    renderQuoteState();
    await renderStreetView(result.geometry.location);

    setGlobalStatus(
      "Adresse trouvée. Cliquez sur Tracer le stationnement, puis placez au moins 3 points autour de l'allée.",
      "success"
    );
  } catch (error) {
    console.error(error);
    setGlobalStatus(
      "Adresse introuvable. Vérifiez l'orthographe ou essayez une adresse plus complète.",
      "error"
    );
  } finally {
    elements.lookupButton.disabled = false;
  }
}

function renderResultsSection() {
  elements.resultsSection.hidden = false;
  hideOverlay(elements.aerialMapEmpty);
  showOverlay(
    elements.streetViewEmpty,
    "Recherche de la façade Google Maps..."
  );
}

function updatePropertyMarker(position, title) {
  if (!state.propertyMarker) {
    state.propertyMarker = new google.maps.Marker({
      map: state.map,
      position,
      title
    });
    return;
  }

  state.propertyMarker.setPosition(position);
  state.propertyMarker.setTitle(title);
}

function updateMapViewport(location) {
  state.map.setCenter(location);
  state.map.setZoom(20);
}

function renderStreetView(location) {
  return new Promise((resolve) => {
    state.streetViewService.getPanorama(
      {
        location,
        preference: google.maps.StreetViewPreference.NEAREST,
        radius: 80,
        source: google.maps.StreetViewSource.OUTDOOR
      },
      (data, status) => {
        if (
          status !== google.maps.StreetViewStatus.OK ||
          !data ||
          !data.location ||
          !data.location.latLng
        ) {
          state.streetViewPanorama.setVisible(false);
          showOverlay(
            elements.streetViewEmpty,
            "Aucune façade Street View n'est disponible pour cette adresse. La vue satellite reste utilisable."
          );
          resolve();
          return;
        }

        const panoramaLocation = data.location.latLng;
        const heading = google.maps.geometry.spherical.computeHeading(panoramaLocation, location);
        state.streetViewPanorama.setOptions({
          position: panoramaLocation,
          pov: {
            heading: Number.isFinite(heading) ? heading : 0,
            pitch: 0
          },
          zoom: 0,
          visible: true
        });
        hideOverlay(elements.streetViewEmpty);
        resolve();
      }
    );
  });
}

function handleStartDrawing() {
  if (!state.propertyLocation) {
    setGlobalStatus("Cherchez d'abord une adresse avant de tracer le stationnement.", "warning");
    return;
  }

  state.drawingMode = true;

  if (state.polygon) {
    state.polygon.setEditable(true);
  }

  updateDrawingButtons();
  setGlobalStatus(
    "Mode tracé actif. Cliquez autour du stationnement sur la vue satellite, puis terminez le tracé.",
    "info"
  );
}

function handleFinishDrawing() {
  if (!state.polygon || state.polygon.getPath().getLength() < 3) {
    setGlobalStatus("Il faut au moins 3 points pour mesurer un stationnement.", "warning");
    return;
  }

  state.drawingMode = false;
  state.polygon.setEditable(true);
  updateDrawingButtons();
  updateQuoteFromPolygon();
  setGlobalStatus(
    "Contour enregistré. Ajustez les poignées si nécessaire puis soumettez la demande.",
    "success"
  );
}

function handleMapClick(event) {
  if (!state.drawingMode) {
    return;
  }

  if (!state.polygon) {
    state.drawingPath.push(event.latLng);
    state.outline.setPath(state.drawingPath);

    if (state.drawingPath.length >= 3) {
      createPolygon(state.drawingPath);
      state.outline.setMap(null);
    }
  } else {
    state.polygon.getPath().push(event.latLng);
  }

  updateDrawingButtons();
  updateQuoteFromPolygon();
}

function createPolygon(pathPoints) {
  if (!state.polygon) {
    state.polygon = new google.maps.Polygon({
      map: state.map,
      paths: pathPoints,
      editable: true,
      draggable: false,
      clickable: true,
      fillColor: "#8ec5ff",
      fillOpacity: 0.28,
      strokeColor: "#1a7f8d",
      strokeWeight: 3
    });
  } else {
    state.polygon.setPath(pathPoints);
    state.polygon.setEditable(true);
  }

  bindPolygonListeners();
}

function bindPolygonListeners() {
  clearPolygonListeners();

  const path = state.polygon.getPath();
  state.polygonListeners = [
    path.addListener("insert_at", updateQuoteFromPolygon),
    path.addListener("remove_at", updateQuoteFromPolygon),
    path.addListener("set_at", updateQuoteFromPolygon)
  ];
}

function clearPolygonListeners() {
  state.polygonListeners.forEach((listener) => listener.remove());
  state.polygonListeners = [];
}

function resetPolygon(keepResultsVisible) {
  clearPolygonListeners();
  state.drawingMode = false;
  state.drawingPath = [];
  state.areaSqFeet = 0;
  state.areaSqMeters = 0;
  state.quoteAmount = 0;

  if (state.polygon) {
    state.polygon.setMap(null);
    state.polygon = null;
  }

  if (state.outline) {
    state.outline.setMap(state.map || null);
    state.outline.setPath([]);
  }

  revealLeadSection(false);
  renderQuoteState();
  updateDrawingButtons();

  if (!keepResultsVisible && elements.resultsSection.hidden === false) {
    setGlobalStatus(
      "Adresse chargée. Lancez le tracé pour mesurer le stationnement.",
      "info"
    );
  }
}

function updateQuoteFromPolygon() {
  if (!state.polygon || state.polygon.getPath().getLength() < 3) {
    state.areaSqFeet = 0;
    state.areaSqMeters = 0;
    state.quoteAmount = 0;
    renderQuoteState();
    revealLeadSection(false);
    return;
  }

  const path = state.polygon.getPath();
  const areaSqMeters = google.maps.geometry.spherical.computeArea(path);
  const areaSqFeet = areaSqMeters * METERS_TO_SQ_FEET;
  const pricePerSquareFoot = CONFIG.pricePerHundredSqFt / 100;

  state.drawingPath = path.getArray();
  state.areaSqMeters = areaSqMeters;
  state.areaSqFeet = areaSqFeet;
  state.quoteAmount = Math.round(areaSqFeet * pricePerSquareFoot);

  renderQuoteState();
  revealLeadSection(true);
}

function renderQuoteState() {
  const areaDisplay = state.areaSqFeet > 0 ? `${formatNumber(state.areaSqFeet, 0)} pi²` : "--";
  const areaDetail =
    state.areaSqFeet > 0
      ? `${formatNumber(state.areaSqMeters, 1)} m² mesurés`
      : "Tracez le contour du stationnement pour calculer la surface.";
  const priceDisplay = state.quoteAmount > 0 ? formatCurrency(state.quoteAmount) : "--";
  const priceDetail =
    state.quoteAmount > 0
      ? "Prix calculé automatiquement pour cette adresse."
      : "Le prix apparaîtra automatiquement après la mesure.";

  elements.quoteAddress.textContent = state.selectedAddress || "Aucune adresse analysée";
  elements.areaValue.textContent = areaDisplay;
  elements.areaDetail.textContent = areaDetail;
  elements.priceValue.textContent = priceDisplay;
  elements.priceDetail.textContent = priceDetail;
  elements.leadSummaryPrice.textContent = priceDisplay;
  elements.leadSummaryArea.textContent = areaDisplay;
  elements.leadSummaryAddress.textContent = state.selectedAddress || "cette adresse";
  elements.leadAddressHidden.value = state.selectedAddress || "";
  elements.leadAreaHidden.value = state.areaSqFeet > 0 ? state.areaSqFeet.toFixed(2) : "";
  elements.leadPriceHidden.value = state.quoteAmount > 0 ? String(state.quoteAmount) : "";
}

function updateDrawingButtons() {
  const hasAddress = Boolean(state.propertyLocation);
  const pointCount = state.polygon ? state.polygon.getPath().getLength() : state.drawingPath.length;
  const hasShape = pointCount > 0;

  elements.startDrawingButton.disabled = !hasAddress;
  elements.finishDrawingButton.disabled = !state.drawingMode || pointCount < 3;
  elements.resetPolygonButton.disabled = !hasShape;
}

function revealLeadSection(visible) {
  elements.leadSection.hidden = !visible;
}

async function handleLeadSubmit(event) {
  event.preventDefault();

  if (!elements.leadForm.reportValidity()) {
    return;
  }

  if (!state.selectedAddress || state.quoteAmount <= 0) {
    setLeadStatus("Calculez d'abord le prix avant d'envoyer le lead.", "warning");
    return;
  }

  const payload = buildLeadPayload();
  elements.submitLeadButton.disabled = true;
  setLeadStatus("Envoi du lead en cours...", "info");

  try {
    if (CONFIG.leadWebhookUrl) {
      await submitLead(payload);
      setLeadStatus(CONFIG.leadSuccessMessage, "success");
    } else {
      saveLeadDemo(payload);
      setLeadStatus(
        "Mode démo: le lead a été enregistré dans le navigateur. Configurez leadWebhookUrl pour un envoi réel.",
        "success"
      );
    }

    elements.leadForm.reset();
    renderQuoteState();
  } catch (error) {
    console.error(error);
    setLeadStatus(
      "L'envoi a échoué. Vérifiez l'endpoint du formulaire et les règles CORS du service de réception.",
      "error"
    );
  } finally {
    elements.submitLeadButton.disabled = false;
  }
}

function buildLeadPayload() {
  const formData = new FormData(elements.leadForm);
  return {
    companyName: CONFIG.companyName,
    firstName: String(formData.get("firstName") || "").trim(),
    lastName: String(formData.get("lastName") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    quotedAddress: state.selectedAddress,
    areaSqFt: Number(state.areaSqFeet.toFixed(2)),
    areaSqM: Number(state.areaSqMeters.toFixed(2)),
    quoteCad: state.quoteAmount,
    submittedAt: new Date().toISOString(),
    sourceUrl: window.location.href
  };
}

async function submitLead(payload) {
  const request = {
    method: "POST",
    headers: {},
    mode: "cors"
  };

  if (CONFIG.leadWebhookFormat === "form") {
    request.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
    request.body = new URLSearchParams(payload).toString();
  } else {
    request.headers["Content-Type"] = "application/json";
    request.body = JSON.stringify(payload);
  }

  const response = await fetch(CONFIG.leadWebhookUrl, request);

  if (!response.ok) {
    throw new Error(`Lead submission failed with status ${response.status}`);
  }
}

function saveLeadDemo(payload) {
  const existing = JSON.parse(window.localStorage.getItem(CONFIG.demoStorageKey) || "[]");
  existing.unshift(payload);
  window.localStorage.setItem(CONFIG.demoStorageKey, JSON.stringify(existing.slice(0, 25)));
}

function setGlobalStatus(message, tone) {
  setStatus(elements.globalStatus, message, tone);
}

function setLeadStatus(message, tone) {
  setStatus(elements.leadStatus, message, tone);
}

function setStatus(element, message, tone) {
  element.textContent = message;
  element.classList.remove("is-info", "is-success", "is-warning", "is-error");

  if (tone) {
    element.classList.add(`is-${tone}`);
  }
}

function showOverlay(element, message) {
  element.hidden = false;
  element.textContent = message;
}

function hideOverlay(element) {
  element.hidden = true;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatNumber(value, digits) {
  return new Intl.NumberFormat("fr-CA", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(value);
}
