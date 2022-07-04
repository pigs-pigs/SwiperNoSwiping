//Navigate
var page = 1;

$("#back-btn").click(function () {
  if (page == 2) {
    page--;
    $(".page-2").fadeOut("fast", function () {
      $("#next-btn").html(
        `Next <i style="padding-left: 5%;" class=" fa fa-arrow-right"></i>`
      );
      $(".page-1").fadeIn();
    });
    $("#back-btn").fadeOut();
  }
});

$("#next-btn").click(function () {
  console.log(page);
  if (page == 1 && !checkCardEmpty($("#set-info .tinder--card"))) {
    page++;
    $(".page-1").fadeOut("normal", function () {
      $(".page-2").fadeIn();
    });
    $("#back-btn").fadeIn();
    $(this).html(
      `Submit <i style="padding-left: 5%;" class=" fa fa-check"></i>`
    );
  } else if (page == 2) {
    var somethingEmpty = false;
    $("#create-container")
      .children()
      .each(function () {
        var card = $(this);
        if (card.hasClass("tinder--card")) {
          var cardEmpty = checkCardEmpty(card);
          somethingEmpty = somethingEmpty || cardEmpty;
        }
      });
    if (somethingEmpty) {
      return;
    }
    //Final chance alert then submit
    var setLink = prepareSubmit();
    page++;
    $(this).html("Test It");
    $(".page-2").fadeOut("normal", function () {
      $(".page-3").fadeIn();
    });
  } else if (page == 3) {
    window.location.href = setLink;
  }
});

window.onbeforeunload = function() {
  return "Your set will not be saved."
}

//Tags
const Tags = {
  //make sure to remove trending, hot and new on request!!
  Celebs: { Color: "goldenrod", Icon: "clapperboard" },
  Food: { Color: "#732410", Icon: "utensils" },
  Colors: { Color: "#1C97DA", Icon: "palette" },
  Men: { Color: "#0B14C9", Icon: "person" },
  Women: { Color: "#770AC9", Icon: "person-dress" },
  Songs: { Color: "#D5157B", Icon: "music" },
};

const ul = $(".tags-content ul");
const input = $(".tags-content input");
let maxTags = 5;
let tags = [];

function countTags() {
  $("#tags-left").text(maxTags - tags.length);
}

function createTag() {
  ul.find("li").remove();
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      ul.prepend(
        `<li>${tag} <i class="fa fa-remove" onclick="remove(this, '${tag}')"></i></li>`
      );
    });
  countTags();
}

function remove(element, tag) {
  tags.splice(tags.indexOf(tag), 1);
  $(element).parent().remove();
  countTags();
}

let trigEvent = $.Event("keyup");
trigEvent.keyCode = "13";
$("#autocomplete").click(".complete-item", function (e) {
  input.val($(e.target).text());

  input.trigger(trigEvent);
});

input.keyup(function (e) {
  if (e.keyCode == 13 || e.keyCode == 32) {
    let tag = e.target.value.replace(/\s+/g, "");
    if (tag.length > 2 && !tags.includes(tag)) {
      if (tags.length < maxTags) {
        tags.push(tag.toLowerCase());
        $("#autocomplete").children().remove();
        createTag();
      }
    }
    e.target.value = "";
  } else {
    $("#autocomplete").children().remove();
    if (input.val().length < 1) {
      return;
    }
    $.each(Tags, function (Key, Data) {
      if (
        Key.toLowerCase().includes(input.val().toLowerCase()) &&
        tags.indexOf(Key.toLowerCase()) == -1
      ) {
        $("#autocomplete").append(
          ` <div class="complete-item"><i style="background:${Data.Color};" class="fa fa-${Data.Icon}"></i><p>${Key}</p></div>`
        );
      }
    });
  }
});

// Creation

function sendSetData(data) {
  var settings = {
    async: false,
    crossDomain: true,
    url: "https://swipernoswiping-3b4f.restdb.io/rest/cards",
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-apikey": "60ce0b22e2c96c46a246371f",
      "cache-control": "no-cache",
    },
    processData: false,
    data: JSON.stringify(data),
  };
  var setId;
  $.ajax(settings).done(function (response) {
    console.log(response);
    setId = response._id;
  });
  return setId;
}

// Image Uploading
function hideUploadButtons(Card) {
  Card.find(".image-icons").css("opacity", "0");
  if (Card.find("img").css("border") !== "none") {
    Card.find("img").css("border", "none");
  }
  Card.find("img").hover(
    function () {
      Card.find("img").css("filter", "brightness(50%)");
      Card.find(".image-icons").css("opacity", "1");
    },
    function () {
      Card.find("img").css("filter", "brightness(100%)");
      Card.find(".image-icons").css("opacity", "0");
    }
  );
  Card.find(".image-icons").hover(
    function () {
      Card.find("img").css("filter", "brightness(50%)");
      Card.find(".image-icons").css("opacity", "1");
    },
    function () {
      Card.find("img").css("filter", "brightness(100%)");
      Card.find(".image-icons").css("opacity", "0");
    }
  );
}

