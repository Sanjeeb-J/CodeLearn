
// Global variables
let currentUser = null;
let allCourseTopics = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check login status
    checkLoginStatus();
    
    // Initialize all course topics for search
    initializeSearchTopics();
    
    // Load course progress for main page cards
    loadCourseProgress();
    
    // Initialize event listeners
    initializeEventListeners();
}

function initializeEventListeners() {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.length >= 2) {
                showSearchResults();
            }
        });
    }

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSearchResults();
        }
    });

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
}

function initializeSearchTopics() {
    allCourseTopics = [];
    
    Object.keys(courseData).forEach(courseKey => {
        const course = courseData[courseKey];
        course.sections.forEach(section => {
            section.lessons.forEach(lesson => {
                allCourseTopics.push({
                    title: lesson.title,
                    category: course.title,
                    courseId: courseKey,
                    lessonId: lesson.id,
                    url: `course.html?course=${courseKey}&lesson=${lesson.id}`
                });
            });
        });
    });
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    
    if (!resultsContainer) return;
    
    if (query.length < 2) {
        hideSearchResults();
        return;
    }
    
    const results = allCourseTopics.filter(topic =>
        topic.title.toLowerCase().includes(query) ||
        topic.category.toLowerCase().includes(query)
    ).slice(0, 10);
    
    displaySearchResults(results, resultsContainer);
    showSearchResults();
}

function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-secondary);">No results found</div>';
        return;
    }
    
    const resultsHTML = results.map(result => `
        <a href="${result.url}" class="search-result-item">
            <span class="search-result-category">${result.category}</span>
            <span class="search-result-title">${result.title}</span>
        </a>
    `).join('');
    
    container.innerHTML = resultsHTML;
}

function showSearchResults() {
    const results = document.getElementById('searchResults');
    if (results) {
        results.style.display = 'block';
    }
}

function hideSearchResults() {
    const results = document.getElementById('searchResults');
    if (results) {
        results.style.display = 'none';
    }
}

// Authentication functions
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
    
    // Validate input
    if (!username || !password) {
        showNotification('Please enter both username and password', 'error');
        return;
    }
    
    // Simple demo authentication
    if (username === 'admin' && password === 'password') {
        currentUser = { username: username, loginTime: new Date().toISOString() };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showUserInfo();
        hideLoginModal();
        showNotification('Login successful! Welcome to CodeLearn', 'success');
        loadCourseProgress();
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    } else {
        showNotification('Invalid credentials. Use admin/password for demo', 'error');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'flex';
    showNotification('Logged out successfully!', 'success');
    loadCourseProgress();
}

function showUserInfo() {
    const userNameElement = document.getElementById('userName');
    const userInfoElement = document.getElementById('userInfo');
    const loginBtnElement = document.getElementById('loginBtn');
    
    if (userNameElement && userInfoElement && loginBtnElement) {
        userNameElement.textContent = currentUser.username;
        userInfoElement.style.display = 'flex';
        loginBtnElement.style.display = 'none';
    }
}

function loadCourseProgress() {
    Object.keys(courseData).forEach(courseKey => {
        const course = courseData[courseKey];
        const completedLessons = getCompletedLessons(courseKey);
        const progress = Math.round((completedLessons.length / course.totalLessons) * 100);
        
        // Update progress display
        const progressBar = document.getElementById(`${courseKey}-progress`);
        const progressText = document.getElementById(`${courseKey}-text`);
        const lessonCount = document.getElementById(`${courseKey}-count`);
        
        if (progressBar && progressText && lessonCount) {
            progressBar.style.width = `${progress}%`;
            
            if (currentUser) {
                progressText.textContent = `${progress}% Complete`;
                lessonCount.textContent = `${completedLessons.length}/${course.totalLessons} Lessons`;
            } else {
                progressText.textContent = 'Login to track progress';
                lessonCount.textContent = `0/${course.totalLessons} Lessons`;
                progressBar.style.width = '0%';
            }
        }
    });
}

function getCompletedLessons(courseId) {
    if (!currentUser) return [];
    
    const completed = localStorage.getItem(`${courseId}_completed_lessons`);
    return completed ? JSON.parse(completed) : [];
}

function markLessonComplete(courseId, lessonId) {
    if (!currentUser) {
        return;
    }
    
    const completedLessons = getCompletedLessons(courseId);
    if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem(`${courseId}_completed_lessons`, JSON.stringify(completedLessons));
        
        // Update main page progress if we're on it
        if (document.getElementById(`${courseId}-progress`)) {
            loadCourseProgress();
        }
    }
}

function openCourse(courseId) {
    window.location.href = `course.html?course=${courseId}`;
}

// Notification system
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function findLessonTitle(courseId, lessonId) {
    const course = courseData[courseId];
    if (course) {
        for (const section of course.sections) {
            for (const lesson of section.lessons) {
                if (lesson.id === lessonId) {
                    return lesson.title;
                }
            }
        }
    }
    return lessonId;
}

function getLessonTitle(lessonId) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentCourse = urlParams.get('course') || 'html';
    return findLessonTitle(currentCourse, lessonId);
}

// Global functions for HTML onclick handlers
window.showLoginModal = showLoginModal;
window.hideLoginModal = hideLoginModal;
window.handleLogin = handleLogin;
window.logout = logout;
window.openCourse = openCourse;
window.markLessonComplete = markLessonComplete;
