$(document).ready(function() {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Theme Toggle Logic
    const themeToggle = $('#theme-toggle');
    const themeIconLight = $('#theme-icon-light');
    const themeIconDark = $('#theme-icon-dark');
    const htmlElement = $('html');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (systemPrefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    themeToggle.on('click', function() {
        const currentTheme = htmlElement.attr('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.attr('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            themeIconLight.addClass('d-none');
            themeIconDark.removeClass('d-none');
        } else {
            themeIconLight.removeClass('d-none');
            themeIconDark.addClass('d-none');
        }
    }

    // Reveal animations on scroll
    const revealElements = $('.tile, .header-tile, .testimonial-mini');
    $(window).on('scroll', function() {
        revealElements.each(function() {
            const elementTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            if (windowBottom > elementTop + 50) {
                $(this).addClass('revealed');
            }
        });
    });

    // Initial state for reveal
    revealElements.css({
        'opacity': '0',
        'transform': 'translateY(10px)',
        'transition': 'all 0.5s ease-out'
    });

    // Add a class for revealed state
    $('<style>.revealed { opacity: 1 !important; transform: translateY(0) !important; }</style>').appendTo('head');

    // Trigger once for initial view
    setTimeout(() => $(window).trigger('scroll'), 100);

    // Experience Toggle
    const toggleBtn = $('#toggleExperience');
    const experienceMore = $('#experienceMore');

    toggleBtn.on('click', function() {
        experienceMore.toggleClass('show');
        const isShowing = experienceMore.hasClass('show');
        toggleBtn.text(isShowing ? 'View Less' : 'View More');
        
        // Re-trigger scroll reveal for newly shown items
        if (isShowing) {
            $(window).trigger('scroll');
        }
    });
});
