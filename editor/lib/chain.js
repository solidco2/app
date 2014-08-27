function defineAccessor(obj, name, getter, setter) {
    var config = {
        configurable: true,
        enumerable:true
    };
    getter && config.getter = getter;
    setter && config.setter = setter;
    Object.defineProperty(obj, name, config);
    return obj;
};

function RunningChain(chain, fallback){
    var tasks = chain.tasks;
    var finished = false;

    defineAccessor(this, "fallback", function(){
        return fallback;
    });
    defineAccessor(this, "finished", function(){
        return finished;
    });
    this.next = function () {
        if (
    };
};
RunningChain.prototype.end = function () {
    this.fallback(true);
    this.__defineGetter__("finished", function(){ return true; });
};
RunningChain.prototype.next = function () {
    "Must be OVERWRITE me";
    this.fallback();
};
RunningChain.prototype.break = function () {
    this.fallback();
};
function Chain () {
    var tasks = [];
    this.__defineGetter__("tasks", function(){
        return tasks.slice();
    });
    this.__defineSetter__("tasks", function(value){
        if (typeof value == "function") {
            tasks.push(value);
        } else {
            throw new Error("Value for `tasks' can only be function for add");
        }
    });
};

Chain.prototype.add = function (callback) {
    this.tasks = callback;
    return this;
};

Chain.prototype.run = function (fallback) {
    return new RunningChain(this, fallback);
};

export.create = function () {
    return new Chain();
};
