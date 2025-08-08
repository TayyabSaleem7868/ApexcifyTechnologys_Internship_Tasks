document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 700,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log('Contact Form submitted:', data);
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Product Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Product Navigation
    const products = [
        {
            title: "Smart Speaker",
            owner: "TechWave",
            price: "$99.99",
            image: "https://images.unsplash.com/photo-1593642634367-dce0d22b0144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "electronics"
        },
        {
            title: "Leather Jacket",
            owner: "TrendSet",
            price: "$149.99",
            image: "https://images.unsplash.com/photo-1543508282-6319a3e26236?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "fashion"
        },
        {
            title: "Minimalist Sofa",
            owner: "HomeHaven",
            price: "$499.99",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "home"
        },
        {
            title: "Designer Sunglasses",
            owner: "VibeWear",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "accessories"
        }
    ];

    productCards.forEach((card, index) => {
        const prevBtn = card.querySelector('.prev-btn');
        const nextBtn = card.querySelector('.next-btn');
        let currentIndex = index;

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + products.length) % products.length;
            updateProductCard(card, currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % products.length;
            updateProductCard(card, currentIndex);
        });
    });

    function updateProductCard(card, index) {
        const product = products[index];
        const img = card.querySelector('img');
        const title = card.querySelector('h3');
        const owner = card.querySelector('.product-owner');
        const price = card.querySelector('.product-price');
        const link = card.querySelector('a');

        img.src = product.image;
        img.alt = product.title;
        link.href = product.image;
        link.setAttribute('data-title', product.title);
        title.textContent = product.title;
        owner.textContent = product.owner;
        price.textContent = product.price;
        card.setAttribute('data-category', product.category);
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
            if (window.pageYOffset > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        } else {
            backToTopButton.classList.remove('active');
            navbar.classList.remove('scrolled');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover Effects for Product Cards
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false,
        'positionFromTop': 80
    });

    // Mobile touch optimization
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});