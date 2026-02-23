// ==========================================
// GitHub API Integration
// ==========================================

const GITHUB_USERNAME = 'MianMuzammil67';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Language colors (GitHub style)
const languageColors = {
    'Kotlin': '#A97BFF',
    'Java': '#b07219',
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'TypeScript': '#2b7489',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'C++': '#f34b7d',
    'C': '#555555'
};

// Only show these specific repositories
const specificRepos = [
    'Appointment-Booking-App',
    'Naya-Bazar',
    'Pak-Tunes',
    'RunNinja',
    'News-master'
];

async function fetchGitHubRepos() {
    const loadingElement = document.getElementById('projects-loading');
    const containerElement = document.getElementById('projects-container');
    const repoCountElement = document.getElementById('repo-count');
    
    try {
        const response = await fetch(GITHUB_API + '?sort=updated&per_page=100');
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        // Filter to show ONLY specific repositories
        const filteredRepos = repos
            .filter(repo => specificRepos.includes(repo.name))
            .sort((a, b) => {
                const aIndex = specificRepos.indexOf(a.name);
                const bIndex = specificRepos.indexOf(b.name);
                return aIndex - bIndex;
            });
        
        // Update repo count
        if (repoCountElement) {
            repoCountElement.textContent = repos.length;
        }
        
        // Hide loading, show projects
        loadingElement.style.display = 'none';
        containerElement.style.display = 'grid';
        
        // Display repositories
        if (filteredRepos.length > 0) {
            displayProjects(filteredRepos); // Show all specific projects
        } else {
            containerElement.innerHTML = '<p class="no-projects">No matching repositories found. Please check the repository names in github-integration.js</p>';
        }
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        loadingElement.innerHTML = `
            <div class="error-message">
                <p>⚠️ Unable to load projects from GitHub</p>
                <p class="error-detail">Please check your connection or visit my <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">GitHub profile</a> directly.</p>
            </div>
        `;
    }
}

async function fetchReadmeImages(owner, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
        
        if (!response.ok) return [];
        
        const data = await response.json();
        const content = atob(data.content);
        
        // Extract image URLs from README
        const imageRegex = /!\[.*?\]\((.*?)\)|<img.*?src=["'](.*?)["']/g;
        const images = [];
        let match;
        
        while ((match = imageRegex.exec(content)) !== null) {
            const imageUrl = match[1] || match[2];
            if (imageUrl && (imageUrl.includes('github') || imageUrl.startsWith('http'))) {
                images.push(imageUrl);
            }
        }
        
        return images;
    } catch (error) {
        console.error(`Error fetching README for ${repo}:`, error);
        return [];
    }
}

