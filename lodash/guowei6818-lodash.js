/*
 * @Description: lodash
 * @Author: your name
 * @Date: 2019-07-10 17:11:25
 * @LastEditTime: 2019-08-24 19:03:42
 * @LastEditors: Please set LastEditors
 */
var guowei6818 = function(){
    /**
     * @description: 过滤数组中为false的元素，如：null,false,"",0,NaN,undefined
     * @param {Array} Array
     * @return: {Array}
     */
    function compact(ary){
        return ary.filter(it => it);
    }

    /**
     * @description: 从开始到结束位置（不包括）填充数组
     * @param {Array} array 
     * @return: {Array}
     */
    function fill(array, value, start = 0, end = array.length){
        for(var i = start; i < end; i++){
            array[i] = value;
        }
        return array;
    }

    /**
     * @description: 展开多维数组，只展开一层
     * @param {Array} Array 
     * @return: Array
     */
    function flatten(array){
        var result = [array[0]];
        for(var i = 1; i < array.length; i++){
            result = result.concat(array[i]);
        }
        return result;
    }
    
    /**
     * @description: 将多维数组展开成一维数组
     * @param {Array} Array
     * @return: Array
     */
    function flattenDeep(array){
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
    }

    /**
     * @description: 将多维数组展开n层
     * @param {Array} Array 
     * @param {Number} n 
     * @return: Array
     */
    function flattenDepth(array, n){
        var result = [];
        function flatDepth(array, depth = 1){
            for(var i = 0; i < array.length; i++){
                if(array[i] instanceof Array){
                    if(depth > 0){
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
    }

    /**
     * @description: 返回一个函数，对原函数进行取反
     * @param {function} function
     * @return: function
     */
    function negate(f){
        return function(){
            return !f();
        }
    }

    /**
     * @description: 绑定原函数的参数值
     * @param {function} f
     * @return: function
     */
    function bind(f, thisArg, ...fixedArgs){
        return function(...args){
            var acturalArgs = [...fixedArgs]
            for(var i = 0; i < acturalArgs.length; i++){
                if(acturalArgs[i] === window){
                    acturalArgs[i] = args.shift()
                }
            }
            acturalArgs.push(...args)
            return f.apply(thisArg, acturalArgs)
        }
    }

    /**
     * @description: 创建一个函数，对原函数的参数进行翻转
     * @param {function} f
     * @return: function
     */
    function flip(f){
        return function(...args){
            return f(...args.reverse());
        }
    }

    /**
     * @description: 创建一个函数，将所创建的函数绑定参数，调用次数少于n次。后续调用将返回上次func调用的结果。
     * @param {function} func
     * @return: 
     */
    function before(func, n){
        var lastResult
        return function(...args){
            while(n > 0){
                lastResult = func(...args);
                n--
            }
            return lastResult
        }
    }

    /**
     * @description: 创建一个函数，对接收的参数只接受前n个，忽略后面的参数
     * @param {function} function 
     * @return: function
     */
    function ary(f, n = f.length){
        return function(...args){
            return f(...args.slice(0, n));
        }
    }

    /**
     * @description: 创建一个函数，该函数绑定一组参数，类似于apply函数
     * @param {function} f 
     * @return: function
     */
    function spread(f){
        return function(array){
            return f(...array); 
        }
    }

    /**
     * @description: 创建一个函数，将函数调用的结果存储起来方便下次调用
     * @param {function} function
     * @return: function
     */
    function memoize(f){
        var map = {};
        return function(args){
            if(args in map){
                return f(args)
            }else{
                map[args] = f[args];
            }
            
        }
    }

    /**
     * @description: 将数组按size的大小进行分割，剩余元素组成数组的最后一部分
     * @param {Array} 
     * @param {Number} 
     * @return: Array
     */
    function chunk(array, size = 1){
        var result = [];
        var start = 0;
        for(var i = 0; i < array.length; i++){
            if((i + 1) % size == 0){
                var temp = array.slice(start, i + 1);
                result.push(temp);
                start = i + 1;
            }
        }
        if(array.length % size != 0){
            result.push(array.slice(start));
        }
        return result;
    }

    /**
     * @description: 创建一个数组，返回第一个数组中不包含在第二个数组中的元素
     * @param {Array} array
     * @param {Array | value} ...values
     * @return: Array
     */
    function difference(array, ...values){
        var array2 = [];
        for(var val of values){
            array2 = array2.concat(val);
        }
        return array.filter(num => array2.indexOf(num) == -1);
    }

    /**
     * @description: 类似difference,接受为数组的每个元素和值调用的iteratee，以生成比较它们的标准。
     * @param {Array} array 
     * @param {Array|values} ...values 
     * @return: Array
     */
    function differenceBy(array, ...values){
        var iteratee;
        var tmp = values[values.length - 1];
        if(typeof(tmp) === "function"){
            iteratee = values.pop();
        }else if(typeof(tmp) === "string"){
            values.pop();
            iteratee = it => it[tmp];
        }else{
            iteratee = it => it;
        }
        var newArray = [].concat(...values);
        newArray = newArray.map(x => iteratee(x));
        let result = [];
        array.forEach(item => {
            if (!newArray.includes(iteratee(item))) {
                result.push(item)
            }
        });
        return result;
    }

    function differenceWith(array, values, comparator){
        if(values.length === 0) return array;
        let result = [];
        comparator = iteratee(comparator);
        for(var i = 0; i < array.length; i++){
            let char = array[i];
            if(!values.every(item => comparator(char, item))) result.push(char);
        }
        return result;
    }

    /**
     * @description: 接收一个数组，返回数组中第n位之后的元素
     * @param {Array} array 
     * @param {Number} n 
     * @return: Array
     */
    function drop(array, n = 1){
        return array.slice(n > 0 ? n : 0);
    }

    /**
     * @description: 接收一个数组，返回数组中第n位之前的元素
     * @param {Array} array
     * @param {Number} n
     * @return: Array
     */
    function dropRight(array, n = 1){
        if(n >= array.length){
            return []
        }else{
            return array.slice(0, array.length - n);
        }
    }

    /**
     * @description: 创建一个数组切片，其中不包括从末尾删除的元素。元素将被删除，直到谓词返回错误。谓词由三个参数调用:(值、索引、数组)。
     * @param {Array} array 
     * @param {*} predicate
     * @return: Array
     */
    function dropRightWhile(array, predicate){
        let func = iteratee(predicate);
        let result = array.slice();
        for(var i = array.length - 1; i >= 0; i--){
            if(!func(array[i], i, array)){
                break;
            }
            result.pop();
        }
        return result;
    }

    function dropWhile(array, predicate){
        let func = iteratee(predicate);
        let result = array.slice();
        for(var i = 0; i < array.length; i++){
            if(!func(array[i], i, array)){
                break;
            }
            result.shift();
        }
        return result;
    }
    
    /**
     * @description: 创建一个函数，该函数使用所创建函数的参数调用func。如果func是属性名，则创建的函数返回给定元素的属性值。如果func是一个数组或对象，对于包含等效源属性的元素，创建的函数返回true，否则返回false。
     * @param {function} func 
     * @return: function
     */
    function iteratee(func){
        if(isString(func)) return property(func);
        if(isPlainObject(func)) return matches(func);
        if(isArray(func)) return matchesProperty(func[0],func[1]);
        return func;
    }

    /**
     * @description: 原生ES方法Object.prototype.toString，给定一个值判断数据类型
     * @param {*} value
     * @return: String
     */
    function getTag(value){
        return Object.prototype.toString.call(value);
    }

    /**
     * @description: 给定一个值判断是否为Object类型
     * @param {*} value 
     * @return: boolean
     */
    function isPlainObject(value){
        if(!value || typeof(value) !== "object") return false;
        let proto = Object.getPrototypeOf(value);
        if(proto === null || proto === Object.prototype){
            return true;
        }
        return false;
    }

    /**
     * @description: 给定一个值判断是否为Array类型
     * @param {*} value
     * @return: boolean
     */
    function isArray(value){
        return getTag(value) === "[object Array]"
    }

    /**
     * @description: 给定一个值判断是否为object类型
     * @param {*} value 
     * @return: boolean
     */
    function isObject(value){
        let type = typeof(value);
        return (value !== null) && (type === "object" || type === "function")
    }

    /**
     * @description: 创建一个函数，该函数返回给定对象路径处的值。
     * @param {Array|string} path
     * @return: Function
     */
    function property(path){
        return function(obj){
            return get(obj, path)
        }
        //return bind(get, null, window, path);
    }

    /**
     * @description: 获取对象路径处的值。如果解析值未定义，则返回defaultValue。
     * @param {type} 
     * @return: 
     */
    function get(object, path, defaultValue){
        if(isString(path)){
            path = toPath(path);
        }
        for(let i = 0; i < path.length; i++){
            if(object == undefined){
                return defaultValue
            }
            object = object[path[i]];
        }
        return object;
    }
    function toPath(str){
        return str.split(/\.|\[|\]./g)
    }

    /**
     * @description: 判断一个元素是否是另一个元素的子集,创建一个函数，该函数在给定对象和源之间执行部分深度比较，如果给定对象具有等效的属性值，则返回true，否则返回false。
     * @param {type} 
     * @return: boolean
     */
    function matches(src){
        return function(obj){
            return isMatch(obj, src);
        }
    }

    /**
     * @description: 创建一个函数，该函数在给定对象的路径值与srcValue之间执行局部深度比较，如果对象值相等则返回true，否则返回false。
     * @param {type} 
     * @return: boolean
     */
    function matchesProperty(path, value){
        return function(obj){
            return isEqual(get(obj, path), value);
        }
    }

    /**
     * @description: 在对象和源之间执行部分深度比较，以确定对象是否包含等效的属性值。
     * @param {type} 
     * @return: boolean
     */
    function isMatch(obj, src){
        if(obj === src){
            return true;
        }
        for(var key in src){
            if(typeof src[key] == "object" && src[key] !== null){
                if(!isMatch(obj[key], src[key])){
                    return false
                }
            }else{
                if(obj[key] != src[key]){
                    return false
                }
            }
        }
        return true
    }

    /**
     * @description: 判断一个值是否为String类型
     * @param {*} value 
     * @return: boolean
     */
    function isString(value){
        return getTag(value) === "[object String]"
    }

    /**
     * @description: 对两个元素进行深度比较判断是否相等
     * @param {*} value 
     * @param {*} other 
     * @return: boolean
     */
    function isEqual(value, other){
        // if(value === other) return true;
        if(value !== value && other !== other) return true;
        if(isObject(value) && isObject(other)){
            const valueKeys = Object.keys(value);
            const otherKeys = Object.keys(other);
            if(valueKeys.length !== otherKeys.length) return false;
            for(let item in value){
                if(isEqual(value[item],other[item])){
                    continue;
                }else{
                    return false;
                }
            }
            return true
        }
        return value === other;
    }

    /**
     * @description: 类似于find，它返回满足条件的第一个元素的索引，而不是元素本身。
     * @param {Array} array
     * @param {*} predicate
     * @param {Number} fromIndex
     * @return: Number
     */
    function findIndex(array, predicate, fromIndex = 0){
        let len = array == null ? 0 : array.length;
        if(!len) return -1
        let test = iteratee(predicate);
        for(var i = fromIndex; i < len; i++){
            if(test(array[i], i, array)){
                return i
            }
        }
        return -1;
    }

    /**
     * @description: 类似findIndex，从后往前查找，返回满足条件的第一个元素的索引，而不是元素本身。
     * @param {Array} array
     * @param {*} predicate
     * @param {Number} fromIndex
     * @return: Number
     */
    function findLastIndex(array, predicate, fromIndex = array.length - 1){
        let len = array == null ? 0 : array.length;
        if(!len) return -1
        let test = iteratee(predicate);
        for(var i = fromIndex; i >= 0; i--){
            if(test(array[i], i, array)){
                return i
            }
        }
        return -1;
    }

    /**
     * @description: 将由键值对组成的数组转换成由键值对组成的新对象
     * @param {Array} pairs  
     * @return: Object
     */
    function fromPairs(pairs){
        let result = {};
        for(var i = 0; i < pairs.length; i++){
            result[pairs[i][0]] = pairs[i][1];
        }
        return result;
    }

    /**
     * @description: 获取数组元素的第一个元素
     * @param {Array} array
     * @return: *
     */
    function head(array){
        return array.length > 0 ? array[0] : undefined;
    }

    /**
     * @description: 从给定的索引值开始查找数组中给定值的索引
     * @param {Array} array 
     * @param {*} value 
     * @param {Number} fromIndex 
     * @return: Number
     */
    function indexOf(array, value, fromIndex = 0){
        if(fromIndex < 0){
            fromIndex = array.length + fromIndex;
        }
        for(let i = fromIndex; i < array.length; i++){
            if(array[i] === value){
                return i
            }else if(array[i] !== array[i] && value !== value){
                return i;
            }
        }
        return -1;
    }

    /**
     * @description: 获取数组中出最后一个元素外的所有元素并返回
     * @param {Array} array 
     * @return: array
     */
    function initial(array){
        return array.length > 0 ? array.slice(0, -1) : [];
    }

    /**
     * @description: 给定若干个数组返回其中所有数组都包含在内的值，值的顺序由第一个数组决定
     * @param {Array} arrays 
     * @return: array
     */
    function intersection(...args){
        args = flatten(args);
        const arr = args.shift()
        return arr.filter(item => args.includes(item));
    }

    function intersectionBy(...args){
        args = flatten(args);
        const arr = args.shift();
        const predicate = args.pop();
        predicate = iteratee(predicate);
        let res = [];
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < args.length; j++){
                if(predicate(arr[i]) === predicate(args[j])){
                    res.push(arr[i]);
                    break;
                }
            }
        }
        return res;
    }

    function intersectionWith(...args){
        args = flatten(args);
        const arr = args.shift();
        const predicate = args.pop();
        let res = [];
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < args.length; j++){
                if(predicate(arr[i]) === predicate(args[j])){
                    res.push(arr[i]);
                    break;
                }
            }
        }
        return res;
    }

    /**
     * @description: 将数组中的元素转换成由分隔符拼接的字符串
     * @param {array} array
     * @param {string} separator
     * @return: string
     */
    function join(array, separator=','){
        let res = "";
        for(let i = 0; i < array.length; i++){
            if(i == array.length - 1){
                res += array[i];
            }else{
                res += array[i].toString() + separator.toString();
            }
        }
        return res;
    }

    /**
     * @description: 返回数组的最后一项
     * @param {array} array
     * @return: *
     */
    function last(array){
        return array[array.length - 1];
    }

    /**
     * @description: 倒序获取数组中值为value的元素的索引
     * @param {Array} array
     * @param {*} value
     * @param {Number} fromIndex
     * @return: Number
     */
    function lastIndexOf(array, value, fromIndex = array.length - 1){
        if(fromIndex > array.length - 1){
            fromIndex -= array.length; 
        }
        for(let i = fromIndex; i >= 0; i--){
            if(array[i] === value){
                return i;
            }else if(array[i] !== array[i] && value !== value){
                return i;
            }
        }
        return -1;
    }

    /**
     * @description: 获取数组中第n个数值，若n小于零返回从末尾开始第n个数值
     * @param {array} array 
     * @param {Number} n 
     * @return: number
     */
    function nth(array, n = 0){
        if(n >= 0){
            return array[n];
        }else{
            return array[array.length + n];
        }
    }

    /**
     * @description: 返回数组中不包含values中的值的元素
     * @param {array} array
     * @return: array
     */
    function pull(array, ...values){
        let res = [];
        for(let i = 0; i < array.length; i++){
            if(values.indexOf(array[i]) == -1){
                res.push(array[i]);
            }
        }
        return res;
    }

    /**
     * @description: 返回数组中不包含在数组values中值的元素
     * @param {array} array 
     * @param {array} values 
     * @return: 
     */
    function pullAll(array, values){
        let res = [];
        for(let i = 0; i < array.length; i++){
            if(values.indexOf(array[i]) == -1){
                res.push(array[i]);
            }
        }
        return res;
    }

    /**
     * @description: 传入两个数组，和比较条件，返回不满足条件的第一个数组中不包含在第二个数组中的元素
     * @param {array} array 
     * @param {Array} values 
     * @param {*} predicate 
     * @return: 
     */
    function pullAllBy(array, values, predicate){
        let res = [];
        predicate = iteratee(predicate);
        for(let i = 0; i < array.length; i++){
            for(let j = 0; j < values.length; j++){
                if(predicate(array[i]) === predicate(values[j])){
                    res.push(array[i])
                    break;
                }
            }
        }
        return pullAll(array, res);
    }

    /**
     * @description: 
     * @param {type} 
     * @return: 
     */
    function pullAllWith(array, values, comparator){
        let res = [];
        for(let i = 0; i < array.length; i++){
            for(let j = 0; j < values.length; j++){
                if(comparator(array[i], values[j])){
                    res.push(array[i])
                    break;
                }
            }
        }
        return pullAll(array, res);
    }

    /**
     * @description: 传入一个数组，将数组反转
     * @param {Array} array 
     * @return: array
     */
    function reverse(array){
        var res = [];
        for(var i = array.length - 1; i >= 0; i--){
            res.push(array[i]);
        }
        return res;
    }

    /**
     * @description: 使用二分法查找来确定插入值的索引，使数组在插入值后依然有序
     * @param {array} array
     * @param {Number} value
     * @return: array
     */
    function sortedIndex(array, value){
        let left = 0;
        let right = array.length - 1;
        let mid;
        while(left < right){
            mid = Math.floor((right - left) / 2);
            if(array[left] > value){
                return left;
            }else if(array[right] < value){
                return right + 1;
            }else if(array[mid] < value){
                if(array[mid + 1] > value){
                    return mid + 1;
                }else{
                    left = mid + 1;
                }
            }else if(array[mid] >= value){
                if(array[mid - 1] < value){
                    return mid;
                }else{
                    right = mid - 1;
                }
            }
        }
        return mid + 1;
    }

    function isNaN(val){
       return isNumber(val) && val !== +val;
    }

    function isNumber(val){
        return (typeof(val) === "number") || (getTag(val) === "[object Null]")
    }

    function SameValueZero(a, b){
        if(isNaN(a) && isNaN(b)){
            return true;
        }
        return a === b
    }

    /**
     * @description: 给定一个数组和一个值，从特定的索引开始查找该值是否在数组中
     * @param {*} colection 
     * @return: boolean
     */
    function includes(colections, value, fromIndex = 0){
        if(typeof(colections) === "string"){
            return colections.includes(value, fromIndex);
        }
        for(var val of Object.values(colections)){
            var idx = 0;
            if(idx >= fromIndex){
                if(val === value){
                    return true;
                }
            }
            idx++;
        }
        return false;
    }

    function filter(array, predicate){
        let result = [];
        predicate = iteratee(predicate);
        for(let i = 0; i < array.length; i++){
            if(predicate(array[i], i, array)){
                result.push(array[i]);
            }
        }
        return result;
    }

    return {
        compact,
        fill,
        flatten,
        flattenDeep,
        flattenDepth,
        negate,
        bind,
        flip,
        before,
        ary,
        spread,
        memoize,
        chunk,
        difference,
        differenceBy,
        differenceWith,
        drop,
        dropRight,
        dropRightWhile,
        dropWhile,
        iteratee,
        getTag,
        isPlainObject,
        isArray,
        isObject,
        property,
        get,
        //matches,
        //MatchesProperty,
        isMatch,
        isString,
        isEqual,
        findIndex,
        findLastIndex,
        fromPairs,
        head,
        indexOf,
        initial,
        intersection,
        intersectionBy,
        intersectionWith,
        join,
        last,
        lastIndexOf,
        nth,
        pull,
        pullAll,
        pullAllBy,
        pullAllWith,
        reverse,
        sortedIndex,
        isNumber,
        isNaN,
        // SameValueZero,
        includes,
        filter,
    }
}()