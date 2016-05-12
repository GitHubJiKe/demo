/**
 * Created by bykj on 2016/4/29.
 */
var tools = require('./tools');
var async = require('async');
var fs = require('fs');
var util = require('util');
var child_process = require('child_process');
var express = require('express');
var app = express();


var Mypath = "D:/project/node/demo/test/result";
var Mypath1 = "D:/project/node/demo/test/result/welcome.html";

var urls = [{hostname: 'www.baidu.com', path: '/s?wd=nba'}, {
    hostname: 'www.baidu.com',
    path: '/s?wd=react'
}, {hostname: 'www.baidu.com', path: '/s?wd=react'}];
var people = {
    name: "hehe",
    age: 23
}
var people1 = {
    name: "hehe1",
    age: 24
}
var people2 = {
    name: "hehe2",
    age: 25
}

var sampleData = [people, people1, people2];

// async.mapSeries(urls, function (item, callback) {
//     tools.commitRequest({hostname: item.hostname, path: item.path, method: 'GET'}, function (err, data) {
//         callback(err, data);
//     })
// }, function (err, results) {
//     if (err) console.log("err", err);
//     tools.writeToResultSync(Mypath, results.toString())
// });

//Failed

// async.auto(urls, function (item, cb) {
//     tools.commitRequest({hostname: item.hostname, path: item.path, methord: "GET"}, function (err, data) {
//         console.log('err', err);
//         console.log('data', data);
//     })
// }, function (err, results) {
//     console.log("err", err);
//     console.log("result", results);
// });

/**
 * 传递四个参数，第三个参数的item是urls中的每一个
 */
// async.mapLimit(urls, urls.length, function (item, callback) {
//     tools.commitRequest({hostname: item.hostname, path: item.path, method: 'GET'}, function (err, data) {
//         console.log("ERROR = ", err);err,data
//         console.log("DATA = ", data);
//
//         // tools.writeToResult(Mypath, data.toString(), function (err) {
//         //     callback(err);
//         // });
//
//         try {
//             tools.writeToResultSync(Mypath, data.toString())
//         } catch (e) {
//             callback(e, data);
//         }
//     })
// }, function (err, result) {
//     // tools.writeToResult(Mypath, result);
//     //console.log(err + "result = ", result);
// });


// async.mapSeries(urls, function (url, callback) {
//     getFromStorage(id, function (err, res) {
//         if (err) return callback(err);
//         callback(null, res.name);
//     })
// }, function (err, results) {
//     // results is an array of names
// });
// var current = Promise.resolve();
//
// Promise.all(ids.map(function(id) {
//     current = current.then(function() {
//         return getItem(id) // returns promise
//     }).then(function(result) {
//         return result.name;
//     });
//     return current;
// })).then(function(results) {
//     // results is an array of names
// })
// async.mapSeries
// async.parallel （多个函数并行执行）并行执行多个函数，每个函数都是立即执行，不需要等待其它函数先执行。给最终callback的数组中的数据按照tasks中声明的顺序，而不是执行完成的顺序。
//如果某个函数出错，则立刻将err和已经执行完的函数的结果值给parallel最终的callback。其它未执行完的函数的值不会到最终数据，但要个位置。
//同时支持json形式的tasks，其最终callback的结果也为json形式。
// async.auto（多个函数有依赖关系，有的并行执行，有的依次执行）
// async.waterfall（多个函数依次执行，且前一个的输出为后一个的输入）与seires相似，按顺序依次执行多个函数。不同之处，每一个函数产生的值，都将给下一个函数。如果中途出错，后面的函数将不会被执行。错误信息以及之前产生的结果，将给waterfall最终的callback。
//这个函数名为waterfall(瀑布)，可以想像瀑布从上到下，中途冲过一层层突起的石头。注意，该函数不支持json式的tasks。
// var url1 = urls[0];
// var url2 = urls[1];
// var url3 = urls[2];
// var functions = [tools.commitRequest({
//     hostname: url1.hostname,
//     path: url1.path,
//     method: 'GET'
// }, function (err, data, cb) {
//     cb(err, data);
// }), tools.commitRequest({hostname: url2.hostname, path: url2.path, method: 'GET'}, function (err, data, cb) {
//     cb(err, data);
// }), tools.commitRequest({hostname: url3.hostname, path: url3.path, method: 'GET'}, function (err, data, cb) {
//     cb(err, data);
// })];
var options1 = {
    hostname: "www.baidu.com",
    path: "/s?wd=nba",
    methord: "GET",
    port: 80
}
var options2 = {
    hostname: "www.baidu.com",
    path: "/s?wd=react",
    methord: "GET",
    port: 80
}
var options3 = {
    hostname: "www.baidu.com",
    path: "/s?wd=node.js",
    methord: "GET",
    port: 80
}
// async.auto({
//     get_data: function (callback) {
//         // 异步，首先获取数据
//         tools.commitRequest(options, function (err, data) {
//             callback(null, data);
//         });
//     },
//     make_folder: function (callback) {
//         // 异步，然后创建文件夹
//         // 在获取数据的同时执行
//         if (!fs.exists(Mypath)) {
//             fs.mkdir(Mypath, null, function (err, data) {
//                 console.log("创建成功");
//                 callback(null, Mypath);
//             })
//         }
//
//     },
//     write_file: ['get_data', 'make_folder', function (results, callback) {
//         // 一旦有数据，存在路径
//         // 往该路径下的文件内写数据
//         fs.appendFile(Mypath1, results.get_data, "utf-8", function (cb) {
//             console.log("写成功");
//             callback(null, Mypath1);
//         })
//
//     }],
//     email_link: ['write_file', function (results, callback) {
//         // 一旦文件写好，发送邮件链接
//         //write_file 方法返回的results.write_file，包含文件名
//         callback(null, {'file': results.write_file, 'email': 'user@example.com'});
//     }]
// }, function (err, results) {
//     console.log('err = ', err);
//     console.log('results = ', results);
// });

