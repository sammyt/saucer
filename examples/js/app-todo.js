define(["saucer"], function(Cup){
    
    var todos = []

    var cup = new Cup({"todos" : todos})
      , map = cup.map
      , input = $('input[type="text"]')

    map.each("todos").to(".todos", function(cup) {
        cup.map("desc").to(".todo-desc")
    })

    var addTodo = function(desc) {
        todos.push({desc : desc})
        cup.touch()
    }

    $("form").on("submit", function(evt) {
        evt.preventDefault()
        addTodo(input.attr("value"))
        input.attr("value", "")
    })
})