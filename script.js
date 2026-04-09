document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 2. Sticky Navbar Glassmorphism
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const chainElements = document.querySelectorAll('.reveal-chain');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Staggered animation for grid items
    const chainObserver = new IntersectionObserver((entries, observer) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                delay += 150; // stagger effect
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    chainElements.forEach(el => chainObserver.observe(el));

    // 4. Contact Form Handling Logic (Simulated for mailto:)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Since we are using an actual action="mailto:..." the form will trigger a mail client.
    // However, if the user prefers, we can show a UI message like this (Optional, mostly the client handles it)
    contactForm.addEventListener('submit', (e) => {
        // e.preventDefault(); 
        // We aren't preventing default because mailto needs to fire.
        
        formMessage.style.display = 'block';
        formMessage.classList.add('success');
        formMessage.textContent = "Opening your mail client...";
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
});
