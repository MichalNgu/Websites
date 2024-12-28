document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll('.container1, .container2, .container3');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoSlideInterval;

    function showContainer(index) {
        containers.forEach((container, i) => {
            container.classList.remove('active');
            if (i === index) {
                container.classList.add('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    function prevContainer() {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : containers.length - 1;
        showContainer(currentIndex);
        resetAutoSlide();
    }

    function nextContainer() {
        currentIndex = currentIndex < containers.length - 1 ? currentIndex + 1 : 0;
        showContainer(currentIndex);
        resetAutoSlide();
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            showContainer(currentIndex);
            resetAutoSlide();
        });
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextContainer();
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    document.querySelector('.prev').addEventListener('click', prevContainer);
    document.querySelector('.next').addEventListener('click', nextContainer);

    showContainer(currentIndex);
    startAutoSlide();
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    
    const activeLink = localStorage.getItem('activeLink');

    if (activeLink) {
        const activeElement = document.querySelector(`a[href="${activeLink}"]`);
        if (activeElement && activeElement.getAttribute('href') !== 'https://github.com/MichalNgu?tab=repositories') {
            activeElement.classList.add('active');
        }
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (link.getAttribute('href') !== 'https://github.com/MichalNgu?tab=repositories') {
                links.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
                localStorage.setItem('activeLink', link.getAttribute('href'));
            }
        });
    });
});
