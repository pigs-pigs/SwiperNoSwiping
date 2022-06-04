// Search/Discover/Recommended
var FirstCard = 0
var data
function createImg(ImgData) {
    var pattern = new RegExp('^http')
    if (pattern.test(ImgData)) {
        return `src="${ImgData}" `
    } else {
        return `style="background-color: ${ImgData};" `
    }
}

var settings = {
    "async": false,
    "crossDomain": true,
    "url": `https://swipernoswiping-3b4f.restdb.io/rest/cards?max=150&h={"$orderby":{"_created":-1}}`,
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "x-apikey": "60ce0b22e2c96c46a246371f",
        "cache-control": "no-cache"
    }
}
$.ajax(settings).done(function (response) { data = response });

function initCards(Starter) {
    for (let index = Starter; index <= Starter + 2; index++) {
        var Card = data[index]
        $(".discover-cards").append(`<div data-set="${Card._id}" class="tinder--card discover--card ${index == Starter + 1 && `center-card`}">
            <img ${createImg(Card.Cover)}>
          <h3>${Card.Title}</h3>
            <p>${Card.Description}</p>
          </div>`)
    }
}

$(".discover-cards").on("click", ".discover--card", function () {
    if ($(this).data("set")) {
        window.location.href = "swipe?set=" + $(this).data("set")
    }
})

initCards(0)


function moveCards(direction) {
    console.log(FirstCard,data.length)
    if (direction == "LEFT" && FirstCard > 0) {
        FirstCard -= 1
        $($(".discover-cards").children()[2]).remove()

        var Card = data[FirstCard]
        $(".discover-cards").prepend(`<div data-set="${Card._id}" class="tinder--card discover--card">
        <img ${createImg(Card.Cover)}>
      <h3>${Card.Title}</h3>
        <p>${Card.Description}</p>
      </div>`)
        $($(".discover-cards").children()[2]).removeClass("center-card")
        $($(".discover-cards").children()[1]).addClass("center-card")

    } else if (direction == "RIGHT" && FirstCard < data.length - 3) {
        FirstCard += 1
        $($(".discover-cards").children()[0]).remove()
        $($(".discover-cards").children()[0]).removeClass("center-card")
        $($(".discover-cards").children()[1]).addClass("center-card")

        var Card = data[FirstCard + 2]
        $(".discover-cards").append(`<div data-set="${Card._id}" class="tinder--card discover--card">
        <img ${createImg(Card.Cover)}>
      <h3>${Card.Title}</h3>
        <p>${Card.Description}</p>
      </div>`)
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