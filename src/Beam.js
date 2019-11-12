class Beam extends Phaser.Physics.Arcade.Sprite{
    constructor(scene){
        //Get players coordinates
        const x = scene.player.x;
        const y = scene.player.y;

        //Use these to pass these back to the super class to construct the object

        /**
        scene
        Phaser.Vector3 playerPos = player.transform.position;
        Phaser.Vector3 playerDirection = player.transform.forward;
        Quaternion playerRotation = player.transform.rotation;
        float spawnDistance = 10;
        Vector3 spawnPos = playerPos + playerDirection*spawnDistance;
        */

        super(scene,x,y,"laser_bolt");
        //Then add to scene
        scene.add.existing(this);
        //Add to physics group
        scene.bolts.add(this);
        
        //Double the size of the bolt
        this.setScale(2);
        //Player the bolt animation
        this.play("laserBolt_anim");
        //Set angle of bolt to that of what player is facing
        this.setAngle(scene.player.angle);

        //Enable this object in the scene's physics, without this line adding velocity will have no effect.
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        //Sets the angular velocity from the players current angle of rotation, so that projectiles fly in the direction player is facing
        //**IMPORTANT** for the third parameter pass this.body.velocity rather than this.body.acceleration. This makes it so projectiles 
        //fly at a constant rate. Might make use of this for bombs or something.
        scene.physics.velocityFromRotation(scene.player.rotation, 650,this.body.velocity);
        //Collide with world boundries
    }
}

export default Beam;