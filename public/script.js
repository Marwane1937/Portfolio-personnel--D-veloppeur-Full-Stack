// Configuration de l'API
const API_BASE = '/api';

// Gestion du thème (Dark/Light Mode)
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    
    // Récupérer le thème sauvegardé ou utiliser le thème par défaut (dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Mettre à jour l'icône
    updateThemeIcon(savedTheme, themeIcon);
    
    // Gérer le clic sur le bouton
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
            
            // Animation du bouton
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }
}

function updateThemeIcon(theme, iconElement) {
    if (iconElement) {
        iconElement.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

// Fonction pour charger les données du portfolio
async function loadPortfolioData() {
    try {
        const response = await fetch(`${API_BASE}/portfolio`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        return null;
    }
}

// Calculer les années d'expérience
function calculateYearsOfExperience(experience) {
    if (!experience || experience.length === 0) return 0;
    
    const now = new Date();
    let totalMonths = 0;
    
    experience.forEach(exp => {
        const startDate = new Date(exp.startDate + '-01');
        const endDate = exp.endDate === 'Présent' ? now : new Date(exp.endDate + '-01');
        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                      (endDate.getMonth() - startDate.getMonth());
        totalMonths += months;
    });
    
    return Math.floor(totalMonths / 12);
}

// Afficher les informations personnelles
function displayPersonalInfo(data) {
    const personal = data.personal;
    
    document.getElementById('hero-name').textContent = personal.name;
    document.getElementById('hero-title').textContent = personal.title;
    document.getElementById('hero-summary').textContent = personal.summary;
    document.getElementById('about-summary').textContent = personal.summary;
    
    // Statistiques
    const yearsExp = calculateYearsOfExperience(data.experience);
    document.getElementById('years-experience').textContent = yearsExp;
    document.getElementById('projects-count').textContent = data.projects.length;
    
    const totalTechs = data.technologies.reduce((sum, cat) => sum + cat.skills.length, 0);
    document.getElementById('technologies-count').textContent = totalTechs;
    
    // Liens sociaux
    const socialLinks = document.getElementById('social-links');
    socialLinks.innerHTML = '';
    
    if (personal.linkedin) {
        const linkedinLink = document.createElement('a');
        linkedinLink.href = personal.linkedin;
        linkedinLink.target = '_blank';
        linkedinLink.className = 'social-link';
        linkedinLink.innerHTML = '💼';
        linkedinLink.title = 'LinkedIn';
        socialLinks.appendChild(linkedinLink);
    }
    
    if (personal.github) {
        const githubLink = document.createElement('a');
        githubLink.href = personal.github;
        githubLink.target = '_blank';
        githubLink.className = 'social-link';
        githubLink.innerHTML = '🔗';
        githubLink.title = 'GitHub';
        socialLinks.appendChild(githubLink);
    }
    
    // Informations de contact
    const contactInfo = document.getElementById('contact-info');
    contactInfo.innerHTML = '';
    
    if (personal.email) {
        const emailItem = document.createElement('div');
        emailItem.className = 'contact-item';
        emailItem.innerHTML = `
            <span class="contact-label">Email</span>
            <a href="mailto:${personal.email}" class="contact-value">${personal.email}</a>
        `;
        contactInfo.appendChild(emailItem);
    }
    
    if (personal.phone) {
        const phoneItem = document.createElement('div');
        phoneItem.className = 'contact-item';
        phoneItem.innerHTML = `
            <span class="contact-label">Téléphone</span>
            <a href="tel:${personal.phone}" class="contact-value">${personal.phone}</a>
        `;
        contactInfo.appendChild(phoneItem);
    }
    
    if (personal.location) {
        const locationItem = document.createElement('div');
        locationItem.className = 'contact-item';
        locationItem.innerHTML = `
            <span class="contact-label">Localisation</span>
            <span class="contact-value">${personal.location}</span>
        `;
        contactInfo.appendChild(locationItem);
    }
}

// Afficher l'expérience
function displayExperience(experience) {
    const timeline = document.getElementById('experience-timeline');
    timeline.innerHTML = '';
    
    experience.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        const achievements = exp.achievements ? 
            `<ul class="timeline-achievements">
                ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
            </ul>` : '';
        
        const technologies = exp.technologies ? 
            `<div class="timeline-tech">
                ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>` : '';
        
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3 class="timeline-title">${exp.title}</h3>
                <div class="timeline-company">${exp.company}</div>
                <div class="timeline-date">${exp.location} • ${formatDate(exp.startDate)} - ${exp.endDate}</div>
                <p class="timeline-description">${exp.description}</p>
                ${achievements}
                ${technologies}
            </div>
        `;
        
        timeline.appendChild(item);
    });
}

// Afficher les projets
function displayProjects(projects) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const features = project.features ? 
            `<ul class="project-features">
                ${project.features.map(feat => `<li>${feat}</li>`).join('')}
            </ul>` : '';
        
        const links = [];
        if (project.github) {
            links.push(`<a href="${project.github}" target="_blank" class="project-link">GitHub</a>`);
        }
        if (project.demo) {
            links.push(`<a href="${project.demo}" target="_blank" class="project-link">Démo</a>`);
        }
        
        card.innerHTML = `
            <div class="project-image">${project.title.charAt(0)}</div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                ${features}
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                ${links.length > 0 ? `<div class="project-links">${links.join('')}</div>` : ''}
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Afficher les solutions
function displaySolutions(solutions) {
    const grid = document.getElementById('solutions-grid');
    grid.innerHTML = '';
    
    solutions.forEach(solution => {
        const card = document.createElement('div');
        card.className = 'solution-card';
        
        const technologies = solution.technologies ? 
            `<div class="project-tech">
                ${solution.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>` : '';
        
        card.innerHTML = `
            <div class="solution-category">${solution.category}</div>
            <h3 class="solution-title">${solution.title}</h3>
            <p class="solution-description">${solution.description}</p>
            ${technologies}
            ${solution.impact ? `<div class="solution-impact">Impact: ${solution.impact}</div>` : ''}
        `;
        
        grid.appendChild(card);
    });
}

// Afficher les technologies
function displayTechnologies(technologies) {
    const container = document.getElementById('technologies-container');
    container.innerHTML = '';
    
    technologies.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'tech-category';
        
        const title = document.createElement('h3');
        title.className = 'tech-category-title';
        title.textContent = category.category;
        categoryDiv.appendChild(title);
        
        const skillsDiv = document.createElement('div');
        skillsDiv.className = 'tech-skills';
        
        category.skills.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'tech-skill';
            
            const levelPercent = getLevelPercent(skill.level);
            
            skillDiv.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-level">${skill.level}</div>
                <div class="skill-years">${skill.years} ${skill.years > 1 ? 'années' : 'année'}</div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${levelPercent}%"></div>
                </div>
            `;
            
            skillsDiv.appendChild(skillDiv);
        });
        
        categoryDiv.appendChild(skillsDiv);
        container.appendChild(categoryDiv);
    });
}

// Afficher la formation
function displayEducation(education) {
    const timeline = document.getElementById('education-timeline');
    timeline.innerHTML = '';
    
    education.forEach(edu => {
        const item = document.createElement('div');
        item.className = 'education-item';
        
        item.innerHTML = `
            <div class="education-degree">${edu.degree}</div>
            <div class="education-institution">${edu.institution}</div>
            <div class="education-date">${edu.location} • ${edu.startDate} - ${edu.endDate}</div>
            <p class="education-description">${edu.description}</p>
        `;
        
        timeline.appendChild(item);
    });
}

// Afficher les langues
function displayLanguages(languages) {
    const contactInfo = document.getElementById('contact-info');
    if (!contactInfo) return;
    
    const languagesDiv = document.createElement('div');
    languagesDiv.className = 'languages-section';
    languagesDiv.innerHTML = '<h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--primary-color);">Langues</h3>';
    
    languages.forEach(lang => {
        const langItem = document.createElement('div');
        langItem.className = 'language-item';
        langItem.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-weight: 600;">${lang.name}</span>
                <span style="color: var(--text-secondary);">${lang.level}</span>
            </div>
            <div class="language-bar">
                <div class="language-progress" style="width: ${lang.proficiency}%"></div>
            </div>
        `;
        languagesDiv.appendChild(langItem);
    });
    
    contactInfo.appendChild(languagesDiv);
}

// Afficher les centres d'intérêt
function displayInterests(interests) {
    const contactInfo = document.getElementById('contact-info');
    if (!contactInfo) return;
    
    const interestsDiv = document.createElement('div');
    interestsDiv.className = 'interests-section';
    interestsDiv.innerHTML = '<h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--primary-color);">Centres d\'intérêt</h3>';
    
    const interestsList = document.createElement('div');
    interestsList.style.display = 'flex';
    interestsList.style.flexWrap = 'wrap';
    interestsList.style.gap = '0.5rem';
    
    interests.forEach(interest => {
        const interestTag = document.createElement('span');
        interestTag.className = 'tech-tag';
        interestTag.textContent = interest;
        interestsList.appendChild(interestTag);
    });
    
    interestsDiv.appendChild(interestsList);
    contactInfo.appendChild(interestsDiv);
}

// Fonctions utilitaires
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                   'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getLevelPercent(level) {
    const levels = {
        'Débutant': 25,
        'Intermédiaire': 50,
        'Avancé': 75,
        'Expert': 100
    };
    return levels[level] || 50;
}

// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navMenu.classList.remove('active');
        }
    });
});

