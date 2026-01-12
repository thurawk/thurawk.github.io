document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle Logic
    const toggleBtn = document.getElementById("theme-toggle");
    const html = document.documentElement;

    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;

    html.setAttribute("data-theme", initialTheme);

    toggleBtn.addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // 2. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter(entry => entry.isIntersecting);
        if (!visible.length) {
            return;
        }

        const candidates = visible.filter(entry => entry.boundingClientRect.top >= 0);
        let topEntry;

        if (candidates.length) {
            candidates.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            topEntry = candidates[0];
        } else {
            visible.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
            topEntry = visible[0];
        }
        navLinks.forEach(link => link.classList.remove('active'));

        const id = topEntry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
