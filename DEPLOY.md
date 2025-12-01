# 🚀 Guide de Déploiement Rapide

## Option 1 : Vercel (⭐ RECOMMANDÉ - 2 minutes)

### Étapes :

1. **Créer un compte GitHub** (si nécessaire)
   - https://github.com
   - Créer un nouveau repository
   - Pousser votre code

2. **Déployer sur Vercel**
   - Allez sur https://vercel.com
   - Cliquez sur "Sign Up" → Connectez avec GitHub
   - Cliquez sur "Add New..." → "Project"
   - Importez votre repository
   - Vercel détecte automatiquement Node.js
   - Cliquez sur "Deploy"
   - ✅ Votre portfolio est en ligne !

**URL :** `votre-nom.vercel.app`

---

## Option 2 : Render (Alternative simple)

### Étapes :

1. Allez sur https://render.com
2. Créez un compte (gratuit)
3. "New +" → "Web Service"
4. Connectez GitHub → Sélectionnez votre repo
5. Configurez :
   - **Name:** portfolio
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. "Create Web Service"
7. ✅ Votre portfolio est en ligne !

**URL :** `votre-nom.onrender.com`

---

## Option 3 : Railway (Moderne)

### Étapes :

1. Allez sur https://railway.app
2. "Login" → Connectez avec GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Sélectionnez votre repository
5. ✅ Déploiement automatique !

**URL :** `votre-nom.up.railway.app`

---

## 📝 Avant de déployer

```bash
# 1. Vérifier que tout fonctionne localement
npm start

# 2. Initialiser Git (si pas déjà fait)
git init
git add .
git commit -m "Ready for deployment"

# 3. Créer un repository sur GitHub
# 4. Pousser le code
git remote add origin https://github.com/VOTRE-USERNAME/portfolio.git
git push -u origin main
```

---

## ✅ Votre portfolio sera accessible partout dans le monde ! 🌍

Une fois déployé, partagez le lien dans :
- Votre CV
- Votre profil LinkedIn
- Vos emails de candidature
- Vos réseaux sociaux professionnels

