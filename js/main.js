document.addEventListener('DOMContentLoaded', () => {
    /* --- Enterprise Loading Experience --- */
    const loader = document.getElementById('loader');
    if (loader) {
        const logo = loader.querySelector('img');
        
        // Sequence: Logo fades in, then loader fades out
        setTimeout(() => {
            if (logo) logo.style.opacity = '1';
        }, 300);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Trigger hero animations if they exist
                const heroItems = document.querySelectorAll('.hero-content > *');
                heroItems.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 120);
                });
            }, 1000);
        }, 1500); // 2 seconds total experience
    }

    /* --- Sticky Navigation (80px Threshold) --- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Mobile Menu Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    /* --- Dark Mode Toggle --- */
    const darkModeBtn = document.querySelector('.dark-mode-btn');
    darkModeBtn.addEventListener('click', () => {
        const body = document.body;
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }

    /* --- LTR / RTL Toggle --- */
    const dirBtn = document.querySelector('.dir-btn');
    dirBtn.addEventListener('click', () => {
        const html = document.documentElement;
        if (html.getAttribute('dir') === 'rtl') {
            html.setAttribute('dir', 'ltr');
            dirBtn.querySelector('span').textContent = 'RTL';
        } else {
            html.setAttribute('dir', 'rtl');
            dirBtn.querySelector('span').textContent = 'LTR';
        }
    });

    /* --- Magnetic Buttons --- */
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const position = el.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        el.addEventListener('mouseout', () => {
            el.style.transform = 'translate(0px, 0px)';
        });
    });

    /* --- Ripple Effect on Buttons --- */
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple');
            this.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove();
            }, 600);
        });
    });

    /* --- Staggered Scroll Reveal Animations --- */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        let delayCount = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered 120ms delay
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delayCount * 120);
                delayCount++;
                revealObserver.unobserve(entry.target); // Reveal only once
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    /* --- Hero Character-by-Character Text Reveal --- */
    const typeReveal = document.querySelector('.type-reveal');
    if (typeReveal) {
        const text = typeReveal.textContent;
        typeReveal.textContent = '';
        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.animation = `fadeIn 100ms forwards ${1.86 + (index * 0.1)}s`;
            typeReveal.appendChild(span);
        });
    }

    /* --- Testimonial Carousel Auto-Rotation --- */
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    if (slides.length > 0) {
        const showSlide = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        // Auto rotate every 6 seconds
        let carouselInterval = setInterval(nextSlide, 6000);

        // Click dots to navigate
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(carouselInterval);
                currentSlide = index;
                showSlide(currentSlide);
                carouselInterval = setInterval(nextSlide, 6000);
            });
        });
    }

    /* ==============================================
       SERVICES PAGE (Specific Logic)
       ============================================== */

    /* --- FAQ Accordion --- */
    const accItems = document.querySelectorAll('.acc-item');
    accItems.forEach(item => {
        const header = item.querySelector('.acc-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other accordions (optional, but good UX for pricing panel)
                accItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current accordion
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    /* ==============================================
       GALLERY PAGE (Specific Logic)
       ============================================== */

    /* --- Lightbox Modal --- */
    const galleryItems = document.querySelectorAll('.hm-item');
    const lightbox = document.getElementById('gallery-lightbox');
    
    if (lightbox && galleryItems.length > 0) {
        const lbImage = lightbox.querySelector('.lb-image');
        const lbTitle = lightbox.querySelector('.lb-title');
        const lbCounter = lightbox.querySelector('.lb-counter');
        const btnClose = lightbox.querySelector('.lb-close');
        const btnPrev = lightbox.querySelector('.lb-prev');
        const btnNext = lightbox.querySelector('.lb-next');
        
        let currentIndex = 0;

        const openLightbox = (index) => {
            currentIndex = index;
            const item = galleryItems[currentIndex];
            const src = item.getAttribute('data-src');
            const title = item.getAttribute('data-title');

            lbImage.classList.remove('loaded');
            lbImage.src = src;
            lbImage.onload = () => { lbImage.classList.add('loaded'); };
            lbTitle.textContent = title;
            lbCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
            
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden'; // prevent scrolling
        };

        const closeLightbox = () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
            setTimeout(() => { lbImage.src = ''; }, 400); // clear after fade
        };

        const nextImage = () => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            openLightbox(currentIndex);
        };

        const prevImage = () => {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            openLightbox(currentIndex);
        };

        // Event Listeners
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        btnClose.addEventListener('click', closeLightbox);
        btnNext.addEventListener('click', nextImage);
        btnPrev.addEventListener('click', prevImage);
        
        // Close on background click
        lightbox.querySelector('.lb-bg').addEventListener('click', closeLightbox);

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }

    /* --- Gallery Filter Chips (Simple Visual Simulation) --- */
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            // In a real scenario, this would filter the .hm-item array.
        });
    });

    /* --- Nail Art Carousel --- */
    const nailTrack = document.querySelector('.nc-track');
    const nailSlides = document.querySelectorAll('.nc-slide');
    if (nailTrack && nailSlides.length > 0) {
        let activeNail = 2; // Center item initially
        const totalSlides = nailSlides.length;
        
        const updateNailCarousel = () => {
            nailSlides.forEach((slide, index) => {
                slide.classList.remove('active');
                // Calculate position relative to active
                let diff = index - activeNail;
                slide.style.transform = `translateX(${diff * 200}px) scale(${index === activeNail ? 1 : 0.85})`;
                slide.style.zIndex = index === activeNail ? 10 : 1;
                
                if (index === activeNail) {
                    slide.classList.add('active');
                }
            });
        };

        updateNailCarousel();

        const nextNailSlide = () => {
            activeNail = (activeNail + 1) % totalSlides;
            updateNailCarousel();
        };

        let nailInterval = setInterval(nextNailSlide, 5000);

        // Hover pause
        nailSlides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                activeNail = index;
                updateNailCarousel();
            });
            slide.addEventListener('mouseenter', () => clearInterval(nailInterval));
            slide.addEventListener('mouseleave', () => {
                clearInterval(nailInterval);
                nailInterval = setInterval(nextNailSlide, 5000);
            });
        });
    }

    /* --- Salon Interiors Parallax --- */
    const parallaxBgs = document.querySelectorAll('.ip-bg');
    if (parallaxBgs.length > 0) {
        window.addEventListener('scroll', () => {
            parallaxBgs.forEach(bg => {
                const rect = bg.parentElement.getBoundingClientRect();
                // Only animate if in view
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const scrollY = window.scrollY;
                    const speed = 0.4;
                    // Adjust background position based on scroll to create parallax
                    bg.style.backgroundPositionY = `${(rect.top - window.innerHeight) * speed}px`;
                }
            });
        });
    }

    /* ==============================================
       ABOUT PAGE (Specific Logic)
       ============================================== */

    /* --- Timeline Scroll Activation --- */
    const journeyTimeline = document.querySelector('.journey-timeline');
    if (journeyTimeline) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    journeyTimeline.classList.add('active');
                    observer.unobserve(journeyTimeline); // Only animate once
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(journeyTimeline);
    }

    /* --- 3D Tilt Effect (Team Cards) --- */
    const tiltElements = document.querySelectorAll('.tilt-effect');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    /* --- Botanical Particles (CTA Section) --- */
    const particlesContainer = document.getElementById('botanical-particles');
    if (particlesContainer) {
        // Create simple floating circles mimicking petals/particles
        for(let i=0; i<15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 8 + 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(183, 110, 121, 0.4)'; // Rose gold
            particle.style.borderRadius = '50%';
            
            // Random start position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            particlesContainer.appendChild(particle);
            
            // Simple animation
            particle.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 0 },
                { opacity: 1, offset: 0.2 },
                { opacity: 1, offset: 0.8 },
                { transform: `translate(${Math.random()*100 - 50}px, -${Math.random()*100 + 50}px) rotate(${Math.random()*360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 5000 + 5000,
                iterations: Infinity,
                delay: Math.random() * 5000
            });
        }
    }

    /* ==============================================
       CONTACT PAGE (Specific Logic)
       ============================================== */

    /* --- Form Floating Labels (Keep active if value exists) --- */
    const formInputs = document.querySelectorAll('.luxury-form input, .luxury-form textarea, .luxury-form select');
    formInputs.forEach(input => {
        // Initial check
        if (input.value.trim() !== '') {
            const label = input.nextElementSibling;
            if (label && label.tagName === 'LABEL') label.classList.add('active-label');
        }

        input.addEventListener('blur', () => {
            const label = input.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                if (input.value.trim() !== '') {
                    label.classList.add('active-label');
                } else {
                    label.classList.remove('active-label');
                }
            }
        });
        
        input.addEventListener('change', () => {
            const label = input.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                if (input.value.trim() !== '') {
                    label.classList.add('active-label');
                }
            }
        });
    });

    /* --- Contact FAQ Accordion --- */
    const contactAccItems = document.querySelectorAll('.c-acc-item');
    contactAccItems.forEach(item => {
        const header = item.querySelector('.c-acc-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close others
                contactAccItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    /* --- Golden Particles (Final CTA Section) --- */
    const goldenParticlesContainer = document.getElementById('golden-particles');
    if (goldenParticlesContainer) {
        for(let i=0; i<30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(212, 175, 55, 0.6)'; // Gold
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.8)';
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            goldenParticlesContainer.appendChild(particle);
            
            particle.animate([
                { transform: `translate(0, 0)`, opacity: 0 },
                { opacity: Math.random() * 0.5 + 0.3, offset: 0.2 },
                { opacity: Math.random() * 0.5 + 0.3, offset: 0.8 },
                { transform: `translate(${Math.random()*150 - 75}px, -${Math.random()*200 + 100}px)`, opacity: 0 }
            ], {
                duration: Math.random() * 8000 + 7000,
                iterations: Infinity,
                delay: Math.random() * 5000
            });
        }
    }

    /* ==============================================
       HOME 2 (Specific Logic)
       ============================================== */

    /* --- Before & After Sliders --- */
    const baSliders = document.querySelectorAll('.ba-slider');
    baSliders.forEach(slider => {
        let isDown = false;
        const handle = slider.querySelector('.ba-handle');
        const beforeImg = slider.querySelector('.img-before');

        const updateSlider = (e) => {
            const rect = slider.getBoundingClientRect();
            // Prevent going outside bounds
            let x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            let percent = (x / rect.width) * 100;
            
            handle.style.left = `${percent}%`;
            // img-before is clipped using polygon
            beforeImg.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
        };

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            updateSlider(e);
        });

        window.addEventListener('mouseup', () => {
            isDown = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            updateSlider(e);
        });
        
        // Touch support
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            updateSlider(e.touches[0]);
        });
        window.addEventListener('touchend', () => {
            isDown = false;
        });
        window.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            updateSlider(e.touches[0]);
        });
    });

    /* --- Countdown Timers --- */
    const countdowns = document.querySelectorAll('.countdown');
    countdowns.forEach(counter => {
        const targetDate = new Date(counter.getAttribute('data-date')).getTime();
        
        const updateCount = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                counter.innerHTML = "Offer Expired";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((distance % (1000 * 60)) / 1000);

            counter.querySelector('.days').innerText = days.toString().padStart(2, '0');
            counter.querySelector('.hours').innerText = hours.toString().padStart(2, '0');
            counter.querySelector('.mins').innerText = mins.toString().padStart(2, '0');
            counter.querySelector('.secs').innerText = secs.toString().padStart(2, '0');
        };

        updateCount();
        setInterval(updateCount, 1000);
    });

    /* --- Golden Particle Drift (Section 6 CTA) --- */
    const particlesContainer = document.getElementById('golden-particles');
    if (particlesContainer) {
        const createParticle = () => {
            const particle = document.createElement('div');
            
            // Random properties
            const size = Math.random() * 4 + 2; // 2px to 6px
            const startX = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 10 + 10; // 10s to 20s
            
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = 'var(--color-primary)'; // Rose Gold / Gold
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.left = `${startX}%`;
            particle.style.bottom = '-10px';
            particle.style.pointerEvents = 'none';
            particle.style.filter = 'blur(1px)';
            
            // Animation
            particle.animate([
                { transform: 'translateY(0) scale(1)', opacity: particle.style.opacity },
                { transform: `translateY(-400px) translateX(${Math.random() * 100 - 50}px) scale(0)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'linear',
                fill: 'forwards'
            });

            particlesContainer.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        };

        // Create initial particles
        for(let i=0; i<15; i++) {
            setTimeout(createParticle, Math.random() * 5000);
        }

        // Continously create particles
        setInterval(createParticle, 800);
    }
});
