var guowei6818 = {
    compact: function(ary){
        return ary.filter(it => it);
    },
    fill: function(array, value, start = 0, end = array.length){
        for(var i = start; i < end; i++){
            array[i] = value;
        }
        return array;
    },
    flatten: function(array){
        var result = [array[0]];
        for(var i = 1; i < array.length; i++){
            result = result.concat(array[i]);
        }
        return result;
    },
    flattenDeep: function(array){
        function deep(ary){
            var result = [ary[0]];
            for(var i = 1; i < ary.length; i++){
                if(ary[i] instanceof Array){
                    ary[i] = deep(ary[i]);
                }
                result = result.concat(ary[i]);
            }
            return result;
        }
        return deep(array);
    },
    flattenDepth: function(array, n){
        var result = [];
        function flatDepth(array, depth = 1){
            for(var i = 0; i < array.length; i++){
                if(array[i] instanceof Array){
                    if(depth > 1){
                        flatDepth(array[i], depth - 1);
                    }else{
                        result.push(array[i]);
                    }
                }else{
                    result.push(array[i]);
                }
            }
            return result;
        }
        flatDepth(array, n);
        return result
    },
    negate: function(f){
        return function(){
            return !f();
        }
    },
    bind: function(f){
        var fixedArgs = Array.from(arguments).slice(1);
        return function(){
            var args = Array.from(arguments);
            return f.apply(null, fixedArgs.concat(args));
        }
    },
    flip: function(f){
        return function(...args){
            return f(...args.reverse());
        }
    },
    before: function(func, n){
        var lastResult
        return function(...args){
            while(n > 0){
                lastResult = func(...args);
                n--
            }
            return lastResult
        }
    },
    ary: function(f, n = f.length){
        return function(...args){
            return f(...args.slice(0, n));
        }
    },
    speard: function(){
        return function(array){
            return f(...array); 
        }
    },
    memoize: function(f){
        var map = {};
        return function(args){
            if(args in map){
                return f(args)
            }else{
                map[args] = f[args];
            }
            
        }
    }
}