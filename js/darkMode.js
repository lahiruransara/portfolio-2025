document.addEventListener('DOMContentLoaded', () => {
    // 1. Transfer the class from <html> to <body> for your existing CSS/Logic
    if (document.documentElement.classList.contains('dark-mode')) {
        document.body.classList.add('dark-mode');
    }

    const themeButtons = document.querySelectorAll('.theme-toggle, .theme-toggle2');

    const syncUIAndConfig = () => {
        const isNowDark = document.body.classList.contains('dark-mode');
        
        themeButtons.forEach(btn => {
            const lightIcon = btn.querySelector('.iconLight');
            const darkIcon = btn.querySelector('.iconDark');
            if (lightIcon && darkIcon) {
                lightIcon.style.display = isNowDark ? 'none' : 'inline-block';
                darkIcon.style.display = isNowDark ? 'inline-block' : 'none';
            }
        });

        if (typeof updateColorsByTheme === "function") {
            updateColorsByTheme();
        }
    };

    const handleThemeToggle = () => {
        const isTurningDark = document.body.classList.toggle('dark-mode');
        // Keep <html> in sync just in case
        document.documentElement.classList.toggle('dark-mode', isTurningDark);
        
        localStorage.setItem('theme', isTurningDark ? 'dark-mode' : 'light-mode');
        syncUIAndConfig();
    };

    syncUIAndConfig();
    themeButtons.forEach(btn => btn.addEventListener('click', handleThemeToggle));
});


