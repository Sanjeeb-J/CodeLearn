
// Course page specific functionality
let currentCourse = 'html';
let currentLesson = '';

document.addEventListener('DOMContentLoaded', function() {
    // Get course and lesson from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    currentCourse = urlParams.get('course') || 'html';
    currentLesson = urlParams.get('lesson') || '';
    
    // Load course content
    loadCourse();
    
    // Initialize course page event listeners
    initializeCourseEventListeners();
});

function initializeCourseEventListeners() {
    // ... keep existing code (sidebar toggle and event listeners)
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
    // ... keep existing code (course loading logic)
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
    // ... keep existing code (sidebar loading logic)
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
                   onclick="loadLesson('${lesson.id}', true); return false;">
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

async function loadLesson(lessonId, updateURL = false) {
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
    
    // Show loading indicator
    const contentContainer = document.getElementById('lessonContent');
    if (contentContainer) {
        contentContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-color);"></i><p style="margin-top: 1rem;">Loading lesson...</p></div>';
    }
    
    try {
        // Load lesson content using the async function from lessonContent.js
        const lessonContent = await getLessonContent(lessonId);
        
        if (contentContainer) {
            contentContainer.innerHTML = lessonContent;
        }
    } catch (error) {
        console.error('Error loading lesson:', error);
        if (contentContainer) {
            contentContainer.innerHTML = '<div class="info-box error"><p>Error loading lesson content. Please try again.</p></div>';
        }
    }
    
    // Update sidebar active state
    updateSidebarActiveState(lessonId);
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Close sidebar on mobile after selecting lesson
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth <= 768) {
        sidebar.classList.remove('active');
    }
}

function showWelcomeContent(course) {
    const contentContainer = document.getElementById('lessonContent');
    if (!contentContainer) return;
    
    // Use the function from lessonContent.js
    contentContainer.innerHTML = getWelcomeContent(course, currentCourse);
}

function startFirstLesson() {
    const course = courseData[currentCourse];
    if (course && course.sections.length > 0 && course.sections[0].lessons.length > 0) {
        const firstLesson = course.sections[0].lessons[0];
        loadLesson(firstLesson.id, true);
    }
}

function updateSidebarActiveState(lessonId) {
    // ... keep existing code (sidebar state management)
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeLesson = document.querySelector(`[onclick*="loadLesson('${lessonId}'"]`);
    if (activeLesson) {
        activeLesson.classList.add('active');
        
        const section = activeLesson.closest('.section-lessons');
        const header = section?.previousElementSibling;
        
        if (section && header) {
            section.classList.add('active');
            header.classList.add('active');
        }
    }
}

function updateNavigationButtons() {
    // ... keep existing code (navigation button logic)
    const course = courseData[currentCourse];
    const allLessons = [];
    
    course.sections.forEach(section => {
        section.lessons.forEach(lesson => {
            allLessons.push(lesson);
        });
    });
    
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLesson);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        if (currentIndex > 0) {
            prevBtn.disabled = false;
            prevBtn.onclick = () => navigateLesson('prev');
        } else {
            prevBtn.disabled = true;
            prevBtn.onclick = null;
        }
    }
    
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
    // ... keep existing code (lesson navigation logic)
    const course = courseData[currentCourse];
    const allLessons = [];
    
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
        
        // Mark current lesson as complete when moving to next lesson
        if (currentUser && currentLesson) {
            markLessonComplete(currentCourse, currentLesson);
            updateProgressDisplay();
            loadSidebar(courseData[currentCourse]);
        }
    } else {
        return;
    }
    
    const newLesson = allLessons[newIndex];
    if (newLesson) {
        loadLesson(newLesson.id, true);
        
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }
    }
}

function updateProgressDisplay() {
    // ... keep existing code (progress display logic)
    if (!currentUser) return;
    
    const course = courseData[currentCourse];
    const completedLessons = getCompletedLessons(currentCourse);
    const progress = Math.round((completedLessons.length / course.totalLessons) * 100);
    
    const progressCircle = document.getElementById('progressCircle');
    const progressText = document.getElementById('progressText');
    
    if (progressCircle && progressText) {
        const circumference = 2 * Math.PI * 25;
        const offset = circumference - (progress / 100) * circumference;
        
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressText.textContent = `${progress}%`;
    }
}

// Helper function to get lesson title (moved from lessonContent.js for compatibility)
function getLessonTitle(lessonId) {
    for (const courseKey in courseData) {
        const course = courseData[courseKey];
        for (const section of course.sections) {
            for (const lesson of section.lessons) {
                if (lesson.id === lessonId) {
                    return lesson.title;
                }
            }
        }
    }
    return lessonId.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Global functions for HTML onclick handlers
window.toggleSection = toggleSection;
window.loadLesson = loadLesson;
window.navigateLesson = navigateLesson;
window.startFirstLesson = startFirstLesson;
