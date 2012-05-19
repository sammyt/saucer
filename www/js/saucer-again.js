define(["jquery"], function($){

    var keys    = Object.keys
     , contains = $.contains
     , type     = $.type

    var Cup = function(data, container) {
        var maps     = []
          , children = []
          , self     = this
        
        var add = function(item, list) {
            list.push(item) 
            return item
        }

        self.map = function(property) {
            return add(new Map(property), maps)
        }

        self.map.each = function(property) {
            var cup = add(new Cup(property), children)
            return {
                to : function(tmpl, configure) {
                    bindList(tmpl, property)
                    configure(cup.map)
                }
            }
        }

        self.touch = function() {
            maps.forEach(function(map){
                map.update(data)
            })
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

        this.update = function(data) {
            bindings.forEach(function(binding) {
                binding(data[property], $)
            })
        }
    }


    var bindText = function(selector) {
        return function(value, find) {
            find(selector).text(value)
        }
    }

    var bindList = function(selector, property) {
        var container = $(selector)
        var template = container

        return function(list, find) {
        }
    }

    return Cup
})