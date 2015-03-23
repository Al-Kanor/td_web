Storage = {

    putString : function (nom, s) {
        localStorage.setItem(nom, s);
    },

    getString : function (s) {
        return localStorage[s];
    },

    putFloat : function(nom, u)
    {
        localStorage.setItem(nom, u);
    },

    getFloat : function(u)
    {
        return parseFloat(localStorage[u]);
    },

    putInt : function (nom, u) {
        localStorage.setItem(nom, u);
    },

    getInt : function (u) {
        return parseInt(localStorage[u]);
    },

    putObject: function(nom, o)
    {
        localStorage.setItem(nom, JSON.stringify(o));
    },

    getObject : function (o)
    {
        return JSON.parse(localStorage[o]);
    },

    clear : function ()
    {
        localStorage.clear();
    }

}