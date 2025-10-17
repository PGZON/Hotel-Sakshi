// Simplified image loading - prioritizing reliability over optimization
function applyLazyLoading() {
    // Basic native lazy loading - most reliable approach
    document.querySelectorAll('img').forEach(img => {
        // Restore any data-src images to their original src
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
        
        // Add native lazy loading to non-critical images
        if (!img.hasAttribute('data-critical') && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Remove any placeholder SVG images
        if (img.src && img.src.includes('data:image/svg')) {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        }
    });
    
    // Fix any broken images
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            // If image fails to load, try to use data-src as fallback
            if (this.dataset.src && this.src !== this.dataset.src) {
                this.src = this.dataset.src;
            }
        };
    });
}

// Simplified image handling - direct links for faster loading
function optimizeImageRequests() {
    // Make gallery popups work directly for better reliability
    const imgLinks = document.querySelectorAll('a.gallery-popup');
    
    imgLinks.forEach(link => {
        // Restore original href if it was changed
        if (link.dataset.fullImg) {
            link.href = link.dataset.fullImg;
        }
        
        // Ensure all links open in a new tab
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
    });
}

// Page load handler
window.addEventListener('load', function() {
    // Handle preloader - force hide
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.display = 'none';
    }
    
    // Apply lazy loading to all images
    applyLazyLoading();
    
    // Optimize image requests
    optimizeImageRequests();
    
    // Setup 10-second timer for hero content updates
    const heroHeadings = [
        "Authentic Flavors & Exquisite Dining",
        "Traditional Recipes with Modern Touch",
        "Experience Culinary Excellence",
        "Unforgettable Dining Experience",
        "Taste the Rich Flavors of Kolhapur"
    ];
    
    const heroTexts = [
        "Experience culinary excellence in the heart of Kolhapur",
        "Enjoy the perfect blend of tradition and innovation",
        "Serving the finest local and international cuisine since 2005",
        "Where every meal tells a story of flavor and passion",
        "Creating memories one dish at a time"
    ];
    
    let currentIndex = 0;
    const heroSubheading = document.querySelector('#hero h2');
    const heroParagraph = document.querySelector('#hero p');
    
    setInterval(function() {
        currentIndex = (currentIndex + 1) % heroHeadings.length;
        
        if (heroSubheading) {
            heroSubheading.style.opacity = 0;
            setTimeout(() => {
                heroSubheading.textContent = heroHeadings[currentIndex];
                heroSubheading.style.opacity = 1;
            }, 500);
        }
        
        if (heroParagraph) {
            heroParagraph.style.opacity = 0;
            setTimeout(() => {
                heroParagraph.textContent = heroTexts[currentIndex];
                heroParagraph.style.opacity = 1;
            }, 500);
        }
    }, 10000);
});

document.addEventListener('DOMContentLoaded', function() {
    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active Navigation on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(function(current) {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
            
            // Check if the nav link exists before trying to access its classList
            const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', scrollActive);

    // Menu Tabs
    const menuTabs = document.querySelectorAll('.menu-tab-btn');
    
    menuTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            menuTabs.forEach(function(tab) {
                tab.classList.remove('active');
            });
            
            // Add active class to the clicked tab
            this.classList.add('active');
            
            // Hide all menu categories
            document.querySelectorAll('.menu-category').forEach(function(category) {
                category.classList.remove('active');
            });
            
            // Show the selected menu category
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Specialties Slider
    const specialtyItems = document.querySelectorAll('.specialty-item');
    let currentSpecialtyIndex = 0;
    
    function showSpecialty(index) {
        specialtyItems.forEach((item, i) => {
            if (i === index) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Show first specialty by default
    showSpecialty(currentSpecialtyIndex);
    
    // Specialty Next and Prev buttons
    const specialtyPrev = document.querySelector('.specialty-prev');
    const specialtyNext = document.querySelector('.specialty-next');
    
    specialtyPrev.addEventListener('click', function() {
        currentSpecialtyIndex--;
        if (currentSpecialtyIndex < 0) {
            currentSpecialtyIndex = specialtyItems.length - 1;
        }
        showSpecialty(currentSpecialtyIndex);
    });
    
    specialtyNext.addEventListener('click', function() {
        currentSpecialtyIndex++;
        if (currentSpecialtyIndex >= specialtyItems.length) {
            currentSpecialtyIndex = 0;
        }
        showSpecialty(currentSpecialtyIndex);
    });

    // Testimonials Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonialIndex = 0;
    
    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            if (i === index) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Show first testimonial by default
    showTestimonial(currentTestimonialIndex);
    
    // Testimonial Next and Prev buttons
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    
    testimonialPrev.addEventListener('click', function() {
        currentTestimonialIndex--;
        if (currentTestimonialIndex < 0) {
            currentTestimonialIndex = testimonialItems.length - 1;
        }
        showTestimonial(currentTestimonialIndex);
    });
    
    testimonialNext.addEventListener('click', function() {
        currentTestimonialIndex++;
        if (currentTestimonialIndex >= testimonialItems.length) {
            currentTestimonialIndex = 0;
        }
        showTestimonial(currentTestimonialIndex);
    });

    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(function(item) {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery Popup (Simple Implementation)
    const galleryPopups = document.querySelectorAll('.gallery-popup');
    
    galleryPopups.forEach(function(popup) {
        popup.addEventListener('click', function(e) {
            e.preventDefault();
            const imageUrl = this.getAttribute('href');
            
            // Create a simple popup
            const popupOverlay = document.createElement('div');
            popupOverlay.className = 'popup-overlay';
            
            const popupImage = document.createElement('img');
            popupImage.src = imageUrl;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'popup-close';
            closeBtn.innerHTML = '&times;';
            
            popupOverlay.appendChild(popupImage);
            popupOverlay.appendChild(closeBtn);
            
            document.body.appendChild(popupOverlay);
            
            // Style the popup
            document.body.style.overflow = 'hidden';
            
            popupOverlay.style.position = 'fixed';
            popupOverlay.style.top = '0';
            popupOverlay.style.left = '0';
            popupOverlay.style.width = '100%';
            popupOverlay.style.height = '100%';
            popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            popupOverlay.style.display = 'flex';
            popupOverlay.style.alignItems = 'center';
            popupOverlay.style.justifyContent = 'center';
            popupOverlay.style.zIndex = '9999';
            
            popupImage.style.maxWidth = '90%';
            popupImage.style.maxHeight = '90%';
            popupImage.style.border = '5px solid #fff';
            
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '20px';
            closeBtn.style.color = '#fff';
            closeBtn.style.fontSize = '40px';
            closeBtn.style.cursor = 'pointer';
            
            // Close the popup
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(popupOverlay);
                document.body.style.overflow = 'auto';
            });
            
            popupOverlay.addEventListener('click', function(e) {
                if (e.target === popupOverlay) {
                    document.body.removeChild(popupOverlay);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });

    // Form Submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your reservation! We will confirm your booking shortly.');
            this.reset();
        });
    }

    // Newsletter form has been removed

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize AOS (Animate On Scroll) with custom settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,           // Animation duration
            easing: 'ease-in-out',   // Animation easing
            once: false,             // Whether animation should happen only once
            mirror: true,            // Whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // Define which position of the element regarding to window should trigger the animation
            offset: 120              // Offset (in px) from the original trigger point
        });
    }
});