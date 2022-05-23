// Search/Discover/Recommended

function moveCards(direction) {
    if (direction == "LEFT") {
console.log("Moving Left")
    } else if (direction == "RIGHT") {

    }
}

$(document).keydown(function (e) {
    if (e.keydown == 37) { //Left
        moveCards("LEFT")
    } else if (e.keydown == 39) { //Right
        moveCards("RIGHT")
    }
});

$("fa-angle-right").click(function () {
    moveCards("RIGHT")
})

$("fa-angle-left").click(function () {
    moveCards("LEFT")
})