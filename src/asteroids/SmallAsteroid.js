class SmallAsteroid extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, rotation, speed) {
    //Use these to pass these back to the super class to construct the object
    super(scene, x, y, "small_asteroid");
    //Then add to scene
    scene.add.existing(this);
    //Add to physics group
    scene.asteroids.add(this);
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);

    //Configuration for large asteroid
    this.setScale(2);
    scene.physics.velocityFromRotation(rotation, speed, this.body.velocity);
  }

  destroyAsteroid() {
    this.destroy();
  }
}

export default SmallAsteroid;
