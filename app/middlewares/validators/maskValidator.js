// middlewares/validationMiddleware.js
const { body, validationResult } = require('express-validator');

const validateCreateMask = [
  body('name')
    .notEmpty()
    .withMessage('Le nom du masque est obligatoire')
    .isLength({ max: 255 })
    .withMessage('Le nom du masque ne doit pas dépasser 255 caractères'),
  body('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('La description ne doit pas dépasser 255 caractères'),
  body('fields')
    .optional()
    .isArray()
    .withMessage('Les champs doivent être un tableau'),
  body('fields.*.fieldId')
    .optional()
    .isInt()
    .withMessage('L\'ID du champ doit être un entier'),
  body('fields.*.rules')
    .optional()
    .isArray()
    .withMessage('Les règles doivent être un tableau'),
  body('fields.*.rules.*.ruleId')
    .optional()
    .isInt()
    .withMessage('L\'ID de la règle doit être un entier'),
  body('fields.*.rules.*.order')
    .optional()
    .isInt()
    .withMessage('L\'ordre doit être un entier'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateUpdateMask = [
  body('name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Le nom du masque ne doit pas dépasser 255 caractères'),
  body('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('La description ne doit pas dépasser 255 caractères'),
  body('fields')
    .optional()
    .isArray()
    .withMessage('Les champs doivent être un tableau'),
  body('fields.*.fieldId')
    .optional()
    .isInt()
    .withMessage('L\'ID du champ doit être un entier'),
  body('fields.*.rules')
    .optional()
    .isArray()
    .withMessage('Les règles doivent être un tableau'),
  body('fields.*.rules.*.ruleId')
    .optional()
    .isInt()
    .withMessage('L\'ID de la règle doit être un entier'),
  body('fields.*.rules.*.order')
    .optional()
    .isInt()
    .withMessage('L\'ordre doit être un entier'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateCreateMask, validateUpdateMask };