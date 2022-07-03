function initCards(Id) {
  var settings = {
    async: true,
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
      return `style="background-color: ${ImgData};" src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"`;
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

function initAccount(userData) {
  //set page title to username

  $(".account-frame h1").text(userData.username);
  $(".account-frame .bio").text(userData.bio);
  $(".account-frame .profile")
    .attr("src", userData.profile)
    .css("background-color", userData.color);
  $(".account-frame .background").css("background-color", userData.color);
  $(".account-frame").css("opacity", "1");
}
// Profile Edit Page
if (
  window.location.pathname == "/profile" ||
  window.location.pathname == "/profile.html"
) {
  const user = $.getCurrentUser();
  if (!user) {
    window.location.pathname = "/home";
  }
  initCards(user.userId);
  initAccount(user);

  //Userrs Page
} else {
  var queryParams = new URLSearchParams(window.location.search);
  var uid = queryParams.get("id");
  if (!uid) {
    window.location.pathname = "/404";
  }
  //get user sets
  var settings = {
    async: false,
    crossDomain: true,
    url: `https://swipernoswiping-3b4f.restdb.io/rest/userdata?q={"userid":"${uid}"}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": "60ce0b22e2c96c46a246371f",
      "cache-control": "no-cache",
    },
  };
  $.ajax(settings).done(function (data) {
    if (!data[0]) {
      window.location.pathname = "/404";
      return null;
    }
    document.title = data[0].username + " - Swiper";
    initAccount(data[0]);
    initCards(uid);
  });
}
