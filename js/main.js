// Apply lazy loading to all images except the hero section for better performance
function applyLazyLoading() {
    // Target all images except preloaded critical images
    const images = document.querySelectorAll('img:not([data-critical])');
    
    // Add loading="lazy" attribute to all images
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Convert large images to webp format where possible by adding srcset
        if (img.src.includes('unsplash.com')) {
            // Create a webp URL from the original URL if it's from Unsplash
            const webpUrl = img.src.includes('&fm=') 
                ? img.src.replace(/&fm=[^&]+/, '&fm=webp') 
                : img.src + '&fm=webp';
            
            // Add srcset for better performance
            img.setAttribute('srcset', `${webpUrl} 1x`);
        }
    });
}

// Optimize image size and quality
function optimizeImageRequests() {
    const imgLinks = document.querySelectorAll('a.gallery-popup');
    imgLinks.forEach(link => {
        // Only open full-size images when clicked, not on page load
        const originalHref = link.getAttribute('href');
        link.setAttribute('data-full-img', originalHref);
        link.setAttribute('href', 'javascript:void(0)');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const fullImg = this.getAttribute('data-full-img');
            if (fullImg) {
                window.open(fullImg, '_blank');
            }
        });
    });
}

// Preloader
window.addEventListener('load', function() {
    document.getElementById('preloader').style.display = 'none';
    
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
});