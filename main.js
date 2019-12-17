$(document).ready (function () {


    var urlBaseAPI = "https://api.themoviedb.org/3/"


    // salvo in una variabile la struttura del film-template
    var source = $("#film-template").html();
    var template = Handlebars.compile (source);


    // avvio la ricerca premendo il tasto ENTER della tastiera
    $ ("#input-search").keypress (function (event) {
        if (event.which == 13) {
            ricerca();
        }
    });


    // avvio la ricerca cliccando sulla lente d'ingrandimento
    $ ("#button-search").click (function () {
        ricerca();
    });


    function ricerca () {
        // prendo il contenuto testuale dell'input
        var testoRicerca = $ ("#input-search").val ();

        // svuoto il contenuto dell'input
        $ ("#input-search").val ("");

        // eseguo la ricerca solo quando la stringa di ricerca contiene qualcosa
        if (testoRicerca.length != 0) {

            // elimino i risultatati della precedente ricerca
            $ ("#film-container").empty ();

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
                    if (film.length > 0) {
                        console.log(film.length);
                        for (var i = 0; i < film.length; i++) {
                            var titolo = film[i].title;
                            var titoloOriginale = film[i].original_title;
                            var linguaOriginale = film[i].original_language;
                            var bandiera = stampaBandiera();
                            var voto = film[i].vote_average;
                            // le stelle gialle corrisponderanno al voto :2 e arrotondato
                            var stelleActive = Math.round(voto / 2);
                            var stelle = stampaStelle();

                            var context = {
                                titolo: titolo,
                                titoloOriginale: titoloOriginale,
                                linguaOriginale: bandiera,
                                stelle: stelle
                            };

                            // utilizzo la funzione "template" con le proprietà assegnate nell'oggetto "context"
                            var html = template(context);
                            // appendo al mio html
                            $("#film-container").append(html);


                            function stampaStelle() {
                                var iconaStelle;
                                for (var i = 0; i < 5; i++) {
                                    if (i < stelleActive) {
                                        iconaStelle += '<i class="fas fa-star yellow-star"></i>';
                                    } else {
                                        iconaStelle += '<i class="far fa-star white-star"></i>'
                                    }
                                }
                                return iconaStelle;
                            }


                            function stampaBandiera() {
                                if (linguaOriginale == "en") {
                                    bandiera = '<img class="flag" src="flags/en.png" alt="inglese">';
                                } else if (linguaOriginale == "fr") {
                                    bandiera = '<img class="flag" src="flags/fr.png" alt="francese">';
                                } else if (linguaOriginale == "it") {
                                    bandiera = '<img class="flag" src="flags/it.png" alt="italiano">';
                                } else if (linguaOriginale == "chn") {
                                    bandiera = '<img class="flag" src="flags/chn.png" alt="cinese">';
                                } else if (linguaOriginale == "de") {
                                    bandiera = '<img class="flag" src="flags/de.png" alt="tedesco">';
                                } else if (linguaOriginale == "ja") {
                                    bandiera = '<img class="flag" src="flags/ja.png" alt="giapponese">';
                                } else if (linguaOriginale == "pl") {
                                    bandiera = '<img class="flag" src="flags/pl.png" alt="polacco">';
                                } else if (linguaOriginale == "ru") {
                                    bandiera = '<img class="flag" src="flags/ru.png" alt="russo">';
                                } else if (linguaOriginale == "es") {
                                    bandiera = '<img class="flag" src="flags/es.png" alt="spagnolo">';
                                } else if (linguaOriginale == "pt") {
                                    bandiera = '<img class="flag" src="flags/pt.png" alt="portoghese">';
                                }else {
                                    return linguaOriginale;
                                }
                                return bandiera;
                            }
                        }
                    }
                },
                "error": function () {
                    alert ("Error");
                }
            });
        }
    }


});
