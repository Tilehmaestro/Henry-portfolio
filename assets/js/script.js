// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Add active class to current section
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Send via fetch
            fetch('send-message.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert('Message sent successfully!');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error sending message. Please try again.');
            });
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close-modal");

    document.querySelectorAll(".portfolio-image img").forEach(img => {

        img.addEventListener("click", function () {
            modal.classList.add("active");
            modalImg.src = this.src;
        });

    });

    closeBtn.addEventListener("click", function () {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-card, .step, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

const roles = [
    "Network Engineer",
    "Developer",
    "IT Specialist",
    "Tech Enthusiast",
    "All your IT needs, solved."
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById("typed");

function typeEffect() {
    const currentRole = roles[index];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typedElement.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 1500;
        isDeleting = true;
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();
const form = document.getElementById("contactForm");
const messageBox = document.getElementById("form-message");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector("button[type='submit']");
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = "Sending...";
        submitBtn.disabled = true;

        try {

            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {

                messageBox.className = "success show";
                messageBox.innerHTML =
                    '<i class="fas fa-check-circle"></i> Message sent successfully. I will get back to you shortly.';

                form.reset();

                setTimeout(() => {
                    messageBox.classList.remove("show");
                }, 5000);

            } else {
                throw new Error();
            }

        } catch (error) {

            messageBox.className = "error show";
            messageBox.innerHTML =
                '<i class="fas fa-times-circle"></i> Unable to send message. Please try again later.';
        }

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}