var cropSize = "16:9";
$(document).on(
  "click",
  ".uploadcare--crop-sizes__icon, .uploadcare--crop-sizes__item ",
  function () {
    if ($(this).hasClass("uploadcare--crop-sizes__item")) {
      cropSize = $(this).data("caption");
    } else {
      cropSize = $(this).parent().data("caption");
    }
  }
);

$(document).on("click", ".uploader-open", function () {
  var dialog = uploadcare.openDialog(null, null, {
    publicKey: "1ca1277bb9380dcaf55f",
    imagesOnly: true,
    crop: "16:9,3:4",
    tabs: "file camera url gdrive gphotos",
  });

  dialog.done((res) => {
    res.promise().done((info) => {
      console.log(info);
      if (info.cdnUrl) {
        var URL = info.cdnUrl;

        $(this).parent().parent().children("img").attr("src", URL);
        if (cropSize == "16:9") {
          if (
            $(this).parent().find(".extend-img").hasClass("fa-angle-double-up")
          ) {
            $(this)
              .parent()
              .parent()
              .find("img")
              .removeClass("full-image")
              .css("height", "50%");
            $(this).parent().parent().find(".imagebuttons").css("top", "25%");
            $(this)
              .parent()
              .find(".extend-img")
              .css("top", "280%")
              .removeClass("fa-angle-double-up")
              .addClass("fa-angle-double-down");
          }
        } else if (cropSize == "3:4") {
          if (
            $(this)
              .parent()
              .find(".extend-img")
              .hasClass("fa-angle-double-down")
          ) {
            $(this)
              .parent()
              .parent()
              .find("img")
              .addClass("full-image")
              .css("height", "100%");
            $(this).parent().parent().find(".imagebuttons").css("top", "50%");
            $(this)
              .parent()
              .find(".extend-img")
              .css("top", "400%")
              .removeClass("fa-angle-double-down")
              .addClass("fa-angle-double-up");
          }
        }
        hideUploadButtons($(this).parent().parent());
      } else {
        alert("Oops! Something went wrong!");
      }
    });
  });
});

$(document).on("click", ".extend-img", function () {
  if ($(this).hasClass("fa-angle-double-up")) {
    $(this)
      .parent()
      .parent()
      .find("img")
      .removeClass("full-image")
      .css("height", "50%");
    $(this).parent().parent().find(".imagebuttons").css("top", "25%");
    $(this)
      .css("top", "280%")
      .removeClass("fa-angle-double-up")
      .addClass("fa-angle-double-down");
  } else {
    $(this)
      .parent()
      .parent()
      .find("img")
      .addClass("full-image")
      .css("height", "100%");
    $(this).parent().parent().find(".imagebuttons").css("top", "50%");
    $(this)
      .css("top", "400%")
      .removeClass("fa-angle-double-down")
      .addClass("fa-angle-double-up");
  }
});

// Adding Cards
const newCard = `<div class="tinder--card">
    <i style="padding:4px; right: 1%;" class="image-icons delete-card fa fa-close"></i>
      <img>
      <p class="imagebuttons">
        <i style="left: 30%; transform: translateX(-50%);" class="image-icons uploader-open fa fa-upload"></i>
        <i style="left: 70%; transform: translateX(-50%);" class="image-icons fa fa-paint-brush"></i>
        <i style="top: 280%; left: 50%; transform: translateX(-50%);" class="image-icons extend-img fa fa-angle-double-down"></i>
      <p>
        <input maxlength=24 class="h3-input" type="text" placeholder="Title"></input>
        <textarea class="p-input" type="text" placeholder="Card Description" rows=4></textarea>
        </img>
    </div>`;

$("#add-card").click(function () {
  if ($(this).hasClass("add-card-disabled")) {
    if ($("#create-container").children().length >= 50) {
      return;
    } else {
      $("#add-card")
        .css({ "border-color": "#fff", color: "#fff" })
        .html(`<i style="padding-right: 2%;" class=" fa fa-plus"></i> Add Card`)
        .removeClass("add-card-disabled");
    }
  }
  if ($("#create-container").children().length >= 50) {
    $("#add-card")
      .css({ "border-color": "#ff5050", color: "#ff5050" })
      .text("Max Cards")
      .addClass("add-card-disabled");
    return;
  }
  $("#create-container").append(newCard);
  $("#create-container").animate(
    { scrollTop: $("#create-container").get(0).scrollHeight },
    900
  );
});

$(document).on("click", ".delete-card", function () {
  $(this)
    .parent()
    .css("transition", "unset")
    .animate({ opacity: "0" }, "slow", function () {
      console.log("HI");
      $(this).remove();
    });
});

