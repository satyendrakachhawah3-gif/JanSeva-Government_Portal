/**
 * Embedding Service for RAG Architecture
 * Provides vector representations and cosine similarity utilities for scheme retrieval.
 */

// Simple term frequency vector computation for local fast RAG indexing fallback
function computeTermVector(text) {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
  const freq = {};
  for (const w of words) {
    if (w.length > 2) {
      freq[w] = (freq[w] || 0) + 1;
    }
  }
  return freq;
}

function calculateCosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const term in vecA) {
    normA += vecA[term] * vecA[term];
    if (vecB[term]) {
      dotProduct += vecA[term] * vecB[term];
    }
  }

  for (const term in vecB) {
    normB += vecB[term] * vecB[term];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

const generateEmbedding = async (text) => {
  // If external API key present, can fetch real embeddings, else return term vector representation
  if (process.env.EMBEDDING_API_KEY) {
    // API integration point for OpenAI/Gemini Embeddings
    try {
      // Placeholder for production embedding API call
    } catch (err) {
      console.warn('[EmbeddingService] Falling back to local vector representation.');
    }
  }
  return computeTermVector(text);
};

module.exports = {
  generateEmbedding,
  computeTermVector,
  calculateCosineSimilarity
};
