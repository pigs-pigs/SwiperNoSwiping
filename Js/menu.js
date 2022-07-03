//Fast Load User Info
$.getCurrentUser = function () {
  function getCookie() {
    var name = "currentUser=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        return c.substr(name.length);
      }
    }
  }
  if (getCookie("currentUser")) {
    var userData = JSON.parse(getCookie("currentUser"));
    return userData
  } else return null;
};

if ($.getCurrentUser()) {
  var userData = $.getCurrentUser();
  $(".profile-btn span").text(userData.username);
  $(".profile-btn img")
    .attr("src", userData.profile)
    .css("background", userData.color);
}
//Searching
$(".search-input").keydown(function (e) {
  if (e.keyCode == 13 && $(".search-input").val().trim()) {
    window.location.href =
      "https://swipernoswiping.netlify.app/discover?q=" +
      $(".search-input").val().trim();
  }
});
$(".search-wrapper i").click(function () {
  if ($(".search-input").val().trim()) {
    window.location.href =
      "https://swipernoswiping.netlify.app/discover?q=" +
      $(".search-input").val().trim();
  }
});

$(document).on("click", function (e) {
  //TODO: unbind these in the future
  if (
    $("#notifs-container").css("display") !== "none" &&
    $(e.target).closest("#notifs-container").length === 0 &&
    $(e.target).closest(".notification-btn").length === 0
  ) {
    $("#notifs-container").fadeOut();
  }

  if (
    $("#user-options").css("display") !== "none" &&
    $(e.target).closest("#user-options").length === 0 &&
    $(e.target).closest(".profile-btn").length === 0
  ) {
    $("#user-options").fadeOut();
  }
});

$(".notification-btn").click(function () {
  $("#notifs-container").fadeToggle();
});

function buildNotif() {
  `<div class="message-box">
      <img src="" alt="profile image">
      <div class="message-content">
        <div class="message-header">
          <div class="name">Swiper</div>
          <i class="fa fa-star"></i>
        </div>
        <p class="message-line">
          Person liked your set lolz!
        </p>
        <p class="message-line time">
          1hr ago
        </p>
      </div>
    </div>`;
}

setInterval(() => {
  $(".main-loading-overlay").css("opacity", "0");
  $(".main-loading-overlay .loading-box").css("opacity", "0");
  setInterval(() => {
    $(".main-loading-overlay").remove();
  }, 400);
}, 2000);
