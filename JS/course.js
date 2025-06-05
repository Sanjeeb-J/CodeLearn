
// Course page specific functionality
let currentCourse = 'html';
let currentLesson = '';
let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    // Get course and lesson from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    currentCourse = urlParams.get('course') || 'html';
    currentLesson = urlParams.get('lesson') || '';
    
    // Check login status
    checkLoginStatus();
    
    // Load course content
    loadCourse();
    
    // Initialize course page event listeners
    initializeCourseEventListeners();
});

function initializeCourseEventListeners() {
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle')) {
                if (sidebar) {
                    sidebar.classList.remove('active');
                }
            }
        }
    });
}

function loadCourse() {
    const course = courseData[currentCourse];
    if (!course) {
        showNotification('Course not found', 'error');
        return;
    }
    
    // Update course title
    const courseTitleElement = document.getElementById('courseTitle');
    const courseBreadcrumbElement = document.getElementById('courseBreadcrumb');
    
    if (courseTitleElement) {
        courseTitleElement.textContent = course.title;
    }
    if (courseBreadcrumbElement) {
        courseBreadcrumbElement.textContent = course.title;
    }
    
    // Load sidebar content
    loadSidebar(course);
    
    // Load initial lesson or show welcome
    if (currentLesson) {
        loadLesson(currentLesson);
    } else {
        showWelcomeContent(course);
    }
    
    // Update progress display
    updateProgressDisplay();
}

function loadSidebar(course) {
    const sidebarContent = document.getElementById('sidebarContent');
    if (!sidebarContent) return;
    
    const completedLessons = getCompletedLessons(currentCourse);
    let sidebarHTML = '';
    
    course.sections.forEach((section, sectionIndex) => {
        const sectionId = `section-${sectionIndex}`;
        const isFirstSection = sectionIndex === 0;
        
        sidebarHTML += `
            <div class="course-section">
                <div class="section-header ${isFirstSection ? 'active' : ''}" onclick="toggleSection('${sectionId}')">
                    <h3>${section.title}</h3>
                    <i class="fas fa-chevron-down section-toggle"></i>
                </div>
                <div class="section-lessons ${isFirstSection ? 'active' : ''}" id="${sectionId}">
        `;
        
        section.lessons.forEach(lesson => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isActive = currentLesson === lesson.id;
            
            sidebarHTML += `
                <a href="?course=${currentCourse}&lesson=${lesson.id}" 
                   class="lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}"
                   onclick="loadLesson('${lesson.id}', true)">
                    <div class="lesson-status ${isCompleted ? 'completed' : ''}">
                        ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <span>${lesson.title}</span>
                </a>
            `;
        });
        
        sidebarHTML += `
                </div>
            </div>
        `;
    });
    
    sidebarContent.innerHTML = sidebarHTML;
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = section.previousElementSibling;
    
    if (section && header) {
        section.classList.toggle('active');
        header.classList.toggle('active');
    }
}

function loadLesson(lessonId, updateURL = false) {
    if (updateURL) {
        const newURL = `?course=${currentCourse}&lesson=${lessonId}`;
        history.pushState({}, '', newURL);
    }
    
    currentLesson = lessonId;
    
    // Update breadcrumb
    const lessonBreadcrumb = document.getElementById('lessonBreadcrumb');
    if (lessonBreadcrumb) {
        lessonBreadcrumb.textContent = getLessonTitle(lessonId);
    }
    
    // Load lesson content
    const lessonContent = getLessonContent(lessonId);
    const contentContainer = document.getElementById('lessonContent');
    
    if (contentContainer) {
        contentContainer.innerHTML = lessonContent;
    }
    
    // Update sidebar active state
    updateSidebarActiveState(lessonId);
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Mark lesson as completed after viewing (if logged in)
    if (currentUser) {
        setTimeout(() => {
            markLessonComplete(currentCourse, lessonId);
            updateProgressDisplay();
            loadSidebar(courseData[currentCourse]); // Refresh sidebar to show completion
        }, 3000); // Mark as complete after 3 seconds of viewing
    }
}

