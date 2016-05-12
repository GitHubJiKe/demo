/**
 * Created by bykj on 2016/4/28.
 */

var tools = require('./tt');
var async = require('async');
//
// tools.commitRequest({hostname: 'www.baidu.com', path: '/s?wd=nba', method: 'GET'}, function (err, data) {
//     if (err) return console.log(err);
//     console.log(data);
// });


var urls = [{hostname:'www.baidu.com',path:'/s?wd=nba'},{hostname:'www.baidu.com',path:'/s?wd=react'},{hostname:'www.baidu.com',path:'/s?wd=react'}];

async.mapLimit(urls,urls.length,function(item,callback){
    tools.commitRequest({hostname: item.hostname, path: item.path, method: 'GET'}, function (err, data) {
        if (err) return callback(err);
        return callback(null,data);
    });
},function(err,result){
    console.log(err,result)
});