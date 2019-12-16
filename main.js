$(document).ready (function () {


    var urlBaseAPI = "https://api.themoviedb.org/3/"


    // salvo in una variabile la struttura del film-template
    var source = $("#film-template").html();
    var template = Handlebars.compile (source);


    // avvio la ricerca premendo il tasto ENTER della tastiera
    $ ("#input-search").keypress (function (event) {
        if (event.which == 13) {
            avviaRicerca();
        }
    });


    // avvio la ricerca cliccando sulla lente d'ingrandimento
    $ ("#button-search").click (function () {
        avviaRicerca();
    });


    function avviaRicerca () {
        // prendo il contenuto testuale dell'input
        var testoRicerca = $ ("#input-search").val ();

        // chiamo ajax per confrontare il testo ricercato con i titolo dei film
        $.ajax ({
            "url": urlBaseAPI + "search/movie",
            "data": {
                // i primi due parametri sono obbligatori
                "api_key": "157ee715886d595bb09f199045df67b5",
                "query": testoRicerca,
                "language": "it-IT"
            },
            "method": "GET",
            "success": function (data) {
                var film = data.results;
                for (var i = 0; i < film.length; i++) {
                    console.log(film[i]);
                    var titolo = film[i].title;
                    var titoloOriginale = film[i].original_title;
                    var linguaOriginale = film[i].original_language;
                    var votodi10 = film[i].vote_average;
                    var votodi5 = Math.round (votodi10 / 2);

                    var context = {
                        titolo: titolo,
                        titoloOriginale: titoloOriginale,
                        linguaOriginale: linguaOriginale,
                        voto: votodi5
                    };

                    // utilizzo la funzione "template" con le proprietà assegnate nell'oggetto "context"
                    var html = template(context);
                    // appendo al mio html
                    $(".film-container").append (html);
                }
            },
            "error": function () {
                alert ("Error");
            }
        });
    }






});
