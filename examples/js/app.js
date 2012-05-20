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
      , map = cup.map
      , listCup

    map("firstName").to(".first-name")
    map("lastName").to(".last-name")

    map("colour").to(".first-name").css("color")
    map("likesSocks").to(".last-name").class("socks-rock")
    map("webpage").to("a").attr("href")

    map.each("friends")
        .to("ul.friends", function(cup) {
            cup.map("name").to(".friend-name")
            cup.map("type").to(".friend-type")
            listCup = cup
        })

    cup.touch()

    data.friends.unshift({
        name : "russ" ,
        type : "dude"
    })

    cup.touch("firstName")

    //listCup.at(3).touch()
});

