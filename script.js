const REFERRAL_CODE = "REMPLACE-MOI";
const FIZZ_BASE_URL = "https://fizz.ca/fr/inviter-des-amis";
const fizzUrl = new URL(FIZZ_BASE_URL);

fizzUrl.searchParams.set("referral", REFERRAL_CODE);

const codeElements = document.querySelectorAll("[data-referral-code]");
const copyButton = document.querySelector("[data-copy-code]");
const fizzLinks = document.querySelectorAll("[data-fizz-link]");

codeElements.forEach((element) => {
  element.textContent = REFERRAL_CODE;
});

fizzLinks.forEach((link) => {
  link.href = fizzUrl.toString();
  link.addEventListener("click", () => {
    window.localStorage.setItem("projetfz_last_click", new Date().toISOString());
  });
});

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(REFERRAL_CODE);
    copyButton.textContent = "Code copie";
    copyButton.dataset.copied = "true";
  } catch {
    copyButton.textContent = REFERRAL_CODE;
  }

  window.setTimeout(() => {
    copyButton.textContent = "Copier le code";
    delete copyButton.dataset.copied;
  }, 2200);
});
