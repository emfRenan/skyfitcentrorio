(function () {
  var header = document.querySelector("header");
  var nav = header && header.querySelector(".nav");
  if (!header || !nav || document.getElementById("nav-menu")) return;

  var labels = {
    especialidades: "Especialidades",
    sobre: "Sobre",
    "como-funciona": "Como funciona",
    planos: "Planos",
    diferenciais: "Diferenciais",
    estrutura: "Estrutura",
    info: "Horários e local",
    faq: "Dúvidas"
  };

  var skip = document.createElement("a");
  skip.className = "skip-link";
  skip.href = document.getElementById("planos") ? "#planos" : "#conteudo";
  skip.textContent = "Ir para o conteúdo";
  document.body.insertBefore(skip, document.body.firstChild);

  var backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";

  var menu = document.createElement("nav");
  menu.id = "nav-menu";
  menu.className = "nav-menu";
  menu.setAttribute("aria-label", "Seções da página");

  Object.keys(labels).forEach(function (id) {
    if (!document.getElementById(id)) return;
    var link = document.createElement("a");
    link.href = "#" + id;
    link.textContent = labels[id];
    menu.appendChild(link);
  });

  var personal = document.querySelector('a[href*="personalsky.vercel.app"]');
  if (personal) {
    var personalLink = document.createElement("a");
    personalLink.href = personal.href;
    personalLink.target = "_blank";
    personalLink.rel = "noopener";
    personalLink.textContent = personal.textContent.trim() || "Personal trainers";
    menu.appendChild(personalLink);
  }

  var headerCta = nav.querySelector(".nav-cta");
  if (headerCta) {
    var menuCta = document.createElement("a");
    menuCta.href = headerCta.href;
    menuCta.target = "_blank";
    menuCta.rel = "noopener";
    menuCta.className = "nav-menu-cta";
    menuCta.textContent = headerCta.textContent.trim();
    menu.appendChild(menuCta);
  }

  var toggle = document.createElement("button");
  toggle.className = "nav-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "nav-menu");
  toggle.setAttribute("aria-label", "Abrir menu");
  toggle.innerHTML = "<span></span><span></span><span></span>";

  nav.appendChild(toggle);
  header.appendChild(backdrop);
  header.appendChild(menu);

  function setOpen(open) {
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    if (open) {
      var first = menu.querySelector("a");
      if (first) first.focus();
    } else if (menu.contains(document.activeElement)) {
      toggle.focus();
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("is-open"));
  });
  backdrop.addEventListener("click", function () {
    setOpen(false);
  });
  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });

  var heroCta = document.querySelector(".hero .btn-primary") || headerCta;
  if (heroCta) {
    var bar = document.createElement("a");
    bar.className = "mobile-bar";
    bar.href = heroCta.href;
    if (heroCta.target) bar.target = heroCta.target;
    bar.rel = "noopener";
    bar.innerHTML =
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 2.1 17.1L1 23l6.1-1.6A11 11 0 0 0 12 22a11 11 0 0 0 8.5-18.5zM12 20.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.6.9.9-3.5-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.3.1-.5s-.1-.3-.2-.4l-.8-1.8c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.3.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.4.6 0 1.2-.3 1.6-.9.2-.4.2-.8.1-.9-.1-.2-.3-.2-.5-.3z"/></svg><span></span>';
    bar.querySelector("span").textContent = heroCta.textContent.trim();
    document.body.appendChild(bar);
  }

  function syncHeader() {
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
    if (window.innerWidth > 760 && header.classList.contains("is-open")) setOpen(false);
  }
  syncHeader();
  window.addEventListener("resize", syncHeader);
})();
