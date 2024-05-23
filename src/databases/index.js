var duckdb = require('duckdb');
var main = new duckdb.Database(':memory:');

module.exports = {
    main
}