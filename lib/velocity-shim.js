/***************
    Details
***************/

/*!
* jQuery shim for Velocity.js
* @version 0.1.0
* Portions copyright The jQuery Foundation. MIT License: https://jquery.org/license
* Portions copyright Thomas Fuchs. MIT License: http://zeptojs.com/license/
*/    

/****************
     Summary
****************/

/* This file contains a series of jQuery utility functions that Velocity relies on, thus removing Velocity's dependency on a full copy of jQuery, and allowing it to work in any environment. */
/* These shimmed functions are only used if jQuery isn't present. If both this shim and jQuery are loaded, Velocity falls back to jQuery. */
/* Note: The shimmed jQuery configuration requires IE9+; below IE9, WHAT HAPPENS? */

// What versions of jQuery/Zepto were these pulled from?

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        /*
         In AMD environments, you will need to define an alias
         to your selector engine. i.e. either zepto or jQuery.
         */
        define(factory);
    } else {
        /*
         Browser globals
         */
        factory();
    }
}(function () {

    /***************
     Setup
     ***************/

    if (window.Velocity !== undefined) {
        throw new Error("Velocity is already loaded. The shim must be loaded BEFORE jquery.velocity.js.");
    }

    /* jQuery base. */
    var $ = function (selector, context) {
        return new $.fn.init(selector, context);
    };

    /**********************
     Private Variables
     **********************/

    /* $.queue() */
    var optionsCache = {},
        data = {},
        class2type = {},
        hasOwn = class2type.hasOwnProperty,
        toString = class2type.toString;

    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    });

    /* $.data() */
    var data = {};
    $.expando = "Velocity" + (+new Date());
    $.uuid = 0;

    /********************
     Private Methods
     ********************/

    /* jQuery */
    $.isWindow = function (obj) {
        /* jshint eqeqeq: false */
        return obj != null && obj == obj.window;
    };

    /* jQuery */
    $.type = function (obj) {
        if (obj == null) {
            return obj + "";
        }

        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    };

    /* jQuery */
    $.isArray = Array.isArray || function (obj) {
        return $.type(obj) === "array";
    };

    /* jQuery */
    function isArraylike (obj) {
        var length = obj.length,
            type = $.type(obj);

        if (type === "function" || $.isWindow(obj)) {
            return false;
        }

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
    }

    /* jQuery */
    function createOptions (options) {
        var object = optionsCache[options] = {};

        $.each(options.match(/\S+/g) || [], function(_, flag) {
            object[flag] = true;
        });

        return object;
    }

    /***************
     $ Methods
     ***************/

    /* jQuery: Support removed for IE<9. */
    $.isPlainObject = function (obj) {
        var key;

        if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
            return false;
        }

        try {
            if (obj.constructor &&
                !hasOwn.call(obj, "constructor") &&
                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            return false;
        }

        for (key in obj) {}

        return key === undefined || hasOwn.call(obj, key);
    };

    /* jQuery */
    $.each = function(obj, callback, args) {
        var value,
            i = 0,
            length = obj.length,
            isArray = isArraylike(obj);

        if (args) {
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.apply(obj[ i ], args);

                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.apply(obj[ i ], args);

                    if (value === false) {
                        break;
                    }
                }
            }

        } else {
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.call(obj[ i ], i, obj[ i ]);

                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.call(obj[ i ], i, obj[ i ]);

                    if (value === false) {
                        break;
                    }
                }
            }
        }

        return obj;
    };

    /* Custom ~=: $.getData() and $.setData() condensed: https://github.com/madrobby/zepto/blob/master/src/data.js#files */
    $.data = function (node, key, value) {
        /* $.getData() */
        if (value === undefined) {
            var id = node[$.expando],
                store = id && data[id];

            if (key === undefined) {
                return store;
            } else if (store) {
                if (key in store) return store[key];
            }
            /* $.setData() */
        } else {
            var id = node[$.expando] || (node[$.expando] = ++$.uuid);

            if (!data[id]) {
                data[id] = {};
            }

            if (key !== undefined) {
                data[id][key] = value;
            }

            return data[id];
        }
    };

    /* Zepto: Removed object iteration. */
    $.removeData = function (node, keys) {
        var id = node[$.expando],
            store = id && data[id];

        if (store) {
            $.each(keys, function(_, key) {
                delete store[key];
            });
        }
    };

    /* Zepto */
    $.extend = function (target) {
        function extend (target, source, deep) {
            for (key in source) {
                if (deep && ($.isPlainObject(source[key]) || $.isArray(source[key]))) {
                    if ($.isPlainObject(source[key]) && !$.isPlainObject(target[key]))
                        target[key] = {};
                    if ($.isArray(source[key]) && !$.isArray(target[key]))
                        target[key] = [];
                    extend(target[key], source[key], deep);
                }
                else if (source[key] !== undefined) target[key] = source[key];
            }
        }

        var deep, args = [].slice.call(arguments, 1);
        if (typeof target == 'boolean') {
            deep = target;
            target = args.shift();
        }

        $.each(args, function (_, arg) {
            extend(target, arg, deep);
        });

        return target;
    };

    /* jQuery */
    $.queue = function (elem, type, data) {
        if (elem) {
            function $makeArray (arr, results) {
                var ret = results || [];

                if (arr != null) {
                    if (isArraylike(Object(arr))) {
                        /* $.merge */
                        (function(first, second) {
                            var len = +second.length,
                                j = 0,
                                i = first.length;

                            while (j < len) {
                                first[ i++ ] = second[ j++ ];
                            }

                            if (len !== len) {
                                while (second[j] !== undefined) {
                                    first[ i++ ] = second[ j++ ];
                                }
                            }

                            first.length = i;

                            return first;
                        })(ret, typeof arr === "string" ? [arr] : arr);
                    } else {
                        [].push.call(ret, arr);
                    }
                }

                return ret;
            }

            var queue;
            type = (type || "fx") + "queue";
            queue = $.data(elem, type);

            if (data) {
                if (!queue || $.isArray(data)) {
                    queue = $.data(elem, type, $makeArray(data));
                } else {
                    queue.push(data);
                }
            }

            return queue || [];
        }
    };

    /* jQuery */
    $.dequeue = function (elem, type) {
        type = type || "fx";

        var queue = $.queue(elem, type),
            startLength = queue.length,
            fn = queue.shift(),
            _queueHooks = function (elem, type) {
                var key = type + "queueHooks";
                return $.data(elem, key) || $.data(elem, key, {
                    empty: $.Callbacks("once memory").add(function() {
                        $.removeData(elem, [ type + "queue", key ]);
                    })
                });
            },
            hooks = _queueHooks(elem, type),
            next = function () {
                $.dequeue(elem, type);
            };

        if (fn === "inprogress") {
            fn = queue.shift();
            startLength--;
        }

        if (fn) {
            if (type === "fx") {
                queue.unshift("inprogress");
            }

            delete hooks.stop;
            fn.call(elem, next, hooks);
        }

        if (!startLength && hooks && hooks.empty) {
            hooks.empty.fire();
        }
    };

    /* jQuery */
    $.Callbacks = function (options) {
        options = typeof options === "string" ?
            (optionsCache[options] || createOptions(options)) :
            $.extend({}, options);

        var firing,
            memory,
            fired,
            firingLength,
            firingIndex,
            firingStart,
            list = [],
            stack = !options.once && [],
            fire = function (data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false;
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift());
                        }
                    } else if (memory) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
            self = {
                add: function () {
                    if (list) {
                        var start = list.length;
                        (function add(args) {
                            $.each(args, function (_, arg) {
                                var type = $.type(arg);
                                if (type === "function") {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && type !== "string") {
                                    add(arg);
                                }
                            });
                        })(arguments);
                        if (firing) {
                            firingLength = list.length;
                        } else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                empty: function () {
                    list = [];
                    firingLength = 0;
                    return this;
                },
                fireWith: function (context, args) {
                    if (list && (!fired || stack)) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        if (firing) {
                            stack.push(args);
                        } else {
                            fire(args);
                        }
                    }
                    return this;
                },
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                remove: function() {
                    if (list) {
                        $.each(arguments, function(_, arg) {
                            var index;
                            while ((index = $.inArray(arg, list, index)) > -1) {
                                list.splice(index, 1);
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--;
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }

                    return this;
                },
                has: function(fn) {
                    return fn ? $.inArray(fn, list) > -1 : !!(list && list.length);
                },
                disable: function() {
                    list = stack = memory = undefined;
                    return this;
                },
                disabled: function() {
                    return !list;
                },
                lock: function() {
                    stack = undefined;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                locked: function() {
                    return !stack;
                },
                fired: function() {
                    return !!fired;
                }
            };

        return self;
    };

    /******************
     $.fn Methods
     ******************/

    /* jQuery */
    $.fn = $.prototype = {
        init: function(selector) {
            /* Just return the element wrapped inside an array; don't proceed with the actual jQuery node wrapping process. */
            if (selector.nodeType) {
                this[0] = selector;

                return this;
            } else {
                throw new Error("Not a DOM node.");
            }
        },

        offset: function () {
            /* jQuery altered code: Disconnected DOM node checking and iOS3+BlackBerry support has been dropped. */
            var box = this[0].getBoundingClientRect();

            return {
                top: box.top  + (window.pageYOffset || document.scrollTop  || 0)  - (document.clientTop  || 0),
                left: box.left + (window.pageXOffset || document.scrollLeft  || 0) - (document.clientLeft || 0)
            };
        },

        position: function () {
            /* jQuery */
            function offsetParent() {
                var offsetParent = this.offsetParent || document;

                while (offsetParent && (!offsetParent.nodeType.toLowerCase === "html" && offsetParent.style.position === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || document;
            }

            /* Zepto */
            var elem = this[0],
                offsetParent = offsetParent.apply(elem),
                offset = this.offset(),
                parentOffset = /^(?:body|html)$/i.test(offsetParent.nodeName) ? { top: 0, left: 0 } : $(offsetParent).offset()

            offset.top -= parseFloat(elem.style.marginTop) || 0;
            offset.left -= parseFloat(elem.style.marginLeft) || 0;

            if (offsetParent.style) {
                parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0
                parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0
            }

            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            }
        }
    };

    /* Makes $(node) possible, without having to call init. */
    $.fn.init.prototype = $.fn;

    /* Export Velocity onto the container (the window or Zepto), and assign its Utilities property. */
    window.Velocity = { Utilities: $ };
}));