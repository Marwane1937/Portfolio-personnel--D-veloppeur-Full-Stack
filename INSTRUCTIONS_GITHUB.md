# 📤 Instructions pour pousser sur GitHub

## ✅ État actuel
- ✅ Repository Git initialisé
- ✅ Tous les fichiers ajoutés
- ✅ Commit créé avec succès

## 🚀 Prochaines étapes

### 1. Créer le repository sur GitHub

1. Allez sur **https://github.com**
2. Connectez-vous à votre compte
3. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
4. Remplissez :
   - **Repository name:** `portfolio-personnel`
   - **Description:** `Portfolio personnel - Développeur Full Stack`
   - **Visibility:** Public (ou Private selon votre choix)
   - ⚠️ **NE COCHEZ PAS** "Add a README file" (on a déjà les fichiers)
   - ⚠️ **NE COCHEZ PAS** "Add .gitignore" (on a déjà un .gitignore)
5. Cliquez sur **"Create repository"**

### 2. Connecter votre repository local à GitHub

Une fois le repository créé sur GitHub, vous verrez des instructions. Utilisez ces commandes :

```bash
# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE-USERNAME/portfolio-personnel.git

# Renommer la branche en main (si nécessaire)
git branch -M main

# Pousser le code sur GitHub
git push -u origin main
```

**Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub !**

### 3. Vérification

Après avoir poussé, allez sur votre repository GitHub :
`https://github.com/VOTRE-USERNAME/portfolio-personnel`

Vous devriez voir tous vos fichiers ! 🎉

---

## 🔐 Si GitHub vous demande un mot de passe

Si vous utilisez HTTPS et que GitHub demande un mot de passe :
- Utilisez un **Personal Access Token** au lieu du mot de passe
- Créez-en un ici : https://github.com/settings/tokens
- Sélectionnez les permissions : `repo` (toutes)
- Copiez le token et utilisez-le comme mot de passe

**OU** utilisez SSH (plus sécurisé) :
```bash
git remote set-url origin git@github.com:VOTRE-USERNAME/portfolio-personnel.git
```

---

## ✅ Une fois sur GitHub, vous pourrez déployer sur Vercel !

Après avoir poussé sur GitHub, suivez le guide `DEPLOY.md` pour déployer sur Vercel en 2 minutes.

