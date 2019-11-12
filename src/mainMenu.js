import background from "./assets/backgrounds/space/background.png"
import stars from "./assets/backgrounds/space/parallax-space-stars.png"
import planet_big from "./assets/backgrounds/space/parallax-space-big-planet.png"
import planet_far from "./assets/backgrounds/space/parallax-space-far-planets.png"
import planet_ring from "./assets/backgrounds/space/parallax-space-ring-planet.png"
import player_sprite from "./assets/sprites/player.png"
import laser_bolt from "./assets/sprites/laser-bolts.png"


class mainMenu extends Phaser.Scene {
    constructor(){
        super("mainMenu");
    }

    preload(){
        this.load.image("background",background);
        this.load.image("stars",stars);
        this.load.image("planet_big",planet_big);
        this.load.image("planet_far",planet_far);
        this.load.image("planet_ring",planet_ring);
        this.load.spritesheet("player_sprite",player_sprite,{
            frameWidth: 24,
            frameHeight: 16 
        })

        this.load.spritesheet("laser_bolt",laser_bolt,{
            frameWidth: 16,
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

        this.anims.create({
            key: 'laserBolt_anim',
            frames: this.anims.generateFrameNumbers("laser_bolt", { frames: [0, 2] }),
            frameRate: 20,
            repeat: -1,
        });

        //After loading everything, move to the main game scene
        this.scene.switch("mainGame")
    }
}

export default mainMenu;