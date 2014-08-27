"use strict";

var slice = Array.prototype.slice;
var splice = Array.prototype.splice;
var toString = Object.prototype.toString;
var ARRAY_TYPE = "[object Array]";

function get(all_arguments){
    var args = slice.call(arguments);
    for (var i = args.length; i--; ) {
        var arg = args[i];
        if (toString.call(arg) == ARRAY_TYPE) {
            args.splice(i, 1, arg);
        } else if (typeof arg == "object" && (arg.hasOwnProperty("length") || arg.hasOwnProperty("callee"))) {
            splice.apply(args, [i, 1].concat(get.apply(this, arg)));
        }
    }
    return args;
};
exports.get = get;
