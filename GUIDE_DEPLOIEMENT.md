# Guide de Déploiement - Portfolio Personnel

Ce guide vous présente les meilleures options gratuites pour héberger votre portfolio Node.js et le rendre accessible à tous les recruteurs du monde.

## 🚀 Options d'hébergement gratuites recommandées

### 1. **Vercel** (⭐ RECOMMANDÉ - Le plus simple)

**Avantages :**
- ✅ Gratuit et illimité pour les projets personnels
- ✅ Déploiement automatique depuis GitHub
- ✅ Excellent support Node.js/Express
- ✅ CDN global (rapide partout dans le monde)
- ✅ HTTPS automatique
- ✅ Domaine personnalisé gratuit
- ✅ Très facile à configurer

**Étapes de déploiement :**

1. **Préparer le projet pour Vercel :**
   - Créer un fichier `vercel.json` à la racine du projet
   - Modifier légèrement `server.js` si nécessaire

2. **Créer un compte GitHub** (si vous n'en avez pas)
   - Allez sur https://github.com
   - Créez un nouveau repository
   - Poussez votre code

3. **Déployer sur Vercel :**
   - Allez sur https://vercel.com
   - Connectez votre compte GitHub
   - Importez votre repository
   - Vercel détecte automatiquement Node.js
   - Cliquez sur "Deploy"
   - Votre portfolio sera en ligne en 2 minutes !

**URL obtenue :** `votre-nom-portfolio.vercel.app`

---

### 2. **Render** (⭐ Alternative excellente)

**Avantages :**
- ✅ Gratuit avec limitations raisonnables
- ✅ Support complet Node.js/Express
- ✅ Déploiement automatique depuis GitHub
- ✅ HTTPS automatique
- ✅ Domaine personnalisé gratuit
- ✅ Pas de carte de crédit requise

**Étapes de déploiement :**

1. Allez sur https://render.com
2. Créez un compte (gratuit)
3. Cliquez sur "New +" → "Web Service"
4. Connectez votre repository GitHub
5. Configurez :
   - **Name:** portfolio-personnel
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Cliquez sur "Create Web Service"
7. Votre portfolio sera en ligne !

**URL obtenue :** `votre-nom-portfolio.onrender.com`

---

### 3. **Railway** (⭐ Moderne et performant)

**Avantages :**
- ✅ 500 heures gratuites par mois
- ✅ Déploiement très rapide
- ✅ Support Node.js natif
- ✅ Interface moderne
- ✅ Déploiement automatique

**Étapes de déploiement :**

1. Allez sur https://railway.app
2. Créez un compte avec GitHub
3. Cliquez sur "New Project"
4. Sélectionnez "Deploy from GitHub repo"
5. Choisissez votre repository
6. Railway détecte automatiquement Node.js
7. Votre portfolio est en ligne !

**URL obtenue :** `votre-nom-portfolio.up.railway.app`

---

### 4. **Netlify** (Avec fonctions serverless)

**Avantages :**
- ✅ Gratuit et généreux
- ✅ CDN global
- ✅ Fonctions serverless pour l'API
- ✅ Déploiement automatique

**Note:** Nécessite de convertir l'API Express en fonctions Netlify (un peu plus complexe)

---

## 📝 Préparation du projet pour le déploiement

### Étape 1 : Créer un fichier `.gitignore`

Assurez-vous que votre `.gitignore` contient :
```
node_modules/
.env
.DS_Store
*.log
npm-debug.log*
data/feedbacks.json
```

### Étape 2 : Créer un fichier `vercel.json` (pour Vercel)

Créez ce fichier à la racine de votre projet :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### Étape 3 : Modifier `server.js` pour Vercel

Modifiez la fin de votre `server.js` :

```javascript
// Démarrage du serveur
const PORT = process.env.PORT || 3000;

// Pour Vercel
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  });
}

// Export pour Vercel
module.exports = app;
```

### Étape 4 : Créer un fichier `render.yaml` (pour Render)

Créez ce fichier à la racine :

```yaml
services:
  - type: web
    name: portfolio-personnel
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
```

### Étape 5 : Créer un fichier `railway.json` (pour Railway)

Créez ce fichier à la racine :

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 🔧 Configuration des variables d'environnement

### Pour tous les hébergeurs :

Créez un fichier `.env.example` :
```
PORT=3000
NODE_ENV=production
```

Dans le panneau de configuration de votre hébergeur, ajoutez :
- `NODE_ENV=production`
- `PORT` (généralement défini automatiquement)

---

## 📦 Préparer le repository GitHub

### Commandes Git :

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Portfolio personnel"

# Créer un repository sur GitHub, puis :
git remote add origin https://github.com/VOTRE-USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

---

## 🌐 Ajouter un domaine personnalisé (Optionnel)

### Avec Vercel :
1. Allez dans les paramètres du projet
2. Section "Domains"
3. Ajoutez votre domaine
4. Suivez les instructions DNS

### Avec Render :
1. Allez dans les paramètres du service
2. Section "Custom Domains"
3. Ajoutez votre domaine
4. Configurez les DNS

---

## ✅ Checklist avant déploiement

- [ ] Tous les fichiers sont dans Git
- [ ] Le fichier `.gitignore` est configuré
- [ ] Le fichier `package.json` contient le script `start`
- [ ] Le port utilise `process.env.PORT`
- [ ] Les données sensibles ne sont pas dans le code
- [ ] Le portfolio fonctionne en local (`npm start`)

---

## 🎯 Recommandation finale

**Pour votre cas, je recommande VERCEL** car :
1. ✅ Le plus simple à configurer
2. ✅ Excellent pour Node.js/Express
3. ✅ Gratuit et illimité
4. ✅ Performance excellente
5. ✅ Déploiement en 2 minutes

---

## 📞 Support

Si vous rencontrez des problèmes lors du déploiement, consultez :
- Documentation Vercel : https://vercel.com/docs
- Documentation Render : https://render.com/docs
- Documentation Railway : https://docs.railway.app

---

## 🚀 Prochaines étapes

1. Choisissez votre hébergeur (Vercel recommandé)
2. Suivez les étapes ci-dessus
3. Partagez votre lien avec les recruteurs !
4. Ajoutez le lien dans votre CV et LinkedIn

**Votre portfolio sera accessible 24/7 partout dans le monde ! 🌍**

