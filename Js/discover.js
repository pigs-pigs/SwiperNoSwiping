// Search
var max = "9";
if ($(window).width() < 720) {
    max = "10";
}

function initCards(query) {
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://swipernoswiping-3b4f.restdb.io/rest/cards?max=" + max + "&filter=" + query,
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
        var max = 9;

        if (data.length > 0) {

            data.forEach(function (Card, Index) {
                $(".search-results").append(`<div data-set="${Card._id}" class="tinder--card discover--card">
                    <img ${createImg(Card.Cover)}>
                  <h3>${Card.Title}</h3>
                    <p>${Card.Description}</p>
                  </div>`)
            });
            $(".search-results").css("opacity", "1");
        } else {
            $(".no-results")
                .html(
                    'No results found for "' +
                    query +
                    '" <h5 style="font-weight:lighter;">Try another term!</h5>'
                )
                .css({ opacity: "1", display: "block" });
        }

    });
    $(".discover--card").click(function (e) {
        var wasClicked = $(e.target)
        if (wasClicked && wasClicked.data("set")) {
            window.location.href = "https://swipernoswiping.netlify.app/swipe?set=" + wasClicked.data("set")
        }
    })
}

var queryParams = new URLSearchParams(window.location.search);
var query = queryParams.get("q");
$(".search-input").val(query)
initCards(query)
