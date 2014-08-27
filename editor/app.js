/*注意，这个文件是整个app的入口，此文件不需要可执行属性，应该被主控程序 fork 出来*/

var listen = require("applisten");
var res = require("./lib/res").create(__dirname + "/js", __dirname + "/less");

var server = listen("editor", function(req, res){
    res.handle(req, res, function(){
        
    });
});

