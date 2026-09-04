// Mobile nav toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a link is tapped (mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form handling (see form-note in contact.html for setup instructions)
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var action = form.getAttribute("action");

      // If no real form backend has been configured yet, fall back to opening
      // the visitor's email client with a pre-filled message.
      if (!action || action.indexOf("YOUR_FORM_ID") !== -1) {
        var name = form.querySelector("#name").value;
        var email = form.querySelector("#email").value;
        var message = form.querySelector("#message").value;
        var subject = encodeURIComponent("Povpraševanje s spletne strani od " + name);
        var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
        window.location.href = "mailto:plesna.sprostitev@gmail.com?subject=" + subject + "&body=" + body;
        status.textContent = "Odpiranje vašega e-poštnega programa…";
        status.className = "form-status success";
        return;
      }

      // Real backend configured (e.g. Formspree) — submit via fetch.
      var data = new FormData(form);
      fetch(action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = "Hvala — vaše sporočilo je bilo poslano!";
            status.className = "form-status success";
            form.reset();
          } else {
            throw new Error("Submission failed");
          }
        })
        .catch(function () {
          status.textContent = "Nekaj je šlo narobe. Prosimo, pišite nam neposredno po e-pošti.";
          status.className = "form-status error";
        });
    });
  }
});
