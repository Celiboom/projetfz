const REFERRAL_CODE = "InsérerCodeICI";
const FIZZ_BASE_URL = "https://fizz.ca/fr/inviter-des-amis";
const DEFAULT_LANGUAGE = "fr";
const SUPPORTED_LANGUAGES = ["fr", "en", "es"];

const translations = {
  fr: {
    meta: {
      lang: "fr-CA",
      title: "Code de référence Fizz 25$ | ProjetFZ",
      description: "Utilisez un code de référence Fizz pour économiser 25$ sur un premier forfait mobile ou Internet, selon les conditions Fizz en vigueur.",
      ogTitle: "Code de référence Fizz 25$",
      ogDescription: "Copiez le code, choisissez votre forfait Fizz et entrez le code au moment de l'activation."
    },
    brand: {
      aria: "Accueil ProjetFZ"
    },
    nav: {
      aria: "Navigation principale",
      how: "Comment ça marche",
      faq: "FAQ",
      code: "Code"
    },
    language: {
      aria: "Choisir la langue"
    },
    hero: {
      eyebrow: "Site indépendant de référence Fizz",
      title: "Code de référence Fizz: économisez 25$ sur votre premier forfait",
      copy: "Copiez le code, choisissez votre forfait mobile ou Internet résidentiel sur Fizz, puis entrez le code au moment de l'activation."
    },
    code: {
      aria: "Code de référence",
      label: "Code de référence",
      copy: "Copier le code",
      copied: "Code copié"
    },
    actions: {
      aria: "Actions principales",
      primary: "Aller chez Fizz",
      secondary: "Voir les étapes"
    },
    note: {
      aria: "Note de transparence",
      title: "Important",
      copy: "Si vous utilisez ce code, vous pourriez obtenir une prime et je pourrais aussi recevoir une prime de référence. Le montant et les conditions peuvent changer selon l'offre Fizz en vigueur."
    },
    steps: {
      eyebrow: "Activation",
      title: "Comment profiter du code",
      copy: "Le détail qui compte: entrez le code pendant l'activation de votre premier forfait. Si vous oubliez cette étape, Fizz indique que le code ne peut pas être ajouté plus tard.",
      one: {
        title: "Copiez le code",
        copy: "Gardez le code sous la main avant de commencer votre inscription."
      },
      two: {
        title: "Choisissez votre forfait",
        copy: "Configurez un forfait mobile ou Internet résidentiel directement sur Fizz."
      },
      three: {
        title: "Entrez le code avant de payer",
        copy: "Ajoutez le code dans le champ de référence avant de soumettre votre commande."
      }
    },
    why: {
      eyebrow: "Pourquoi regarder Fizz",
      title: "Un forfait flexible, surtout si vous aimez ajuster vos coûts",
      cards: {
        contract: {
          title: "Forfaits sans contrat",
          copy: "Fizz propose des forfaits mensuels que vous pouvez ajuster selon vos besoins."
        },
        services: {
          title: "Mobile et Internet",
          copy: "Le code de référence peut être pertinent pour un premier forfait mobile ou Internet résidentiel admissible."
        },
        bonus: {
          title: "Prime pour les deux",
          copy: "Selon l'offre Fizz en vigueur, la personne invitée et le membre qui partage son code peuvent recevoir une prime."
        }
      }
    },
    faq: {
      eyebrow: "Questions fréquentes",
      title: "FAQ code de référence Fizz",
      official: {
        question: "Est-ce un site officiel Fizz?",
        answer: "Non. ProjetFZ est un site indépendant qui partage un code de référence Fizz."
      },
      invoice: {
        question: "Le bonus est-il appliqué sur la première facture?",
        answer: "Fizz indique que la prime est généralement appliquée après que le nouveau membre a cumulé deux mois de service admissible."
      },
      late: {
        question: "Puis-je ajouter un code après mon inscription?",
        answer: "Fizz indique que le code doit être entré lors de l'activation du premier forfait; il ne peut généralement pas être ajouté rétroactivement."
      },
      guarantee: {
        question: "Le montant de 25$ est-il garanti?",
        answer: "Le montant peut changer sans préavis selon les conditions Fizz. Vérifiez toujours l'offre affichée par Fizz avant de finaliser l'abonnement."
      }
    },
    footer: {
      copy: "ProjetFZ est un site indépendant. Fizz est une marque de son propriétaire respectif.",
      conditions: "Voir les conditions Fizz"
    }
  },
  en: {
    meta: {
      lang: "en-CA",
      title: "Fizz referral code $25 | ProjetFZ",
      description: "Use a Fizz referral code to save $25 on a first mobile or Internet plan, according to the current Fizz conditions.",
      ogTitle: "Fizz referral code $25",
      ogDescription: "Copy the code, choose your Fizz plan, and enter the code during activation."
    },
    brand: {
      aria: "ProjetFZ home"
    },
    nav: {
      aria: "Main navigation",
      how: "How it works",
      faq: "FAQ",
      code: "Code"
    },
    language: {
      aria: "Choose language"
    },
    hero: {
      eyebrow: "Independent Fizz referral site",
      title: "Fizz referral code: save $25 on your first plan",
      copy: "Copy the code, choose your mobile or home Internet plan on Fizz, then enter the code during activation."
    },
    code: {
      aria: "Referral code",
      label: "Referral code",
      copy: "Copy code",
      copied: "Code copied"
    },
    actions: {
      aria: "Primary actions",
      primary: "Go to Fizz",
      secondary: "See steps"
    },
    note: {
      aria: "Transparency note",
      title: "Important",
      copy: "If you use this code, you may receive a reward and I may also receive a referral reward. The amount and conditions can change according to the current Fizz offer."
    },
    steps: {
      eyebrow: "Activation",
      title: "How to use the code",
      copy: "The key detail: enter the code while activating your first plan. If you miss this step, Fizz indicates that the code generally cannot be added later.",
      one: {
        title: "Copy the code",
        copy: "Keep the code handy before starting your sign-up."
      },
      two: {
        title: "Choose your plan",
        copy: "Configure a mobile or home Internet plan directly on Fizz."
      },
      three: {
        title: "Enter the code before paying",
        copy: "Add the code in the referral field before submitting your order."
      }
    },
    why: {
      eyebrow: "Why consider Fizz",
      title: "A flexible plan, especially if you like adjusting your costs",
      cards: {
        contract: {
          title: "No-contract plans",
          copy: "Fizz offers monthly plans you can adjust based on your needs."
        },
        services: {
          title: "Mobile and Internet",
          copy: "The referral code can be relevant for an eligible first mobile or home Internet plan."
        },
        bonus: {
          title: "A reward for both",
          copy: "Depending on the current Fizz offer, the invited person and the member sharing the code may both receive a reward."
        }
      }
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Fizz referral code FAQ",
      official: {
        question: "Is this an official Fizz site?",
        answer: "No. ProjetFZ is an independent site that shares a Fizz referral code."
      },
      invoice: {
        question: "Is the reward applied to the first bill?",
        answer: "Fizz indicates that the reward is generally applied after the new member has completed two months of eligible service."
      },
      late: {
        question: "Can I add a code after signing up?",
        answer: "Fizz indicates that the code must be entered during activation of the first plan; it generally cannot be added retroactively."
      },
      guarantee: {
        question: "Is the $25 amount guaranteed?",
        answer: "The amount may change without notice according to Fizz conditions. Always verify the offer shown by Fizz before completing the subscription."
      }
    },
    footer: {
      copy: "ProjetFZ is an independent site. Fizz is a trademark of its respective owner.",
      conditions: "View Fizz conditions"
    }
  },
  es: {
    meta: {
      lang: "es-CA",
      title: "Código de referencia Fizz 25$ | ProjetFZ",
      description: "Usa un código de referencia Fizz para ahorrar 25$ en tu primer plan móvil o de Internet, según las condiciones vigentes de Fizz.",
      ogTitle: "Código de referencia Fizz 25$",
      ogDescription: "Copia el código, elige tu plan Fizz e ingresa el código durante la activación."
    },
    brand: {
      aria: "Inicio de ProjetFZ"
    },
    nav: {
      aria: "Navegación principal",
      how: "Cómo funciona",
      faq: "FAQ",
      code: "Código"
    },
    language: {
      aria: "Elegir idioma"
    },
    hero: {
      eyebrow: "Sitio independiente de referencia Fizz",
      title: "Código de referencia Fizz: ahorra 25$ en tu primer plan",
      copy: "Copia el código, elige tu plan móvil o de Internet residencial en Fizz, y luego ingresa el código durante la activación."
    },
    code: {
      aria: "Código de referencia",
      label: "Código de referencia",
      copy: "Copiar código",
      copied: "Código copiado"
    },
    actions: {
      aria: "Acciones principales",
      primary: "Ir a Fizz",
      secondary: "Ver pasos"
    },
    note: {
      aria: "Nota de transparencia",
      title: "Importante",
      copy: "Si usas este código, podrías recibir una recompensa y yo también podría recibir una recompensa de referencia. El monto y las condiciones pueden cambiar según la oferta vigente de Fizz."
    },
    steps: {
      eyebrow: "Activación",
      title: "Cómo aprovechar el código",
      copy: "El detalle importante: ingresa el código durante la activación de tu primer plan. Si olvidas este paso, Fizz indica que normalmente el código no se puede agregar después.",
      one: {
        title: "Copia el código",
        copy: "Ten el código a mano antes de comenzar tu inscripción."
      },
      two: {
        title: "Elige tu plan",
        copy: "Configura un plan móvil o de Internet residencial directamente en Fizz."
      },
      three: {
        title: "Ingresa el código antes de pagar",
        copy: "Agrega el código en el campo de referencia antes de enviar tu pedido."
      }
    },
    why: {
      eyebrow: "Por qué mirar Fizz",
      title: "Un plan flexible, sobre todo si te gusta ajustar tus costos",
      cards: {
        contract: {
          title: "Planes sin contrato",
          copy: "Fizz ofrece planes mensuales que puedes ajustar según tus necesidades."
        },
        services: {
          title: "Móvil e Internet",
          copy: "El código de referencia puede servir para un primer plan móvil o de Internet residencial elegible."
        },
        bonus: {
          title: "Recompensa para ambos",
          copy: "Según la oferta vigente de Fizz, la persona invitada y el miembro que comparte su código pueden recibir una recompensa."
        }
      }
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "FAQ sobre el código de referencia Fizz",
      official: {
        question: "¿Es este un sitio oficial de Fizz?",
        answer: "No. ProjetFZ es un sitio independiente que comparte un código de referencia Fizz."
      },
      invoice: {
        question: "¿La recompensa se aplica en la primera factura?",
        answer: "Fizz indica que la recompensa generalmente se aplica después de que el nuevo miembro haya acumulado dos meses de servicio elegible."
      },
      late: {
        question: "¿Puedo agregar un código después de inscribirme?",
        answer: "Fizz indica que el código debe ingresarse durante la activación del primer plan; generalmente no se puede agregar retroactivamente."
      },
      guarantee: {
        question: "¿El monto de 25$ está garantizado?",
        answer: "El monto puede cambiar sin previo aviso según las condiciones de Fizz. Verifica siempre la oferta mostrada por Fizz antes de finalizar la suscripción."
      }
    },
    footer: {
      copy: "ProjetFZ es un sitio independiente. Fizz es una marca de su respectivo propietario.",
      conditions: "Ver condiciones de Fizz"
    }
  }
};

