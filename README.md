#Guardjs
It is a liblary, which implement guard for javascript. It allows to add any condition and use it in one line in a different way.

##Using
To use this library, you just need to require it by requirejs:

```javascript
var guard = require('guardjs');
```

or using ES6 imports:

```javascript
import guard from 'guardjs';
```

After that you may do any checks with predefined conditions:

```javascript
var str = "Example string";

var result = guard.is.string.and.not.empty(str);
```

Also you can throw errors when condition is incorrect:

```javascript
var str = "";

guard.throwIf.string.and.not.empty(str, "Invalid arguments", Exception);
```

##Way to extend
You can fork this repository or change code in download package. 
To add new conditions, you just need to add it to *guardIs.js* or *guardThrowIf.js* like in example:

```javascript
class GuardIs {
    get undefined() {
        return createCheck(this, item => {
            return item === undefined;
        });
    }
    ...
    get myCustomCheck() {
        return createCheck(this, item => {
            return _.isNumber(item) && item === 2;
        });
    }
}
```
And just use it:

```javascript
var a = 2;
var b = "";

if(guard.is.myCustomCheck(a)) {
    //should executed
}

if(guard.is.myCustomCheck(a) && guard.is.myCustomCheck(b)) {
    //should not executed
}
```