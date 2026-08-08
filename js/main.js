
(() => {
  const config = window.URBAN_SAHARA_FORM || {};

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  // Mobile navigation
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => {
      el.classList.add("is-visible");
    });
  }

  // Footer year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Google Forms submission
  const form = document.getElementById("lead-form");
  const status = document.getElementById("form-status");

  function setStatus(message, type = "") {
    if (!status) return;

    status.textContent = message;
    status.className = "form-status " + type;
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      setStatus("");

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus(
          "Please complete the required fields.",
          "error"
        );
        return;
      }

      const action = config.FORM_ACTION || "";
      const entries = config.entries || {};

      const isConfigured =
        action.startsWith("https://docs.google.com/forms/") &&
        Object.values(entries).every(
          (value) =>
            value &&
            !String(value).includes("REPLACE")
        );

      if (!isConfigured) {
        setStatus(
          "The form is ready, but Google Forms still needs to be connected in js/config.js.",
          "error"
        );
        return;
      }

      const frame = document.getElementById(
        "google-form-frame"
      );

      if (!frame) {
        setStatus(
          "The form could not be submitted. Please try again.",
          "error"
        );
        return;
      }

      const submitForm = document.createElement("form");

      submitForm.action = action;
      submitForm.method = "POST";
      submitForm.target = frame.name;
      submitForm.style.display = "none";

      const data = new FormData(form);

      Object.keys(entries).forEach((key) => {
        const input = document.createElement("input");

        input.type = "hidden";
        input.name = entries[key];
        input.value = data.get(key) || "";

        submitForm.appendChild(input);
      });

      document.body.appendChild(submitForm);

      submitForm.submit();

      submitForm.remove();

      form.reset();

      setStatus(
        "Thank you. Your enquiry has been received. We'll contact you shortly.",
        "success"
      );
    });
  }
})();