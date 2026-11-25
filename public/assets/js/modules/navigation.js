(function () {
    "use strict";

    const nav = document.getElementById("primary-navigation");
    if (!nav) {
        return;
    }

    const links = Array.from(nav.querySelectorAll(".nav-link"));
    const toggle = document.querySelector(".mobile-menu-toggle");

    const sections = links
        .map((link) => {
            const hash = link.getAttribute("href");
            if (!hash || !hash.startsWith("#")) {
                return null;
            }
            const id = hash.slice(1);
            const section = document.getElementById(id);
            return section ? { id, section } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.section.offsetTop - b.section.offsetTop);

    function setActiveLink(sectionId) {
        links.forEach((link) => {
            const hash = link.getAttribute("href") || "";
            const id = hash.startsWith("#") ? hash.slice(1) : "";
            const isActive = id === sectionId;
            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    function resolveActiveSection() {
        if (!sections.length) {
            return;
        }

        const marker =
            (parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue(
                    "--bkc-header-offset"
                )
            ) || 96) + 8;

        let current = sections[0].id;

        for (const { id, section } of sections) {
            const top = section.getBoundingClientRect().top;
            if (top - marker <= 0) {
                current = id;
            }
        }

        setActiveLink(current);
    }

    const menuPhone = nav.querySelector(".header-phone");

    links.forEach((link) => {
        link.addEventListener("click", () => {
            const hash = link.getAttribute("href") || "";
            const id = hash.startsWith("#") ? hash.slice(1) : "";
            if (id) {
                setActiveLink(id);
            }
            closeMobileMenu();
        });
    });

    menuPhone?.addEventListener("click", () => {
        closeMobileMenu();
    });

    function closeMobileMenu() {
        if (nav.classList.contains("is-open")) {
            nav.classList.remove("is-open");
            toggle?.setAttribute("aria-expanded", "false");
        }
    }

    if (toggle) {
        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }

    window.addEventListener("scroll", resolveActiveSection, { passive: true });
    window.addEventListener("resize", resolveActiveSection);
    window.addEventListener("hashchange", resolveActiveSection);
    resolveActiveSection();
})();
