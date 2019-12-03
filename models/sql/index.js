const {QueryFile} = require('pg-promise'),
    path = require('path');

module.exports = {
    init: sql('init.sql')
}

function sql(file) {
    const fullPath = path.join(__dirname, file);
    const options = {
        minify: true
    };

    const qf = new QueryFile(fullPath, options);

    if (qf.error) {
        console.error(qf.error);
    }
    return qf;
}