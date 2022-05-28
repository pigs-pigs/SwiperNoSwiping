// Search/Discover/Recommended


function initCards() {
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://swipernoswiping-3b4f.restdb.io/rest/cards?max=3",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "60ce0b22e2c96c46a246371f",
            "cache-control": "no-cache"
        }
    }
    function createImg(ImgData) {
        var pattern = new RegExp('^http')
        if (pattern.test(ImgData)) {
          return `src="${ImgData}" `
        } else {
          return `style="background-color: ${ImgData};" `
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

    } else if (direction == "RIGHT") {

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