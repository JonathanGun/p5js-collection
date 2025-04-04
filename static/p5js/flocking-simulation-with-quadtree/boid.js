const ALIGNMENT = true;

class Boid {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
        this.maxSpeed = 3;
        this.maxForce = 0.1;
        this.size = 6;
        this.wanderRadius = 0.001;
    }

    flock(boids) { }
    align(boids) { }
    wander() {
        // add a small random force to the boid's acceleration
        let wanderAngle = random(TWO_PI);
        let wanderForce = createVector(cos(wanderAngle), sin(wanderAngle));
        wanderForce.mult(this.wanderRadius);
        wanderForce.add(this.position);
        wanderForce.sub(this.position);
        wanderForce.setMag(this.maxSpeed);
        wanderForce.sub(this.velocity);
        wanderForce.limit(this.maxForce);
        this.acceleration.add(wanderForce);
        // add a small random angle to the boid's velocity
        let angle = random(-PI / 4, PI / 4);
        this.velocity.rotate(angle);
        this.velocity.setMag(this.maxSpeed);
        this.acceleration.add(this.velocity);
        this.velocity.limit(this.maxSpeed);
    }

    show() {
        fill(127);
        stroke(200);
        strokeWeight(1);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);

        this.wrapEdges();
    }

    wrapEdges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }
}

class BruteforceBoid extends Boid {
    constructor(x, y) {
        super(x, y);
    }

    flock(boids) {
        let alignment = this.align(boids);
        this.acceleration.add(alignment);
    }

    align(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;

        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other !== this && distance < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }

        return steering;
    }
}
