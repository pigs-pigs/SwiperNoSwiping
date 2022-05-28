function createSet() {
    var jsondata = {
        "Title": "yes",
        "Description": "long long long long longggg",
        "CreatorId": toString(1),
        "Cover": "https://picsum.photos/600/300",
        "Cards": JSON.stringify([
            { Heading: "Lol", Description: "yes", Image: `https://picsum.photos/600/300?random=${Math.floor(Math.random() * 500)}` },
            { Heading: "The end", Description: "ty lol", Image: `https://picsum.photos/600/300?random=${Math.floor(Math.random() * 500)}` }

        ])
    };
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://swipernoswiping-3b4f.restdb.io/rest/cards",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "60ce0b22e2c96c46a246371f",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
    }
    var setId
    $.ajax(settings).done(function (response) {
        console.log(response);
        setId = response._id
    });
    return setId
}

// Image Uploading
function hideUploadButtons(Card) {
    Card.find(".imagebuttons").css("opacity", "0");
    if (Card.find("img").css("border") !== "none") {
        Card.find("img").css("border", "none");
    }
    Card.find("img").hover(
        function () {
            Card.find("img").css("filter", "brightness(50%)");
            Card.find(".imagebuttons").css("opacity", "1");
        },
        function () {
            Card.find("img").css("filter", "brightness(100%)");
            Card.find(".imagebuttons").css("opacity", "0");
        }
    );
    Card.find(".imagebuttons").hover(
        function () {
            Card.find("img").css("filter", "brightness(50%)");
            Card.find(".imagebuttons").css("opacity", "1");
        },
        function () {
            Card.find("img").css("filter", "brightness(100%)");
            Card.find(".imagebuttons").css("opacity", "0");
        }
    );
}

$(".uploader-open").click(function () {
    var dialog = uploadcare.openDialog(null, null, {
        publicKey: "1ca1277bb9380dcaf55f",
        imagesOnly: true,
        crop: "16:9",
        tabs: "file camera url gdrive gphotos"
    });
    dialog.done((res) => {
        res.promise().done((info) => {
            if (info.cdnUrl) {
                var URL = info.cdnUrl;

                $(this).parent().parent().children("img").attr("src", URL);
                hideUploadButtons($(this).parent().parent());
            } else {
                alert("Oops! Something went wrong!");
            }
        });
    });
});
//Dont forget to link script: https://ucarecdn.com/libs/widget/3.x/uploadcare.lang.en.min.js

// Description Input
function limitTextareaLine(e) {
    const newLine = /\r*\n/g;
    const value = e.target.value;
    const newLines = (value.match(newLine) || []).length;

    const lines = value.split(newLine);

    //enter
    if (e.keyCode === 13 && lines.length >= e.target.rows) {
        e.preventDefault();
        return;
    }

    const lineNo =
        value.substr(0, e.target.selectionStart).split(newLine).length - 1;

    //backspace
    if (
        e.keyCode === 8 &&
        ~value.charAt(e.target.selectionStart - 1).search(newLine)
    ) {
        if (lines[lineNo].length + lines[lineNo - 1].length <= e.target.cols)
            return;

        e.preventDefault();
        return;
    }

    //del
    if (
        e.keyCode === 46 &&
        ~value.charAt(e.target.selectionStart).search(newLine)
    ) {
        if (lines[lineNo].length + lines[lineNo + 1].length <= e.target.cols)
            return;

        e.preventDefault();
        return;
    }

    if (e.key.length > 1) return;

    if (value.length < e.target.cols) return;

    if (lines[lineNo].length > e.target.cols - 1) {
        if (lines.length < e.target.rows) {
            const col = (e.target.selectionStart - newLines) / lines.length;
            let p1 = value.substr(0, e.target.selectionStart);
            if (col === e.target.cols) {
                p1 += "\r\n" + String.fromCharCode(e.keyCode);
            } else {
                p1 += String.fromCharCode(e.keyCode) + "\r\n";
            }

            e.target.value = p1 + value.substr(e.target.selectionStart, value.length);
            e.target.selectionStart = p1.length - 1;
            e.target.selectionEnd = p1.length - 1;
        }

        e.preventDefault();
        return;
    }
}
document
    .querySelector("textarea")
    .addEventListener("keydown", limitTextareaLine);

