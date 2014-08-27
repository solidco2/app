"use strict";

var fs = require("fs");
var url = require("url");
var path = require("path");
var arg = require("./arg-array");
var mime = require("mime");

function runChain(rings){
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "function") {
            try{
                arguments[i]();
                return true;
            } catch(ex) { }
        }
    }
    return false;
};

function Creator(paths){

    var args = arg.get(arguments);

    var validPath = [];
    for(var i = 0; i < args.length; i++){
        validPath.push(fs.realPathSync(args[i]));
    };

    console.log("Res instance created as path:", validPath);

    this.handle = function(req, res, chain){
        var location = url.parse(req.url, true);
        var file = location.pathname;
        fs.realPath(file, function (err, file) {
            if (err) {
                res.writeHeader(404);
                res.end("404 - not found");
            } else {
                if (validPath.any(function (item) {
                    return !(path.relative(item, file).match(/^\.\./);
                })) {
                    fs.readFile(file, {encoding:"utf8"}, function(err, content){
                        if (err) {
                            res.writeHeader(404);
                            res.end("404 - no such file");
                        } else {
                            res.writeHeader(200, {
                                "Content-Type": mime.lookup(file)
                            });
                            res.end(content);
                        }
                    });
                } else {
                    res.writeHeader(403);
                    res.end("403 - Need Not To Know");
                }
            }
        });
    };

    this.__defineSetter__("paths", function (value) {
        validPath.length = 0;
        if (typeof value == "string") {
            value = fs.realPathSync(value);
            validPath.push(value);
        } else {
            for (var i = 0; i < value.length; i++) {
                value[i] = fs.realPathSync(value[i]);
                validPath.push(value[i]);
            }
        }
    });
    this.__defineGetter__("paths", function () {
        return validPath.slice();
    });
};

exports.create = function (paths) {
    var inst = Object.create(Creator.prototype);
    Creator.apply(inst, arguments);
    return inst;
};
