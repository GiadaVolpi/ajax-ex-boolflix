$(document).ready (function () {


    var urlBaseAPI = "https://api.themoviedb.org/3/";
    var urlBaseCover = "https://image.tmdb.org/t/p/";


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
    $ ("#button-search").click (ricerca);


    function ricerca() {
        // prendo il contenuto testuale dell'input
        var testoRicerca = $ ("#input-search").val ();
        // eseguo la ricerca solo quando la stringa di ricerca contiene qualcosa
        if (testoRicerca.length != 0) {
            // svuoto il contenuto dell'input
            $ ("#input-search").val ("");
            // elimino i risultatati della precedente ricerca
            $ ("#film-container").empty ();
            chiamoAPI(testoRicerca);
        } else {
            $ ("#film-container").append ('Nessun risultato trovato per ' + '"' + testoRicerca + '"');
        }
    }


    function chiamoAPI(queryRicerca) {
        // chiamo ajax per confrontare il testo ricercato con i titolo dei film
        $.ajax ({
            "url": urlBaseAPI + "search/movie",
            "data": {
                // i primi due parametri sono obbligatori
                "api_key": "157ee715886d595bb09f199045df67b5",
                "query": queryRicerca,
                "language": "it-IT"
            },
            "method": "GET",
            "success": function (data) {
                var film = data.results;
                console.log("Questi sono i film");
                console.log(film);
                if (film.length > 0) {
                    for (var i = 0; i < film.length; i++) {
                        var titolo = film[i].title;
                        console.log(titolo);
                        var titoloOriginale = film[i].original_title;
                        var linguaOriginale = film[i].original_language;
                        var bandiera = stampaBandiera(linguaOriginale);
                        var voto = film[i].vote_average;
                        // le stelle gialle corrisponderanno al voto :2 e arrotondato
                        var stelleActive = Math.round(voto / 2);
                        var stelle = stampaStelle(stelleActive);

                        var poster = film[i].poster_path;
                        // compongo URL copertina
                        var copertina = urlBaseCover + "w185/" + poster;

                        var descrizione = film[i].overview;
                        console.log(descrizione.length);
                        var descrizioneEsistente = verificaDescrizione(descrizione);
                        var descrizioneActive = visualizzaDescrizione (descrizioneEsistente);
                        console.log(descrizioneActive);


                        var context = {
                            titolo: titolo,
                            titoloOriginale: titoloOriginale,
                            linguaOriginale: bandiera,
                            stelle: stelle,
                            tipologia: "film",
                            cover: copertina,
                            trama: descrizioneActive
                        };

                        // utilizzo la funzione "template" con le proprietà assegnate nell'oggetto "context"
                        var html = template(context);
                        // appendo al mio html
                        $("#film-container").append(html);
                    } //chiusura for film length
                } //chiusura if
            }, //chiusura success
            "error": function () {
                alert ("Error");
            }
        });


        // chiamo ajax per confrontare il testo ricercato con i titolo delle serie tv
        $.ajax ({
            "url": urlBaseAPI + "search/tv",
            "data": {
                "api_key": "157ee715886d595bb09f199045df67b5",
                "query": queryRicerca,
                "language": "it-IT"
            },
            "method": "GET",
            "success": function (data) {
                var serieTV = data.results;
                console.log("Queste sono le serie tv");
                console.log(serieTV);
                if (serieTV.length > 0) {
                    for (var i = 0; i < serieTV.length; i++) {
                        var titolo = serieTV[i].name;
                        var titoloOriginale = serieTV[i].original_name;
                        var linguaOriginale = serieTV[i].original_language;
                        var bandiera = stampaBandiera(linguaOriginale);
                        var voto = serieTV[i].vote_average;
                        var stelleActive = Math.round(voto / 2);
                        var stelle = stampaStelle(stelleActive);

                        var poster = serieTV[i].poster_path;
                        // compongo URL copertina
                        var copertina = urlBaseCover + "w185/" + poster;

                        var descrizione = serieTV[i].overview;
                        console.log(descrizione.length);
                        var descrizioneEsistente = verificaDescrizione(descrizione);
                        var descrizioneActive = visualizzaDescrizione (descrizioneEsistente);
                        console.log(descrizioneActive);


                        var context = {
                            titolo: titolo,
                            titoloOriginale: titoloOriginale,
                            linguaOriginale: bandiera,
                            stelle: stelle,
                            tipologia: "serie tv",
                            cover: copertina,
                            trama: descrizioneActive
                        };

                        var html = template(context);
                        $("#film-container").append(html);
                    } //chiusura for film length
                } //chiusura if
            },
            "error": function () {
                alert ("Error");
            }
        });
    }


    function stampaStelle(nStelle) {
        var iconaStelle;
        for (var i = 0; i < 5; i++) {
            if (i < nStelle) {
                iconaStelle += '<i class="fas fa-star yellow-star"></i>';
            } else {
                iconaStelle += '<i class="far fa-star white-star"></i>';
            }
        }
        return iconaStelle;
    } //chiusura function stampaStelle


    function stampaBandiera(lingua) {
        if (lingua == "en") {
            bandiera = '<img class="flag" src="flags/en.png" alt="inglese">';
        } else if (lingua == "fr") {
            bandiera = '<img class="flag" src="flags/fr.png" alt="francese">';
        } else if (lingua == "it") {
            bandiera = '<img class="flag" src="flags/it.png" alt="italiano">';
        } else if (lingua == "zh") {
            bandiera = '<img class="flag" src="flags/chn.png" alt="cinese">';
        } else if (lingua == "de") {
            bandiera = '<img class="flag" src="flags/de.png" alt="tedesco">';
        } else if (lingua == "ja") {
            bandiera = '<img class="flag" src="flags/ja.png" alt="giapponese">';
        } else if (lingua == "pl") {
            bandiera = '<img class="flag" src="flags/pl.png" alt="polacco">';
        } else if (lingua == "ru") {
            bandiera = '<img class="flag" src="flags/ru.png" alt="russo">';
        } else if (lingua == "es") {
            bandiera = '<img class="flag" src="flags/es.png" alt="spagnolo">';
        } else if (lingua == "pt") {
            bandiera = '<img class="flag" src="flags/pt.png" alt="portoghese">';
        }else {
            return lingua;
        }
        return bandiera;
    } //chiusura function stampaBandiera

    function verificaDescrizione(description) {
        if (description.length != 0) {
            $(".film-description").addClass("active");
        }
        return description;
    }

    function visualizzaDescrizione (description) {
        $(".film-description").click (function () {
            $(".film-data").removeClass ("active");
            $(".film-description-container").addClass ("active")
            $(".description-content").addClass ("active")
        });
        return description;
    }
});