function getLessonTitle(lessonId) {
    const course = courseData[currentCourse];
    for (const section of course.sections) {
        for (const lesson of section.lessons) {
            if (lesson.id === lessonId) {
                return lesson.title;
            }
        }
    }
    return 'Lesson';
}

function getLessonContent(lessonId) {
    // This is where you would load actual lesson content
    // For demo purposes, we'll generate some sample content
    const lessonTitle = getLessonTitle(lessonId);
    
    return `
        <h1>${lessonTitle}</h1>
        
        <div class="info-box">
            <p><strong>Welcome to ${lessonTitle}!</strong> This is a comprehensive tutorial that will teach you everything you need to know about this topic.</p>
        </div>
        
        <h2>Introduction</h2>
        <p>In this lesson, you'll learn about ${lessonTitle.toLowerCase()} and how to use it effectively in your web development projects. This topic is essential for modern web development and will help you build better websites and applications.</p>
        
        <h2>What You'll Learn</h2>
        <ul>
            <li>Basic concepts and fundamentals</li>
            <li>Practical examples and use cases</li>
            <li>Best practices and common patterns</li>
            <li>Advanced techniques and optimization</li>
            <li>Real-world applications</li>
        </ul>
        
        <h2>Code Example</h2>
        <pre><code>// Example code for ${lessonTitle}
function example() {
    console.log("This is an example for ${lessonTitle}");
    return "Hello, ${lessonTitle}!";
}

// Call the function
example();</code></pre>
        
        <div class="info-box success">
            <p><strong>Tip:</strong> Practice makes perfect! Try to implement the examples shown in this lesson in your own projects.</p>
        </div>
        
        <h2>Key Points to Remember</h2>
        <ol>
            <li>Always follow best practices when implementing ${lessonTitle.toLowerCase()}</li>
            <li>Test your code thoroughly before deploying</li>
            <li>Keep your code clean and well-documented</li>
            <li>Stay updated with the latest developments</li>
        </ol>
        
        <h2>Summary</h2>
        <p>In this lesson, we covered the fundamentals of ${lessonTitle.toLowerCase()}. You should now have a good understanding of how to use this in your projects. Practice the examples provided and try to create your own variations.</p>
        
        <div class="info-box warning">
            <p><strong>Next Steps:</strong> Continue to the next lesson to build upon what you've learned here. Each lesson builds on the previous one, so make sure you understand the concepts before moving forward.</p>
        </div>
    `;
}

