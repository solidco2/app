#!/usr/bin/env node

"use strict";

(function __tasq_class(){

    function Task(proc, data, context){
        this._process = proc;
        this._data = data;
        this._context = context;
    }

    Task.prototype = {
        processing : false,
        _context : null,
        _data : null,
        _process : null,
        run : function(queue) {
            if(queue instanceof TaskQueue){
                var me = this;
                me.processing = true;
                me.complete = function(queue){
                    if (me.processing) {
                        me.processing = false;
                        queue.next();
                    } else {}
                };
                me._process.call(me._context, me._data);
            }
        }
    };

    function TaskQueue(){
        var me = this || new TaskQueue();
        me.queue = [];
    };

    TaskQueue.prototype = {
        state : false,
        queue : null,
        add : function(proc, data, context){
            var me = this;
            var task = new Task(proc, data, context);
            if (me.state) {
                me.queue.push(task);
            } else {
                me.state = true;
                task.run(me);
            }
        },
        next : function(task){
            var me = this;
            if (task instanceof Task) {
                var queue = me.queue;
                me.state = false;
                if (queue && queue.length) {
                    me.state = true;
                    queue.pop().run(me);
                }
            }
        }
    };

    var mod = {
        create : function(){
            return new TaskQueue();
        },
        sync : function(proc){
            return function(task){
                proc.apply(this, arguments);
                task.complete();
            };
        },
        _Task : Task,
        _TaskQueue : TaskQueue
    };

    var sud = "undefined";
    
    if (typeof exports != sud && typeof module != sud) {
        exports = module.exports = mod;
    } else if (typeof define == "function" && define.amd) {
        define(mod);
    } else {
        var g = (typeof global==sud?(typeof window==sud?this:window):global);
        if (g) { g.tasq = mod; } else {
            try{
                tasq = mod;
            } catch (ex) {}
        }
    }

    return mod;
}());
