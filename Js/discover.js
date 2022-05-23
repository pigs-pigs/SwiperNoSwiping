// Search/Discover/Recommended

function moveCards(direction) {
    if (direction == "LEFT") {

    } else if (direction == "RIGHT") {

    }
}

$(document).keydown(function (e) {
    if (e.keyCode == 37) { //Left
        moveCards("LEFT")
    } else if (e.keyCode == 39) { //Right
        moveCards("RIGHT")
    }
});

$(".fa-angle-right").click(function () {
    moveCards("RIGHT")
})

$(".fa-angle-left").click(function () {
    moveCards("LEFT")
})