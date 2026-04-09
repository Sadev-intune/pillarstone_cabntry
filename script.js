document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Smooth Inertial Scroll Physics --- */
    const body = document.body;
    const scrollWrapper = document.getElementById('scroll-wrapper');
    
    // Variables for interpolation
    let currentY = 0;
    let targetY = 0;
    const ease = 0.08; // Lower = heavier scroll feeling
    
    // Set the body height to the wrapper's actual height so native scrollbars appear/work
    function setBodyHeight() {
        if(scrollWrapper) {
            body.style.height = `${scrollWrapper.getBoundingClientRect().height}px`;
        }
    }
    
    // Wait for images and layouts to settle before measuring
    window.addEventListener('load', setBodyHeight);
    window.addEventListener('resize', setBodyHeight);
    
    // Track native scroll position
    window.addEventListener('scroll', () => {
        targetY = window.scrollY;
    });
    
    // The animation loop interpolating the wrapper container
    function renderScroll() {
        if(scrollWrapper) {
            // Calculate distance setup
            currentY = currentY + (targetY - currentY) * ease;
            
            // Fix subpixel rendering artifacts by rounding to hundredths
            let transformY = Math.round(currentY * 100) / 100;
            
            // Apply transform via matrix3d or translate3d for hardware acceleration
            scrollWrapper.style.transform = `translate3d(0, -${transformY}px, 0)`;
        }
        requestAnimationFrame(renderScroll);
    }
    renderScroll();


    /* --- 2. Glass Navbar State --- */
    const navbar = document.getElementById('navbar');
    // Using targetY instead of scrollY to sync with the visual scroll payload
    window.addEventListener('scroll', () => {
        if (targetY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- 3. Mobile Hamburger (Basic Toggle) --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            alert('Mobile menu click function enabled!');
            // Mobile Dropdown toggler code could go here
        });
    }

    /* --- 4. "Blueprint" Shutter Reveal (Intersection Observer) --- */
    const revealElements = document.querySelectorAll('.shutter-reveal');
    
    // We adjust the margins based on the smooth scroller wrapper shifting content offset
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly inside viewport
        threshold: 0
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
    
    // Re-check heights periodically in case of lazy-loaded images extending the document late
    setInterval(setBodyHeight, 1500);
});
