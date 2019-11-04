//import background from "./assets/backgrounds/space/parallax-space-background.png"
import background from "./assets/backgrounds/space/background.png"
import player_sprite from "./assets/sprites/player.png"
import enemy_sprite from "./assets/sprites/enemy-medium.png"


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
         //Animations for player
         //Note you can only create anims in the create function, don't try and put in the preload 
        this.anims.create({
            key: 'playerIdle_anim',
            frames: this.anims.generateFrameNumbers("player_sprite", { frames: [4, 5] }),
            frameRate: 20,
            repeat: -1,
        });

        //After loading everything, move to the main game scene
        this.scene.switch("mainGame")
    }

}

export default mainMenu;