// Setup Cards
function createImg(ImgData) {
  var pattern = new RegExp("^http");
  if (pattern.test(ImgData)) {
    return `src="${ImgData}" `;
  } else {
    return `style="background-color: ${ImgData};" src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"`;
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
  $.each(response, function (Index, Set) {
    $(
      ".discover-sets"
    ).append(`<div data-set="${Set._id}" class="tinder--card discover--card">
        <img ${createImg(Set.Cover)}>
      <h3>${Set.Title}</h3>
        <p>${Set.Description}</p>
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
     <div class="tag" data-tagcolor="${Data.Color}" data-tagname="${Name}" style="background:${Data.Color};">
        <i class="fa fa-${Data.Icon}"></i>
        <p>${Name}</p>
      </div>
    `);
});

$(".tags-container").on("click",".tag:not(.add-tag)", function () {
  $(".tags-container .tag:not(.add-tag)").css({"background": "gray","transform":"none"});
  $(this).css({"background": $(this).data("tagcolor"),"transform":"scale(1.15)"});
});
//what abt a remove tag filter button? maybe a little x next to the Tags text or the tiny icon if i add that next to sets title

$(`<div class="tag add-tag"><i class="fa fa-plus"></i><p>Add Tags</p></div>`)
  .appendTo(".tags-container")
  .click(function () {
    //do add stuff here
  });
