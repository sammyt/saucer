requirejs(["saucer"], function (Cup) {

    var data = {
        firstName  : "Sam" ,
        lastName   : "Williams" ,
        colour     : "#00ff00" ,
        likesSocks : true ,
        webpage    : "http://www.ziazoo.co.uk" ,
        friends    : [
            { name  : "becky"
            , type  : "wife"
            },
            { name  : "skyla"
            , type  : "pet"
            }
        ]
    }

    var cup = new Cup(data)

    var map = cup.map

    map("firstName").to(".first-name")
    map("lastName").to(".last-name")

    map("colour").to(".first-name").css("color")
    map("likesSocks").to(".last-name").class("thing")
    map("webpage").to("a").attr("href")

    map.each("friends")
        .to("ul.friends", function(map) {
            map("name").to(".friend-name")
            map("type").to(".friend-type")
        })

    cup.touch()

    data.friends.unshift({
        name : "russ" ,
        type : "dude"
    })

    cup.touch("firstName")
});

