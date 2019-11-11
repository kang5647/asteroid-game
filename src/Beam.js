class Beam extends Phaser.Physics.Arcade.Sprite{
    constructor(scene){
        const x = scene.player.x;
        const y = scene.player.y;

        super(scene,x,y,"laser_bolt");
        scene.add.existing(this);
        
        this.setScale(3);
        this.play("laserBolt_anim");
        this.setAngle(scene.player.angle);
        this.setActive(true);

        scene.physics.world.enableBody(this);
        this.setAngularVelocity(0);
        //this.body.speed = 100000;
        scene.physics.velocityFromRotation(scene.player.rotation, 500,this.body.velocity);

    }
}

export default Beam;