#!/bin/bash
SKETCH_NAME=$1

# Create directories
mkdir -p static/p5js/$SKETCH_NAME
mkdir -p content/p5js/$SKETCH_NAME

# Create sketch files
cat > static/p5js/$SKETCH_NAME/sketch.js <<EOL
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('p5-canvas');
  background(240);
}

function draw() {
  if (mouseIsPressed) {
    stroke(0);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
EOL

cat > content/p5js/$SKETCH_NAME/index.md <<EOL
---
title: "${SKETCH_NAME//-/ }"
---
EOL

cat > partials/p5js/$SKETCH_NAME.html <<EOL
<div>
  <p>${SKETCH_NAME//-/ }</p>
</div>
EOL

echo "Created new sketch: $SKETCH_NAME"
echo "Access at: /p5js/$SKETCH_NAME/"
