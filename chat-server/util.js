module.exports = {
    removeFromArray: function (array, search_term) {
        for (var i = array.length - 1; i >= 0; i--) {
            if (array[i] === search_term) {
                array.splice(i, 1);
            }
        }
    }, getKey : function (object, value) {
        var object = this;
        return Object.keys(object).find(key => object[key] === value);
    }
}