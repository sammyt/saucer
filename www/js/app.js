requirejs(["saucer"], function (Cup) {

     var cup = new Cup({
        firstName     : "Sam" ,
        lastName : "Williams" ,
        friends  : [
            { name  : "becky"
            , type  : "wife"
            },
            { name  : "skyle"
            , type  : "pet"
            }
        ]
    })

    var map = cup.map

    map("firstName").to(".first-name")
    map("lastName").to(".last-name")

    map.each("friends")
        .to("ul.friends", function(map) {
            map("name").to(".friend-name")
            map("type").to(".friend-type")
        })

    cup.touch()
});

