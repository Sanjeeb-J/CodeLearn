
// Lesson content loader - loads individual lesson HTML files
async function getLessonContent(lessonId) {
    try {
        // Determine the course type from the lessonId
        let coursePath = '';
        if (lessonId.startsWith('html-')) {
            coursePath = 'html';
        } else if (lessonId.startsWith('css-')) {
            coursePath = 'css';
        } else if (lessonId.startsWith('js-')) {
            coursePath = 'javascript';
        } else if (lessonId.startsWith('react-')) {
            coursePath = 'react';
        }
        
        // Convert lesson ID to filename (replace hyphens with underscores)
        const filename = lessonId.replace('-', '_') + '.html';
        const filePath = `lessons/${coursePath}/${filename}`;
        
        // Try to fetch the specific lesson file
        const response = await fetch(filePath);
        
        if (response.ok) {
            const content = await response.text();
            // Extract the body content from the fetched HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            return doc.body.innerHTML;
        } else {
            // Fallback to generated content if file doesn't exist
            return generateFallbackContent(lessonId);
        }
    } catch (error) {
        console.warn(`Could not load lesson file for ${lessonId}, using fallback content:`, error);
        return generateFallbackContent(lessonId);
    }
}

// Fallback content generator for lessons without specific files
function generateFallbackContent(lessonId) {
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

function getWelcomeContent(course, currentCourse) {
    const completedLessons = getCompletedLessons(currentCourse);
    const progress = Math.round((completedLessons.length / course.totalLessons) * 100);
    
    return `
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

// Helper function to get lesson title from courseData
function getLessonTitle(lessonId) {
    // Search through all courses to find the lesson title
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
    // Fallback: convert ID to title format
    return lessonId.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}
