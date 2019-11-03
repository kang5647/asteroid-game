//import background from "./assets/backgrounds/space/parallax-space-background.png"
import background from "./assets/backgrounds/space/background.png"
import player_sprite from "./assets/sprites/player.png"


class mainMenu extends Phaser.Scene {
    constructor(){
        super("mainMenu");
    }

    preload(){
        this.load.image("background",background);
        this.load.spritesheet("player_sprite",player_sprite,{
            frameWidth: 24,
            frameHeight: 16 
        })
    }

    create(){
        //After loading everything, move to the main game scene
        this.scene.switch("mainGame")
    }

}

export default mainMenu;