/**
 * Simule l'envoi d'un email (pour le développement)
 * Dans un environnement de production, vous utiliseriez un service d'email comme Nodemailer
 * @param {Object} options - Options de l'email
 * @param {string} options.to - Destinataire
 * @param {string} options.subject - Sujet
 * @param {string} options.text - Contenu texte (optionnel)
 * @param {string} options.html - Contenu HTML (optionnel)
 * @returns {Promise} - Promesse résolue avec les informations d'envoi
 */
export const sendEmail = async (options) => {
    console.log('Simulation d\'envoi d\'email:');
    console.log('À:', options.to);
    console.log('Sujet:', options.subject);
    console.log('Contenu HTML:', options.html || 'Non fourni');
    console.log('Contenu texte:', options.text || 'Non fourni');
    
    return {
      success: true,
      messageId: `simulated-${Date.now()}`
    };
  };