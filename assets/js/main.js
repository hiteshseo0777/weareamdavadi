/* We Are Amdavadi — site scripts (no dependencies). */
var CONFIG = {
  whatsapp: "918140354824",              // international format, digits only
  email: "hiteshrathodseo@gmail.com",
  formEndpoint: ""                        // optional: paste a form-service URL (see README). Empty = WhatsApp/email only.
};

(function () {
  "use strict";

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById("menu-btn");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  /* ---------- services dropdown ---------- */
  var ddBtn = document.getElementById("dd-btn");
  var dd = document.getElementById("dd-menu");
  function setDd(open) {
    if (!ddBtn || !dd) return;
    dd.classList.toggle("open", open);
    ddBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (ddBtn && dd) {
    ddBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setDd(!dd.classList.contains("open"));
    });
    document.addEventListener("click", function (e) {
      if (!dd.contains(e.target) && e.target !== ddBtn) setDd(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (dd.classList.contains("open")) { setDd(false); ddBtn.focus(); }
        if (nav && nav.classList.contains("open")) {
          nav.classList.remove("open");
          if (menuBtn) { menuBtn.setAttribute("aria-expanded", "false"); menuBtn.focus(); }
        }
      }
    });
    dd.addEventListener("focusout", function (e) {
      if (e.relatedTarget && !dd.contains(e.relatedTarget) && e.relatedTarget !== ddBtn) setDd(false);
    });
  }

  /* ---------- enquiry form ---------- */
  var form = document.getElementById("enquiry-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var btnSend = document.getElementById("btn-send");
  var btnWa = document.getElementById("btn-wa");
  var btnMail = document.getElementById("btn-mail");

  if (CONFIG.formEndpoint) {
    if (btnSend) btnSend.hidden = false;
  }

  function say(msg, kind) {
    status.textContent = msg;
    status.className = "form-status show " + kind;
  }
  function field(name) { return form.elements[name]; }
  function setInvalid(el, msg) {
    var wrap = el.closest(".field");
    wrap.classList.add("invalid");
    wrap.querySelector(".err").textContent = msg;
    el.setAttribute("aria-invalid", "true");
  }
  function clearInvalid(el) {
    var wrap = el.closest(".field");
    wrap.classList.remove("invalid");
    el.removeAttribute("aria-invalid");
  }
  function normaliseUrl(v) {
    v = v.trim();
    if (v && !/^https?:\/\//i.test(v)) v = "https://" + v;
    return v;
  }
  function validate() {
    var ok = true, first = null;
    ["name", "website", "email", "service"].forEach(function (n) { clearInvalid(field(n)); });
    clearInvalid(field("whatsapp"));

    var name = field("name");
    if (name.value.trim().length < 2) { setInvalid(name, "Please enter your name."); ok = false; first = first || name; }

    var site = field("website");
    var u = normaliseUrl(site.value);
    var urlOk = false;
    try { var p = new URL(u); urlOk = /\./.test(p.hostname); } catch (e) {}
    if (!site.value.trim() || !urlOk) { setInvalid(site, "Please enter your website address, for example www.example.com."); ok = false; first = first || site; }

    var email = field("email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setInvalid(email, "Please enter a valid email address."); ok = false; first = first || email; }

    var wa = field("whatsapp");
    if (wa.value.trim() && wa.value.replace(/\D/g, "").length < 10) { setInvalid(wa, "Please enter a valid phone number or leave this blank."); ok = false; first = first || wa; }

    var svc = field("service");
    if (!svc.value) { setInvalid(svc, "Please choose a service."); ok = false; first = first || svc; }

    if (first) first.focus();
    return ok;
  }
  function summary() {
    var l = [
      "Free SEO review request",
      "Name: " + field("name").value.trim(),
      "Website: " + normaliseUrl(field("website").value),
      "Email: " + field("email").value.trim(),
      "WhatsApp: " + (field("whatsapp").value.trim() || "not provided"),
      "Service: " + field("service").value,
      "Message: " + (field("message").value.trim() || "—")
    ];
    return l.join("\n");
  }

  form.addEventListener("input", function (e) { if (e.target.closest(".field")) clearInvalid(e.target); });

  if (btnWa) btnWa.addEventListener("click", function () {
    if (!validate()) return;
    say("WhatsApp is opening with your details filled in. Nothing has been sent until you press Send in WhatsApp.", "info");
    window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(summary()), "_blank", "noopener");
  });
  if (btnMail) btnMail.addEventListener("click", function () {
    if (!validate()) return;
    say("Your email app is opening with your details filled in. Nothing has been sent until you press Send in your email app.", "info");
    window.location.href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent("Free SEO review request") + "&body=" + encodeURIComponent(summary());
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    if (!CONFIG.formEndpoint) {
      say("This form is not connected to an inbox yet, so it cannot send your enquiry. Please use the WhatsApp or email button instead.", "info");
      return;
    }
    if (field("company_site").value) return; // honeypot: bots only
    var data = new FormData(form);
    data.set("website", normaliseUrl(field("website").value));
    if (btnSend) { btnSend.disabled = true; }
    say("Sending…", "info");
    fetch(CONFIG.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) {
        if (r.ok) { form.reset(); say("Thank you. Your enquiry has been sent. We will reply by email or WhatsApp.", "ok"); }
        else { say("Sorry, sending failed. Please use the WhatsApp or email button instead.", "bad"); }
      })
      .catch(function () { say("Sorry, sending failed. Please use the WhatsApp or email button instead.", "bad"); })
      .then(function () { if (btnSend) btnSend.disabled = false; });
  });
})();