function showWelcomeContent(course) {
    const contentContainer = document.getElementById('lessonContent');
    if (!contentContainer) return;
    
    const completedLessons = getCompletedLessons(currentCourse);
    const progress = Math.round((completedLessons.length / course.totalLessons) * 100);
    
    contentContainer.innerHTML = `
        <h1>Welcome to ${course.title}</h1>
        
        <div class="info-box">
            <p><strong>Get ready to master ${course.title.toLowerCase()}!</strong> This comprehensive course will take you from beginner to advanced level.</p>
        </div>
        
        <h2>Course Overview</h2>
        <p>This course contains <strong>${course.totalLessons} lessons</strong> organized into <strong>${course.sections.length} sections</strong>. Each lesson is designed to build upon the previous one, ensuring a smooth learning experience.</p>
        
        <h2>Your Progress</h2>
        ${currentUser ? `
            <div style="margin: 2rem 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Progress</span>
                    <span>${progress}% Complete</span>
                </div>
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 10px; height: 12px; overflow: hidden;">
                    <div style="background: var(--gradient-primary); height: 100%; width: ${progress}%; border-radius: 10px; transition: width 0.5s ease;"></div>
                </div>
                <div style="margin-top: 0.5rem; color: var(--text-secondary);">
                    ${completedLessons.length} of ${course.totalLessons} lessons completed
                </div>
            </div>
        ` : `
            <div class="info-box warning">
                <p><strong>Login to track your progress!</strong> Sign in to save your progress and earn certificates.</p>
            </div>
        `}
        
        <h2>Course Sections</h2>
        <div style="display: grid; gap: 1rem; margin: 2rem 0;">
            ${course.sections.map((section, index) => `
                <div style="background: var(--bg-darker); border: 1px solid var(--border-color); border-radius: 10px; padding: 1.5rem;">
                    <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">${index + 1}. ${section.title}</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">${section.lessons.length} lessons</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${section.lessons.slice(0, 3).map(lesson => `
                            <span style="background: var(--bg-card); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem; color: var(--text-secondary);">${lesson.title}</span>
                        `).join('')}
                        ${section.lessons.length > 3 ? `<span style="color: var(--text-secondary); font-size: 0.8rem;">+${section.lessons.length - 3} more</span>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <h2>Getting Started</h2>
        <p>Ready to begin your journey? Click on any lesson in the sidebar to start learning. We recommend starting with the first lesson and working your way through each section systematically.</p>
        
        <div style="text-align: center; margin: 3rem 0;">
            <button onclick="startFirstLesson()" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem;">
                <i class="fas fa-play" style="margin-right: 0.5rem;"></i>
                Start First Lesson
            </button>
        </div>
    `;
}

function startFirstLesson() {
    const course = courseData[currentCourse];
    if (course && course.sections.length > 0 && course.sections[0].lessons.length > 0) {
        const firstLesson = course.sections[0].lessons[0];
        loadLesson(firstLesson.id, true);
    }
}

function updateSidebarActiveState(lessonId) {
    // Remove active class from all lesson items
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current lesson
    const activeLesson = document.querySelector(`[onclick="loadLesson('${lessonId}', true)"]`);
    if (activeLesson) {
        activeLesson.classList.add('active');
        
        // Ensure the section containing this lesson is expanded
        const section = activeLesson.closest('.section-lessons');
        const header = section?.previousElementSibling;
        
        if (section && header) {
            section.classList.add('active');
            header.classList.add('active');
        }
    }
}

function updateNavigationButtons() {
    const course = courseData[currentCourse];
    const allLessons = [];
    
    // Flatten all lessons into a single array
    course.sections.forEach(section => {
        section.lessons.forEach(lesson => {
            allLessons.push(lesson);
        });
    });
    
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLesson);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Update previous button
    if (prevBtn) {
        if (currentIndex > 0) {
            prevBtn.disabled = false;
            prevBtn.onclick = () => navigateLesson('prev');
        } else {
            prevBtn.disabled = true;
            prevBtn.onclick = null;
        }
    }
    
    // Update next button
    if (nextBtn) {
        if (currentIndex < allLessons.length - 1) {
            nextBtn.disabled = false;
            nextBtn.onclick = () => navigateLesson('next');
        } else {
            nextBtn.disabled = true;
            nextBtn.onclick = null;
        }
    }
}

function navigateLesson(direction) {
    const course = courseData[currentCourse];
    const allLessons = [];
    
    // Flatten all lessons into a single array
    course.sections.forEach(section => {
        section.lessons.forEach(lesson => {
            allLessons.push(lesson);
        });
    });
    
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLesson);
    let newIndex;
    
    if (direction === 'prev' && currentIndex > 0) {
        newIndex = currentIndex - 1;
    } else if (direction === 'next' && currentIndex < allLessons.length - 1) {
        newIndex = currentIndex + 1;
    } else {
        return; // No navigation possible
    }
    
    const newLesson = allLessons[newIndex];
    if (newLesson) {
        loadLesson(newLesson.id, true);
        
        // Scroll to top of content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }
    }
}

function updateProgressDisplay() {
    if (!currentUser) return;
    
    const course = courseData[currentCourse];
    const completedLessons = getCompletedLessons(currentCourse);
    const progress = Math.round((completedLessons.length / course.totalLessons) * 100);
    
    // Update progress circle
    const progressCircle = document.getElementById('progressCircle');
    const progressText = document.getElementById('progressText');
    
    if (progressCircle && progressText) {
        const circumference = 2 * Math.PI * 25; // radius = 25
        const offset = circumference - (progress / 100) * circumference;
        
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressText.textContent = `${progress}%`;
    }
}

// Global functions for HTML onclick handlers
window.toggleSection = toggleSection;
window.loadLesson = loadLesson;
window.navigateLesson = navigateLesson;
window.startFirstLesson = startFirstLesson;