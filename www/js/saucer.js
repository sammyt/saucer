define(["jquery"], function($){

    "use strict";
    
    var _update = function(where, names, root, listChange){
        var dest  = root.find(where.where),
            value = names[where.name];

        // render a list
        if(where.template) {

            if(listChange) {
                var from = listChange[0],
                    to = listChange[1]

                if(from < 0) {
                    if(to == 0) {
                        dest.find("li").eq(0).before(
                            where.template.clone().text(value[to])
                        )
                    } else {
                        dest.find("li").eq(to - 1).after(
                            where.template.clone().text(value[to])
                        )
                    }
                    
                }
                console.log(dest.length);
            } else{
                dest.empty();
                $(value).each(function(i, o){
                    dest.append(
                        where.template.clone().text(o)
                    )
                })
            }
            

        // jus a value 
        } else {
            dest.text(value);
        }           
    }

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
                $(wheres).each(function(index, where){
                    _update(where, names, root);
                });
            }

            c.touch = function(name, listChange) {
                wheres.filter(function(item){
                    return item.name == name;
                }).forEach(function(where){
                    _update(where, names, root, listChange);    
                });
            }

            return c;
        }
    }

    return new Saucer;
});