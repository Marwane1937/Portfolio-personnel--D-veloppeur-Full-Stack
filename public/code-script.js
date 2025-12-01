// Fonction pour copier le code
function copyCode() {
    const codeElement = document.querySelector('.code-content code');
    const text = codeElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copié!';
        btn.style.background = '#27c93f';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
        alert('Erreur lors de la copie. Veuillez sélectionner le texte manuellement.');
    });
}

// Fonction pour télécharger le code
function downloadCode() {
    const codeElement = document.querySelector('.code-content code');
    const text = codeElement.textContent;
    const blob = new Blob([text], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'marouane-nikh.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Téléchargé!';
    btn.style.background = '#27c93f';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

// Gestion du thème pour la page code
function initThemeCode() {
    const themeToggle = document.getElementById('theme-toggle-code');
    const themeIcon = document.getElementById('theme-icon-code');
    const html = document.documentElement;
    
    // Récupérer le thème sauvegardé ou utiliser le thème par défaut (dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Mettre à jour l'icône
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    }
    
    // Gérer le clic sur le bouton
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (themeIcon) {
                themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
            }
            
            // Animation du bouton
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }
}

// Animation au chargement
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le thème
    initThemeCode();
    
    const code = document.querySelector('.code-content code');
    if (code) {
        code.style.opacity = '0';
        setTimeout(() => {
            code.style.transition = 'opacity 0.5s ease';
            code.style.opacity = '1';
        }, 100);
    }
});