const fizzUrl = new URL(FIZZ_BASE_URL);
fizzUrl.searchParams.set("referral", REFERRAL_CODE);

const codeElements = document.querySelectorAll("[data-referral-code]");
const copyButton = document.querySelector("[data-copy-code]");
const fizzLinks = document.querySelectorAll("[data-fizz-link]");
const languageButtons = document.querySelectorAll("[data-language-button]");

let currentLanguage = getInitialLanguage();

function getInitialLanguage() {
  const savedLanguage = window.localStorage.getItem("projetfz_language");
  const browserLanguage = navigator.language ? navigator.language.slice(0, 2) : "";

  if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
    return savedLanguage;
  }

  if (SUPPORTED_LANGUAGES.includes(browserLanguage)) {
    return browserLanguage;
  }

  return DEFAULT_LANGUAGE;
}

function getTranslation(path) {
  const translation = path.split(".").reduce((value, key) => {
    if (value && Object.prototype.hasOwnProperty.call(value, key)) {
      return value[key];
    }

    return undefined;
  }, translations[currentLanguage]);

  return translation || "";
}

function setMeta(name, content) {
  const element = document.querySelector(`meta[name="${name}"]`);

  if (element) {
    element.setAttribute("content", content);
  }
}

function setOpenGraph(property, content) {
  const element = document.querySelector(`meta[property="${property}"]`);

  if (element) {
    element.setAttribute("content", content);
  }
}

function applyLanguage(language) {
  currentLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
  const meta = translations[currentLanguage].meta;

  document.documentElement.lang = meta.lang;
  document.title = meta.title;
  setMeta("description", meta.description);
  setOpenGraph("og:title", meta.ogTitle);
  setOpenGraph("og:description", meta.ogDescription);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = getTranslation(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", getTranslation(element.dataset.i18nAria));
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.languageButton === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  window.localStorage.setItem("projetfz_language", currentLanguage);
}

codeElements.forEach((element) => {
  element.textContent = REFERRAL_CODE;
});

fizzLinks.forEach((link) => {
  link.href = fizzUrl.toString();
  link.addEventListener("click", () => {
    window.localStorage.setItem("projetfz_last_click", new Date().toISOString());
  });
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.languageButton);
  });
});

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_CODE);
      copyButton.textContent = getTranslation("code.copied");
      copyButton.dataset.copied = "true";
    } catch (error) {
      copyButton.textContent = REFERRAL_CODE;
    }

    window.setTimeout(() => {
      copyButton.textContent = getTranslation("code.copy");
      delete copyButton.dataset.copied;
    }, 2200);
  });
}

applyLanguage(currentLanguage);
