/* 
Auteur: Arthur Jegge
Projet: aucun
Detail: une classe qui contient les bases d un player
Date: 04.11.2021
*/
const MOVE = {
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT: 3,
}
class player {
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.speedx = 2;
        this.speedy = 2;
        this.rotate = 0;
        this.scale = 1;
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

        }
        this.update();
    }
    update() {
        this.eVoiture.setAttribute("src", this.img);
        this.eVoiture.style.position = "absolute";
        this.eVoiture.style.top = String(this.y) + "px";
        this.eVoiture.style.left = String(this.x) + "px";
        this.eVoiture.style.rotate = String(this.rotate) + "deg";
        this.eVoiture.style.scale = String(this.scale) + "px";
    }


    draw(eParent) {
        this.eVoiture.setAttribute("src", this.img);
        this.eVoiture.style.position = "absolute";
        this.eVoiture.style.top = String(this.y) + "px";
        this.eVoiture.style.left = String(this.x) + "px";
        this.eVoiture.style.rotate = String(this.rotate) + "deg";
        this.eVoiture.style.scale = String(this.scale) + "px";
        eParent.appendChild(this.eVoiture);
    }
}

function keydown(e) {
    console.log(e.key);
    switch (e.key) {
        case "w":
            voiture.move(MOVE.UP);
            break;
        case "a":
            voiture.move(MOVE.LEFT);
            break;
        case "s":
            voiture.move(MOVE.DOWN);
            break;
        case "d":
            voiture.move(MOVE.RIGHT);
            break;
    }

}


document.onkeydown = keydown;



/*
    onkeypress : lorsqu'une touche est activée
    onkeydown : lorsqu'une touche est enfoncée
    onkeyup : lorsqu'une touche est 'relevée'
 */