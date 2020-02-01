import MediumAsteroid from "./MediumAsteroid.js";

class LargeAsteroid extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, rotation, speed) {
    //Use these to pass these back to the super class to construct the object
    super(scene, x, y, "large_asteroid");
    this.scene = scene;
    //Then add to scene
    scene.add.existing(this);
    //Add to physics group
    scene.asteroids.add(this);

    //Configuration for large asteroid
    this.setScale(2);
    this.setRotation(rotation);
    scene.physics.velocityFromRotation(rotation, speed, this.body.velocity);
    //Set angle of bolt to that of what player is facing
    //Enable this object in the scene's physics, without this line adding velocity will have no effect.
    scene.physics.world.enableBody(this);
    //Set so the projectiles collide with the set world boundries
    this.setCollideWorldBounds(true);
  }

  checkAsteroid() {
    return "LargeAsteroid";
  }

  destroyAsteroid() {
    new MediumAsteroid(
      this.scene,
      this.x,
      this.y,
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 75) + 50
    );

    new MediumAsteroid(
      this.scene,
      this.x,
      this.y,
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 75) + 50
    );

    new MediumAsteroid(
      this.scene,
      this.x,
      this.y,
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 75) + 50
    );
    this.destroy();
  }
}

export default LargeAsteroid;
