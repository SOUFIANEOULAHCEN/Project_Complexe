/**
 * Gère les erreurs et envoie une réponse appropriée
 * @param {Object} res - Objet de réponse Express
 * @param {Error} error - Erreur à traiter
 */
export const handleError = (res, error) => {
    console.error('Error:', error);
    
    // Déterminer le code d'erreur approprié
    let statusCode = 500;
    let message = 'Une erreur est survenue';
    
    if (error.name === 'ValidationError') {
      statusCode = 400;
      message = error.message;
    } else if (error.code === 'ER_DUP_ENTRY') {
      statusCode = 409;
      message = 'Cette entrée existe déjà';
    } else if (error.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = 'Token invalide';
    } else if (error.name === 'TokenExpiredError') {
      statusCode = 401;
      message = 'Token expiré';
    }
    
    // Envoyer la réponse
    res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  };