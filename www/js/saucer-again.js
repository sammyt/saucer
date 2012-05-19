define(["jquery"], function($){

    var keys    = Object.keys
     , contains = $.contains
     , type     = $.type

    var Cup = function(data, container) {
        var mappings = []
          , self     = this


        self.map = function(selector) {
            return new Map(selector, mappings.push.bind(mappings))
        }

        self.touch = function() {
            mappings.forEach(function(mapping){
                mapping.apply(self, [data, $])
            })
        }
    }

    var Map = function(selector, add) {

        this.to = function(spec) {

            if(contains(type(spec), ["string", "function"])) {
                add(textMapping(selector, spec))
            } else {
                keys(spec).forEach(function(key) {
                    add(selector, mappings[key])
                })
            }
        }

        this.each = function(prop) {
            return {
                to : function(selector, configure) {
                    configure(function(selector) {
                        return new Map(selector, add)
                    })
                }
            }
        }
    }

    var textMapping = function(selector, spec) {
        return function(data, find){
            find(selector).text(data[spec])
        }
    }


    var mappings = {
        "text" : textMapping
    }

    return Cup
})