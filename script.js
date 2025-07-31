// Page loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Logo typing animation
    const logo = document.querySelector('.logo');
    const originalText = logo.textContent;
    logo.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            logo.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        }
    };
    
    setTimeout(typeWriter, 500);
    
    // Add loading animation for nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            link.style.transition = 'all 0.5s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Mohon lengkapi semua field!');
        return;
    }
    
    // Show success message
    alert('Terima kasih! Pesan Anda telah dikirim. Saya akan segera merespons.');
    
    // Reset form
    this.reset();
});

// Header scroll effect with progress bar (no parallax)
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const progressBar = document.querySelector('.header-progress');
    const scrolled = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrolled / maxScroll) * 100;
    
    if (scrolled > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update progress bar
    progressBar.style.width = scrollProgress + '%';
    
    // Add special effect when reaching 100%
    if (scrollProgress >= 100) {
        progressBar.style.animation = 'progressComplete 0.5s ease-out';
        setTimeout(() => {
            progressBar.style.animation = 'progressGlow 2s ease-in-out infinite';
        }, 500);
    }
    
    // Add milestone effects at 25%, 50%, 75%
    const milestones = [25, 50, 75];
    milestones.forEach(milestone => {
        if (scrollProgress >= milestone && scrollProgress < milestone + 1) {
            createProgressParticle(progressBar);
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Logo hover effect with particles
const logo = document.querySelector('.logo');
logo.addEventListener('mouseenter', function() {
    // Create particle effect
    for (let i = 0; i < 5; i++) {
        createParticle(this);
    }
});

function createParticle(element) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#ffffff';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Progress bar particle effect
function createProgressParticle(progressBar) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.background = '#ffffff';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1002';
    particle.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
    
    const rect = progressBar.getBoundingClientRect();
    const x = rect.right - 3;
    const y = rect.top - 3;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: 'translate(0, -20px) scale(1.5)', opacity: 0.8 },
        { transform: 'translate(0, -40px) scale(0.5)', opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Skill card hover effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio preview click effects
// document.querySelectorAll('.preview-img').forEach(img => {
//     img.addEventListener('click', function() {
//         const originalText = this.textContent;
//         this.textContent = 'Coming Soon!';
//         this.style.background = 'linear-gradient(45deg, #00b894, #00cec9)';
        
//         setTimeout(() => {
//             this.textContent = originalText;
//             this.style.background = 'linear-gradient(45deg, #74b9ff, #55a3ff)';
//         }, 1000);
//     });
// });

// Download CV button effect
const downloadBtn = document.querySelector('.cta-button');
downloadBtn.addEventListener('click', function(e) {
    // Add click animation
    this.style.transform = 'translateY(-2px) scale(0.95)';
    this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
    
    // Change text temporarily
    const originalText = this.textContent;
    this.innerHTML = '⏳ Downloading...';
    
    setTimeout(() => {
        this.style.transform = 'translateY(-2px) scale(1)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        this.innerHTML = originalText;
    }, 1000);
    
    // Add success message after download starts
    setTimeout(() => {
        showNotification('✅ CV berhasil diunduh!', 'success');
    }, 1500);
});

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00b894, #00cec9)' : 'linear-gradient(45deg, #74b9ff, #55a3ff)'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 

// Particle background for entire page
(function() {
    const container = document.getElementById('global-particles');
    if (!container) return;
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = 0;
    canvas.style.pointerEvents = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.appendChild(canvas);
    
    let particles = [];
    const PARTICLE_COUNT = 60;
    const colors = ['#fff', '#cccccc', '#e8eaed', '#b0b7c3'];
    function randomBetween(a, b) { return a + Math.random() * (b - a); }
    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: randomBetween(0, canvas.width),
                y: randomBetween(0, canvas.height),
                r: randomBetween(1.5, 3.5),
                dx: randomBetween(-0.08, 0.08),
                dy: randomBetween(0.12, 0.32),
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: randomBetween(0.13, 0.28)
            });
        }
    }
    function drawParticles() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
    }
    let lastScrollY = window.scrollY;
    function updateParticles() {
        const scrollY = window.scrollY;
        const scrollDir = scrollY > lastScrollY ? 1 : (scrollY < lastScrollY ? -1 : 0);
        for (const p of particles) {
            // Gerak vertikal mengikuti arah scroll
            p.y += p.dy * scrollDir;
            p.x += p.dx;
            if (p.y > canvas.height + 10) p.y = -10;
            if (p.y < -10) p.y = canvas.height + 10;
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;
        }
        lastScrollY = scrollY;
    }
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
})(); 

// Custom cursor overlay
(function() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
    let cursorX = mouseX, cursorY = mouseY;
    // Smooth lerp follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.22;
        cursorY += (mouseY - cursorY) * 0.22;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Ripple effect on click
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        cursor.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 450);
    });
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });

    // Scroll effect
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        cursor.classList.add('scroll');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            cursor.classList.remove('scroll');
        }, 350);
    });

    // Hover effect on links & buttons
    function setCursorHover(e) {
        if (e.target.closest('a, button, .cta-button, input, textarea, select')) {
            cursor.classList.add('hover');
        } else {
            cursor.classList.remove('hover');
        }
    }
    document.addEventListener('mouseover', setCursorHover);
    document.addEventListener('mouseout', setCursorHover);
})(); 