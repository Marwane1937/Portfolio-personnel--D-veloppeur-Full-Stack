# Script PowerShell pour pousser sur GitHub
# Remplacez VOTRE-USERNAME par votre nom d'utilisateur GitHub

Write-Host "🔗 Configuration du remote GitHub..." -ForegroundColor Cyan

# Demander le nom d'utilisateur GitHub
$username = Read-Host "Entrez votre nom d'utilisateur GitHub"

if ($username) {
    Write-Host "📤 Ajout du remote GitHub..." -ForegroundColor Yellow
    git remote add origin "https://github.com/$username/portfolio-personnel.git"
    
    Write-Host "✅ Remote ajouté !" -ForegroundColor Green
    Write-Host "📤 Poussage du code sur GitHub..." -ForegroundColor Yellow
    
    git push -u origin main
    
    Write-Host "✅ Code poussé avec succès !" -ForegroundColor Green
    Write-Host "🌐 Votre portfolio est maintenant sur: https://github.com/$username/portfolio-personnel" -ForegroundColor Cyan
} else {
    Write-Host "❌ Nom d'utilisateur requis" -ForegroundColor Red
}

