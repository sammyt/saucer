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
                var w = this,
                    template;
                
                w.use = function(name){
                    wheres.push({
                        where   : selector,
                        name    : name,
                        template: template
                    });
                    return c;
                }

                w.items = function(itemSelector) {
                    template = root
                        .find(selector)
                        .find(itemSelector)
                        .remove();

                    return w;
                }
                return w;
            }

            c.names = function(namesMap){
                names = namesMap
                return c;
            }

            c.render = function (){
                $(wheres).each(function(index, item){

                    var dest  = root.find(item.where),
                        value = names[item.name];

                    // render a list
                    if(item.template) {
                        $(value).each(function(i, o){
                            dest.append(
                                item.template.clone().text(o)
                            );
                        });

                    // jus a value 
                    } else {
                        dest.text(value);
                    }
                    
                });
            }

            return c;
        }
    }

    return new Saucer;
});