// Adding Cards

const newCard = `<div class="tinder--card">
    <i style=" right: 1%;" class="delete-card image-icons fa fa-close"></i>
      <img>
      <p class="imagebuttons">
        <i style="left: 30%;" class="image-icons uploader-open fa fa-upload"></i>
        <i style="left: 60%;" class="image-icons fa fa-paint-brush"></i>
      <p>
        <input maxlength=24 class="h3-input" type="text" placeholder="Title"></input>
        <textarea class="p-input" type="text" placeholder="Card Description" rows=4></textarea>
        </img>
    </div>`;

$("#add-card").click(function () {
    $("#create-container").append(newCard);
    $("#create-container").animate(
        { scrollTop: $("#create-container").get(0).scrollHeight },
        900
    );
});

$(document).on("click", ".delete-card", function () {
    $(this).parent().slideToggle("fast");
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
    if (!card.find(".h3-input").val()) {
        somethingEmpty = true;
        card.find(".h3-input").css("border", "2px solid red");
        card.find(".h3-input").on("input", function () {
            card.find(".h3-input").css("border", "none");
            card.find(".h3-input").unbind();
        });
    }
    if (!card.find(".p-input").val()) {
        somethingEmpty = true;
        card.find(".p-input").css("border", "2px solid red");
        card.find(".p-input").on("input", function () {
            card.find(".p-input").css("border", "none");
            card.find(".p-input").unbind();
        });
    }
    if (imageOrColor(card.find("img")) == "NONE") {
        somethingEmpty = true;
        card.find("img").css("border", "2px solid red");
    }
    return somethingEmpty;
}

// Submitting
$("#submit-btn").click(function () {
    var somethingEmpty = false;
    var setInfo = $("#set-info .tinder--card");
    var cardSet = $("#create-container");

    var setEmpty = checkCardEmpty(setInfo);
    somethingEmpty = somethingEmpty || setEmpty;

    cardSet.children().each(function () {
        var card = $(this);
        var cardEmpty = checkCardEmpty(card);
        somethingEmpty = somethingEmpty || cardEmpty;
    });

    // If continue
    if (!somethingEmpty) {
        var cardsData = [];
        cardSet.children().each(function () {
            var card = $(this);
            cardsData.push({
                Heading: card.find(".h3-input").val(),
                Description: card.find(".p-input").val(),
                Image: imageOrColor(card.find("img"))
            });
        });
        var data = {
            Title: setInfo.find(".h3-input").val(),
            Description: setInfo.find(".p-input").val(),
            CreatorId: "1",
            Cover: imageOrColor(setInfo.find("img")),
            Cards: JSON.stringify(cardsData)
        };
        //SEND INFO
        console.log(data);
        var setId = "lolol";
        // Show Completed Page
        $(".submitted-overlay").addClass("active");
        var linkToSet = "https://swipernoswiping.netlify.app/swipe?set=" + setId;
        $("#link a").attr("href", linkToSet).text(linkToSet);
        $("#link i").click(function () {
            navigator.clipboard.writeText(linkToSet).then(function () {
                $("#submitted-popup p").css("opacity", "1");
                /* clipboard successfully set */
            });
        });
    }
});

// Color picker
const colorpicker = $("#colorpicker");
var currentlySelecting = null;
let googleColors

$.ajax({
    'async': false,
    'global': false,
    'url': "./Css/colorpicker.json",
    'dataType': "json",
    'success': function (data) {
        console.log(data)
        googleColors = JSON.parse(data);
    }
});

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
        hideUploadButtons(currentlySelecting);
    }
});

//trigger click on an element
$(".lilcircle")[0].click();

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