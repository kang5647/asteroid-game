import { throws } from "assert";
import { runInThisContext } from "vm";

//import humanShip from "./assets/spritesheets/ship.png";

class mainGame extends Phaser.Scene {
    constructor() {
        super("mainGame");
    }

    create() {
        //Game World Deminsions
        this.worldHeight = 1440;
        this.worldWidth = 2448;
        this.physics.world.setBounds(0,0,this.worldWidth,this.worldHeight,true,true,true,true);
        //Player Settings
        this.playerMaxVelocity = 400;
        this.playerDrag = 0.99
        
        //Add in background
        this.background = this.add.tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, "background");
        this.background.setScale(6);
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);

        //Add in stars
        this.stars = this.add.tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, "stars");
        this.stars.setScale(2);
        this.stars.setScrollFactor(0)

        //Add in far off planets
        this.planet_far = this.add.tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, "planet_far");
        this.planet_far.setScale(6);
        this.planet_far.setScrollFactor(0)

        //Add in ring planet
        this.planet_ring = this.add.tileSprite(0, 0, 2000, 2000, "planet_ring");
        //this.planet_ring = this.
        this.planet_ring.setScale(5);
        this.planet_ring.setScrollFactor(0)

        //Add in big planets
        this.planet_big = this.add.tileSprite(-1000, -200, this.sys.canvas.width, this.sys.canvas.height, "planet_big");
        this.planet_big.setScale(4);
        this.planet_big.setScrollFactor(0);


        //Create player in the center of the world 
        this.player = this.physics.add.sprite(this.worldWidth / 2, this.worldHeight / 2, "player_sprite");
        //Double the size + Play the player idle anim
        this.player.setScale(2);
        this.player.play("playerIdle_anim");

        //Player input settings
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        //Drag will use a damping effect rather than a linear approach. Much smoother brakes.
        this.player.setDamping(true);
        this.player.setDrag(this.playerDrag);
        //Used for the toggle in the dampener function
        this.dampeners = true;
        this.player.setMaxVelocity(this.playerMaxVelocity);
        this.player.setCollideWorldBounds(true);

        //Camera Setup
        this.myCam = this.cameras.main;
        //Scenes are infinite, so we set boundaries with the camera and the player
        this.myCam.setBounds(0, 0, this.worldWidth, this.worldHeight);
        //Tell the camera to follow the player
        this.myCam.startFollow(this.player);
    }

    update() {
        //Player Input Controller Functions
        this.speedController();
        this.directionController();
        this.inertiaDampenerController();
        this.parallaxController();
    }

    //Main player movement functions

    //Controls player input for acceleration and deceleration
    speedController() {
        if (this.cursorKeys.up.isDown) {
            //Accelerate
            this.physics.velocityFromRotation(this.player.rotation, 250, this.player.body.acceleration);
        }
        else if (this.cursorKeys.down.isDown) {
            //Decelerate
            this.physics.velocityFromRotation(this.player.rotation, -250, this.player.body.acceleration);
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

    //Controls tilesprites scroll factor. 
    //Parallax functinos by moving objects (tilesprites) across the screen, based on camera movement, at different speeds. 
    //Objects supposed to be closer up move faster while objects supposed to be far away move slower. This creates a depth effect.
    parallaxController(){
        //Stars/galaxy don't really need to move, though I like the effect it gave
        //this.background.tilePositionX = this.myCam.scrollX * .005;
        //this.background.tilePositionY = this.myCam.scrollY * .005;
        //this.stars.tilePositionX = this.myCam.scrollX * .005;
        //this.stars.tilePositionY = this.myCam.scrollY * .005;
        this.planet_far.tilePositionX = this.myCam.scrollX * 0.05;
        this.planet_far.tilePositionY = this.myCam.scrollY * 0.05;
        this.planet_ring.tilePositionX = this.myCam.scrollX * 0.1;
        this.planet_ring.tilePositionY = this.myCam.scrollY * 0.1;
        this.planet_big.tilePositionX = this.myCam.scrollX * 0.22;
        this.planet_big.tilePositionY = this.myCam.scrollY * 0.22;

    }


}

export default mainGame;