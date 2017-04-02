var mongoose = require('mongoose');
var categorySchema = require('../schemas/category');

module.exports = categorySchema.modle('category',categorySchema);