let guardIs = require('./guardIs.js');
let guardThrowIf = require('./guardThrowIf.js');

class Guard {
    get throwIf() {
        return guardThrowIf;
    }
    get is() {
        return guardIs;
    }
}

module.exports = new Guard();