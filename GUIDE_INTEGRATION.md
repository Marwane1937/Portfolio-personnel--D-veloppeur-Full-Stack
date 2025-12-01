# Guide d'intégration des données CV et LinkedIn

Ce guide vous aidera à remplir le fichier `data/portfolio.json` avec les informations de votre CV et de votre profil LinkedIn.

## 📋 Étapes d'intégration

### 1. Informations personnelles

Récupérez depuis votre CV ou LinkedIn :
- **Nom complet**
- **Titre professionnel** (ex: "Développeur Full Stack", "Ingénieur Logiciel")
- **Email**
- **Téléphone**
- **Localisation** (Ville, Pays)
- **URL LinkedIn** (ex: https://www.linkedin.com/in/votre-profil)
- **URL GitHub** (si applicable)
- **Résumé professionnel** (2-3 phrases décrivant votre profil)

### 2. Expérience professionnelle

Pour chaque poste occupé, collectez :
- **Titre du poste**
- **Nom de l'entreprise**
- **Localisation**
- **Date de début** (format: YYYY-MM, ex: "2020-01")
- **Date de fin** ("Présent" si vous y travaillez encore)
- **Description** (responsabilités principales)
- **Réalisations** (liste de 3-5 points clés)
- **Technologies utilisées** (liste des technologies/outils)

**Exemple :**
```json
{
  "id": 1,
  "title": "Développeur Full Stack",
  "company": "TechCorp",
  "location": "Paris, France",
  "startDate": "2021-03",
  "endDate": "Présent",
  "description": "Développement d'applications web full stack...",
  "achievements": [
    "Augmentation de 40% des performances",
    "Mise en place d'une architecture microservices"
  ],
  "technologies": ["Node.js", "React", "PostgreSQL"]
}
```

### 3. Formation

Pour chaque diplôme/formation :
- **Diplôme** (ex: "Master en Informatique", "Licence en Génie Logiciel")
- **Établissement**
- **Localisation**
- **Année de début**
- **Année de fin**
- **Description** (spécialisations, mentions, etc.)

**Exemple :**
```json
{
  "id": 1,
  "degree": "Master en Informatique",
  "institution": "Université de Paris",
  "location": "Paris, France",
  "startDate": "2018",
  "endDate": "2020",
  "description": "Spécialisation en développement web et intelligence artificielle"
}
```

### 4. Technologies maîtrisées

Organisez vos compétences par catégories :
- **Backend** (Node.js, Python, Java, etc.)
- **Frontend** (React, Vue.js, Angular, etc.)
- **Base de données** (MongoDB, PostgreSQL, MySQL, etc.)
- **Outils** (Docker, Git, AWS, etc.)
- **Autres** (selon vos compétences)

Pour chaque technologie, indiquez :
- **Nom**
- **Niveau** : "Débutant", "Intermédiaire", "Avancé", ou "Expert"
- **Années d'expérience**

**Exemple :**
```json
{
  "category": "Backend",
  "skills": [
    {
      "name": "Node.js",
      "level": "Expert",
      "years": 5
    }
  ]
}
```

### 5. Projets

Pour chaque projet :
- **Titre**
- **Description** (2-3 phrases)
- **Technologies utilisées**
- **URL GitHub** (si disponible)
- **URL de démo** (si disponible)
- **Fonctionnalités principales** (liste de 3-5 points)
- **Année de réalisation**

**Exemple :**
```json
{
  "id": 1,
  "title": "Application E-commerce",
  "description": "Plateforme e-commerce complète avec gestion de panier...",
  "technologies": ["Node.js", "React", "MongoDB", "Stripe"],
  "github": "https://github.com/username/project",
  "demo": "https://demo.example.com",
  "features": [
    "Gestion de panier",
    "Paiement en ligne",
    "Tableau de bord admin"
  ],
  "year": 2023
}
```

### 6. Solutions développées

Décrivez les solutions que vous avez créées :
- **Titre**
- **Description** (problème résolu)
- **Catégorie** (ex: "Web Application", "API", "Outillage")
- **Technologies**
- **Impact** (résultats obtenus)

**Exemple :**
```json
{
  "id": 1,
  "title": "Système de gestion de tickets",
  "description": "Solution pour automatiser le traitement des demandes clients...",
  "category": "Web Application",
  "technologies": ["Node.js", "Express", "PostgreSQL"],
  "impact": "Réduction de 60% du temps de traitement des tickets"
}
```

## 🔄 Calcul automatique

Le portfolio calcule automatiquement :
- **Années d'expérience** : Basé sur vos dates d'emploi
- **Nombre de projets** : Compte vos projets
- **Nombre de technologies** : Compte vos compétences

## 💡 Conseils

1. **Soyez précis** : Utilisez des dates exactes (format YYYY-MM)
2. **Mettez en valeur** : Privilégiez vos réalisations les plus importantes
3. **Restez à jour** : Mettez régulièrement à jour vos informations
4. **Quantifiez** : Ajoutez des chiffres dans vos réalisations (ex: "Augmentation de 30%")
5. **Technologies pertinentes** : Listez les technologies que vous maîtrisez vraiment

## 📝 Vérification

Avant de lancer le portfolio, vérifiez que :
- ✅ Toutes les dates sont au bon format
- ✅ Les URLs sont valides (LinkedIn, GitHub, etc.)
- ✅ Le JSON est valide (pas d'erreurs de syntaxe)
- ✅ Les images de projets existent (si vous en utilisez)

## 🚀 Après l'intégration

1. Vérifiez le fichier JSON avec un validateur JSON
2. Lancez le serveur : `npm start`
3. Visitez `http://localhost:3000`
4. Vérifiez que toutes les sections s'affichent correctement

## 🆘 Besoin d'aide ?

Si vous avez des questions ou rencontrez des problèmes :
1. Vérifiez la syntaxe JSON
2. Consultez les exemples dans `data/portfolio.json`
3. Vérifiez la console du navigateur pour les erreurs

