(function () {
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function armReveal() {
    if (!reduceMotion && "IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll(".reveal").forEach(function (el) {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("in-view");
      });
    }
  }

  // ---------- catalog ----------

  var CATEGORIES = [
    { key: "all", label: "Все" },
    { key: "buttons", label: "Кнопки" },
    { key: "channel", label: "Банер канала" },
    { key: "banners", label: "Баннеры OFFLINE / ONLINE / PAUSED", statuses: true },
    { key: "overlay", label: "Оверлей" },
    { key: "emotes", label: "Смайлики" },
    { key: "emotes-animated", label: "Анимированные смайлики" },
    { key: "animated", label: "Анимированные OFFLINE / ONLINE / PAUSED", statuses: true },
    { key: "sets", label: "Наборы" }
  ];

  var STATUSES = [
    { key: "all", label: "Все" },
    { key: "offline", label: "OFFLINE" },
    { key: "online", label: "ONLINE" },
    { key: "paused", label: "PAUSED" }
  ];

  var PRODUCTS = [
    { id: "BTN-01", name: "Неоновый сет", category: "buttons", concept: "неон", price: 150, img: "gdragon-btn-neon" },
    { id: "BTN-02", name: "Минимал сет", category: "buttons", concept: "минимализм", price: 150, img: "gdragon-btn-minimal" },
    { id: "BTN-03", name: "Пиксель сет", category: "buttons", concept: "пиксель", price: 150, img: "gdragon-btn-pixel" },

    { id: "CH-01", name: "Киберпанк", category: "channel", concept: "киберпанк", price: 300, img: "gdragon-channel-cyberpunk" },
    { id: "CH-02", name: "Тёмный минимализм", category: "channel", concept: "минимализм", price: 300, img: "gdragon-channel-dark-minimal" },
    { id: "CH-03", name: "Градиент акцент", category: "channel", concept: "градиент", price: 320, img: "gdragon-channel-gradient" },

    { id: "OFF-01", name: "Ночной город", category: "banners", status: "offline", concept: "неон", price: 250, img: "gdragon-offline-night-city" },
    { id: "OFF-02", name: "Ретро аркада", category: "banners", status: "offline", concept: "ретро", price: 250, img: "gdragon-offline-retro-arcade" },
    { id: "OFF-03", name: "Спокойный туман", category: "banners", status: "offline", concept: "минимализм", price: 230, img: "gdragon-offline-fog" },

    { id: "ON-01", name: "Киберпанк", category: "banners", status: "online", concept: "киберпанк", price: 300, img: "gdragon-online-cyberpunk" },
    { id: "ON-02", name: "Ретровейв", category: "banners", status: "online", concept: "ретро", price: 300, img: "gdragon-online-retrowave" },
    { id: "ON-03", name: "Минимал", category: "banners", status: "online", concept: "минимализм", price: 280, img: "gdragon-online-minimal" },
    { id: "ON-04", name: "Аниме-стиль", category: "banners", status: "online", concept: "аниме", price: 320, img: "gdragon-online-anime" },
    { id: "ON-05", name: "Природа", category: "banners", status: "online", concept: "природа", price: 280, img: "gdragon-online-nature" },
    { id: "ON-06", name: "Неон-сетка", category: "banners", status: "online", concept: "неон", price: 300, img: "gdragon-online-neon-grid" },

    { id: "PAU-01", name: "Кофе-брейк", category: "banners", status: "paused", concept: "уют", price: 250, img: "gdragon-paused-coffee" },
    { id: "PAU-02", name: "Технический перерыв", category: "banners", status: "paused", concept: "техно", price: 250, img: "gdragon-paused-tech" },
    { id: "PAU-03", name: "Космопауза", category: "banners", status: "paused", concept: "космос", price: 270, img: "gdragon-paused-space" },

    { id: "OVL-01", name: "Полный сет Киберпанк", category: "overlay", concept: "киберпанк", price: 600, img: "gdragon-overlay-cyberpunk" },
    { id: "OVL-02", name: "Полный сет Пиксель", category: "overlay", concept: "пиксель", price: 600, img: "gdragon-overlay-pixel" },
    { id: "OVL-03", name: "Полный сет Минимал", category: "overlay", concept: "минимализм", price: 580, img: "gdragon-overlay-minimal" },

    { id: "EMO-01", name: "Эмоции, часть 1", category: "emotes", concept: "эмоции", price: 200, img: "gdragon-emotes-pack-1" },
    { id: "EMO-02", name: "Эмоции, часть 2", category: "emotes", concept: "эмоции", price: 200, img: "gdragon-emotes-pack-2" },
    { id: "EMO-03", name: "Пиксель-пак", category: "emotes", concept: "пиксель", price: 220, img: "gdragon-emotes-pixel" },

    { id: "AEMO-01", name: "Анимированные эмоции 1", category: "emotes-animated", concept: "анимация", price: 280, img: "gdragon-emotes-anim-1" },
    { id: "AEMO-02", name: "Анимированные эмоции 2", category: "emotes-animated", concept: "анимация", price: 280, img: "gdragon-emotes-anim-2" },
    { id: "AEMO-03", name: "Анимированный пиксель-пак", category: "emotes-animated", concept: "пиксель", price: 300, img: "gdragon-emotes-anim-pixel" },

    { id: "ANIM-01", name: "Анимированный OFFLINE", category: "animated", status: "offline", concept: "анимация", price: 450, img: "gdragon-anim-offline" },
    { id: "ANIM-02", name: "Анимированный ONLINE", category: "animated", status: "online", concept: "анимация", price: 450, img: "gdragon-anim-online" },
    { id: "ANIM-03", name: "Анимированный PAUSED", category: "animated", status: "paused", concept: "анимация", price: 450, img: "gdragon-anim-paused" },

    { id: "SET-01", name: "Старт стример", category: "sets", concept: "набор", price: 900, img: "gdragon-set-start" },
    { id: "SET-02", name: "Профи сет", category: "sets", concept: "набор", price: 1100, img: "gdragon-set-pro" },
    { id: "SET-03", name: "Макси сет", category: "sets", concept: "набор", price: 1400, img: "gdragon-set-maxi" }
  ];

  var tabsEl = document.getElementById("catalogTabs");
  var subtabsEl = document.getElementById("catalogSubtabs");
  var gridEl = document.getElementById("catalogGrid");
  var emptyEl = document.getElementById("catalogEmpty");
  var searchEl = document.getElementById("catalogSearch");

  if (tabsEl && gridEl) {
    var state = { category: "all", status: "all", query: "" };

    function renderSubtabs() {
      var cat = CATEGORIES.find(function (c) { return c.key === state.category; });
      subtabsEl.innerHTML = "";

      if (!cat || !cat.statuses) {
        subtabsEl.hidden = true;
        return;
      }

      subtabsEl.hidden = false;
      STATUSES.forEach(function (st, i) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "subtab-btn";
        btn.textContent = st.label;
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", st.key === state.status ? "true" : "false");
        btn.addEventListener("click", function () {
          state.status = st.key;
          subtabsEl.querySelectorAll(".subtab-btn").forEach(function (b) {
            b.setAttribute("aria-selected", b === btn ? "true" : "false");
          });
          render();
        });
        subtabsEl.appendChild(btn);
      });
    }

    CATEGORIES.forEach(function (cat, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tab-btn";
      btn.textContent = cat.label;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
      btn.dataset.key = cat.key;
      btn.addEventListener("click", function () {
        state.category = cat.key;
        state.status = "all";
        tabsEl.querySelectorAll(".tab-btn").forEach(function (b) {
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        renderSubtabs();
        render();
      });
      tabsEl.appendChild(btn);
    });

    if (searchEl) {
      searchEl.addEventListener("input", function () {
        state.query = searchEl.value.trim().toLowerCase();
        render();
      });
    }

    function matches(product) {
      var categoryOk = state.category === "all" || product.category === state.category;
      if (!categoryOk) return false;
      var statusOk = state.status === "all" || product.status === state.status;
      if (!statusOk) return false;
      if (!state.query) return true;
      var haystack = (product.name + " " + product.id + " " + product.concept + " " + (product.status || "")).toLowerCase();
      return haystack.indexOf(state.query) !== -1;
    }

    function formatPrice(price) {
      return price.toLocaleString("ru-RU") + " ₽";
    }

    function render() {
      var list = PRODUCTS.filter(matches);
      gridEl.innerHTML = "";

      list.forEach(function (product) {
        var card = document.createElement("article");
        card.className = "product-card";

        var img = document.createElement("img");
        img.src = "https://picsum.photos/seed/" + product.img + "/640/480";
        img.alt = product.name;
        img.loading = "lazy";
        card.appendChild(img);

        var body = document.createElement("div");
        body.className = "product-body";

        var tag = document.createElement("span");
        tag.className = "product-tag";
        tag.textContent = product.status
          ? product.status.toUpperCase() + " · " + product.concept
          : product.concept;
        body.appendChild(tag);

        var name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = product.name;
        body.appendChild(name);

        var foot = document.createElement("div");
        foot.className = "product-foot";

        var idBtn = document.createElement("button");
        idBtn.type = "button";
        idBtn.className = "product-id";
        idBtn.textContent = product.id;
        idBtn.title = "Скопировать ID";
        idBtn.addEventListener("click", function () {
          var done = function () {
            idBtn.textContent = "Скопировано";
            idBtn.classList.add("copied");
            setTimeout(function () {
              idBtn.textContent = product.id;
              idBtn.classList.remove("copied");
            }, 1400);
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(product.id).then(done).catch(done);
          } else {
            done();
          }
        });
        foot.appendChild(idBtn);

        var price = document.createElement("span");
        price.className = "price";
        price.textContent = formatPrice(product.price);
        foot.appendChild(price);

        body.appendChild(foot);
        card.appendChild(body);
        gridEl.appendChild(card);
      });

      if (emptyEl) emptyEl.hidden = list.length > 0;
    }

    render();
  }

  armReveal();
})();
