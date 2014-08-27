define(function(){
    if (typeof global != "undefined") return global;
    if (typeof window != "undefined") return window;
    if (typeof this != "undefined") return this;
    return {};
});