function createProjectCard(repo, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-animate', '');
    
    // Animate cards with delay
    setTimeout(() => {
        card.classList.add('animate');
    }, index * 100);
    
    const languageColor = languageColors[repo.language] || '#6e7681';
    
    // Create project image section with carousel placeholder
    const imageSection = `
        <div class="project-image">
            <div class="project-carousel" data-repo="${repo.name}">
                <div class="carousel-images">
                    <div class="carousel-item active">
                        <div class="project-placeholder">
                            <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                                <rect width="300" height="200" fill="#0a0f1a"/>
                                <text x="50%" y="50%" text-anchor="middle" fill="#00ff88" opacity="0.3" font-size="48" font-family="monospace">&lt;/&gt;</text>
                                <text x="50%" y="65%" text-anchor="middle" fill="#a8b2d1" opacity="0.5" font-size="14" font-family="sans-serif">Loading...</text>
                            </svg>
                        </div>
                    </div>
                </div>
                <button class="carousel-btn prev" style="display: none;">‹</button>
                <button class="carousel-btn next" style="display: none;">›</button>
                <div class="carousel-indicators" style="display: none;"></div>
            </div>
            <div class="project-overlay">
                <span class="project-type">${repo.language || 'Project'}</span>
            </div>
        </div>
    `;
    
    // Fetch README images asynchronously and create carousel
    fetchReadmeImages(repo.owner.login, repo.name).then(images => {
        const carousel = card.querySelector('.project-carousel');
        const carouselImages = carousel.querySelector('.carousel-images');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const indicators = carousel.querySelector('.carousel-indicators');
        
        if (images.length > 0) {
            // Clear placeholder
            carouselImages.innerHTML = '';
            
            // Add all images to carousel
            images.forEach((imageUrl, idx) => {
                const item = document.createElement('div');
                item.className = `carousel-item ${idx === 0 ? 'active' : ''}`;
                item.innerHTML = `<img src="${imageUrl}" alt="${repo.name} screenshot ${idx + 1}" loading="lazy" onerror="this.parentElement.style.display='none';">`;
                carouselImages.appendChild(item);
            });
            
            // Show controls only if there are multiple images
            if (images.length > 1) {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
                indicators.style.display = 'flex';
                
                // Create indicators
                images.forEach((_, idx) => {
                    const dot = document.createElement('span');
                    dot.className = `indicator ${idx === 0 ? 'active' : ''}`;
                    dot.addEventListener('click', () => goToSlide(carousel, idx));
                    indicators.appendChild(dot);
                });
                
                // Add navigation functionality
                let currentSlide = 0;
                
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentSlide = (currentSlide - 1 + images.length) % images.length;
                    updateCarousel(carousel, currentSlide);
                });
                
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentSlide = (currentSlide + 1) % images.length;
                    updateCarousel(carousel, currentSlide);
                });
                
                // Auto-play carousel
                let autoplayInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % images.length;
                    updateCarousel(carousel, currentSlide);
                }, 5000);
                
                // Pause on hover
                carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
                carousel.addEventListener('mouseleave', () => {
                    autoplayInterval = setInterval(() => {
                        currentSlide = (currentSlide + 1) % images.length;
                        updateCarousel(carousel, currentSlide);
                    }, 5000);
                });
            }
        }
    });
    
    // Tech tags from topics
    const techTags = repo.topics && repo.topics.length > 0
        ? repo.topics.slice(0, 5).map(tag => `<span class="tech-tag">${tag}</span>`).join('')
        : (repo.language ? `<span class="tech-tag">${repo.language}</span>` : '');
    
    // Build card HTML
    card.innerHTML = `
        ${imageSection}
        <div class="project-content">
            <h3 class="project-title">${repo.name.replace(/-/g, ' ')}</h3>
            <p class="project-description">${repo.description || 'An Android development project showcasing modern best practices and clean architecture.'}</p>
            <div class="project-tech">
                ${techTags}
                ${repo.language ? `<span class="tech-tag" style="border-color: ${languageColor}; color: ${languageColor};">${repo.language}</span>` : ''}
            </div>
            <div class="project-meta">
                ${repo.stargazers_count > 0 ? `
                    <span class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        ${repo.stargazers_count}
                    </span>
                ` : ''}
                ${repo.forks_count > 0 ? `
                    <span class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="18" r="3"></circle>
                            <circle cx="6" cy="6" r="3"></circle>
                            <circle cx="18" cy="6" r="3"></circle>
                            <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path>
                            <path d="M12 12v3"></path>
                        </svg>
                        ${repo.forks_count}
                    </span>
                ` : ''}
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" class="project-link" target="_blank" rel="noopener">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    View on GitHub
                </a>
                ${repo.homepage ? `
                    <a href="${repo.homepage}" class="project-link" target="_blank" rel="noopener">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Live Demo
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Carousel helper functions
function updateCarousel(carousel, index) {
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.indicator');
    
    items.forEach((item, idx) => {
        item.classList.toggle('active', idx === index);
    });
    
    indicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === index);
    });
}

function goToSlide(carousel, index) {
    updateCarousel(carousel, index);
}

function displayProjects(repos) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    repos.forEach((repo, index) => {
        const card = createProjectCard(repo, index);
        container.appendChild(card);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubRepos();
});

// Optional: Refresh button
function addRefreshButton() {
    const projectsSection = document.querySelector('.projects .section-description');
    if (projectsSection) {
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'refresh-btn';
        refreshBtn.innerHTML = '🔄 Refresh';
        refreshBtn.onclick = fetchGitHubRepos;
        projectsSection.appendChild(refreshBtn);
    }
}
