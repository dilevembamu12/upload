// app/middlewares/fieldMiddleware.js
const { Field } = require('../models');
const createError = require('./error');

const getField = async (req, res, next) => {
  try {
    const fieldId = req.params.id; // Récupérer l'ID depuis les paramètres de la requête
    
    const field = await Field.findByPk(fieldId);

    //console.log("fieldId",field);

    if (!field) {
      return next(createError(404, 'Field not found'));
    }

    req.field = field; // Ajouter le field à l'objet requête pour l'utiliser dans le controller
    next(); // Passer au prochain middleware ou au controller
  } catch (error) {
    return next(createError(500, 'Failed to retrieve field', error));
  }
};

module.exports = { getField };