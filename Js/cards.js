var CardsList = [];
var SetData = {
  Title: " ",
  Description: " ",
  CreatorId: " ",
  Cover: " "
};

function getSetId() {
  var queryParams = new URLSearchParams(window.location.search);
  var setId = queryParams.get("set");
  return setId
}
var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://swipernoswiping-3b4f.restdb.io/rest/cards/" + getSetId(),
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": "60ce0b22e2c96c46a246371f",
    "cache-control": "no-cache"
  }
}

function createImg(ImgData,FullPage) {
  var pattern = new RegExp('^http')
  if (pattern.test(ImgData)) {
    return `src="${ImgData}" ` + FullPage && `style="height:100%;"`
  } else {
    return `style="background-color: ${ImgData}; ${FullPage && `height:100%;`}" src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"`
  }
}


$.ajax(settings).done(function (data) {
  if (!data || data.length == 0) {
    window.location.href = "https://swipernoswiping.netlify.app/404"
  }
  SetData.Title = data.Title
  SetData.Description = data.Description
  SetData.CreatorId = data.CreatorId
  SetData.Cover = data.Cover
  CardsList = data.Cards;

  // Create Cover Card
  $(".tinder--cards").append(`<div class="tinder--card set-starter">
      <img ` + createImg(SetData.Cover) + `>
      <h3>`+ SetData.Title + `</h3>
      <p>`+ SetData.Description + `<br><br><br>(Swipe this card to begin)</p>
    </div>`)
});

CardsList.forEach(function (Card, Index) {
  $(".tinder--cards").append(`<div class="tinder--card">
      <img ` + createImg(Card.Image,Card.FullPage) + `>
      <h3>`+ Card.Heading + `</h3>
      <p>`+ Card.Description + `</p>
    </div>`)
});


//MAKE CARDS INTERACTIVE
var tinderContainer = document.querySelector(".tinder");
var allCards = document.querySelectorAll(".tinder--card");


function initCards() {
  var newCards = document.querySelectorAll(".tinder--card:not(.removed)");

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform =
      "scale(" + (20 - index) / 20 + ") translateY(-" + 30 * index + "px)";
    card.style.opacity = (10 - index) / 10;
  });
  tinderContainer.classList.add("loaded");
  if (newCards.length == 0){
    //Finished popup
    $(".end-overlay").css({"visibility":"visible","opacity":"0.7"})
    $(".end-modal").css({"visibility":"visible","opacity":"1"})
  }
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on("pan", function (event) {
    el.classList.add("moving");
  });

  hammertime.on("pan", function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle("tinder_love", event.deltaX > 0);
    tinderContainer.classList.toggle("tinder_nope", event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform =
      "translate(" +
      event.deltaX +
      "px, " +
      event.deltaY +
      "px) rotate(" +
      rotate +
      "deg)";
  });

  hammertime.on("panend", function (event) {
    el.classList.remove("moving");
    tinderContainer.classList.remove("tinder_love");
    tinderContainer.classList.remove("tinder_nope");

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 70 || Math.abs(event.velocityX) < 0.3;

    event.target.classList.toggle("removed", !keep);

    if (keep) {
      event.target.style.transform = "";
    } else {
      var endX = Math.max(
        Math.abs(event.velocityX) * moveOutWidth,
        moveOutWidth
      );
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform =
        "translate(" +
        toX +
        "px, " +
        (toY + event.deltaY) +
        "px) rotate(" +
        rotate +
        "deg)";

      if (!el.classList.contains("set-starter")) {
        updateNum(toX > 0);
      }
      initCards();
      setTimeout(function () { el.remove() }, 900);
    }
  });
});

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll(".tinder--card:not(.removed)");
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add("removed");

    if (love) {
      card.style.transform =
        "translate(" + moveOutWidth + "px, -100px) rotate(-30deg)";
    } else {
      card.style.transform =
        "translate(-" + moveOutWidth + "px, -100px) rotate(30deg)";
    }
    if (!card.classList.contains("set-starter")) {
      updateNum(love);
    }
    initCards();
    setTimeout(function () { card.remove() }, 2000);
    event.preventDefault();
  };
}

const nope = $("#nope");
const love = $("#love");

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.click(nopeListener);
love.click(loveListener);

var likedNum = 0;
var dislikedNum = 0;

function updateNum(liked) {
  if (liked == true) {
    likedNum += 1;
    $(".right p span").text(likedNum);
  } else {
    dislikedNum += 1;
    $(".left p span").text(dislikedNum);
  }
}

// Swipe and create mobile compatability
// Set info page with stats
//make top left icon go to /home
// New cool home page with discover stuff