/**
 * Created by bykj on 2016/4/29.
 */
var http = require('http');
var fs = require('fs');

module.exports = {
    commitRequest: commitRequest,
    writeToResult: writeToResult,
    writeToResultSync: writeToResultSync
};

function writeToResult(path, result, cb) {
    fs.appendFile(path, result.toString(), "utf-8", function (err) {
        cb(err);
    });
};

function writeToResultSync(path, result, cb) {
    fs.appendFileSync(path, result.toString(), "utf-8");
};

/**
 *
 * @param inputOptions :{ hostname:'www.baidu.com' ,path:'/w', method: 'GET' , port:80 , postData:{},headers:{}}
 * @param callback : 回调
 */
function commitRequest(inputOptions, callback) {
    var port = inputOptions.port || 80;//如果没有端口号，默认80
    var method = inputOptions.method || 'GET';//如果没有指定方法，默认GET
    if (inputOptions.methord == 'POST') {
        var postData = inputOptions.postData || {};//r如果方法是POST,postData=传递进来的数据，默认null
    }
    var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    var inputHeaders = inputOptions.hearders;
    if (inputHeaders) {
        for (var key in inputHeaders) {
            headers[key] = inputHeaders[key];
        }
    }
    /**
     * 对options进行封装
     * @type {{port: (*|number), method: (*|string), headers: {Content-Type: string}}}
     */
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
    //使用http模块发get请求
    var req = http.request(options, (res)=> {
        var receiveData = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            receiveData += chunk;
        });
        res.on('end', () => {
            callback(null, receiveData);
        })
    });
    req.on('err', (e)=> {
        callback(e, null);
    });
    req.end();
} 
