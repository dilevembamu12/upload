// app/middlewares/maskMiddleware.js
const { Mask } = require('../models');
const createError = require('./error');

const getMask = async (req, res, next) => {
  try {
    const maskId = req.params.id;
    if (!maskId) {
      return next(createError(400, 'Mask ID is required'));
    }

    const mask = await Mask.findByPk(maskId);

    if (!mask) {
      return next(createError(404, 'Mask not found'));
    }

    req.mask = mask;
    next();
  } catch (error) {
    console.error("Error in getMask middleware:", error); // Ajout d'un log d'erreur
    return next(createError(500, 'Failed to retrieve mask', error));
  }
};

module.exports = { getMask };