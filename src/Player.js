class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, playerMaxVelocity, playerDrag) {
    super(scene, scene.worldWidth / 2, scene.worldHeight / 2, "player_sprite");
    //Create player in the center of the world
    scene.add.existing(this);
    //In order for this constructor to run you need to add this object to a physics group.
    //If you don't, this constructor will fail due to null error
    scene.players.add(this);

    //Double the size + Play the player idle anim
    this.setScale(2);
    this.play("playerIdle_anim");

    //this.cursorKeys.space.setEmitOnRepeat(true);
    //Drag will use a damping effect rather than a linear approach. Much smoother brakes.
    this.setDamping(true);
    this.setDrag(playerDrag);
    //Used for the toggle in the dampener function
    this.setMaxVelocity(playerMaxVelocity);

    //Alter Player Hitbox
    this.setSize(14, 14);
    this.setOffset(5, 0);

    //In order to play the explosion animation we need the player to exist.
    //This is used to disable player input when the player dies.
    scene.physics.add.collider(
      scene.players,
      scene.asteroids,
      (player, asteroid) => {
        if (!this.disablePlayer) {
          this.killPlayer(player, asteroid, scene);
          scene.playerHud.displayGameOverOverlay(scene);
        }
      }
    );
    //Upon player death we want to play an animation and then kill the player.
    this.playerAlive = true;
    return this;
  }

  //ASK RON!!! Im not able to access the scene here for some reason. WHY???
  killPlayer(player, asteroid, scene) {
    if (this.playerAlive) {
      //Upon Collision, play the explosion animation
      this.play("explosion_anim");
      //Destroy asteroid for a better impact
      asteroid.destroyAsteroid();
      //If we delete the player right after playing the explosion anim the game will crash.
      //This will cut the animation short && the player controller functions will crash the game because
      //they are still lisening for player input on an object that no longer exists.

      //To fix this we wait until the animation is complete BEFORE we destroy the player object.
      this.on(
        "animationcomplete",
        () => {
          this.destroy();
        },
        scene
      );

      //It is possible that before the explosion animation is finished the player will hit another asteroid.
      //This causes this function to be invoked again causes the player to crash because in that time the player object
      //has been deleted.
      this.playerAlive = false;
    }
  }
}

export default Player;
