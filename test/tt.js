/**
 * Created by bykj on 2016/4/28.
 */

var http = require('http');

module.exports = {
    commitRequest: commitRequest,
    getName: getName
};

// exports.commitRequest = commitRequest;
// exports.getName = getName;

/**
 *
 * @param options : { hostname:'www.baidu.com' ,path:'/w', method: 'GET' | 'POST'  , port:80 , postData:{},headers:{}}
 * @param cb
 */
function commitRequest(inputOptions, cb) {
    var port = inputOptions.port || 80;
    var method = inputOptions.method || 'GET';
    if (method == 'POST') {
        var postData = inputOptions.postData || {};
    }
    // if(!inputOptions.hostname){
    //     return cb('url not defined！')
    // }
    var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    var inputHeaders = inputOptions.headers;
    if (inputHeaders) {
        for (var key in inputHeaders) {
            headers[key] = inputHeaders[key];
        }
    }

    var options = {
        port: port,
        method: method,
        headers: headers
    };

    if (inputOptions.host) {
        options.host = inputOptions.host;
    } else {
        options.hostname = inputOptions.hostname;
        options.path = inputOptions.path;
    }

    var req = http.request(options, (res) => {
        // console.log(`STATUS: ${res.statusCode}`);
        // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        var receiveData = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            receiveData += chunk;
        });
        res.on('end', () => {
            cb(null, receiveData);
        })
    });
    req.on('error', (e) => {
        cb(e, null);
    });
    req.end();

}

function getName() {
    console.log('rrrrr');
    return "ooo";
}

//
// var options = {
//     hostname: 'www.baidu.com',
//     port: 80,
//     path: '/s?wd=nba',
//     method: 'GET',
//     // headers: {
//     //     'Content-Type': 'application/x-www-form-urlencoded',
//     //     'Content-Length': postData.length
//     // }
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//     }
// };

