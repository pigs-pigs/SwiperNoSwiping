  //Searching
  $(".search-input").keydown(function (e) {
    if (e.keyCode == 13 && $(".search-input").val().trim()) {
        window.location.href = "https://swipernoswiping.netlify.app/discover?q=" + $(".search-input").val().trim()
    }
  });
  $(".search-wrapper i").click(function () {
    if ($(".search-input").val().trim()) {
        window.location.href = "https://swipernoswiping.netlify.app/discover?q=" + $(".search-input").val().trim()
    }
  });
  
  $(document).on("click", function (e) {//TODO: unbind these in the future
    if (
      $("#notifs-container").css("display") !== "none" &&
      $(e.target).closest("#notifs-container").length === 0 &&
      $(e.target).closest(".notification-btn").length === 0
    ) {
      $("#notifs-container").fadeOut();
    }
  });
  
  $(".notification-btn").click(function () {
    $("#notifs-container").fadeToggle();
  });

  function buildNotif() {
      `<div class="message-box">
      <img src="https://images.unsplash.com/photo-1533993192821-2cce3a8267d1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWFuJTIwbW9kZXJufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="profile image">
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
    </div>`
  }
  
  $(".add-btn").click(function () {
    window.location.href = "https://swipernoswiping.netlify.app/"
  });

function loadPageContent(){ //maybe just refresh with a loading before and after?
    //1. Apply Loading Screen
    //2. destroy app container on this page and load it from another
    //3. Change the CSS and JS linked to the page
    //3. remove loading screen

    //NOTE: make sure all pages have the exact same menu and sizing etc.
}