import { throws } from "assert";
import { runInThisContext } from "vm";

//import humanShip from "./assets/spritesheets/ship.png";

class mainGame extends Phaser.Scene {
    constructor() {
        super("mainGame");
    }

    create() {
        //Add in background
        this.background = this.add.tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, "background");
        this.background.setScale(3);
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        //Animations for player
        this.anims.create({
            key: 'playerIdle_anim',
            frames: this.anims.generateFrameNumbers("player_sprite", { frames: [4, 5] }),
            frameRate: 20,
            repeat: -1,
        });
        //Unused player animations
        /**
        this.anims.create({
            key: 'playerTurnLeft_anim',
            frames: this.anims.generateFrameNumbers("player_sprite", { frames: [0, 1] }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: 'playerTurnRight_anim',
            frames: this.anims.generateFrameNumbers("player_sprite", { frames: [6, 7] }),
            frameRate: 20,
            repeat: -1,
        });
        */

        //Create player in the center of the canvas
        this.player = this.physics.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "player_sprite");
        //Double the size + Play the player idle anim
        this.player.setScale(2);
        this.player.play("playerIdle_anim");

        //Player input settings
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setDamping(true);
        this.player.setDrag(0.99);
        this.dampeners = true;
        this.player.setMaxVelocity(200);
    }

    update() {
        //Player Input Controller Functions
        this.speedController();
        this.directionController();
        this.inertiaDampenerController();
    }

    //Main player movement functions

    //Controls player input for acceleration and deceleration
    speedController() {
        if (this.cursorKeys.up.isDown) {
            //Accelerate
            this.physics.velocityFromRotation(this.player.rotation, 200, this.player.body.acceleration);
        }
        else if (this.cursorKeys.down.isDown) {
            //Decelerate
            this.physics.velocityFromRotation(this.player.rotation, -200, this.player.body.acceleration);
        }
        else{
            this.player.setAcceleration(0);
        }
    }
    //Controlers player input for rotation
    directionController() {
        if (this.cursorKeys.left.isDown) {
            //Rotate left
            this.player.setRotation(this.player.rotation - 0.15)
        }
        else if (this.cursorKeys.right.isDown) {
            //Rotate Right
            this.player.setRotation(this.player.rotation + 0.15)
        }
    }

    //Toggles player drag on and off 
    inertiaDampenerController() {
        if (this.cursorKeys.shift.isDown) {
            if(this.dampeners){
                this.dampeners = false;
                this.player.setDrag(0);
            } else{
                this.dampeners = true;
                this.player.setDrag(0.99);
            }
        }
    }


}

export default mainGame;