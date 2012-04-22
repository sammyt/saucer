define(["jquery"], function($){

    "use strict";
    
    var Saucer = function(){
        var self = this;

        self.cup = function(node){
            var c = this,
                wheres = [],
                names,
                root = $(node);


            c.where = function(selector){
                var w = this;
                
                w.use = function(name){
                    wheres.push({
                        where : selector,
                        name : name
                    });
                    return c;
                }
                return w;
            }

            c.names = function(namesMap){
                names = namesMap
                return c;
            }

            c.render = function (){
                $(wheres).each(function(index, item){
                    root.find(item.where).text(
                        names[item.name]
                    );
                });
            }

            return c;
        }
    }

    return new Saucer;
});