import LargeAsteroid from "./LargeAsteroid.js";
import MediumAsteroid from "./MediumAsteroid.js";
import SmallAsteroid from "./SmallAsteroid.js";

class AsteroidController {
  constructor(scene) {
    this.init(scene);
    window.setInterval(() => {
      this.spawnAsteroids(scene);
    }, 500);
  }

  init(scene) {
    this.scene = scene;
    console.log(this.scene);
  }

  spawnAsteroids(scene) {
    //Determine what type of asteroid to spawn
    let asteroidType = Math.floor(Math.random() * 3);
    //Generate what side to spawn the asteroid from (left,right,top,bottom)
    let side = Math.floor(Math.random() * 4);
    //Using the side, generate the x,y values where the asteroid is supposed to spawn
    let spawnLocation = this.genSpawnLocation(
      side,
      scene.worldWidth,
      scene.worldHeight
    );
    //Using the side, generate the direction the asteroid should be moving
    let direction = this.genDirection(side);
    if (side === 0) {
      console.log("left: ", direction);
    } else if (side === 1) {
      console.log("right", direction);
    } else if (side === 2) {
      console.log("bottom: ", direction);
    } else if (side === 3) {
      console.log("top: ", direction);
    }
    if (asteroidType === 0) {
      //If 0 spawn Large Asteroid
      new LargeAsteroid(
        scene,
        spawnLocation.x,
        spawnLocation.y,
        direction,
        Math.floor(Math.random() * 100) + 50
      );
    }
    //If 1 spawn Medium Asteroid
    else if (asteroidType === 1) {
      new MediumAsteroid(
        scene,
        spawnLocation.x,
        spawnLocation.y,
        direction,
        Math.floor(Math.random() * 200) + 50
      );
    }
    //If 2 spawn small Asteroid
    else if (asteroidType === 2) {
      new SmallAsteroid(
        scene,
        spawnLocation.x,
        spawnLocation.y,
        direction,
        Math.floor(Math.random() * 300) + 50
      );
    }
  }

  //Determines the x,y values for where the asteroid is supposed to spawn.
  genSpawnLocation(side, gameWidth, gameHeight) {
    //left
    if (side === 0) {
      return { x: 0, y: this.randomIntFromInterval(0, gameHeight) };
    }
    //right
    else if (side === 1) {
      return { x: gameWidth, y: this.randomIntFromInterval(0, gameHeight) };
    }
    //bottom
    else if (side === 2) {
      return { x: this.randomIntFromInterval(0, gameWidth), y: 0 };
    }
    //top
    else if (side === 3) {
      return { x: this.randomIntFromInterval(0, gameWidth), y: gameHeight };
    }
  }

  genDirection(side) {
    //Left side is tricky because it requires a range (in degrees) of
    //Left: 270-360 or 0-90

    //left
    if (side === 0) {
      if (this.randomIntFromInterval(0, 1) === 0) {
        return this.randomIntFromInterval(280, 350);
      } else {
        return this.randomIntFromInterval(10, 80);
      }
      return;
    }
    //right
    else if (side === 1) {
      return this.randomIntFromInterval(110, 250);
    }
    //bottom
    else if (side === 2) {
      return this.randomIntFromInterval(200, 340);
    }
    //top
    else if (side === 3) {
      return this.randomIntFromInterval(20, 160);
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
export default AsteroidController;
