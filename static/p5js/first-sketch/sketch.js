let prevX, prevY;
let drawing = false;

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('p5-canvas');
    background(240); // Light gray background
    stroke(20); // Black stroke
    strokeWeight(4); // Thicker line
}

function draw() {
    // Only draw when mouse is pressed and moved
    if (drawing && mouseIsPressed && (mouseX !== prevX || mouseY !== prevY)) {
        line(prevX, prevY, mouseX, mouseY);
    }

    // Update previous position
    prevX = mouseX;
    prevY = mouseY;
}

function mousePressed() {
    drawing = true;

    prevX = mouseX;
    prevY = mouseY;
}

function mouseReleased() {
    drawing = false;
}

// Optional: Clear canvas when 'c' key is pressed
function keyPressed() {
    if (key === 'c' || key === 'C') {
        background(240);
    }
}


function touchStarted() {
    fullscreen();
    drawing = true;
    prevX = mouseX;
    prevY = mouseY;
    return false; // Prevent default behavior
}

function touchMoved() {
    drawing = true;
    return false; // Prevent default behavior
}

function touchEnded() {
    drawing = false;
    return false; // Prevent default behavior
}

document.body.addEventListener("touchmove", ev => {
    if (ev.touches.length >= 1) {
        ev.preventDefault();
    }
}, true);
