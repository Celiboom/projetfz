# ProjetLD

ProjetLD est un site statique de génération de leads multi-catégories. La homepage référence les domaines disponibles, et la première catégorie active est le déneigement résidentiel. Dans cette catégorie, l'utilisateur entre une adresse civique, voit la façade Google Maps et la vue satellite, trace le contour du stationnement, obtient un prix final, puis soumet ses coordonnées.

## Fonctionnalités

- Homepage racine qui référence les catégories.
- Catégorie `deneigement/` dédiée à l'expérience d'estimation.
- Recherche d'adresse via Google Maps Geocoding.
- Vue façade via Street View quand elle est disponible.
- Vue satellite Google Maps pour mesurer le stationnement.
- Calcul de superficie en temps réel avec la librairie Geometry.
- Affichage d'un prix final au consommateur.
- Formulaire de lead configurable par webhook.
- Mode démo sans backend: les leads sont enregistrés dans le `localStorage` du navigateur si aucun endpoint n'est configuré.

## Fichiers

- `index.html`: homepage qui référence les catégories.
- `deneigement/index.html`: catégorie déneigement.
- `styles.css`: design responsive.
- `app.js`: logique Google Maps, mesure et formulaire.
- `config.js`: clé API, paramètres métier et endpoint de lead.
- `github-pages.md`: publication sur GitHub Pages.
- `.nojekyll`: évite tout traitement Jekyll inutile.

## Configuration Google Maps

Ce projet dépend d'une clé Google Maps Platform côté client. Comme le site est statique et destiné à GitHub Pages, la clé sera visible dans le code source du navigateur. Elle doit donc être **restreinte par referrer HTTP** au domaine du site.

Dans Google Cloud, active au minimum:

- Maps JavaScript API
- Geocoding API

Une facturation Google Maps Platform doit aussi être activée. Street View et les autres composants Google Maps suivent la tarification du compte Google Cloud associé.

Remplace ensuite le placeholder dans `config.js`:

```js
window.PROJET_LD_CONFIG = Object.freeze({
  companyName: "ProjetLD",
  googleMapsApiKey: "VOTRE_CLE_API",
  googleMapsLanguage: "fr",
  googleMapsRegion: "CA",
  countryRestriction: "ca",
  // Parametres metier internes
  leadWebhookUrl: "https://votre-endpoint.example.com/leads",
  leadWebhookFormat: "json",
  leadSuccessMessage: "Merci. Votre demande a bien été envoyée."
});
```

## Endpoint de leads

Le formulaire peut fonctionner de deux façons:

1. `leadWebhookUrl` vide: mode démo, stockage local seulement.
2. `leadWebhookUrl` rempli: le site fait un `POST` vers ton service.

Formats supportés:

- `leadWebhookFormat: "json"` envoie `Content-Type: application/json`
- `leadWebhookFormat: "form"` envoie `application/x-www-form-urlencoded`

Le payload contient notamment:

- `firstName`
- `lastName`
- `phone`
- `email`
- `quotedAddress`
- `areaSqFt`
- `areaSqM`
- `quoteCad`
- `submittedAt`

## Publication GitHub

Important: un dépôt GitHub ne peut publier qu'un seul site GitHub Pages à la fois. Comme ce workspace contient déjà un autre projet de site, la publication de `ProjetLD` doit idéalement se faire dans un **repo dédié**.

Le plus simple:

1. Créer un nouveau repo GitHub pour `ProjetLD`.
2. Copier le contenu du dossier `ProjetLD/` à la racine de ce nouveau repo.
3. Activer GitHub Pages pour ce repo.
4. Restreindre la clé Google Maps à l'URL finale du site.

Les étapes détaillées sont dans `github-pages.md`.

## Confidentialité du calcul

L'interface publique n'affiche pas la logique tarifaire ni d'exemples de calcul. En revanche, si le prix est calculé directement dans `app.js`, cette logique reste techniquement inspectable dans le navigateur puisque le site est statique.

Si tu veux que la formule soit réellement secrète, il faut déplacer le calcul du prix vers un service serveur ou un endpoint externe, puis renvoyer seulement le prix final au site.

## Limite volontaire du MVP

Google Maps ne fournit pas de détection native du stationnement sur une adresse résidentielle. Pour rester fiable sur un site statique, cette version fait mesurer la surface par l'utilisateur directement sur la vue satellite avec un contour éditable.
