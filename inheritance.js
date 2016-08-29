var util = require('./myUtil');
var scope = util.scope;
var xscope = util.xscope;
var run = util.run;
var frun = util.frun;

xscope('Pesudo Class', function(){
    run('when a function obejct be created', function(){
        var funcObj = function(){};
        console.log(funcObj.prototype);     //{}
        console.log(funcObj.prototype.constructor); //[Function] which means constructor property will not show
        console.log(funcObj.prototype.constructor === funcObj)  //true
    });

    run('Creating object', function(){
        var Actor = function(hp, name){
            this.hp = hp;
            this.name = name;
        };

        Actor.prototype.get_name = function(){
            return this.name;
        };
        Actor.prototype.get_hp = function(){
            return this.hp;
        };
        var actorA = new Actor(1, 'slime');
        console.log(actorA.get_name());     //slime
        console.log(actorA.get_hp());       //1
    });

    run('Inheritance', function(){
        var Actor = function(hp, name){
            this.hp = hp;
            this.name = name;
        };

        Actor.prototype.get_name = function(){
            return this.name;
        };
        Actor.prototype.get_hp = function(){
            return this.hp;
        };
        var actorA = new Actor(1, 'slime');

        var Hero = function(name, hp, lv){
            Actor.apply(this, [hp, name]);
            this.lv = lv;
        };
        Hero.prototype = new Actor();
        Hero.prototype.get_lv = function(){
            return this.lv;
        }

        var hero = new Hero('koto', 10, 1);
        console.log(hero.get_name());   //koto
        console.log(hero.get_hp());     //10
        console.log(hero.get_lv());     //1
    });

    frun('Hide the operation on prototype', function(){
        var inherit = function(Child, Parent){
            Child.prototype = new Parent();
            return Child; 
        };

        var method = function(Constructor, name, func){
            Constructor.prototype[name] = func;
            return Constructor;
        };

        var Parent = function(){};
        Parent.prototype.say = function(){
            console.log('I am the parent method');
        };

        var Child = function(){};
        inherit(Child, Parent);
        method(Child, 'childSay', function(){
            console.log('I am the child method');
        })
        var c = new Child();

        c.say();        //I am the parent method
        c.childSay();   //I am the child method
    });

    /*disadvantage:
        - no private environment
        - no way to access method on super Class
        - must use new operator if you forget there is no warning or error
    */ 

});

scope('Object Specifier', function(){
    //when a function has too many arguments, it's very hard to remember the order
    //use object Specifier
    run('create object specifier', function(){
        var Enemy = function(objectSpecifier){
            this.name = objectSpecifier.name || 'Enemy';
            this.hp = objectSpecifier.age || 10;
        }
        Enemy.prototype.get_name = function(){
            return this.name;
        }
        var e = new Enemy({
            name: 'slime',
            hp: 5
        });
        console.log(e.get_name());  //slime
    });
});