function Reservation() {
    var self = this;
    var canvas = new myCanvas();

    this.init = function () {
        canvas.init();
        console.log(canvas);
        $("#save").click(function (e) { // action du btn save du canvas
            e.preventDefault()
            if (canvas.validateFirm()) {
                var dateFinReservation = new Date();
                dateFinReservation.setMinutes(dateFinReservation.getMinutes() + 20);
                sessionStorage.setItem("dateFinReservation", dateFinReservation);
                self.decompte();
                sessionStorage.setItem("infoNname", station.name);
                $("#btnresa").css('display', 'block');
                $("#formResa").css('display', 'none');
                $("#reservationS").css('display', 'block');
                $("#reservation-timer").css('display', 'block');
                $("#expiration").css('display', 'none');
                $("#tableauDonees").css('display', 'block');
                $("#button-annuler").css('display', 'block');
            }

        });

    };


    this.decompte = function () {

        var dateFinReservation = new Date(sessionStorage.getItem("dateFinReservation"));
        var time = parseInt(dateFinReservation.getTime() / 1000);
        var aujourdhui = new Date();
        this.time_tmp = parseInt(aujourdhui.getTime() / 1000);
        this.restant = time - this.time_tmp;

        this.jour = parseInt((this.restant / (60 * 60 * 24)), 10);
        this.heure = parseInt((this.restant / (60 * 60) - this.jour * 24), 10);
        this.minute = parseInt((this.restant / 60 - this.jour * 24 * 60 - this.heure * 60), 10);
        this.seconde = parseInt((this.restant - this.jour * 24 * 60 * 60 - this.heure * 60 * 60 - this.minute * 60), 10);

        var infoNname = sessionStorage.getItem("infoNname", infoNname); // cle valeur recuperation nom station

        $("#stationS").text(infoNname);
        $('#minutes').text(minute);
        $('#secondes').text(seconde);


        if (time_tmp < time) {
            setTimeout(self.decompte, 1000); //demarre le compteur avec un intervalle de 1sec

        } else {
            sessionStorage.removeItem("dateFinReservation");
            sessionStorage.removeItem("nomStation");

            $('#minutes').text(0);
            $('#secondes').text(0);
            $("#reservation-timer").css('display', 'none');
            $("#expiration").css('display', 'block');
            $("#button-annuler").css('display', 'none');

        }
    }
    setTimeout(self.decompte, 1000); //decremente par 1seconde
}

$(function () {
    var maReservation = new Reservation();
    maReservation.init();
});
