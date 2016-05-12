/**
 * Created by bykj on 2016/4/28.
 */

var path = require('path');
var fs = require('fs');
var async = require('async');
var http = require('http');
var url = require('url');


var address1 = "www.baidu.com";//第一个地址
var address2 = "www.51job.com";//第二个地址
var address3 = "www.hubwiz.com";//第三个地址
var Resultpath = "D:/project/node/demo/test/new_name";//保存路径

var addresses = new Array();
addresses.push(address1);
addresses.push(address2);
addresses.push(address3);
var log = function (tag, content) {
    console.log(tag, content);
};
log("addresses.length = " + addresses.length);
var options = new Array();
//for循环构建三个url请求的配置
for (var i = 0; i < addresses.length; i++) {
    var option = {
        hostname: addresses[i],
        port: 80,
        method: 'GET',
    };
    options.push(option);
}
log("options.length = " + options.length);
//写文件的方法
var writeToresult = function (path, chunk) {
    fs.appendFile(path, chunk.toString(), "utf-8", function (err) {
        if (err != null) {
            log(err.toString(), "error");
        }
    });
};
function readFromFile(path) {
    fs.readFile(path, "utf-8", function (err, data) {
        return data;
    });
}
function foo() {
    return "AAAAAAA";
}

function getNum(num) {
    if (num > 2) {
        return getNum(num - 2) + getNum(num - 1);//致谢这一行报错是因为无法识别返回类型
    } else {
        return 1;//加上这一行，确定了返回类型
    }

}


var req1 = http.request(options[0], function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        writeToresult(Resultpath, chunk);
    });
});
req1.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
req1.end();
readFromFile(Resultpath);
var req2 = http.request(options[1], function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        writeToresult(Resultpath, chunk);
    });
});
req2.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
req2.end();

req3.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
req3.end();

//构建三个http
// var tasks = new Array();
// var req1 = http.request(options[0], function (res) {
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//         log("data1", "aaaaaaa");
//         writeToresult(Resultpath, chunk);
//     });
// });
// var req2 = http.request(options[1], function (res) {
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//         log("data2", "aaaaaaa");
//         writeToresult(Resultpath, chunk);
//     });
// });
// var req3 = http.request(options[2], function (res) {
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//         log("data3", "aaaaaaa");
//         writeToresult(Resultpath, chunk);
//     });
// });
// tasks.push(req1);
// tasks.push(req2);
// tasks.push(req3);
// log("tasks1 = ", tasks[0]);
// log("tasks2 = ", tasks[1]);
// log("tasks3 = ", tasks[2]);
/** parallel(tasks, [callback])parallel函数是并行执行多个函数，每个函数都是立即执行，不需要等待其它函数先执行。
 传给最终callback的数组中的数据按照tasks中声明的顺序，而不是执行完成的顺序，*/


// var req1 = http.request(options[0], function (res) {
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//         writeToresult(Resultpath, chunk);
//     });
// });

// var req2 = http.request(options[1], function (res) {
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//         writeToresult(Resultpath, chunk);
//     });
// });
// var req3 = http.request(options[2], function (res) {
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//         writeToresult(Resultpath, chunk);
//     });
// });


// req1.on('error', function (e) {
//     console.log('problem with request: ' + e.message);
// });
// req2.on('error', function (e) {
//     console.log('problem with request: ' + e.message);
// });
// req3.on('error', function (e) {
//     console.log('problem with request: ' + e.message);
// });
//
// req1.end();
// req2.end();
// req3.end();

fs.exists(Resultpath, function (exits) {
    if (exits) {
        log("EXITS = " + exits);
        log("RESULT = ", getNum(5));
        // fs.stat(Resultpath, function (err, Stats) {
        //     log("STATE = ", Stats);
        // });
        // fs.rename("result","new_name",function (err) {
        //     log("err = ",err);
        // });
    } else {

        log("NOTEXITS = " + exits);
    }
});