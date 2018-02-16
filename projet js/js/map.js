var station; // on cree un objet station qu'on initialise en 'undefined'
var globalJson;
var global;
var markers = [];


//initialisation de la map
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.760389,
            lng: 4.847650
        },
        zoom: 12,
        minZoom: 10,
        //mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        animation: google.maps.Animation.DROP,

    });
    //map resposive
    window.onresize = function () {
        var currCenter = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(currCenter);
    };

    //import JCdecaux

    $.getJSON('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=fdb87f380487d62506008bfa8ed83c0bcd71d5a9')
        .done(function (globalData) {
            globalJson = JSON.stringify(globalData);
            //console.log(globalJson);
            // declaration des icones open, closed ou construstion et definition taille icone
            var openIcon = {
                url: 'img/green_dot.png',
                scaledSize: new google.maps.Size(50, 50), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };
            var closedIcon = {
                url: 'img/red_dot.png',
                scaledSize: new google.maps.Size(50, 50), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };
            var constrIcon = {
                url: 'img/grey_dot.png',
                scaledSize: new google.maps.Size(50, 50), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };

            $.each(globalData, function (key, val) {
                // affichage des markers custom suivant statut
                if ((val.status === "OPEN") && (val.available_bikes > 0)) {
                    var marker = new google.maps.Marker({
                        position: val.position,
                        icon: openIcon,
                        animation: google.maps.Animation.DROP,

                    });
                } else if (val.status === 'CLOSED') {
                    var marker = new google.maps.Marker({
                        position: val.position,
                        icon: closedIcon,
                        animation: google.maps.Animation.DROP,
                    });
                } else if (val.available_bikes < 1) {
                    var marker = new google.maps.Marker({
                        position: val.position,
                        icon: constrIcon,
                        animation: google.maps.Animation.DROP,
                    });
                }
                marker.addListener('click', function () {
                    // recuperation du JSON de la station et affiche le marker
                    $.getJSON('https://api.jcdecaux.com/vls/v1/stations/' + val.number + '?contract=Lyon&apiKey=fdb87f380487d62506008bfa8ed83c0bcd71d5a9')
                        .done(function (stationData) {
                            //afficher data dans encart
                            station = stationData; // on stocke stationData dans l'obj global 'station' qui sera utilisé plus tard dans l'obj reservation lors de l'appel methode de reservation()
                            document.getElementById('infoNname').innerText = station.name; // nom station
                            document.getElementById('address').innerText = station.address; // adresse station
                            var text = '';
                            if ((station.status === "OPEN") && (val.available_bikes > 0)) {
                                text = 'Elle est Ouverte';
                                displayInfo();

                            } else if (station.status === 'CLOSED') {
                                text = 'Elle est Fermée';
                                displayInfo();
                                alert('Station Fermée');
                            } else {
                                text = 'Pas de vélos de disponible';
                                displayInfo();
                                alert('Pas de vélos de disponible');
                            }

                            function displayInfo() {
                                document.getElementById('status').innerText = text; //statut
                                document.getElementById('total').innerText = stationData.bike_stands + ' points d\'accroche'; //le nombre de points d'attache disponibles pour y ranger un vélo 
                                document.getElementById('availableStands').innerText = stationData.available_bike_stands + ' points sont libres. '; // le nombre de points d'attache opérationnels
                                document.getElementById('availableBikes').innerText = stationData.available_bikes + ' vélo(s) libre et opérationnels'; // le nombre de vélos disponibles et opérationnels
                                document.getElementById('btnresa').className = 'btn btn-primary btn-lg btn-block visible';
                            }
                        })
                });
                markers.push(marker);
            });

            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'img/m'

            });

        })

};
// affihage div info et css
var tableauDonees = document.getElementById("tableauDonees");
var btnresa = document.getElementById("btnresa");

document.getElementById('button-annuler').onclick = function () {
    sessionStorage.clear();
};

btnresa.addEventListener("click", function () {
    // resa.removeChild(tableauDonees);
    $("#tableauDonees").css('display', 'none');
    $('#formResa').css('display', 'block');



});
