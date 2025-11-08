const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    }), { threshold: 0.3 };
});

document.querySelectorAll('.observe').forEach((element) => {
    observer.observe(element);
});