// async.auto({
//     get_data: function (callback) {
//         tools.commitRequest(options, function (err, data) {
//             //console.log("获取成功 = " + data);
//             callback(null, data);//把数据抛出去
//         })
//     },
//     make_dir: function (callback) {
//         if (!fs.exists(Mypath)) {
//             fs.mkdir(Mypath,null,function () {
//                 console.log("创建成功");
//                 callback(null, Mypath);//把路径抛出去
//             });
//
//         }
//     },
//     write_to_file: ['get_data', 'make_dir', function (results, callback) {
//         fs.appendFile(Mypath1, results.get_data, "utf-8", function (cb) {
//             console.log("写成功");
//             callback(null, Mypath1);
//         })
//     }],
//     send_email: ['write_to_file', function (results, callback) {
//         callback(null, {'file': results.write_to_file, 'email': 'user@example.com'});
//     }]
// }, function (err, results) {
//     console.log('err = ', err);
//     console.log('results = ', results);
// });

// async.parallel([
//         function (callback) {
//             tools.commitRequest(options, function (err, data) {
//                 console.log('获取数据成功');
//                 // 此处使用异步代码获取数据
//                 callback(null, data, 'converted to array');
//             });
//
//         },
//         function (callback) {
//             // 异步代码，创建文件夹并在内部创建一个文件
//             // 和获取数据同时进行
//             if (!fs.exists(Mypath)) {
//                 fs.mkdir(Mypath, null, function () {
//                     console.log('创建文件夹成功');
//                     callback(null, Mypath);
//                 })
//             }
//
//         }
//     ],
//     function (err, results) {
//         async.series([
//             function (callback) {
//                 // 一旦这里有数据，就开始往文件里面写数据
//                 fs.appendFile(Mypath1, results, "utf8", function () {
//                     results.push('eamil');
//                     console.log('写文件成功', JSON.stringify(results));
//                     callback(null);
//                 })
//
//             },
//             function (callback) {
//
//                 // 一旦问价写完，发送邮件
//                 console.log('发送邮件成功', JSON.stringify(results));
//                 callback(null, {'file': results.pop(), 'email': 'user@example.com'});
//             }
//         ]);
//     });
//
// async.map([Mypath1], fs.stat, function (err, results) {
//     // results is now an array of stats for each file
//     console.log("results = " + results);
// });
//
// async.filter([Mypath1], function (filePath, callback) {
//     fs.access(filePath, function (err) {
//         callback(null, !err)
//     });
// }, function (err, results) {
//     // results now equals an array of the existing files
//     console.log("results = " + results);
// });

// async.parallelLimit([function (callback) {
//     tools.commitRequest(options1, function (err, data) {
//         callback(null, data);
//     })
// }, function (callback) {
//     tools.commitRequest(options2, function (err, data) {
//         callback(null, data);
//     })
// }, function (callback) {
//     tools.commitRequest(options3, function (err, data) {
//         callback(null, data);
//     })
// }], 3, function (err, results) {
//     fs.appendFile(Mypath1, results, "utf-8", function () {
//         app.get("/", function (request, response) {
//             fs.readFile(Mypath1, "utf8", function (err, data) {
//                 response.send(data);
//             })
//         });
//         app.listen(80);
//     })
// });
//
app.get("/", function (request, response) {
    fs.readFile(Mypath1, "utf8", function (err, data) {
        response.send(data);
    })
});
app.listen(80);
// var command = "write";
// var child = child_process.spawn( command );
// child.stdout.on('data', function(data) {
//     console.log(data);
// });
// var child_process = require('child_process');
// child_process.exec( command , function(err, stdout , stderr ) {
//     console.log( stdout );
// });