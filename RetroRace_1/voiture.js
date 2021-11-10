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
class player {
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.speedx = 2;
        this.speedy = 2;
        this.acceleration = 0;
        this.rotate = 0;
        this.scale = 2;
        this.img = "./img/voiture.png";
        this.eVoiture = document.createElement("img");
    }

    move(direction) {
        switch (direction) {
            case MOVE.UP:
                this.y -= this.speedy;
                this.rotate = 180;
                break;
            case MOVE.LEFT:
                this.x -= this.speedx;
                this.rotate = 90;
                break;
            case MOVE.DOWN:
                this.y += this.speedy;
                this.rotate = 0;
                break;
            case MOVE.RIGHT:
                this.x += this.speedx;
                this.rotate = 270;
                break;
            /*Rajouter par clem ***********/
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
            /*Rajouter par clem ***********/
        }
        this.update();
    }
    update() {
        this.eVoiture.setAttribute("src", this.img);
        this.eVoiture.style.position = "absolute";
        this.eVoiture.style.top = String(this.y) + "px";
        this.eVoiture.style.left = String(this.x) + "px";
        this.eVoiture.style.rotate = String(this.rotate) + "deg";
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
    /*Rajouter par clem ***************************/
    if (listKeyDown.indexOf("w")!=-1 && listKeyDown.indexOf("a")!=-1) {
        voiture.move(MOVE.TOPLEFT)
    }
    if (listKeyDown.indexOf("w")!=-1 && listKeyDown.indexOf("d")!=-1) {
        voiture.move(MOVE.TOPRIGHT)
    }
    /*Rajouter par clem ***************************/
}

setInterval(mainUpdate,10,listKeyDown);

voiture.draw(eDivCircuit);