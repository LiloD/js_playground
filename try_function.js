//Object and Function Literals
(function(){
    var obj = {};
    var funcObj = function(){};
    console.log(obj.__proto__ === Object.prototype);  //true
    console.log(funcObj.__proto__ === Function.prototype);    //true
    console.log(funcObj.__proto__.__proto__ === Object.prototype); //true
})();

//The method invocation pattern and function invocation pattern
(function(){
    this.name = 'name outside';

    var obj = {
        name: 'name in object',
        sayName: function(){
            console.log(this.name);
        }
    };

    obj.sayName();  //name in object
    var func = obj.sayName;
    func();     //name outside

    var myObject = {
        value: 1
    };
    myObject.double = function(){
        var that = this;    //use another name
        
        function helper(){
            that.value = that.value*2;
        }

        helper();
    };
    myObject.double()
    console.log(myObject.value);     //2
})();

//the apply invocation pattern
(function(){
    function say(){
        console.log(this.message);
    }
    var obj1 = {
        message: 'i am object 1'
    };
    var obj2 = {
        message: 'i am object 2'
    };
    say.apply(obj1);    //i am object1
    say.apply(obj2);    //i am object2
})();

//constructor invocation pattern
(function(){
    var Me = function(name){
        this.name = name;
    };
    console.log('The default prototype object', Me.prototype);      //{} empty object
    Me.prototype.getName = function(){
        return this.name;
    };
    var m = new Me('lilod');
    console.log(m.getName());   //lilod
})();

//Use call to chain constructors for an object
(function(){
    var Human = function(name, age){
        this.name = name;
        this.age = age;

        this.sayName = function(){
            console.log('My name is:', this.name);
        };
    };

    var Man = function(name, age){
        Human.call(this, name, age);
        this.gender = 'male';
    };

    var Woman = function(name, age){
        Human.call(this, name, age);
        this.gender = 'female';
    };

    var human = new Human('koto', 24);
    var man = new Man('men', 24);
    var woman = new Woman('woman', 24);

    human.sayName();            //koto
    man.sayName();              //man
    woman.sayName();            //woman
    console.log(man.gender);    //male
    console.log(woman.gender);  //female
})();

//try constructor more
(function(){
    var Person = function(name, age){
        this.name = name;
        this.age = age;

        this.sayName = function(){
            console.log('My name is:', this.name);
        }    
    };

    var MyObject = function(name, age, title){
        Person.call(this, name, age);
        this.title = title;
    };

    var me = new MyObject('Albert', 25, 'student');
    var vivi = new Person('Vivi', 24);
    
    vivi.sayName();     //Albert
    me.sayName();       //Albert

    Person.prototype.sayAge = function(){
        console.log('My age is:', this.age);
    }

    vivi.sayAge();          //24
    // me.sayAge();         //TypeError: me.sayAge is not a function

    MyObject.prototype = new Person();
    //me.sayAge();          //TypeError: me.sayAge is not a function
    var me2 = new MyObject('Ding', 40, 'worker');
    me2.sayAge();           //40       
})();

//Exception handler
(function(){
    var errorFunc = function () {
        throw {
            name: 'error',
            message: 'this is a error'
        };
    };

    try {
        errorFunc();
    } catch (error) {
        console.log('error:', error);   //error: { name: 'error', message: 'this is a error' }
        console.log(typeof error);      //object
        console.log(error instanceof Error);    //false
    }

    var anotherErrorFunc = function () {
        var e = new Error();
        e.name = 'Another Error';
        e.message = 'anthoer error';

        throw e;
    }

    try {
        anotherErrorFunc();
    } catch (error) {    
        console.log('error:', error);   //error: { [Another Error: anthoer error] name: 'Another Error', message: 'anthoer error' }
        console.log(typeof error);      //object
        console.log(error instanceof Error);    //true
    }
})();


//Closure
// (function(){
//     for (var i = 0; i < 5; i++) {
//         setTimeout(function(){
//             console.log(i);         //5 5 5 5 5     
//         }, 1000);
//     }

//     for (var i = 0; i < 5; i++) {
//         (function(idx){
//             setTimeout(function(){
//                 console.log(idx);   //0 1 2 3 4
//             }, 1000);
//         })(i)
//     }
// })();


//Curry
(function(){})();

//Memoization
(function(){})();

//Function object
(function(){
    var func = function(){};
    console.log(func.prototype);    //{}
    console.log(func.prototype.constructor);    //[Function]
    console.log(func === func.prototype.constructor);   //true
})();

//Pesudo-class
(function(){
    Function.prototype.add_method = function(name, method){
        this.prototype[name] = method;
        return this;
    };

    Function.prototype.inherit = function(Obj){
        this.prototype = new Obj();
        return this;
    };

    var Animal = function(name){
        this.name = name;
    }

    Animal.prototype.get_name = function(){
        return this.name;
    }

    var Cat = function(name){
        this.name = name;
        this.saying = 'Meow';
    }

    Cat.inherit(Animal)
        .add_method('purr', function(){
            console.log('purr');
        });

    var cat = new Cat('Angular')
    cat.purr();                     //purr
    console.log(cat.get_name());    //Angular 
})();