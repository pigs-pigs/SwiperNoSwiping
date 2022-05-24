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

    $.ajax(settings).done(function (response) {
        console.log(response);
        return response._id
    });
}

$("#submitCards").click(function () {
    var setId = createSet()
    console.log(setId)
})