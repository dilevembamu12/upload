// app/middlewares/validators/fieldValidator.js
const { body, validationResult } = require('express-validator');

// Validation pour la création d'un champ
const validateCreateField = [
  body('name')
    .notEmpty()
    .withMessage('Le nom du champ est obligatoire.')
    .isLength({ max: 255 })
    .withMessage('Le nom du champ ne doit pas dépasser 255 caractères.'),
  body('type')
    .notEmpty()
    .withMessage('Le type du champ est obligatoire.')
    .isIn(['string', 'number', 'select', 'ratio', 'boolean', 'textarea', 'date', 'email','group'])
    .withMessage('Le type de champ est invalide.'),
  body('label')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Le libellé du champ ne doit pas dépasser 255 caractères.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if(req.body.type=="string"){
        req.body.type="text"
    }
    next();
  }
];

// Validation pour la mise à jour d'un champ (peut être identique à la création ou différent)
const validateUpdateField = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Le nom du champ est obligatoire.')
    .isLength({ max: 255 })
    .withMessage('Le nom du champ ne doit pas dépasser 255 caractères.'),
  body('type')
    .optional()
    .notEmpty()
    .withMessage('Le type du champ est obligatoire.')
    .isIn(['string', 'number', 'select', 'ratio', 'boolean', 'textarea', 'date', 'email'])
    .withMessage('Le type de champ est invalide.'),
  body('label')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Le libellé du champ ne doit pas dépasser 255 caractères.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if(req.body.type=="string"){
        req.body.type="text"
    }
    
    next();
  }
];

module.exports = { validateCreateField, validateUpdateField };