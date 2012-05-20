
var map  = new Cup(data).map
  , list  


map(".first-name").to({
    "text"    : "firstName",
    "styles"  : {
        "margin-left" : "indent"
    }
})

map(".last-name").to("lastName")

map(".ul.friends")
    .each("friends")
    .to("li.friend", function(cup){
        list = cup.map
        map(".friend-name").to("name")
        map(".friend-type").to("type")
    })
    

// rerender all list
list.touch("friends")

// rerender at index 3
list.at(3).touch("name")

// remove 2nd item
list.at(2).remove()

// update .first-name node
map.touch("firstName")