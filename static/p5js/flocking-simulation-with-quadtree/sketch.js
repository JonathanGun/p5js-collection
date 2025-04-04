// https://thecodingtrain.com/challenges/124-flocking-simulation
// https://en.wikipedia.org/wiki/Quadtree
// https://stackoverflow.com/questions/41946007/efficient-and-well-explained-implementation-of-a-quadtree-for-2d-collision-det

const flock = [];
const numBoids = 100;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('p5-canvas');
  background(240);

  for (let i = 0; i < numBoids; i++) {
    flock.push(new BruteforceBoid(random(width), random(height)));
  }
}

function draw() {
  background(240);
  for (let boid of flock) {
    boid.align(flock);
    boid.flock(flock);
    boid.wander();
    boid.update();
    boid.show();
  }
}
