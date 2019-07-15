var guowei6818 = {
    compact: function(ary){
        return ary.filter(it => it);
    },
    fill: function(array, value, start, end){
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
        var result = [array[0]];
        for(var i = 1; i < array.length; i++){
            if(array[i] instanceof Array){
                array[i] = flattenDeep(array[i]);
            }
            result = result.concat(array[i]);
        }
        return result;
    }
}