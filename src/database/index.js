const configKnex = require('../../knexfile.js')

const knex = require('knex')(configKnex['development'])

module.exports = knex
