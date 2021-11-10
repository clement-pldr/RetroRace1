const MOVE = {
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT: 3,
    /*Rajouter par clem ***********/
    TOPLEFT: 4,
    TOPRIGHT: 5,
    /*Rajouter par clem ***********/
}
let game = {
    gametick: 0
}
class player {
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.speedx = 1;
        this.speedy = 2;
        this.acceleration = 0;
        this.rotate = {
            r: 0,
            angle: 0,
            centerpos: {
                x: 0,
                y: 0
            }
        };
        this.finalPos = {
            x: 0,
            y: 0,
            theta: 0
        };
        this.wheel_angle = 0;
        this.scale = 2;
        this.img = "./img/voiture.png";
        this.eVoiture = document.createElement("img");
        this.ratio = 1/2;
        this.time = 0;
    }

    move(direction) {     
        
        switch (direction) {
            case MOVE.UP:
                this.y -= this.speedy * this.acceleration++;
                //this.rotate = 180;
                break;
            case MOVE.LEFT:
                //this.x -= this.speedx;
                this.rotate.r++;
                this.wheel_angle -= 2; // on incrémente l'angle
               
                break;
            case MOVE.DOWN:
                this.y += this.speedy * this.acceleration--;
                //this.rotate = 0;
                
                break;
            case MOVE.RIGHT:
                //this.x += this.speedx;
                this.rotate.r--;
                this.wheel_angle += 2; // on décrémente l'angle

                break;
            /*Rajouter par clem ***********
            case MOVE.TOPLEFT:
                this.move(MOVE.UP);
                if(i<= 1){
                    i++;
                }
                this.x -= i
                break;
            case MOVE.TOPRIGHT:
                this.move(MOVE.UP);
                if(i<= 1){
                    i++;
                }
                this.x += i;
                break;
            *Rajouter par clem ***********/
        }
        this.rotate.angle += this.wheel_angle * Math.PI / 180;

        this.rotate.centerpos.x = (this.rotate.r * this.ratio) * Math.cos( this.wheel_angle * Math.PI/180 );
        this.rotate.centerpos.y = (this.rotate.r * this.ratio) * Math.sin( this.wheel_angle * Math.PI/180 );
        this.acceleration = Math.min(1, this.acceleration);
        this.acceleration = Math.max(1, this.acceleration);
        this.rotate.r = Math.max(60, this.rotate.r);
        this.rotate.r = Math.min(60, this.rotate.r);


        // Ici, si tu avais le temps qui s'écoules, peut être que tu pourrais ajouter la vélocité pour que la voiture continue de rouler quand tu laches la touche
        this.finalPos = {
            x: this.x + this.rotate.centerpos.x,
            y: this.y + this.rotate.centerpos.y,
            theta: 0
        }

        this.update();

        /*  (CroqueMonsieur)
            Ici il faudrait recalculer this.x et this.y à partir de la rotation effectuée afin de pouvoir faire continuer la voiture dans sa lancée
        */
    }
    update() {

        this.eVoiture.setAttribute("src", this.img);
        this.eVoiture.style.position = "absolute";

        this.eVoiture.style.top = /*String(this.y) + "px";*/ `${this.finalPos.y}px`;
        this.eVoiture.style.left = /*String(this.x) + "px";*/ `${this.finalPos.x}px`;
        this.eVoiture.style.transform = /*String(this.rotate) + "deg";*/ `rotate(${this.rotate.angle}deg)`;
        this.eVoiture.style.scale = String(this.scale);
        
    }


    draw(eParent) {
        this.eVoiture.setAttribute("src", this.img);
        this.eVoiture.style.position = "absolute";
        this.eVoiture.style.top = String(this.y) + "px";
        this.eVoiture.style.left = String(this.x) + "px";
        this.eVoiture.style.rotate = String(this.rotate) + "deg";
        this.eVoiture.style.scale = String(this.scale);
        eParent.appendChild(this.eVoiture);
    }
}



let voiture = new player;
var listKeyDown = [];
var i=0;
function keydown(e) {
    console.log(e.key);
    listKeyDown.push(e.key);
     /*
    if(listKeyDown.indexOf("w")!=-1){
        voiture.move(MOVE.UP);
    }
    */
}


function onkeyup(e) {
    console.log(listKeyDown);
    let indexToRemove = 0
    while(indexToRemove != -1){
        indexToRemove =  listKeyDown.indexOf(e.key);
        listKeyDown.splice(indexToRemove, 1);
    }
    console.log(listKeyDown);
}


document.onkeydown = keydown;
document.onkeyup = onkeyup;

function mainUpdate(listKeyDown){

    game.gametick++;
    console.log(game.gametick);

    if(listKeyDown.indexOf("w")!=-1){
        voiture.move(MOVE.UP);
    }
    if (listKeyDown.indexOf("a")!=-1) {
        voiture.move(MOVE.LEFT)
    }
    if (listKeyDown.indexOf("s")!=-1) {
        voiture.move(MOVE.DOWN)
    }
    if (listKeyDown.indexOf("d")!=-1) {
        voiture.move(MOVE.RIGHT)
    }

    /*Rajouter par clem ***************************
    if (listKeyDown.indexOf("w")!=-1 && listKeyDown.indexOf("a")!=-1) {
        voiture.move(MOVE.TOPLEFT)
    }
    if (listKeyDown.indexOf("w")!=-1 && listKeyDown.indexOf("d")!=-1) {
        voiture.move(MOVE.TOPRIGHT)
    }
    *Rajouter par clem ***************************/
}

setInterval(mainUpdate,10,listKeyDown);

voiture.draw(eDivCircuit);