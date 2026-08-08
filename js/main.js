
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

    const config = window.URBAN_SAHARA_FORM;

    if (!config || !config.FORM_ACTION) {
        setStatus(
            "The enquiry form is not configured yet. Please contact us directly.",
            "error"
        );
        console.error("Google Forms configuration is missing.");
        return;
    }

    const formData = new FormData(form);

    const googleForm = document.createElement("form");

    googleForm.action = config.FORM_ACTION;
    googleForm.method = "POST";
    googleForm.target = "google-form-frame";
    googleForm.style.display = "none";

    const fields = {
        fullName: formData.get("fullName"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        interest: formData.get("interest"),
        location: formData.get("location"),
        budget: formData.get("budget"),
        contactMethod: formData.get("contactMethod"),
        message: formData.get("message")
    };

    Object.entries(fields).forEach(([key, value]) => {
        const entryId = config.entries[key];

        if (!entryId) {
            console.error(`Missing Google Form entry ID for: ${key}`);
            return;
        }

        const input = document.createElement("input");

        input.type = "hidden";
        input.name = entryId;
        input.value = value || "";

        googleForm.appendChild(input);
    });

    document.body.appendChild(googleForm);

    console.log("Submitting to Google Forms:", config.FORM_ACTION);
    console.log("Submitted fields:", fields);

    googleForm.submit();

    setStatus(
        "Thank you. Your enquiry has been received. We'll contact you shortly.",
        "success"
    );

    form.reset();

    setTimeout(() => {
        googleForm.remove();
    }, 2000);
});