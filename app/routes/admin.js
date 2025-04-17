const express = require('express');
const router = express.Router();

const myHomeController = require('../controllers/admin');
const EntityController = require('../controllers/admin/EntityController');

const FieldController = require('../controllers/admin/FieldController');
const MaskController = require('../controllers/admin/MaskController');
const RuleController = require('../controllers/admin/RuleController');


const { getField } = require('../middlewares/fieldMiddleware');
const { getMask } = require('../middlewares/maskMiddleware');
const { getRule } = require('../middlewares/ruleMiddleware');

const { validateCreateField, validateUpdateField } = require('../middlewares/validators/fieldValidator'); // Import des middlewares de validation
const { validateCreateRule, validateUpdateRule } = require('../middlewares/validators/ruleValidator'); // Import des middlewares de validation
const { validateCreateMask, validateUpdateMask } = require('../middlewares/validators/maskValidator'); // Import des middlewares de validation


//DASHBOARD
router.get('/',myHomeController.dashboard)
router.get('/dashboard',myHomeController.dashboard)

// Fields
router.get('/fields', FieldController.index);
router.get('/fields/create', FieldController.create);
router.post('/fields', validateCreateField, FieldController.store); // Create  <----- CORRECTION : POST
router.get('/fields/:id', getField, FieldController.show);
router.get('/fields/:id/edit', getField, FieldController.edit);
router.put('/fields/:id', [getField,validateUpdateField], FieldController.update); // Update   <----- CORRECTION : PUT
router.delete('/fields/:id', FieldController._delete); // Delete

// Masks
router.get('/masks', MaskController.index);
router.get('/masks/create', MaskController.create);
router.post('/masks', validateCreateMask, MaskController.store); // Ajout du middleware de validation pour la création
router.get('/masks/:id', getMask, MaskController.show);
router.get('/masks/:id/edit', getMask, MaskController.edit);
router.put('/masks/:id', validateUpdateMask, MaskController.update); // Ajout du middleware de validation pour la mise à jour
router.delete('/masks/:id', MaskController._delete);

// Rules
router.get('/rules', RuleController.index);
router.get('/rules/create', RuleController.create);
router.post('/rules', validateCreateRule, RuleController.store); // Ajout du middleware de validation
router.get('/rules/:id', getRule, RuleController.show);
router.get('/rules/:id/edit', getRule, RuleController.edit);
router.put('/rules/:id', validateUpdateRule, RuleController.update); // Ajout du middleware de validation
router.delete('/rules/:id', RuleController._delete);

module.exports = router;