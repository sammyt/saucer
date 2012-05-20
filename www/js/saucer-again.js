define(["jquery"], function($){

    var keys    = Object.keys
     , contains = $.contains
     , type     = $.type


    var Cup = function(data, templated) {
        var maps     = []
          , children = []
          , self     = this
          , container
          , template


        if(templated) {
            container = $(templated)
            template = container.html()
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
                    var cup = add(new Cup(data[property], selector), children)
                    configure(cup.map.bind(cup))
                }
            }
        }

        self.touch = function() {

            if(templated) {
                updateList( container
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
        var bindings = []

        this.to = function(selector) {
            bindings.push(bindText(selector))
        }

        this.update = function(data, scope) {
            bindings.forEach(function(binding) {
                binding(data[property], scope)
            })
        }

        this.property = property
    }


    var bindText = function(selector) {
        return function(value, find) {
            find(selector).text(value)
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

    function extend(type, overrides) {
        var fn = function(){}
        fn.prototype = new type
        $.extend(fn.prototype, overrides)
        return fn
    }

    return Cup
})