function imageOrColor(el) {
  if (el.attr("src")) {
    return el.attr("src");
  } else if (el.css("background-color") != "rgb(128, 128, 128)") {
    return el.css("background-color");
  } else return "NONE";
}

function checkCardEmpty(card) {
  var somethingEmpty = false;
  if (
    !card.find(".h3-input").val() &&
    !card.find("img").hasClass("full-image")
  ) {
    somethingEmpty = true;
    card.find(".h3-input").css("border", "2px solid red");
    card.find(".h3-input").on("input", function () {
      card.find(".h3-input").css("border", "none");
      card.find(".h3-input").unbind();
    });
  }
  if (imageOrColor(card.find("img")) == "NONE") {
    somethingEmpty = true;
    card.find("img").css("border", "2px solid red");
  }
  console.log(somethingEmpty);
  return somethingEmpty;
}

// Submitting
function prepareSubmit() {
  var cardsData = [];
  $("#create-container")
    .children()
    .each(function () {
      var card = $(this);
      if (card.hasClass("tinder--card")) {
        cardsData.push({
          Heading: card.find(".h3-input").val(),
          Description: card.find(".p-input").val() || " ",
          Image: imageOrColor(card.find("img")),
          FullPage: card.find("img").hasClass("full-image"),
        });
      }
    });
  const setInfo = $("#set-info");
  var data = {
    Title: setInfo.find(".h3-input").val(),
    Description: setInfo.find(".p-input").val() || " ",
    Tags: JSON.stringify(tags),
    CreatorId: "fixme",
    Cover: imageOrColor(setInfo.find("img")),
    Cards: JSON.stringify(cardsData),
  };
  //SEND INFO
  var setId = sendSetData(data);
  if(!setId){
    alert("Something went wrong submitting the set.")
    return
  }
  // Show Completed Page
  $("#submitted-popup h2").text("Set Created!");
  window.onbeforeunload = null
  if (setInfo.find("img").attr("src")) {
    $("#submitted-popup img").attr("src", setInfo.find("img").attr("src"));
  } else if (
    setInfo.find("img").css("background-color") != "rgb(128, 128, 128)"
  ) {
    $("#submitted-popup img").css(
      "background-color",
      setInfo.find("img").css("background-color")
    );
  }

  var linkToSet = "https://swipernoswiping.netlify.app/swipe?set=" + setId;
  $("#link a").attr("href", linkToSet).text(linkToSet);
  $("#link i").click(function () {
    navigator.clipboard.writeText(linkToSet).then(function () {
      $("#submitted-popup #copied-text").css("opacity", "1");
    });
  });

  //Share Options
  $("#share-options .fa-twitter")
    .parent()
    .attr("href", "https://twitter.com/intent/tweet?url=" + linkToSet);
  $("#share-options .fa-facebook-f")
    .parent()
    .attr("href", "https://www.facebook.com/sharer.php?u=" + linkToSet);
  $("#share-options .fa-envelope")
    .parent()
    .attr("href", "mailto:?subject=" + data.Title + "&body=" + linkToSet);
  $("#share-options .fa-reddit-alien")
    .parent()
    .attr("href", "https://reddit.com/submit?url=" + linkToSet);
  $("#share-options .fa-pinterest-p")
    .parent()
    .attr(
      "href",
      "https://www.pinterest.com/pin/create/button?url=" + linkToSet
    );
  return linkToSet;
}

// Color picker
const colorpicker = $("#colorpicker");
var currentlySelecting = null;
$.getJSON("/Css/colorpicker.json", function (googleColors) {
  //create preview swatches
  for (var color in googleColors) {
    for (var subcolor in googleColors[color]) {
      if (subcolor == "400" || subcolor == "500" || subcolor == "600") {
        let htmlString = `<div class="colorp"><div class="lilcircle" style="background-color: ${googleColors[color][subcolor]};" data-color="${googleColors[color][subcolor]}"></div></div>`;
        colorpicker.append(htmlString);
      }
    }
  }

  $(document).on("click", ".lilcircle", function () {
    if (currentlySelecting) {
      $(".lilcircle").removeClass("active");
      $(this).addClass("active");

      currentlySelecting
        .find("img")
        .css("background-color", $(this).css("background-color"));
      if (currentlySelecting.find("img").attr("src")) {
        currentlySelecting.find("img").removeAttr("src");
      }
      hideUploadButtons(currentlySelecting);
    }
  });

  //trigger click on an element
  $(".lilcircle")[0].click();
});

$(document).on("click", ".fa-paint-brush", function () {
  currentlySelecting = $(this).parent().parent();
  colorpicker.toggleClass("picker-open");
});

$(document).on("click", function (e) {
  if (
    colorpicker.hasClass("picker-open") &&
    $(e.target).closest("#colorpicker").length === 0 &&
    $(e.target).closest(".fa-paint-brush").length === 0
  ) {
    colorpicker.removeClass("picker-open");
  }
});
