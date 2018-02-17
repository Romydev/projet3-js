function myCanvas() {

    var self = this;
    this.clickX = new Array();
    this.clickY = new Array();
    this.clickDrag = new Array();
    this.paint = null;
    this.canvas = $("#canvas");
    this.context = this.canvas[0].getContext("2d");

    this.init = function () {

        self.canvas.mousedown(function (e) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;

            self.paint = true;
            self.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            self.redraw();
        });

        $('#canvas').mousemove(function (e) {
            if (self.paint === true) {
                self.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                self.redraw();
            }
        });

        $('#canvas').mouseup(function (e) {
            self.paint = false;
        });

        $('#canvas').mouseleave(function (e) {
            self.paint = false;
        });

        self.canvas.bind("touchstart", function (e) {
            var touch = e.originalEvent.changedTouches[0];

            e.preventDefault();
            self.paint = true;
            self.addClick(touch.pageX - self.canvas[0].offsetLeft , touch.pageY - self.canvas[0].offsetTop);
            self.redraw();

        });

        self.canvas.bind("touchmove", function (e) {
            e.preventDefault();
            var touch = e.originalEvent.changedTouches[0];
            if (self.paint === true) {
                self.addClick(touch.pageX - self.canvas[0].offsetLeft ,  touch.pageY - self.canvas[0].offsetTop, true);
                self.redraw();
            }

        });

        self.canvas.bind("touchend", function (e) {
            e.preventDefault();
            self.paint = false;
        });

        self.canvas.bind("touchcancel", function (e) {
            e.preventDefault();
            self.paint = false;
        });
        this.annulerSignature();
    }

    self.addClick = function (x, y, dragging) {
        self.clickX.push(x);
        self.clickY.push(y);
        self.clickDrag.push(dragging);
    };

    this.effacerSignature = function () {
        self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height); // Efface le canvas
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    };

    this.annulerSignature = function () { // fontion a l anulation 
        $("#reset").click(function (event) {

            self.effacerSignature();
        });
    }

    this.validateFirm = function () {
            if (self.clickX.length === 0) {
                alert("Veuillez signer avant de valider votre réservation");
                $("#formResa").css('display', 'block');
                return false
            }

            return true;
    };


    self.redraw = function () {
        self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height); // Clears the canvas

        self.context.strokeStyle = "black";
        self.context.lineJoin = "round";
        self.context.lineWidth = 2;

        for (var i = 0; i < self.clickX.length; i++) {
            self.context.beginPath();
            if (self.clickDrag[i] && i) {
                self.context.moveTo(self.clickX[i - 1], self.clickY[i - 1]);
            } else {
                self.context.moveTo(self.clickX[i] - 1, self.clickY[i]);
            }
            self.context.lineTo(self.clickX[i], self.clickY[i]);
            self.context.closePath();
            self.context.stroke();
        }
    }
}
