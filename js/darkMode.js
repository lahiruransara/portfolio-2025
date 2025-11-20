// Selectors
const themeToggleBtn = document.querySelector('.theme-toggle');
const themeToggleBtn2 = document.querySelector('.theme-toggle2');
const lightIcon = themeToggleBtn.querySelector('.iconLight');
const darkIcon = themeToggleBtn.querySelector('.iconDark');
const lightIcon2 = themeToggleBtn2.querySelector('.iconLight');
const darkIcon2 = themeToggleBtn2.querySelector('.iconDark');

// State
const theme = localStorage.getItem('theme');

// On Mount
if (theme === 'dark-mode') {
    document.body.classList.add('dark-mode');
    lightIcon.style.display = 'none';
    lightIcon2.style.display = 'none';
    darkIcon.style.display = 'inline-block';
    darkIcon2.style.display = 'inline-block';
} else {
    // Ensure light mode is explicitly set by default
    document.body.classList.remove('dark-mode');
    darkIcon.style.display = 'none';
    darkIcon2.style.display = 'none';
    lightIcon.style.display = 'inline-block';
    lightIcon2.style.display = 'inline-block';
}

// Handlers
const handleThemeToggle = () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
        lightIcon.style.display = 'none';
        lightIcon2.style.display = 'none';
        darkIcon.style.display = 'inline-block';
        darkIcon2.style.display = 'inline-block';
    } else {
        localStorage.removeItem('theme');
        darkIcon.style.display = 'none';
        darkIcon2.style.display = 'none';
        lightIcon.style.display = 'inline-block';
        lightIcon2.style.display = 'inline-block';
    }
};

// Events
themeToggleBtn.addEventListener('click', handleThemeToggle);
themeToggleBtn2.addEventListener('click', handleThemeToggle);