// Animation des barres de compétences au scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        }
    });
}, observerOptions);

// Système de feedback pour les recruteurs
async function initFeedbackSystem() {
    // Charger les compteurs depuis le serveur
    let positiveCount = 0;
    let negativeCount = 0;
    
    try {
        const response = await fetch(`${API_BASE}/feedback/stats`);
        const stats = await response.json();
        positiveCount = stats.positive || 0;
        negativeCount = stats.negative || 0;
    } catch (error) {
        console.error('Erreur lors du chargement des stats:', error);
        // Fallback sur localStorage
        positiveCount = parseInt(localStorage.getItem('feedback-positive') || '0');
        negativeCount = parseInt(localStorage.getItem('feedback-negative') || '0');
    }
    
    const positiveBtn = document.getElementById('feedback-positive');
    const negativeBtn = document.getElementById('feedback-negative');
    const positiveCountEl = document.getElementById('positive-count');
    const negativeCountEl = document.getElementById('negative-count');
    const feedbackMessage = document.getElementById('feedback-message');
    const feedbackForm = document.getElementById('feedback-form');
    const submitBtn = document.getElementById('submit-feedback');
    const cancelBtn = document.getElementById('cancel-feedback');
    const commentTextarea = document.getElementById('feedback-comment');
    
    // Mettre à jour les compteurs
    positiveCountEl.textContent = positiveCount;
    negativeCountEl.textContent = negativeCount;
    
    // Vérifier si l'utilisateur a déjà voté
    const hasVoted = localStorage.getItem('has-voted');
    if (hasVoted) {
        const voteType = localStorage.getItem('vote-type');
        if (voteType === 'positive') {
            positiveBtn.classList.add('active');
            positiveBtn.disabled = true;
        } else {
            negativeBtn.classList.add('active');
            negativeBtn.disabled = true;
        }
    }
    
    // Gestion du clic sur le bouton positif
    positiveBtn.addEventListener('click', () => {
        if (hasVoted) {
            showMessage('Vous avez déjà donné votre avis. Merci !', 'error');
            return;
        }
        
        positiveBtn.classList.add('active');
        negativeBtn.classList.remove('active');
        feedbackForm.style.display = 'block';
        feedbackMessage.style.display = 'none';
    });
    
    // Gestion du clic sur le bouton négatif
    negativeBtn.addEventListener('click', () => {
        if (hasVoted) {
            showMessage('Vous avez déjà donné votre avis. Merci !', 'error');
            return;
        }
        
        negativeBtn.classList.add('active');
        positiveBtn.classList.remove('active');
        feedbackForm.style.display = 'block';
        feedbackMessage.style.display = 'none';
    });
    
    // Soumettre le feedback
    submitBtn.addEventListener('click', async () => {
        const isPositive = positiveBtn.classList.contains('active');
        const comment = commentTextarea.value.trim();
        
        if (!isPositive && !negativeBtn.classList.contains('active')) {
            showMessage('Veuillez sélectionner un avis', 'error');
            return;
        }
        
        const type = isPositive ? 'positive' : 'negative';
        
        try {
            const response = await fetch(`${API_BASE}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type, comment })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Mettre à jour les compteurs
                positiveCount = result.stats.positive;
                negativeCount = result.stats.negative;
                positiveCountEl.textContent = positiveCount;
                negativeCountEl.textContent = negativeCount;
                
                // Marquer comme ayant voté
                localStorage.setItem('has-voted', 'true');
                localStorage.setItem('vote-type', type);
                
                // Désactiver les boutons
                positiveBtn.disabled = true;
                negativeBtn.disabled = true;
                
                // Masquer le formulaire
                feedbackForm.style.display = 'none';
                
                // Afficher le message de remerciement
                const message = isPositive 
                    ? 'Merci pour votre retour positif ! Votre avis m\'aide à m\'améliorer.'
                    : 'Merci pour votre retour constructif ! Je vais prendre en compte vos remarques.';
                showMessage(message, 'success');
                
                // Réinitialiser le formulaire
                commentTextarea.value = '';
            } else {
                showMessage('Une erreur est survenue. Veuillez réessayer.', 'error');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi du feedback:', error);
            showMessage('Erreur de connexion. Votre avis sera sauvegardé localement.', 'error');
            
            // Fallback sur localStorage
            if (isPositive) {
                positiveCount++;
                localStorage.setItem('feedback-positive', positiveCount);
            } else {
                negativeCount++;
                localStorage.setItem('feedback-negative', negativeCount);
            }
            positiveCountEl.textContent = positiveCount;
            negativeCountEl.textContent = negativeCount;
            localStorage.setItem('has-voted', 'true');
            localStorage.setItem('vote-type', type);
            positiveBtn.disabled = true;
            negativeBtn.disabled = true;
            feedbackForm.style.display = 'none';
        }
    });
    
    // Annuler le feedback
    cancelBtn.addEventListener('click', () => {
        positiveBtn.classList.remove('active');
        negativeBtn.classList.remove('active');
        feedbackForm.style.display = 'none';
        commentTextarea.value = '';
    });
    
    function showMessage(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback-message ${type}`;
        feedbackMessage.style.display = 'block';
        
        setTimeout(() => {
            feedbackMessage.style.display = 'none';
        }, 5000);
    }
}

// Notification pour les recruteurs
function initRecruiterNotification() {
    const notification = document.getElementById('recruiter-notification');
    const closeBtn = document.getElementById('close-notification');
    
    if (!notification) return;
    
    // Vérifier si la notification a déjà été fermée
    const notificationClosed = localStorage.getItem('recruiter-notification-closed');
    
    if (!notificationClosed) {
        // Afficher la notification après 3 secondes
        setTimeout(() => {
            notification.classList.add('show');
        }, 3000);
    }
    
    // Fermer la notification
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            localStorage.setItem('recruiter-notification-closed', 'true');
        });
    }
    
    // Fermer automatiquement après 10 secondes
    setTimeout(() => {
        if (notification.classList.contains('show')) {
            notification.classList.remove('show');
            localStorage.setItem('recruiter-notification-closed', 'true');
        }
    }, 13000);
}

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    // Initialiser le thème en premier
    initTheme();
    
    // Initialiser la notification pour les recruteurs
    initRecruiterNotification();
    
    const data = await loadPortfolioData();
    
    if (data) {
        displayPersonalInfo(data);
        displayExperience(data.experience);
        displayProjects(data.projects);
        displaySolutions(data.solutions);
        displayTechnologies(data.technologies);
        displayEducation(data.education);
        
        // Afficher les langues et centres d'intérêt si disponibles
        if (data.languages) {
            displayLanguages(data.languages);
        }
        if (data.interests) {
            displayInterests(data.interests);
        }
        
        // Observer pour les animations
        document.querySelectorAll('.tech-skill').forEach(skill => {
            observer.observe(skill);
        });
        
        // Initialiser le système de feedback
        initFeedbackSystem();
    } else {
        console.error('Impossible de charger les données du portfolio');
    }
});

