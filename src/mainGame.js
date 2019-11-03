import { throws } from "assert";
import { runInThisContext } from "vm";

//import humanShip from "./assets/spritesheets/ship.png";

class mainGame extends Phaser.Scene {
    constructor() {
        super("mainGame");
    }

    create() {
        
        //Add in background
        this.background = this.add.tileSprite(0, 0,this.sys.canvas.width,this.sys.canvas.height, "background");
        this.background.setScale(3);
        this.background.setOrigin(0,0);
        this.background.setScrollFactor(0);

         this.anims.create({
            key: 'playerIdle_anim',
            frames: this.anims.generateFrameNumbers("player_sprite", {frames:[4,5]}),
            frameRate: 20,
            repeat: -1,
            //hideOnComplete:true
        });
        this.anims.create({
            key: 'playerTurnLeft_anim',
            frames: this.anims.generateFrameNumbers("player_sprite", {frames:[0,1]}),
            frameRate: 20,
            repeat: -1,
            //hideOnComplete:true
        });
        this.anims.create({
            key: 'playerTurnRight_anim',
            frames: this.anims.generateFrameNumbers("player_sprite", {frames:[6,7]}),
            frameRate: 20,
            repeat: -1,
            //hideOnComplete:true
        });

        this.player = this.physics.add.sprite(this.sys.canvas.width /2,this.sys.canvas.height/2,"player_sprite");
        this.player.setScale(2);
        this.player.play("playerIdle_anim");


        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.player.setAngularDrag(200);

    }

    update() {
        
        this.playerSpeedController();
        this.playerDirectionController();
        //this.player.setAngularVelocity();
        //this.physics.velocityFromRotation(this.player.rotation, 0, this.player.body.acceleration);
        //this.player.accelerateTo(this.playerSpeed);
    }

    //Main player movement functions

    //Controls player input for acceleration and deceleration
    playerSpeedController(){
        console.log(this.player.rotation)
        if(this.cursorKeys.up.isDown){
            //Accelerate
            this.physics.velocityFromRotation(this.player.rotation, 200, this.player.body.acceleration);
        }
        else if (this.cursorKeys.down.isDown){
            //Decelerate
            this.physics.velocityFromRotation(this.player.rotation, -200, this.player.body.acceleration);
        }
    }
    playerDirectionController(){
        if(this.cursorKeys.left.isDown){
            //Rotate left
            this.player.setRotation(this.player.rotation - 0.15)
        }
        else if(this.cursorKeys.right.isDown){
            //Rotate Right
            this.player.setRotation(this.player.rotation + 0.15)
        }
    }
}

export default mainGame;