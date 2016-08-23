var util = require('./myUtil');
var run = util.run;
var xrun = util.run;
var scope = util.scope;

scope('test', function(){
    run('test', function(){
        console.log('hello');
    });
});


// xrun('run in isolated scope', function(){
//     var obj = {
//         msg: 'hello'
//     };
//     var str = 'world';
//     console.log(obj.msg + str);
// });

// xrun('another run', function(){
//     var obj = {
//         msg: 'another one'
//     };
//     console.log(obj.msg);
// });

// var double = function(num){
//     return num*2;
// }

// xrun('run with dependency', double, function(double){
//     var n = 10;
//     console.log(double(n));
// });