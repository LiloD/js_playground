'use strict';

var util = require('./myUtil');
var scope = util.scope;
var run = util.run;
var frun = util.frun;

scope('preventExtensions', function(){
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions
    run('ES5 preventExtensions and isExtensible', function(){
        var obj = {};
        console.log(Object.isExtensible(obj));    //true

        Object.preventExtensions(obj);
        obj.someProperty = 1; //[TypeError: Can't add property someProperty, object is not extensible]
    });

    run('tamper proof object', function(){
        //when every property in an object is private then the object is tamper proof
        var createTamperProofObject = function(spec){
            var name = spec.name;
            var age = spec.age;
            return {
                get_name: function(){
                    return name;
                }
            };
        };
        //get one temperProofObject
        var obj1 = createTamperProofObject({name: 'Koto', age: 12});
        console.log(obj1.get_name());   //Koto

        //try change the name
        obj1.name = 'some other name';
        console.log(obj1.get_name());   //Koto
    });

    //http://yuiblog.com/blog/2008/05/24/durable-objects/
    run('durable object', function(){
        //A durable object contains no visible data members, and its methods use neither this nor that
        var durableObject = function(spec){
            var that = {};
            var privateProp1 = 1;
            var privateProp2 = 2;

            function privateFunc(){
                //don't use anything on this or that
                //only use private property or function
                console.log('privateProp1:' + privateProp1);
            }

            //copy public function to that
            that.privateFunc = privateFunc;

            return that;
        };

        var obj = durableObject();
        obj.privateFunc();
        //even you try to change or override it
        obj.privateProp1 = 'wrong';
        obj.privateFunc();  //1
        
        obj.someMethod = function(){
            this.privateProp1 = 5;
        }
        obj.someMethod();
        obj.privateFunc();  //1
    });

    run('eventuality', function(){
        var eventuality = function(obj){
            var handlersMap = {};

            obj.on = function(eventName, handler){
                if(handlersMap.hasOwnProperty(eventName)){
                    handlersMap[eventName].push(handler);
                }else{
                    handlersMap[eventName] = [handler];
                }
                return this;
            };

            obj.emit = function(event){
                if(typeof event === 'string' && handlersMap.hasOwnProperty(event)){
                    var func;
                    var handlers = handlersMap[event];
                    for(var i = 0; i < handlers.length; i++){
                        func = handlers[i];
                        func.apply(this, arguments);
                    }
                }
                return this;
            }

            return obj;
        };

        var obj = {
            name: 'Koto'
        };
        obj = eventuality(obj);

        obj.on('eventA', function(event, message){
            console.log(this.name + ' say: ' + message);
        });

        obj.emit('eventA', 'Hello World');
    });
});