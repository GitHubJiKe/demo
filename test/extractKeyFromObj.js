/**
 * Created by bykj on 2016/5/9.
 */

var address = require('../public/react-src/component/Address');

// console.log(Object.keys(address));

for(var key in address){
    console.log(key);
    var value = address[key];
    for(var key2 in value){
        console.log(value[key2]);
    }
}