(function () {
    'use strict';

    var root = document.documentElement;

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Theme is pre-applied by the inline head script (avoids flash); keep in sync here.
    var saved = localStorage.getItem('theme');
    if (!saved) {
        saved = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    applyTheme(saved);

    document.addEventListener('DOMContentLoaded', function () {
        if (window.lucide) lucide.createIcons();

        var themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function () {
                applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
            });
        }

        var header = document.querySelector('.site-header');
        if (header) {
            var onScroll = function () {
                header.classList.toggle('scrolled', window.scrollY > 4);
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        var expToggle = document.getElementById('toggleExperience');
        var expMore = document.getElementById('experienceMore');
        if (expToggle && expMore) {
            expToggle.addEventListener('click', function () {
                var showing = expMore.classList.toggle('show');
                expToggle.querySelector('.label').textContent = showing ? 'Show less' : 'Show all';
            });
        }

        var track = document.getElementById('t-track');
        if (track) {
            var step = function () {
                var card = track.querySelector('.t-card');
                return card ? card.getBoundingClientRect().width + 16 : 340;
            };
            var prev = document.getElementById('t-prev');
            var next = document.getElementById('t-next');
            if (prev) prev.addEventListener('click', function () {
                track.scrollBy({ left: -step(), behavior: 'smooth' });
            });
            if (next) next.addEventListener('click', function () {
                track.scrollBy({ left: step(), behavior: 'smooth' });
            });
        }
    });
})();
