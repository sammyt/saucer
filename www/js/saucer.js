define(["jquery"], function($){

    "use strict";

    var Cup = function(selector) {
        var self = this
            , data
            , children = []
            , template
            , templateSelector
            , root = $(selector)
            , clauses = []
            , currentClause = {}
        

        var updateClause = function(name, value) {
            var c = currentClause
            c[name] = value
            if(c.selector && c.data) {
                clauses.push(c)
                currentClause = {}
            }
        }


        self.data = function(dataOrName) {
            data = dataOrName
            return self
        }

        self.where = function(wSelector){
            updateClause("selector", wSelector)
            return self
        }

        self.use = function(dataName){
            updateClause("data", dataName)
            return self
        }

        self.cup = function(cSelector){
            var child = new Cup(cSelector)
            children.push(child)
            return child
        }

        self.template = function(tSelector){
            template = root.find(tSelector).remove()
            templateSelector = tSelector
            return self
        }

        self.dataByName = function(name) {
            return data[name]
        }

        self.touch = function(name, parent){

            var toUpdate = clauses.filter(function(clause){
                return name ? clause.data == name : true
            })

            toUpdate.forEach(function(item){
                update.apply(self, [item, parent])
            })

            children.forEach(function(child){
                child.touch(name, self)
            })
        }

        var update = function(clause, parent) {
            var val

            if(typeof data == "string") {
                val = parent.dataByName(data)
            } else {
                val = self.dataByName(clause.data)
            }

            if(!template) {
                root.find(clause.selector).text(val)
            } else {
                val.forEach(function(item, index){
                
                    var node = root
                        .find(templateSelector)
                        .eq(index)

                    if(!node.length) {
                        node = template.clone()
                        root.append(node)
                    }
                    var t = item[clause.data]
                    node.find(clause.selector).text(t)
                })

                root.find(templateSelector)
                    .slice(val.length)
                    .remove()
            }
            
        }
    }


    return {
        cup : function(selector) {
            return new Cup(selector)
        }
    }
})