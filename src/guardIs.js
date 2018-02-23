class GuardIs {
    get undefined() {
        return createCheck(this, item => {
            return item === undefined;
        });
    }
    get null() {
        return createCheck(this, item => {
            return item === null;
        });
    }
    get empty() {
        return createCheck(this, item => {
            return item !== null && item !== undefined && item.hasOwnProperty('length') && item.length === 0;
        });
    }        
    get string() {
        return createCheck(this, item => {
            return typeof item === 'string';
        });
    }
    get boolean() {
        let that = this;

        return createCheck(that, item => {
            return _.isBoolean(item);
        });
    }
    get not() {
        this._not = true;

        return this;
    }
}

module.exports = new GuardIs();

function createCheck(that, funcExpr) {
    let func = createFunc(that, funcExpr);
    
    Object.defineProperty(func, 'or', { get: function () {                
        createSalt(that, func, 'or');

        return that;
    }});

    Object.defineProperty(func, 'and', { get: function () {
        createSalt(that, func, 'and');

        return that;
    }});

    return func;
}

function createFunc(that, expression) {
    return function(item) {
        let res = expression(item);        

        if(that._not) {
            res = !res;

            that._not = false;
        }
        
        if(that._salt) {
            let type = that._salt.type;
            let check = that._salt.check;

            that._salt = null;

            switch(type) {
                case 'or':
                    res = check(item) || res;
                    break;
                case 'and':
                    res = check(item) && res;
                    break;
            }
        }

        return res;
    };
}

function createSalt(obj, func, type) {
    var salt;
    
    if(obj._salt) {
        salt = {
            type: obj._salt.type,
            check: obj._salt.check
        };

        obj._salt = {
            type: type,
            check: (item) => {
                let res = func(item);

                switch(salt.type) {
                    case 'or':
                        res = res || salt.check(item);
                    break;
                    case 'and':
                        res = res && salt.check(item);
                    break;
                }

                if(obj._not) {
                    res = !res;

                    obj._not = false;
                }

                return res;
            }
        }
    } else {
        obj._salt = {
            type: type,
            check: (item) => {
                if(obj._not) {
                    obj._not = false;

                    return !func(item);
                } else {
                    return func(item);
                }
            }
        }
    }
}