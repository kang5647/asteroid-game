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
        /**
        this.anims.create({
            key: 'playerIdle_anim',
            frames: this.anims.generateFrameNumbers("player_sprite", {frames:[3,8]}),
            frameRate: 20,
            repeat: -1,
            //hideOnComplete:true
        });
        this.anims.create({
            key: 'playerTurnLeft_anim',
            frames: this.anims.generateFrameNumbers("player_sprite", {frames:[1,2,6,7]}),
            frameRate: 20,
            //repeat: -1,
            //hideOnComplete:true
        });
        this.anims.create({
            key: 'playerTurnRight_anim',
            frames: this.anims.generateFrameNumbers("player_sprite", {frames:[4,5,9,10]}),
            frameRate: 20,
            repeat: -1,
            //hideOnComplete:true
        });
        */
    }

    create(){
        //After loading everything, move to the main game scene
        this.scene.switch("mainGame")
    }

}

export default mainMenu;