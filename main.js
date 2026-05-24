const THEME_STORAGE_KEY = "theme";

function getStoredTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "dark" || stored === "light" ? stored : null;
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getPreferredTheme() {
  return getStoredTheme() ?? getSystemTheme();
}

const LOGO_LIGHT = "assets/bytewise-logo.png";
const LOGO_DARK = "assets/bytewise-logo-dark.png";

function syncBrandLogos(theme) {
  document.querySelectorAll(".brand-mark--image img").forEach((img) => {
    if (!img.dataset.logoLight) {
      img.dataset.logoLight = img.getAttribute("src") || LOGO_LIGHT;
    }
    img.src = theme === "dark" ? LOGO_DARK : img.dataset.logoLight;
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  syncBrandLogos(theme);
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

function toggleTheme() {
  const next =
    document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, next);
  applyTheme(next);
}

applyTheme(getPreferredTheme());

document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  if (!getStoredTheme()) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

const currentPage = document.body.dataset.page;
const navLinks = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const sliders = document.querySelectorAll("[data-slider]");
const siteHeader = document.querySelector(".site-header");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

function initializeRotatingImages() {
  document.querySelectorAll("[data-rotate-images]").forEach((image) => {
    if (image.dataset.rotateInitialized === "true") {
      return;
    }

    const sources = (image.dataset.rotateImages || "")
      .split("|")
      .map((value) => value.trim())
      .filter(Boolean);

    if (sources.length < 2) {
      return;
    }

    const alts = (image.dataset.rotateAlts || "")
      .split("|")
      .map((value) => value.trim());
    const topicEntries = (image.dataset.rotateTopics || "")
      .split("|")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((entry) => {
        const [chipsPart, copyPart] = entry.split("::");
        return {
          chips: (chipsPart || "")
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          copy: (copyPart || "").trim()
        };
      });
    const dynamicCard = image
      .closest(".neo-hero-visual")
      ?.querySelector(".neo-float-card--dynamic");
    const dynamicMetrics = dynamicCard?.querySelector(".neo-float-card__metrics--dynamic");
    const dynamicCopy = dynamicCard?.querySelector(".neo-float-card__copy");

    let currentIndex = 0;

    image.dataset.rotateInitialized = "true";

    const updateDynamicCard = (index) => {
      if (!dynamicCard || !dynamicMetrics || !dynamicCopy || !topicEntries[index]) {
        return;
      }

      dynamicCard.classList.add("is-swapping");

      window.setTimeout(() => {
        const topic = topicEntries[index];

        dynamicMetrics.innerHTML = topic.chips
          .map((chip) => "<span>" + chip + "</span>")
          .join("");
        dynamicCopy.textContent = topic.copy;
        dynamicCard.classList.remove("is-swapping");
      }, 180);
    };

    if (topicEntries[0]) {
      updateDynamicCard(0);
    }

    if (reducedMotionQuery.matches) {
      return;
    }

    window.setInterval(() => {
      if (document.hidden) {
        return;
      }

      currentIndex = (currentIndex + 1) % sources.length;
      image.style.opacity = "0.45";
      updateDynamicCard(currentIndex);

      window.setTimeout(() => {
        image.setAttribute("src", sources[currentIndex]);
        if (alts[currentIndex]) {
          image.setAttribute("alt", alts[currentIndex]);
        }
        image.style.opacity = "1";
      }, 180);
    }, 5200);
  });
}

const currentPath = window.location.pathname.split("/").pop() || "index.html";
const servicesPages = new Set([
  "services.html",
  "business.html",
  "ngo.html",
  "government.html"
]);

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  const isActive =
    (currentPage === "home" && href === "index.html") ||
    (servicesPages.has(currentPath) && href === "services.html") ||
    (currentPage === "projects" && href === "projects.html") ||
    (currentPage === "contact" && href === "contact.html");

  link.classList.toggle("active", isActive);
});

document.querySelectorAll(".dropdown-item").forEach((link) => {
  const href = link.getAttribute("href");
  const isActive = href === currentPath;

  link.classList.toggle("active", isActive);

  if (isActive) {
    link.setAttribute("aria-current", "page");
  } else {
    link.removeAttribute("aria-current");
  }
});

const CONTACT_EMAIL = "info@bytewiseict.com";

