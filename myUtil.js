// 'use strict';

function scope(){
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

    var context = {
        tasks: 'tasks?'
    
    }
    func.apply(context);

}

function run(){
    console.log('tasks: ', this.tasks);
    var args = Array.prototype.slice.apply(arguments);

    if(args.length < 2){
        console.error('No description or No function to run');
        return;
    }

    var description = args[0];
    var dependencies = args.slice(1, args.length - 1);
    var func = args[args.length - 1];

    console.log('run:' + description);
    console.log('----------');
    func.apply(null, dependencies);
    console.log('----------\n');
}

function xrun(){
    return;
}

function frun(){}

module.exports = {
    run: run,
    xrun: xrun,
    scope: scope
};

