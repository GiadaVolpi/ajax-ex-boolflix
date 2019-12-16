// mio API key => 157ee715886d595bb09f199045df67b5
// esempio di API request => https://api.themoviedb.org/3/movie/550?api_key=157ee715886d595bb09f199045df67b5
$(document).ready (function () {

    $.ajax ({
        // "url": baseURL_AP + myAPIKey,
        "url": "https://api.themoviedb.org/3/search/movie",
        "data": {
            "api_key": "157ee715886d595bb09f199045df67b5",
            "query": "ritorno+al+futuro"
        },
        "method": "GET",
        "success": function (data) {
            var film = data.results;
            for (var i = 0; i < film.length; i++) {
                var titolo = film[i].title
                console.log(titolo);
            }
            },
        "error": function () {
            alert ("Error");
        }
    });

});
