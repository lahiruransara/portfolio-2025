// Selectors
const themeToggleBtn = document.querySelector('.theme-toggle');
// const switchText = themeToggleBtn.querySelector('.themeText');

// State
const theme = localStorage.getItem('theme');

// On Mount
if (theme === 'dark-mode') {
    document.body.classList.add('dark-mode');
    // switchText.textContent = 'Dark';
} else {
    // Ensure light mode is explicitly set by default
    document.body.classList.remove('dark-mode');
    // switchText.textContent = 'Light';
}

// Handlers
const handleThemeToggle = () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
        switchText.textContent = 'Dark';
    } else {
        localStorage.removeItem('theme');
        switchText.textContent = 'Light';
    }
};

// Events
themeToggleBtn.addEventListener('click', handleThemeToggle);