define(["jquery"], function($){

    "use strict;"

    var keys    = Object.keys

    var Cup = function(data, templated, property) {
        var maps     = []
          , children = []
          , self     = this
          , container
          , template


        if(templated) {
            container = $(templated)
            template = container.html()
            container.empty()
            this.property = property
        }

        var add = function(item, list) {
            list.push(item) 
            return item
        }

        self.map = function(property) {
            return add(new Map(property), maps)
        }

        self.map.each = function(property) {
            return {
                to : function(selector, configure) {
                    var cup = add( 
                          new Cup( data[property]
                               , selector
                               , property
                               )
                        , children)
                    configure(cup)
                }
            }
        }

        self.touch = function(property) {

            if(templated) {
                updateList(container
                  , template
                  , data
                  , maps
                )
            } else {
                maps.forEach(function(map){
                    map.update(data, $)
                })    
            }
            
            children.forEach(function(child) {
                child.touch()
            })
        }
    }
    
     

    var Map = function(property) {
        var binding = bindText

        this.to = function(selector) {
            binding = bindText(selector)

            this.css = function(styleName) {
                binding = bindStyle(selector, styleName)
            }

            this.class = function(className) {
                binding = bindClass(selector, className)
            }

            this.attr = function(attrName) {
                binding = bindAttr(selector, attrName)   
            }
            return this
        }

        this.update = function(data, scope) {
            binding(data[property], scope)
        }

        this.property = property
    }


    var bindText = function(selector) {
        return function(value, find) {
            find(selector).text(value)
        }
    }

    var bindStyle = function(selector, styleName) {
        return function(value, find) {
            find(selector).css(styleName, value)
        }
    }

    var bindClass  = function(selector, className) {
        return function(value, find) {
            find(selector).toggleClass(className, !!(value))
        }
    }

    var bindAttr = function(selector, attrName) {
        return function(value, find) {
            find(selector).attr(attrName, value)
        }   
    }

    var updateList = function(container, template, data, maps) {

        data.forEach(function(item, index) {
            var node = container.children().eq(index)
            
            if(!node.length) {
                node = container
                    .append($(template))
                    .children()
                    .eq(index)
            } 
            maps.forEach(function(map) {
                map.update(item, function(selector){
                    return $(selector, node)
                })
            })
        })
    }

    return Cup
})