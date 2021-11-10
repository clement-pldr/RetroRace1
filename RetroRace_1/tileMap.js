/*
Auteur: Arthur Jegge
Projet: RetroRace
Détail: un fichier qui contient la class tileMap qui permet de créer une map faite
de plusieurs petite image carrée
Date: 03.11.2021
*/

const IMG = {
    VIDE: 0,
    BOTTOM_TOP: 1,
    BOTTOM_RIGHT: 2,
    BOTTOM_LEFT: 3,
    LEFT_RIGHT: 4,
    TOP_RIGHT: 5,
    TOP_LEFT: 6,
};

class tileMap {
    /**
     * 
     * @param {Number} mapX la coordonées x du coin en haut a gauche en pixel
     * @param {Number} mapY la coordonées y du coin en haut a gauche en pixel
     * @param {Number} height le nombre de tile en hauteur
     * @param {Number} width le nombre de tile en largeur
     * @param {Number} tileSide la taille des tiles en pixel
     * @param {Number[]} tilesImg un tableau qui contient l id de l image
     * @param {Number} scale le zoom a appliqué, par défaut 1
     */
    constructor(mapX, mapY, height, width, tileSide, tilesImg, scale = 1) {
        this.mapX = mapX;
        this.mapY = mapY;
        this.height = height;
        this.width = width;
        this.tileSide = tileSide;
        this.tilesImg = tilesImg;
        this.scale = scale;
        this.map = [];
        let indexTilesImg = 0;
        for (let j = 0; j < width; j++) {
            for (let i = 0; i < height; i++) {
                let posX = mapX + tileSide * i * scale;
                let posY = mapY + tileSide * j * scale;
                this.map.push({ x: posX, y: posY, img: tilesImg[indexTilesImg] });
                indexTilesImg += 1;
            }
        }

    }

    /**
     * Affiche la tileMap dans l élément passé en paramètre.
     * @param {HTMLElement} eParent élément parent 
     */
    draw(eParent) {
        for (let tile of this.map) {
            // crée une balise img
            let eImgTile = document.createElement("img");
            // séléctionne le chemin de l'image
            let imgPath = "";
            let tileRotateAngle = 0;
            switch (tile.img) {
                case IMG.VIDE:
                    imgPath = "./img/circuit_0.png";
                    break;
                case IMG.BOTTOM_TOP:
                    imgPath = "./img/circuit_1.png";
                    break;
                case IMG.BOTTOM_RIGHT:
                    imgPath = "./img/circuit_2.png";
                    break;
                case IMG.BOTTOM_LEFT:
                    imgPath = "./img/circuit_2.png";
                    tileRotateAngle = 90;
                    break;
                case IMG.LEFT_RIGHT:
                    imgPath = "./img/circuit_1.png";
                    tileRotateAngle = 90;
                    break;
                case IMG.TOP_RIGHT:
                    imgPath = "./img/circuit_2.png";
                    tileRotateAngle = 270;
                    break;
                case IMG.TOP_LEFT:
                    imgPath = "./img/circuit_3.png";
                    tileRotateAngle = 90;
                    break;
            }
            // ajoute l attribut src a l element img
            eImgTile.setAttribute("src", imgPath);
            // tourne le tile si besoin
            eImgTile.style.rotate = String(tileRotateAngle) + "deg";
            // augmente l echel
            eImgTile.style.scale = String(this.scale);
            // définit la position des tiles
            eImgTile.style.position = "absolute";
            eImgTile.style.top = String(tile.y) + "px";
            eImgTile.style.left = String(tile.x) + "px";
            // ajoute la balise img à l element parent
            eParent.appendChild(eImgTile);
        }

    }

}

var eDivCircuit = document.getElementById("circuit");
var imgMap = [
    IMG.VIDE, 1, 2, 3, 4, 5, 6, IMG.VIDE, IMG.VIDE, IMG.VIDE,
    IMG.VIDE, IMG.BOTTOM_TOP, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE,
    IMG.VIDE, IMG.BOTTOM_TOP, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE,
    IMG.VIDE, IMG.TOP_RIGHT, IMG.LEFT_RIGHT, IMG.LEFT_RIGHT, IMG.BOTTOM_LEFT, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE,
    IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.BOTTOM_TOP, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE,
    IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.BOTTOM_TOP, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE,
    IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.BOTTOM_RIGHT, IMG.TOP_LEFT, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE,
    IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.TOP_RIGHT, IMG.LEFT_RIGHT, IMG.BOTTOM_LEFT, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE,
    IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.TOP_RIGHT, IMG.BOTTOM_LEFT, IMG.VIDE, IMG.VIDE, IMG.VIDE,
    IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.TOP_RIGHT, IMG.BOTTOM_LEFT, IMG.VIDE, IMG.VIDE,
    IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.VIDE, IMG.BOTTOM_TOP,
]
var test = new tileMap(200, 200, 10, 10, 50, imgMap, 1);
test.draw(eDivCircuit);