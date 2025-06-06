
// Main page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Course card hover effects
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            } else {
                navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            }
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.course-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Load course progress from localStorage
    loadCourseProgress();
});

// Authentication functions
let currentUser = null;

function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showUserInfo();
    }
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function hideLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple demo authentication
    if (username === 'admin' && password === 'password') {
        currentUser = { username: username, loginTime: new Date().toISOString() };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showUserInfo();
        hideLoginModal();
        showNotification('Login successful!', 'success');
        loadCourseProgress(); // Reload progress after login
    } else {
        showNotification('Invalid credentials. Use admin/password', 'error');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'flex';
    showNotification('Logged out successfully!', 'success');
    loadCourseProgress(); // Reload progress after logout
}

function showUserInfo() {
    document.getElementById('userName').textContent = currentUser.username;
    document.getElementById('userInfo').style.display = 'flex';
    document.getElementById('loginBtn').style.display = 'none';
}

function loadCourseProgress() {
    const courses = ['html', 'css', 'javascript', 'react'];
    
    courses.forEach(course => {
        // Get progress from detailed course tracking
        const progress = localStorage.getItem(`${course}_overall_progress`) || 0;
        const courseCard = document.querySelector(`[data-course="${course}"]`);
        
        if (courseCard) {
            const progressBar = courseCard.querySelector('.progress-bar');
            const progressText = courseCard.querySelector('.progress-text');
            
            if (progressBar && progressText) {
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `${progress}% Complete`;
                
                // Show progress only if user is logged in
                if (!currentUser) {
                    progressBar.style.width = '0%';
                    progressText.textContent = 'Login to track progress';
                }
            }
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
        <span>${message}</span>
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--bg-card);
                backdrop-filter: var(--backdrop-blur);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 1rem 1.5rem;
                color: var(--text-primary);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                box-shadow: var(--shadow-glass);
            }
            .notification.success { border-left: 4px solid #10b981; }
            .notification.error { border-left: 4px solid #ef4444; }
            .notification.info { border-left: 4px solid #3b82f6; }
            .notification.show { transform: translateX(0); }
            .modal {
                display: none;
                position: fixed;
                z-index: 10000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
            }
            .modal-content {
                background: var(--bg-card);
                margin: 15% auto;
                padding: 2rem;
                border-radius: 20px;
                width: 400px;
                max-width: 90%;
                border: 1px solid var(--border-color);
            }
            .modal-content h2 {
                margin-bottom: 1rem;
                text-align: center;
            }
            .modal-content input {
                width: 100%;
                padding: 0.75rem;
                margin-bottom: 1rem;
                border: 1px solid var(--border-color);
                border-radius: 10px;
                background: var(--bg-darker);
                color: var(--text-primary);
            }
            .modal-content button {
                width: 100%;
                padding: 0.75rem;
                background: var(--gradient-primary);
                border: none;
                border-radius: 10px;
                color: white;
                font-weight: 600;
                cursor: pointer;
            }
            .close {
                color: var(--text-secondary);
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            .user-info {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .logout-btn {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: 20px;
                padding: 0.5rem 1rem;
                color: var(--text-primary);
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
