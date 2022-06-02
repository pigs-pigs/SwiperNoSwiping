// Search/Discover/Recommended
var MiddleCard = 1
function createImg(ImgData) {
    var pattern = new RegExp('^http')
    if (pattern.test(ImgData)) {
        return `src="${ImgData}" `
    } else {
        return `style="background-color: ${ImgData};" `
    }
}

function initCards() {
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": `https://swipernoswiping-3b4f.restdb.io/rest/cards?max=3&skip=${MiddleCard - 1}&h={"$orderby":{"_created":-1}}`,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "60ce0b22e2c96c46a246371f",
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (data) {
        data.forEach(function (Card, Index) {
            $(".discover-cards").append(`<div data-set="${Card._id}" class="tinder--card discover--card ${Index == 1 && `center-card`}">
                <img ${createImg(Card.Cover)}>
              <h3>${Card.Title}</h3>
                <p>${Card.Description}</p>
              </div>`)
        });
    });
    $(".discover--card").click(function (e) {
        var wasClicked = $(e.target)
        if (wasClicked && wasClicked.data("set")) {
            window.location.href = "swipe?set=" + wasClicked.data("set")
        }
    })
}

function addCard() {
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": `https://swipernoswiping-3b4f.restdb.io/rest/cards?max=1&skip=${MiddleCard}&h={"$orderby":{"_created":-1}}`,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "60ce0b22e2c96c46a246371f",
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (data) {
        data.forEach(function (Card, Index) {
            $(".discover-cards").append(`<div data-set="${Card._id}" class="tinder--card discover--card">
                <img ${createImg(Card.Cover)}>
              <h3>${Card.Title}</h3>
                <p>${Card.Description}</p>
              </div>`)
        });
    });
    $(".discover--card").click(function (e) {
        var wasClicked = $(e.target)
        if (wasClicked && wasClicked.data("set")) {
            window.location.href = "swipe?set=" + wasClicked.data("set")
        }
    })
}

initCards()


function moveCards(direction) {
    if (direction == "LEFT") {
        MiddleCard -= 1
        $(".discover-cards").children()[2].remove()
        $(".discover-cards").children()[1].removeClass("center-card")
        $(".discover-cards").children()[1].addClass("center-card")
    } else if (direction == "RIGHT") {
        MiddleCard += 1
        $(".discover-cards").children()[0].remove()
        $(".discover-cards").children()[0].removeClass("center-card")
        $(".discover-cards").children()[1].addClass("center-card")
        addCard()
    }
}

$(document).keydown(function (e) {
    if (e.keyCode == 37) { //Left
        moveCards("LEFT")
    } else if (e.keyCode == 39) { //Right
        moveCards("RIGHT")
    }
});

$(".fa-angle-right").click(function () {
    moveCards("RIGHT")
})

$(".fa-angle-left").click(function () {
    moveCards("LEFT")
})