var util = require('./myUtil');
var run = util.run;
var xrun = util.xrun;
var frun = util.frun;
var scope = util.scope;


scope('try something with exception', function(){
    run('doing something wrong', function(){
        undefinedObj.doSomething();
    }); 
    
    run('throw some error', function(){
        var e = new Error();
        e.message = 'some error';
        throw e;
    });

    run('this is a normal test', function(){
        var a = 1;
        var b = 10;
        console.log(a+b);
    });
});

// scope('test', function(){
//     frun('test run 1', function(){
//         console.log('hello world');
//     });

//     run('test run 2', function(){
//         var obj = {
//             msg: 'vivi'
//         };
//         console.log(obj.msg);
//     });

//     xrun('test run 3', function(){
//         var obj = {
//             msg: 'albert'
//         };
//         console.log(obj.msg);
//     });

//     frun('focus run 4', function(){
//         var obj = {
//             msg: 'need to focus'
//         };
//         console.log(obj.msg);
//     });
// });

// scope('test', function(){
//     run('test', function(){
//         console.log('hello');
//     });
// });


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