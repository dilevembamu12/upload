// app/middlewares/validators/ruleValidator.js
const { body, validationResult } = require('express-validator');

const validateCreateRule = [
  body('name')
    .notEmpty()
    .withMessage('Le nom est obligatoire')
    .isLength({ max: 255 })
    .withMessage('Le nom ne doit pas dépasser 255 caractères'),
  body('type')
    .notEmpty()
    .withMessage('Le type est obligatoire')
    .isIn(['required', 'minLength', 'maxLength', 'regex', 'email', 'date', 'number', 'integer', 'boolean', 'iban', 'bic', 'equalsTo', 'differentTo', 'contains', 'notContains', 'inList', 'notInList', 'KYCChecker', 'TransactionConformity', 'DuplicateDetection', 'custom'])
    .withMessage('Type invalide'),
  body('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('La description ne doit pas dépasser 255 caractères'),
  body('parameters')
    .optional()
    .isJSON()
    .withMessage('Les paramètres doivent être au format JSON'),
  body('message')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Le message ne doit pas dépasser 255 caractères'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active doit être un booléen'),
    body('options')
    .optional()
    .isJSON()
    .withMessage('Les options doivent être au format JSON'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateUpdateRule = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Le nom est obligatoire')
    .isLength({ max: 255 })
    .withMessage('Le nom ne doit pas dépasser 255 caractères'),
  body('type')
    .optional()
    .notEmpty()
    .withMessage('Le type est obligatoire')
    .isIn(['required', 'minLength', 'maxLength', 'regex', 'email', 'date', 'number', 'integer', 'boolean', 'iban', 'bic', 'equalsTo', 'differentTo', 'contains', 'notContains', 'inList', 'notInList', 'KYCChecker', 'TransactionConformity', 'DuplicateDetection', 'custom'])
    .withMessage('Type invalide'),
  body('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('La description ne doit pas dépasser 255 caractères'),
  body('parameters')
    .optional()
    .isJSON()
    .withMessage('Les paramètres doivent être au format JSON'),
  body('message')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Le message ne doit pas dépasser 255 caractères'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active doit être un booléen'),
    body('options')
    .optional()
    .isJSON()
    .withMessage('Les options doivent être au format JSON'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateCreateRule, validateUpdateRule };