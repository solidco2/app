require.config({
	baseUrl:"/js",
	paths:{
		"jquery" : "lib/jquery"
	}
});

var g = (function(){if (this) return this; else if (typeof window != "undefined") return window; else return global;}());

g.less = { env: "develop" };

define(["jquery","less"], function(jQuery, less){
})
