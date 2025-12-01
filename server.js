const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Import des données du portfolio
const portfolioData = require('./data/portfolio.json');

// Fichier pour stocker les feedbacks
const FEEDBACK_FILE = path.join(__dirname, 'data', 'feedbacks.json');

// Initialiser le fichier de feedbacks s'il n'existe pas
if (!fs.existsSync(FEEDBACK_FILE)) {
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify({ positive: 0, negative: 0, comments: [] }, null, 2));
}

// Fonction pour lire les feedbacks
function readFeedbacks() {
  try {
    const data = fs.readFileSync(FEEDBACK_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { positive: 0, negative: 0, comments: [] };
  }
}

// Fonction pour écrire les feedbacks
function writeFeedbacks(feedbacks) {
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2));
}

// Routes API
app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

app.get('/api/projects', (req, res) => {
  res.json(portfolioData.projects);
});

app.get('/api/technologies', (req, res) => {
  res.json(portfolioData.technologies);
});

app.get('/api/education', (req, res) => {
  res.json(portfolioData.education);
});

app.get('/api/experience', (req, res) => {
  res.json(portfolioData.experience);
});

// Route pour obtenir les statistiques de feedback
app.get('/api/feedback/stats', (req, res) => {
  const feedbacks = readFeedbacks();
  res.json({
    positive: feedbacks.positive || 0,
    negative: feedbacks.negative || 0
  });
});

// Route pour soumettre un feedback
app.post('/api/feedback', (req, res) => {
  const { type, comment } = req.body;
  
  if (!type || !['positive', 'negative'].includes(type)) {
    return res.status(400).json({ error: 'Type de feedback invalide' });
  }
  
  const feedbacks = readFeedbacks();
  
  // Incrémenter le compteur
  if (type === 'positive') {
    feedbacks.positive = (feedbacks.positive || 0) + 1;
  } else {
    feedbacks.negative = (feedbacks.negative || 0) + 1;
  }
  
  // Ajouter le commentaire si fourni
  if (comment && comment.trim()) {
    if (!feedbacks.comments) {
      feedbacks.comments = [];
    }
    feedbacks.comments.push({
      type,
      comment: comment.trim(),
      date: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress
    });
  }
  
  writeFeedbacks(feedbacks);
  
  res.json({
    success: true,
    message: 'Merci pour votre feedback !',
    stats: {
      positive: feedbacks.positive,
      negative: feedbacks.negative
    }
  });
});

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrage du serveur (seulement si exécuté directement, pas pour Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  });
}

// Export pour Vercel et autres plateformes serverless
module.exports = app;

