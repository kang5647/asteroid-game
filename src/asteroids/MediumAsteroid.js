import smallAsteroid from "./SmallAsteroid.js";

class MediumAsteroid extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, rotation, speed) {
    //Use these to pass these back to the super class to construct the object
    super(scene, x, y, "medium_asteroid_a");
    this.scene = scene;
    //Then add to scene
    scene.add.existing(this);
    //Add to physics group
    scene.asteroids.add(this);

    //Configuration for large asteroid
    this.setScale(2);
    scene.physics.velocityFromRotation(
      Math.floor(Math.random() * 360),
      speed,
      this.body.velocity
    );
    //Set angle of bolt to that of what player is facing
    //Enable this object in the scene's physics, without this line adding velocity will have no effect.
    scene.physics.world.enableBody(this);
    //Set so the projectiles collide with the set world boundries
    this.setCollideWorldBounds(true);
  }

  destroyAsteroid() {
    new smallAsteroid(
      this.scene,
      this.x,
      this.y,
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 75) + 50
    );
    new smallAsteroid(
      this.scene,
      this.x,
      this.y,
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 75) + 50
    );

    this.destroy();
  }
}

export default MediumAsteroid;
