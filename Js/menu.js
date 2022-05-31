  //Searching
  $(".search-input").keydown(function (e) {
    if (e.keyCode == 13 && $(".search-input").val().trim()) {
      console.log($(".search-input").val().trim());
    }
  });
  $(".search-wrapper i").click(function () {
    if ($(".search-input").val().trim()) {
      console.log($(".search-input").val().trim());
    }
  });
  
  $(document).on("click", function (e) {//TODO: unbind these in the future
    if (
      $(".notification-btn").css("display") !== "none" &&
      $(e.target).closest("#notifs-container").length === 0 &&
      $(e.target).closest(".notification-btn").length === 0
    ) {
      $("#notifs-container").fadeToggle();
    }
  });
  
  $(".notification-btn").click(function () {
    $("#notifs-container").fadeToggle();
  });
  
  $(".add-btn").click(function () {
    //TODO: redirect to create page, no topbar on that page
  });
  
  // Search/Discover/Recommended
  $(".discover-cards").append(`<div class="tinder--card discover--card">
                  <img src="https://picsum.photos/id/605/600/300"}>
                <h3>LOL</h3>
                  <p>WOOooo</p>
                </div>`);
  $(".discover-cards")
    .append(`<div class="tinder--card discover--card" style="z-index: 3; box-shadow:0px 0px 7px #111827; transform: scale(1.25);">
                  <img src="https://picsum.photos/id/605/600/300"}>
                <h3>LOL</h3>
                  <p>WOOooo</p>
                </div>`);
  $(".discover-cards").append(`<div class="tinder--card discover--card">
                  <img src="https://picsum.photos/id/605/600/300"}>
                <h3>LOL</h3>
                  <p>WOOooo</p>
                </div>`);
  

function loadPageContent(){ //maybe just refresh with a loading before and after?
    //1. Apply Loading Screen
    //2. destroy app container on this page and load it from another
    //3. Change the CSS and JS linked to the page
    //3. remove loading screen

    //NOTE: make sure all pages have the exact same menu and sizing etc.
}