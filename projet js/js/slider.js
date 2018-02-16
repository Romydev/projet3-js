var Slider = {

    slideActif: 0,
    sliderNum: 1,
    indexSlide: 0,

    init: function (idDivSlider) {

        var idDivSlider = document.getElementById(idDivSlider);
        Slider.indexSlide = idDivSlider.querySelectorAll("img").length;


        document.addEventListener('keydown', function (e) {


            if (e.keyCode === 39) {
                Slider.moveRight();
            } else if (e.keyCode === 37) {
                Slider.moveLeft();
            }
        });

        var boutonDroitElt = document.getElementById("fleche_droite");
        boutonDroitElt.addEventListener("click", function () {
            Slider.moveRight();
        });

        var boutonGauchtElt = document.getElementById("fleche_gauche");
        boutonGauchtElt.addEventListener("click", function () {
            Slider.moveLeft();
        });

    },


    moveRight: function () {
        if (this.slideActif < (this.indexSlide - 1)) {

            $("#slide" + this.sliderNum).fadeOut(500);
            this.sliderNum++;
            this.slideActif++;
            //
        }
    },


    moveLeft: function () {
        if (this.slideActif > 0) {
            this.sliderNum--;
            this.slideActif--;
            $("#slide" + this.sliderNum).fadeIn(500);

            //
        }
    }

};


var sliderElt = Object.create(Slider);
sliderElt.init("divHelp");
