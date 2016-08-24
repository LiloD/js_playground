// 'use strict';

var scopes = [];
var currentScope = null;

function scope(){
    //analysis args
    var args = Array.prototype.slice.apply(arguments);
    if(args.length < 1){
        console.log('Nothing to run');
        return;
    }
    var func;
    var firstArg = args[0];
    if(typeof firstArg === 'string'){
        if(args.length < 2){
            console.log('Nothing to run');
            return;
        }
        func = args[1];
    }else if(typeof firstArg === 'function'){
        func = args[0];
    }else{
        console.log('Not a valid running task');
        return;
    }

    //create scope
    var scope = {
        tasks: []
    };

    currentScope = scope;
    scopes.push(scope);
    func.apply(null);

    for (var i = 0; i < scope.tasks.length; i++) {
        var task = scope.tasks[i];
        console.log('run:', task.description);
        task.apply(null, task.dependencies);
        console.log('-------------\n');
    }
    currentScope = null;
}

function run(){
    var args = Array.prototype.slice.apply(arguments);

    if(args.length < 2){
        console.error('No description or No function to run');
        return;
    }

    var description = args[0];
    var dependencies = args.slice(1, args.length - 1);
    var func = args[args.length - 1];

    if(!currentScope){
        console.error('can\'t run outside of scope');
        return;
    }

    func.type = 'run';
    func.description = description;
    func.dependencies = dependencies;

    if(currentScope.tasks.length === 0){
        currentScope.tasks.push(func);
    }else{
        var last = currentScope.tasks[currentScope.tasks.length - 1];
        if(last.type === 'run'){
            currentScope.tasks.push(func);
        }
    }
}

function xrun(){
    return;
}

function frun(){
    var args = Array.prototype.slice.apply(arguments);

    if(args.length < 2){
        console.error('No description or No function to run');
        return;
    }

    var description = args[0];
    var dependencies = args.slice(1, args.length - 1);
    var func = args[args.length - 1];

    if(!currentScope){
        console.error('can\'t run outside of scope');
        return;
    }

    func.type = 'frun';
    func.description = description;
    func.dependencies = dependencies;

    if(currentScope.tasks.length === 0){
        currentScope.tasks.push(func);
    }else{
        var last = currentScope.tasks[currentScope.tasks.length - 1];
        if(last.type === 'run'){
            currentScope.tasks = [];        //empty tasks
        }
        currentScope.tasks.push(func);
    }
}

module.exports = {
    run: run,
    xrun: xrun,
    frun: frun,
    scope: scope
};

