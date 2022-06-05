function sendSetData(data) {
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
        "data": JSON.stringify(data)
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

var cropSize = "16:9"
$(document).on("click", ".uploadcare--crop-sizes__icon, .uploadcare--crop-sizes__item ", function () {
    if ($(this).hasClass("uploadcare--crop-sizes__item")) {
        cropSize = $(this).data("caption")
    } else {
        cropSize = $(this).parent().data("caption")
    }
})

$(document).on("click", ".uploader-open", function () {
    var dialog = uploadcare.openDialog(null, null, {
        publicKey: "1ca1277bb9380dcaf55f",
        imagesOnly: true,
        crop: "16:9,3:4",
        tabs: "file camera url gdrive gphotos"
    });


    dialog.done((res) => {
        res.promise().done((info) => {
            console.log(info)
            if (info.cdnUrl) {
                var URL = info.cdnUrl;

                $(this).parent().parent().children("img").attr("src", URL);
                if (cropSize == "16:9") {
                    if ($(this).parent().find(".extend-img").hasClass("fa-angle-double-up")) {
                        $(this).parent().parent().find("img").removeClass("full-image").css("height", "50%");
                        $(this).parent().parent().find(".imagebuttons").css("top", "25%");
                        $(this).parent().find(".extend-img").css("top", "280%").removeClass("fa-angle-double-up").addClass("fa-angle-double-down")
                    }
                } else if (cropSize == "3:4") {
                    if ($(this).parent().find(".extend-img").hasClass("fa-angle-double-down")) {
                        $(this).parent().parent().find("img").addClass("full-image").css("height", "100%");
                        $(this).parent().parent().find(".imagebuttons").css("top", "50%");
                        $(this).parent().find(".extend-img").css("top", "400%").removeClass("fa-angle-double-down").addClass("fa-angle-double-up")
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
        $(this).parent().parent().find("img").removeClass("full-image").css("height", "50%");
        $(this).parent().parent().find(".imagebuttons").css("top", "25%");
        $(this).css("top", "280%").removeClass("fa-angle-double-up").addClass("fa-angle-double-down")
    } else {
        $(this).parent().parent().find("img").addClass("full-image").css("height", "100%");
        $(this).parent().parent().find(".imagebuttons").css("top", "50%");
        $(this).css("top", "400%").removeClass("fa-angle-double-down").addClass("fa-angle-double-up")
    }
});

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
    <i style=" right: 1%;" class="image-icons delete-card fa fa-close"></i>
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
    $("#create-container").append(newCard);
    $("#create-container").animate(
        { scrollTop: $("#create-container").get(0).scrollHeight },
        900
    );
});

$(document).on("click", ".delete-card", function () {
    $(this).parent().remove();
});

function imageOrColor(el) {
    if (el.attr("src")) {
        return el.attr("src");
    } else if (el.css("background-color") != "rgb(128, 128, 128)") {
        return el.css("background-color");
    } else return "NONE";
}

function checkCardEmpty(card) {
    console.log(card, imageOrColor(card.find("img")))
    var somethingEmpty = false;
    console.log(!card.find(".h3-input").val() && !card.find("img").hasClass("full-image"))
    if (!card.find(".h3-input").val() && !card.find("img").hasClass("full-image")) {
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
    console.log(somethingEmpty)
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
        if (card.hasClass("tinder--card")) {
            var cardEmpty = checkCardEmpty(card);
            somethingEmpty = somethingEmpty || cardEmpty;
        }
    });

    // If continue
    if (!somethingEmpty) {
        var cardsData = [];
        cardSet.children().each(function () {
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

        var data = {
            Title: setInfo.find(".h3-input").val(),
            Description: setInfo.find(".p-input").val() || " ",
            CreatorId: "1",
            Cover: imageOrColor(setInfo.find("img")),
            Cards: JSON.stringify(cardsData)
        };
        //SEND INFO
        var setId = sendSetData(data);
        // Show Completed Page
        $(".submitted-overlay").addClass("active");
        var linkToSet = "https://swipernoswiping.netlify.app/swipe?set=" + setId;
        $("#link a").attr("href", linkToSet).text(linkToSet);
        $("#link i").click(function () {
            navigator.clipboard.writeText(linkToSet).then(function () {
                $("#submitted-popup p").css("opacity", "1");
            });
        });
    }
});

// Color picker
const colorpicker = $("#colorpicker");
var currentlySelecting = null;
let googleColors = null;
var data = null;
var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        googleColors = JSON.parse(this.responseText);

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
                    currentlySelecting.find("img").removeAttr("src")
                }
                hideUploadButtons(currentlySelecting);
            }
        });

        //trigger click on an element
        $(".lilcircle")[0].click();
    }
});

xhr.open(
    "GET",
    "https://raw.githubusercontent.com/pigs-pigs/SwiperNoSwiping/main/Css/colorpicker.json"
);
xhr.send(data);

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

//FIXME:
//1 when color replaces image the "invalid source" icon pops up
//2 Cover can be tall
//DONE 3 tall sizing may need to be 3:4 instead idk
//4 Color picker overflow should be scroll
//5 Mobile opt SUCKS
//6 Auto pick crop mode based on image sizing if possible
//7 Maybe drag and drop onto the card to upload too?
//8 Pasting Images
//9 Revamp the submitted popup with blue bg, semi-transparent & More options



/* Image Search Stuff
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://bing-image-search1.p.rapidapi.com/images/search?q=men&count=25",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
		"X-RapidAPI-Key": "7e7cf41139msh4b82cc4bff6d616p18ba28jsn3bd9ff7a8a62"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
*/