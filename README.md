# Portfolio Personnel

Un portfolio personnel moderne et responsive développé avec Node.js et Express, présentant vos projets, solutions, technologies maîtrisées, formation et expérience professionnelle.

## 🚀 Fonctionnalités

- **Présentation personnelle** : Section hero avec informations principales
- **Expérience professionnelle** : Timeline interactive de votre parcours
- **Projets** : Grille de projets avec détails et liens
- **Solutions développées** : Présentation de vos solutions et leur impact
- **Technologies** : Compétences organisées par catégories avec niveaux
- **Formation** : Historique de vos études
- **Contact** : Informations de contact
- **Design responsive** : Adapté à tous les écrans
- **API REST** : Endpoints pour accéder aux données du portfolio

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

## 🛠️ Installation

1. Clonez ou téléchargez ce repository

2. Installez les dépendances :
```bash
npm install
```

3. Configurez vos données dans `data/portfolio.json`

4. Démarrez le serveur :
```bash
npm start
```

Pour le développement avec rechargement automatique :
```bash
npm run dev
```

Le portfolio sera accessible sur `http://localhost:3000`

## 📝 Configuration

### Mise à jour des données du portfolio

Éditez le fichier `data/portfolio.json` avec vos informations :

#### Informations personnelles
```json
{
  "personal": {
    "name": "Votre Nom",
    "title": "Votre Titre",
    "email": "votre.email@example.com",
    "phone": "+33 X XX XX XX XX",
    "location": "Ville, Pays",
    "linkedin": "https://www.linkedin.com/in/votre-profil",
    "github": "https://github.com/votre-username",
    "summary": "Votre description professionnelle"
  }
}
```

#### Ajout d'une expérience
```json
{
  "id": 1,
  "title": "Titre du poste",
  "company": "Nom de l'entreprise",
  "location": "Ville, Pays",
  "startDate": "2020-01",
  "endDate": "Présent",
  "description": "Description de vos responsabilités",
  "achievements": ["Réalisation 1", "Réalisation 2"],
  "technologies": ["Node.js", "React"]
}
```

#### Ajout d'un projet
```json
{
  "id": 1,
  "title": "Nom du projet",
  "description": "Description du projet",
  "technologies": ["Node.js", "React"],
  "github": "https://github.com/username/project",
  "demo": "https://demo-url.com",
  "features": ["Fonctionnalité 1", "Fonctionnalité 2"],
  "year": 2023
}
```

## 🔌 API Endpoints

- `GET /api/portfolio` - Récupère toutes les données du portfolio
- `GET /api/projects` - Récupère la liste des projets
- `GET /api/technologies` - Récupère les technologies maîtrisées
- `GET /api/education` - Récupère la formation
- `GET /api/experience` - Récupère l'expérience professionnelle

## 📁 Structure du projet

```
portfolio/
├── data/
│   └── portfolio.json      # Données du portfolio
├── public/
│   ├── index.html          # Page principale
│   ├── styles.css          # Styles CSS
│   └── script.js           # JavaScript client
├── server.js               # Serveur Express
├── package.json            # Dépendances Node.js
└── README.md              # Documentation
```

## 🎨 Personnalisation

### Couleurs

Modifiez les variables CSS dans `public/styles.css` :
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... autres couleurs */
}
```

### Styles

Tous les styles sont dans `public/styles.css`. Vous pouvez personnaliser :
- Les couleurs
- Les polices
- Les espacements
- Les animations

## 📄 Licence

MIT

## 🤝 Contribution

N'hésitez pas à personnaliser ce portfolio selon vos besoins !

## 📧 Support

Pour toute question, contactez-moi via les informations de contact dans votre portfolio.

