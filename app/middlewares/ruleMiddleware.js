// app/middlewares/ruleMiddleware.js
const { Rule } = require('../models');
const createError = require('./error');

const getRule = async (req, res, next) => {
  try {
    const ruleId = req.params.id;
    const rule = await Rule.findByPk(ruleId);

    if (!rule) {
      return next(createError(404, 'Rule not found'));
    }

    req.rule = rule;
    next();
  } catch (error) {
    return next(createError(500, 'Failed to retrieve rule', error));
  }
};

module.exports = { getRule };