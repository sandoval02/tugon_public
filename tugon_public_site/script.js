/**
 * TUGON Research Showcase Interactive Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const html = document.documentElement;

  // localStorage can throw (private mode, blocked cookies, some file:// setups)
  function readTheme() {
    try {
      return localStorage.getItem("tugon-theme") || "dark";
    } catch (e) {
      return "dark";
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("tugon-theme", theme);
    } catch (e) {
      /* ignore */
    }
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === "dark") {
      themeIcon.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
    } else {
      themeIcon.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
    }
  }

  const savedTheme = readTheme();
  html.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      saveTheme(next);
      updateThemeIcon(next);
    });
  }

  // 2. Interactive Tabs
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".tabs-container");
      if (!parent || !parent.parentElement) return;
      const container = parent.parentElement;
      const targetId = btn.getAttribute("data-tab");

      parent.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      container.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add("active");
    });
  });

  // 3. Copy code snippet utility
  function showCopied(elementId) {
    const btn = document.getElementById(elementId);
    if (!btn) return;
    const originalText = btn.innerText;
    btn.innerText = "Copied!";
    setTimeout(() => {
      btn.innerText = originalText;
    }, 2000);
  }

  // navigator.clipboard is undefined on non-secure pages (e.g. http:// or file://),
  // so fall back to a hidden textarea and execCommand.
  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  window.copyToClipboard = function (text, elementId) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => showCopied(elementId))
        .catch(() => {
          if (fallbackCopy(text)) showCopied(elementId);
        });
    } else if (fallbackCopy(text)) {
      showCopied(elementId);
    }
  };

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconHamburger = mobileToggle ? mobileToggle.querySelector(".icon-hamburger") : null;
  const iconClose = mobileToggle ? mobileToggle.querySelector(".icon-close") : null;

  function toggleMobileMenu(forceState) {
    if (!mobileMenu || !mobileToggle) return;
    const isOpening = forceState !== undefined ? forceState : !mobileMenu.classList.contains("open");
    if (isOpening) {
      mobileMenu.classList.add("open");
      mobileToggle.setAttribute("aria-expanded", "true");
      if (iconHamburger) iconHamburger.style.display = "none";
      if (iconClose) iconClose.style.display = "block";
    } else {
      mobileMenu.classList.remove("open");
      mobileToggle.setAttribute("aria-expanded", "false");
      if (iconHamburger) iconHamburger.style.display = "block";
      if (iconClose) iconClose.style.display = "none";
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close menu when clicking any nav link inside mobile menu
  document.querySelectorAll(".mobile-nav-link, .mobile-repo-btn").forEach((link) => {
    link.addEventListener("click", () => {
      toggleMobileMenu(false);
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (mobileMenu && mobileMenu.classList.contains("open")) {
      if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        toggleMobileMenu(false);
      }
    }
  });
});