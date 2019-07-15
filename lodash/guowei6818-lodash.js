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
    }
}