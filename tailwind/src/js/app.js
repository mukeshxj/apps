(function () {
  const articles = window.PULSE_ARTICLES || [];
  const coaches = window.PULSE_COACHES || [];

  function formatDate(iso) {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  function navHtml(page) {
    const link = (href, id, label) =>
      `<li><a href="${href}" class="${page === id ? "menu-active" : ""}">${label}</a></li>`;

    return `
      <div class="navbar bg-base-100/90 backdrop-blur-md sticky top-0 z-50 border-b border-base-300">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden" aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              ${link("index.html", "home", "Home")}
              ${link("blog.html", "blog", "Blog")}
              ${link("about.html", "about", "Coaches")}
              ${link("contact.html", "contact", "Contact")}
            </ul>
          </div>
          <a href="index.html" class="btn btn-ghost text-xl font-black tracking-tight">
            Pulse<span class="text-primary">Lab</span>
          </a>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            ${link("index.html", "home", "Home")}
            ${link("blog.html", "blog", "Blog")}
            ${link("about.html", "about", "Coaches")}
            ${link("contact.html", "contact", "Contact")}
          </ul>
        </div>
        <div class="navbar-end gap-2">
          <label class="swap swap-rotate btn btn-ghost btn-circle">
            <input type="checkbox" class="theme-controller" value="light" aria-label="Toggle theme" />
            <svg class="swap-off h-5 w-5 fill-current pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
            <svg class="swap-on h-5 w-5 fill-current pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
          </label>
          <a href="blog.html" class="btn btn-primary btn-sm md:btn-md">Read the journal</a>
        </div>
      </div>
    `;
  }

  function footerHtml() {
    return `
      <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content p-10 mt-16">
        <aside>
          <p class="text-2xl font-black">Pulse<span class="text-primary">Lab</span></p>
          <p>Training notes for people with jobs, knees, and appetites.</p>
        </aside>
        <nav>
          <h6 class="footer-title">Journal</h6>
          <a class="link link-hover" href="blog.html">All articles</a>
          <a class="link link-hover" href="blog.html?cat=Strength">Strength</a>
          <a class="link link-hover" href="blog.html?cat=Cardio">Cardio</a>
          <a class="link link-hover" href="blog.html?cat=Nutrition">Nutrition</a>
        </nav>
        <nav>
          <h6 class="footer-title">Studio</h6>
          <a class="link link-hover" href="about.html">Coaches</a>
          <a class="link link-hover" href="contact.html">Write to us</a>
        </nav>
      </footer>
      <div class="footer footer-center bg-neutral text-neutral-content p-4 border-t border-base-300">
        <p>© ${new Date().getFullYear()} PulseLab. Train hard, recover harder.</p>
      </div>
    `;
  }

  function cardHtml(article) {
    return `
      <article class="card bg-base-200 shadow-xl h-full">
        <figure class="h-48 overflow-hidden">
          <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover" />
        </figure>
        <div class="card-body">
          <div class="flex items-center gap-2">
            <span class="badge badge-primary badge-outline">${article.category}</span>
            <span class="text-xs opacity-70">${article.readTime}</span>
          </div>
          <h3 class="card-title text-lg">${article.title}</h3>
          <p class="text-sm opacity-80">${article.excerpt}</p>
          <div class="card-actions justify-between items-center mt-2">
            <span class="text-xs opacity-60">${article.author} · ${formatDate(article.date)}</span>
            <a href="article.html?id=${article.id}" class="btn btn-sm btn-primary">Read</a>
          </div>
        </div>
      </article>
    `;
  }

  function initFeaturedSwiper() {
    const wrap = document.querySelector("#featured-swiper-wrapper");
    if (!wrap || typeof Swiper === "undefined") return;
    const featured = articles.filter((a) => a.featured);
    wrap.innerHTML = featured
      .map(
        (a) => `
        <div class="swiper-slide">
          <div class="hero min-h-[28rem] rounded-2xl overflow-hidden" style="background-image: url('${a.image}');">
            <div class="hero-overlay hero-overlay-fit"></div>
            <div class="hero-content text-neutral-content max-w-3xl">
              <div>
                <span class="badge badge-primary mb-3">${a.category}</span>
                <h2 class="text-3xl md:text-5xl font-black leading-tight">${a.title}</h2>
                <p class="py-4 max-w-xl opacity-90">${a.excerpt}</p>
                <a href="article.html?id=${a.id}" class="btn btn-primary">Open article</a>
              </div>
            </div>
          </div>
        </div>`
      )
      .join("");

    new Swiper("#featured-swiper", {
      loop: true,
      autoplay: { delay: 5200, disableOnInteraction: false },
      pagination: { el: "#featured-pagination", clickable: true },
      navigation: { nextEl: "#featured-next", prevEl: "#featured-prev" }
    });
  }

  function initProgramsSwiper() {
    const el = document.querySelector("#programs-swiper");
    if (!el || typeof Swiper === "undefined") return;
    new Swiper("#programs-swiper", {
      slidesPerView: 1.15,
      spaceBetween: 16,
      breakpoints: {
        640: { slidesPerView: 2.1 },
        1024: { slidesPerView: 3.2 }
      },
      pagination: { el: "#programs-pagination", clickable: true }
    });
  }

  function initTestimonialsSwiper() {
    if (!document.querySelector("#quotes-swiper") || typeof Swiper === "undefined") return;
    new Swiper("#quotes-swiper", {
      loop: true,
      autoplay: { delay: 4500 },
      pagination: { el: "#quotes-pagination", clickable: true }
    });
  }

  function renderHomeGrid() {
    const grid = document.querySelector("#latest-grid");
    if (!grid) return;
    const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
    grid.innerHTML = latest.map(cardHtml).join("");
  }

  function renderBlog() {
    const grid = document.querySelector("#blog-grid");
    const empty = document.querySelector("#blog-empty");
    const search = document.querySelector("#blog-search");
    const tabs = document.querySelectorAll("[data-filter]");
    if (!grid) return;

    const params = new URLSearchParams(location.search);
    let category = params.get("cat") || "All";
    let query = "";

    function paint() {
      const list = articles.filter((a) => {
        const catOk = category === "All" || a.category === category;
        const q = query.trim().toLowerCase();
        const qOk =
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q);
        return catOk && qOk;
      });
      grid.innerHTML = list.map(cardHtml).join("");
      if (empty) empty.classList.toggle("hidden", list.length > 0);
      tabs.forEach((tab) => {
        tab.classList.toggle("tab-active", tab.dataset.filter === category);
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        category = tab.dataset.filter;
        const url = new URL(location.href);
        if (category === "All") url.searchParams.delete("cat");
        else url.searchParams.set("cat", category);
        history.replaceState({}, "", url);
        paint();
      });
    });

    if (search) {
      const onSearch = () => {
        query = search.value;
        paint();
      };
      search.addEventListener("input", onSearch);
      search.addEventListener("change", onSearch);
      search.addEventListener("search", onSearch);
    }

    paint();
  }

  function renderArticle() {
    const root = document.querySelector("#article-root");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("id");
    const article = articles.find((a) => a.id === id) || articles[0];
    document.title = article.title + " · PulseLab";

    root.innerHTML = `
      <div class="hero min-h-[22rem] rounded-2xl overflow-hidden mb-10" style="background-image: url('${article.image}');">
        <div class="hero-overlay hero-overlay-fit"></div>
        <div class="hero-content text-neutral-content max-w-3xl">
          <div>
            <div class="breadcrumbs text-sm mb-3 opacity-80">
              <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li>${article.category}</li>
              </ul>
            </div>
            <span class="badge badge-primary">${article.category}</span>
            <h1 class="text-4xl md:text-5xl font-black mt-3">${article.title}</h1>
            <p class="mt-4 opacity-80">${article.author} · ${formatDate(article.date)} · ${article.readTime}</p>
          </div>
        </div>
      </div>
      <div class="max-w-3xl mx-auto article-prose text-lg leading-relaxed">
        ${article.body.map((p) => `<p>${p}</p>`).join("")}
      </div>
    `;

    const relatedWrap = document.querySelector("#related-wrapper");
    if (relatedWrap) {
      const related = articles.filter((a) => a.id !== article.id && a.category === article.category);
      const fallback = articles.filter((a) => a.id !== article.id).slice(0, 4);
      const list = (related.length ? related : fallback).slice(0, 4);
      relatedWrap.innerHTML = list
        .map(
          (a) => `
          <div class="swiper-slide h-auto">
            ${cardHtml(a)}
          </div>`
        )
        .join("");
      if (typeof Swiper !== "undefined") {
        new Swiper("#related-swiper", {
          slidesPerView: 1.1,
          spaceBetween: 16,
          breakpoints: { 768: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3 } },
          navigation: { nextEl: "#related-next", prevEl: "#related-prev" }
        });
      }
    }
  }

  function renderCoaches() {
    const grid = document.querySelector("#coach-grid");
    if (!grid) return;
    grid.innerHTML = coaches
      .map(
        (c) => `
        <div class="card bg-base-200 shadow-xl">
          <figure class="h-56">
            <img src="${c.image}" alt="${c.name}" class="w-full h-full object-cover" />
          </figure>
          <div class="card-body">
            <h3 class="card-title">${c.name}</h3>
            <p class="badge badge-outline w-fit">${c.role}</p>
            <p>${c.bio}</p>
          </div>
        </div>`
      )
      .join("");
  }

  function initContactForm() {
    const form = document.querySelector("#contact-form");
    const toast = document.querySelector("#contact-toast");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = form.querySelector("#name").value.trim();
      const email = form.querySelector("#email").value.trim();
      const message = form.querySelector("#message").value.trim();
      if (name.length < 2) {
        form.querySelector("#name").classList.add("input-error");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        form.querySelector("#email").classList.add("input-error");
        return;
      }
      if (message.length < 10) {
        form.querySelector("#message").classList.add("textarea-error");
        return;
      }
      form.reset();
      form.querySelectorAll(".input-error, .textarea-error").forEach((el) => {
        el.classList.remove("input-error", "textarea-error");
      });
      if (toast) {
        toast.classList.remove("hidden");
        setTimeout(() => toast.classList.add("hidden"), 3500);
      }
    });
  }

  function initNewsletter() {
    const form = document.querySelector("#newsletter-form");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (!input.value.includes("@")) {
        input.classList.add("input-error");
        return;
      }
      input.classList.remove("input-error");
      input.value = "";
      const note = form.querySelector("[data-success]");
      if (note) {
        note.classList.remove("hidden");
        setTimeout(() => note.classList.add("hidden"), 3000);
      }
    });
  }

  const page = document.body.dataset.page || "home";
  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");
  if (header) header.innerHTML = navHtml(page);
  if (footer) footer.innerHTML = footerHtml();

  initFeaturedSwiper();
  initProgramsSwiper();
  initTestimonialsSwiper();
  renderHomeGrid();
  renderBlog();
  renderArticle();
  renderCoaches();
  initContactForm();
  initNewsletter();
})();
