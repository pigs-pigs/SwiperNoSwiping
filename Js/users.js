function initCards(Id) {
  var settings = {
    async: false,
    crossDomain: true,
    url: `https://swipernoswiping-3b4f.restdb.io/rest/cards?q={"CreatorId":"${Id}"}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": "60ce0b22e2c96c46a246371f",
      "cache-control": "no-cache",
    },
  };
  function createImg(ImgData) {
    var pattern = new RegExp("^http");
    if (pattern.test(ImgData)) {
      return `src="${ImgData}" `;
    } else {
      return `style="background-color: ${ImgData};" `;
    }
  }

  $.ajax(settings).done(function (data) {
    data.forEach(function (Card, Index) {
      $(
        ".sets-holder"
      ).append(`<div data-set="${Card._id}" class="tinder--card account--card">
                    <img ${createImg(Card.Cover)}>
                  <h3>${Card.Title}</h3>
                    <p>${Card.Description}</p>
                  </div>`);
    });
  });
  $(".account--card").click(function () {
    var wasClicked = $(this);
    if (wasClicked && wasClicked.data("set")) {
      window.location.href =
        "https://swipernoswiping.netlify.app/swipe?set=" +
        wasClicked.data("set");
    }
  });
}

function initAccount(Id) {
  //set page title to username
}
var queryParams = new URLSearchParams(window.location.search);
var uid = queryParams.get("id");
//TODO: show loading until these funcs are done -- Make a "Done loading" function for all pages
initAccount(uid);
initCards(uid);