function initializeContactForm() {
  const form = document.getElementById("contact-form-form");

  if (!form || form.dataset.initialized === "true") {
    return;
  }

  form.dataset.initialized = "true";

  const statusPanel = document.getElementById("contact-form-status");
  const submitButton = document.getElementById("contact-form-submit");
  const fields = {
    firstName: form.querySelector("#contact-first-name"),
    lastName: form.querySelector("#contact-last-name"),
    email: form.querySelector("#contact-email"),
    phone: form.querySelector("#contact-phone"),
    subject: form.querySelector("#contact-subject"),
    message: form.querySelector("#contact-message")
  };

  const fieldRules = {
    firstName: {
      required: true,
      label: "First name",
      validate(value) {
        if (!value.trim()) {
          return "Enter your first name.";
        }

        if (value.trim().length < 2) {
          return "First name must be at least 2 characters.";
        }

        return "";
      }
    },
    lastName: {
      required: true,
      label: "Last name",
      validate(value) {
        if (!value.trim()) {
          return "Enter your last name.";
        }

        if (value.trim().length < 2) {
          return "Last name must be at least 2 characters.";
        }

        return "";
      }
    },
    email: {
      required: true,
      label: "Email",
      validate(value) {
        if (!value.trim()) {
          return "Enter your work email address.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Enter a valid email address.";
        }

        return "";
      }
    },
    phone: {
      required: false,
      label: "Phone",
      validate(value) {
        if (!value.trim()) {
          return "";
        }

        if (value.trim().length < 7) {
          return "Enter a valid phone number or leave this field blank.";
        }

        return "";
      }
    },
    subject: {
      required: true,
      label: "Subject",
      validate(value) {
        if (!value.trim()) {
          return "Add a subject so we can route your inquiry.";
        }

        return "";
      }
    },
    message: {
      required: true,
      label: "Message",
      validate(value) {
        if (!value.trim()) {
          return "Tell us about your organization and ICT need.";
        }

        if (value.trim().length < 20) {
          return "Add a few more details so we can respond with the right next step.";
        }

        return "";
      }
    }
  };

  const errorIds = {
    firstName: "contact-first-name-error",
    lastName: "contact-last-name-error",
    email: "contact-email-error",
    phone: "contact-phone-error",
    subject: "contact-subject-error",
    message: "contact-message-error"
  };

  function setFieldError(fieldName, message) {
    const field = fields[fieldName];
    const errorNode = document.getElementById(errorIds[fieldName]);

    if (!field) {
      return;
    }

    field.setAttribute("aria-invalid", message ? "true" : "false");

    if (errorNode) {
      errorNode.textContent = message;
    }
  }

  function clearFormStatus() {
    if (!statusPanel) {
      return;
    }

    statusPanel.hidden = true;
    statusPanel.textContent = "";
    statusPanel.classList.remove(
      "contact-form__status--success",
      "contact-form__status--error"
    );
  }

  function showFormStatus(message, type) {
    if (!statusPanel) {
      return;
    }

    statusPanel.hidden = false;
    statusPanel.textContent = message;
    statusPanel.classList.remove(
      "contact-form__status--success",
      "contact-form__status--error"
    );
    statusPanel.classList.add(
      type === "success"
        ? "contact-form__status--success"
        : "contact-form__status--error"
    );
  }

  function validateForm() {
    let firstInvalidField = null;
    let isValid = true;

    Object.entries(fieldRules).forEach(([fieldName, rule]) => {
      const field = fields[fieldName];
      const message = rule.validate(field ? field.value : "");
      setFieldError(fieldName, message);

      if (message) {
        isValid = false;

        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    });

    if (firstInvalidField) {
      firstInvalidField.focus();
    }

    return isValid;
  }

  Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName];

    if (!field) {
      return;
    }

    field.addEventListener("input", () => {
      const message = fieldRules[fieldName].validate(field.value);
      setFieldError(fieldName, message);

      if (message === "") {
        clearFormStatus();
      }
    });

    field.addEventListener("blur", () => {
      setFieldError(fieldName, fieldRules[fieldName].validate(field.value));
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormStatus();

    if (!validateForm()) {
      showFormStatus(
        "Check the highlighted fields and try again.",
        "error"
      );
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Preparing request...";
    }

    const fullName =
      fields.firstName.value.trim() + " " + fields.lastName.value.trim();
    const subject = fields.subject.value.trim();
    const bodyLines = [
      "Consultation request from the Bytewise Technologies website",
      "",
      "Name: " + fullName,
      "Email: " + fields.email.value.trim()
    ];

    if (fields.phone.value.trim()) {
      bodyLines.push("Phone: " + fields.phone.value.trim());
    }

    bodyLines.push("", fields.message.value.trim());

    const mailtoUrl =
      "mailto:" +
      CONTACT_EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(bodyLines.join("\n"));

    window.location.href = mailtoUrl;

    showFormStatus(
      "Your email app should open with your message ready to send. If it did not open, email " +
        CONTACT_EMAIL +
        " directly with the same details.",
      "success"
    );

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Request a Consultation";
    }
  });
}

