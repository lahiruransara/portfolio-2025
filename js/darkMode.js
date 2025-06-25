// Selectors
const themeToggleBtn = document.querySelector('.theme-toggle');
const lightIcon = themeToggleBtn.querySelector('.iconLight');
const darkIcon = themeToggleBtn.querySelector('.iconDark');

// State
const theme = localStorage.getItem('theme');

// On Mount
if (theme === 'dark-mode') {
    document.body.classList.add('dark-mode');
    // switchText.textContent = 'Dark';
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'inline-block';
} else {
    // Ensure light mode is explicitly set by default
    document.body.classList.remove('dark-mode');
    // switchText.textContent = 'Light';
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'inline-block';
}

// Handlers
const handleThemeToggle = () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
        // switchText.textContent = 'Dark';
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'inline-block';
    } else {
        localStorage.removeItem('theme');
        // switchText.textContent = 'Light';
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'inline-block';
    }
};

// Events
themeToggleBtn.addEventListener('click', handleThemeToggle);