document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');
    const navItems = document.querySelectorAll('.nav-links li a');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksWrapper.classList.toggle('mobile-active');
            // Animate hamburger to X (simple css toggles not fully added but logic is here)
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksWrapper.classList.remove('mobile-active');
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // 2. Glassmorphism Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // 3. Magnetic Navbar "Flowing Underline"
    const indicator = document.getElementById('nav-indicator');
    const navList = document.querySelector('.nav-links');
    
    if (indicator && navList) {
        navItems.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                const linkRect = e.target.getBoundingClientRect();
                const navRect = navList.getBoundingClientRect();
                
                // Calculate position relative to the ul (.nav-links)
                const left = linkRect.left - navRect.left;
                const width = linkRect.width;
                
                indicator.style.width = `${width}px`;
                indicator.style.transform = `translateX(${left}px)`;
                indicator.style.opacity = '1';
            });
        });

        navList.addEventListener('mouseleave', () => {
            indicator.style.width = '0';
            indicator.style.opacity = '0';
        });
    }

    // 4. "Drawer" Masking Scroll Reveal Effect (Intersection Observer)
    const revealElements = document.querySelectorAll('.drawer-reveal');
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -100px 0px", // Trigger when slightly into the viewport
        threshold: 0
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Revealing once. Comment logic if we want repeat
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Hero Parallax Effect Native JS
    const heroParallax = document.getElementById('hero-parallax');
    
    if (heroParallax) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    // Only apply parallax if hero is in view
                    if (scrolled < window.innerHeight) {
                        // Move background at 30% speed of scroll
                        heroParallax.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
});
