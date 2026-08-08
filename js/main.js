(() => {
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

  // Lead form submission
  // Posts to our own /api/submit endpoint (same-origin, so ad blockers
  // can't intercept it), which forwards to Google Forms server-side.
  const form = document.getElementById("lead-form");
  const status = document.getElementById("form-status");

  function setStatus(message, type = "") {
    if (!status) return;

    status.textContent = message;
    status.className = "form-status " + type;
  }

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      setStatus("");

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus("Please complete the required fields.", "error");
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton ? submitButton.innerHTML : "";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());

      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await response.json().catch(() => ({ ok: false }));

        if (response.ok && result.ok) {
          form.reset();
          setStatus(
            "Thank you. Your enquiry has been received. We'll contact you shortly.",
            "success"
          );
        } else {
          setStatus(
            "Something went wrong sending your enquiry. Please try again, or WhatsApp/call us directly.",
            "error"
          );
        }
      } catch (err) {
        setStatus(
          "We couldn't reach our server. Please check your connection and try again, or WhatsApp/call us directly.",
          "error"
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }
      }
    });
  }
})();