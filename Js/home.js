// Setup Cards
function createImg(ImgData) {
  var pattern = new RegExp("^http");
  if (pattern.test(ImgData)) {
    return `src="${ImgData}" `;
  } else {
    return `style="background-color: ${ImgData};" `;
  }
}

var settings = {
  async: true,
  crossDomain: true,
  url: `https://swipernoswiping-3b4f.restdb.io/rest/cards?max=8&h={"$orderby":{"_created":-1}}`, //Make this be recomended/tag filtered
  method: "GET",
  headers: {
    "content-type": "application/json",
    "x-apikey": "60ce0b22e2c96c46a246371f",
    "cache-control": "no-cache",
  },
};
$.ajax(settings).done(function (response) {
  $.each(response, function (Card) {
    $(".discover-sets").append(`<div data-set="${Card._id}" class="tinder--card discover--card">
        <img ${createImg(Card.Cover)}>
      <h3>${Card.Title}</h3>
        <p>${Card.Description}</p>
      </div>`);
  });
});

$(".discover-sets").on("click", ".discover--card", function () {
  if ($(this).data("set")) {
    window.location.href = "swipe?set=" + $(this).data("set");
  }
});

//Setup Tags
const Tags = {
  Trending: { Color: "linear-gradient(cyan,blue)", Icon: "arrow-trend-up" },
  Hot: { Color: "linear-gradient(orange,red)", Icon: "fire" },
  New: { Color: "linear-gradient(#D500FF,#7700FF)", Icon: "clock" },
  Celebs: { Color: "goldenrod", Icon: "clapperboard" },
  Food: { Color: "#732410", Icon: "utensils" },
  Colors: { Color: "#1C97DA", Icon: "palette" },
  Men: { Color: "#0B14C9", Icon: "person" },
  Women: { Color: "#770AC9", Icon: "person-dress" },
  // Songs: { Color: "#D5157B", Icon: "music" }
};

// Default Tag setup
$.each(Tags, function (Name, Data) {
  $(".tags-container").append(`
     <div class="tag" style="background:${Data.Color};">
        <i class="fa fa-${Data.Icon}"></i>
        <p>${Name}</p>
      </div>
    `);
});

$(".tags-container").append(`
     <div class="tag add-tag">
        <i class="fa fa-plus"></i>
        <p>Add Tags</p>
      </div>
    `);