initializeContactForm();

if (siteHeader) {
  let headerFrame = null;

  const toggleHeaderState = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
    headerFrame = null;
  };

  const requestHeaderState = () => {
    if (headerFrame !== null) {
      return;
    }

    headerFrame = window.requestAnimationFrame(toggleHeaderState);
  };

  toggleHeaderState();
  window.addEventListener("scroll", requestHeaderState, { passive: true });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          const staggerSelector = entry.target.dataset.staggerChildren;

          if (staggerSelector) {
            const staggerDelay = Number(entry.target.dataset.staggerDelay || 140);
            const staggerItems = Array.from(entry.target.querySelectorAll(staggerSelector));

            staggerItems.forEach((item, index) => {
              window.setTimeout(() => {
                item.classList.add("is-visible");
              }, index * staggerDelay);
            });
          }

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");

    const staggerSelector = item.dataset.staggerChildren;

    if (staggerSelector) {
      item.querySelectorAll(staggerSelector).forEach((child) => child.classList.add("is-visible"));
    }
  });
}

if (finePointerQuery.matches && !reducedMotionQuery.matches) {
  tiltCards.forEach((card) => {
    let tiltFrame = null;
    let pointerState = null;

    const applyTilt = () => {
      if (!pointerState) {
        tiltFrame = null;
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = pointerState.clientX - rect.left;
      const y = pointerState.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -6;
      const rotateY = ((x / rect.width) - 0.5) * 7;

      card.style.transform =
        "perspective(1200px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) translateY(-3px)";
      tiltFrame = null;
    };

    card.addEventListener("pointermove", (event) => {
      pointerState = event;

      if (tiltFrame !== null) {
        return;
      }

      tiltFrame = window.requestAnimationFrame(applyTilt);
    });

    card.addEventListener("pointerleave", () => {
      pointerState = null;

      if (tiltFrame !== null) {
        window.cancelAnimationFrame(tiltFrame);
        tiltFrame = null;
      }

      card.style.transform = "";
    });
  });
}

sliders.forEach((slider) => {
  const track = slider.querySelector(".agency-slider__track");
  const slides = Array.from(slider.querySelectorAll(".agency-slide"));
  const tabs = Array.from(slider.querySelectorAll(".agency-slider__tab"));
  const dots = Array.from(slider.querySelectorAll(".agency-slider__dot"));
  const prevButton = slider.querySelector('[data-slide-action="prev"]');
  const nextButton = slider.querySelector('[data-slide-action="next"]');
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!track || slides.length === 0) {
    return;
  }

  let currentIndex = 0;
  let autoplayId = null;

  const setSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";

    slides.forEach((slide, slideIndex) => {
      slide.setAttribute("aria-hidden", slideIndex === currentIndex ? "false" : "true");
    });

    tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === currentIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
    });
  };

  const stopAutoplay = () => {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  };

  const startAutoplay = () => {
    if (reducedMotion || slides.length < 2) {
      return;
    }

    stopAutoplay();
    autoplayId = window.setInterval(() => {
      setSlide(currentIndex + 1);
    }, 5500);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setSlide(Number(tab.dataset.slideTo || 0));
      startAutoplay();
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setSlide(Number(dot.dataset.slideTo || 0));
      startAutoplay();
    });
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      setSlide(currentIndex - 1);
      startAutoplay();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      setSlide(currentIndex + 1);
      startAutoplay();
    });
  }

  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);
  slider.addEventListener("focusin", stopAutoplay);
  slider.addEventListener("focusout", startAutoplay);

  setSlide(0);
  startAutoplay();
});

initializeRotatingImages();
