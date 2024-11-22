let p5bokeh,
  canvasWidth,
  canvasHeight,
  canvas,
  size,
  velocity,
  blurAmount,
  alpha,
  hue,
  lightness,
  color,
  marble,
  marbles = [];

const twoTimesPi = Math.PI * 2;

const options = {
  numberOfElements: 400,
  minSize: 10,
  maxSize: 200,
  minVelocity: 0.2,
  maxVelocity: 1.5,
  blurMin: 0,
  blurMax: 6,
  hueMin: 40,
  hueMax: 360,
  saturationMin: 80,
  saturationMax: 100,
  lightnessMin: 76,
  lightnessMax: 100,
  alphaMin: 0.4,
  alphaMax: 1.0,
};

class Marble {
  constructor(marble, size, velocity) {
    this.marble = marble;
    this.size = size;
    this.angle = random(0, twoTimesPi);
    this.velocity = velocity;
    this.loc = createVector(
      random(0 - this.size, width + this.size),
      random(0 - this.size, height + this.size)
    );
  }

  show() {
    image(this.marble, this.loc.x, this.loc.y, this.size, this.size);
  }

  reposition() {
    this.loc.x += Math.cos(this.angle) * this.velocity;
    this.loc.y += Math.sin(this.angle) * this.velocity;
    this.angle += random(-0.05, 0.05);

    if (this.loc.x - this.size > width) {
      this.loc.x = -this.size;
    }
    if (this.loc.x + this.size < 0) {
      this.loc.x = width + this.size;
    }
    if (this.loc.y - this.size > height) {
      this.loc.y = -this.size;
    }
    if (this.loc.y + this.size < 0) {
      this.loc.y = height + this.size;
    }
  }
}

function getBlurredEllipses(blurAmount, size, color) {
  const graphic = createGraphics(size, size);

  const thisAlpha = random(color.alpha.alphaMin, color.alpha.alphaMax);
  const thisColor = hsla(floor(color.hue), floor(color.saturation), floor(color.lightness), (floor(thisAlpha * 10000) / 10000));

  const margin = 2;
  const delta = 2 * blurAmount;
  const ellipseWidth = graphic.width - delta - margin;
  const ellipseHeight = graphic.height - delta - margin;

  const largerGraphic = createGraphics(graphic.width + delta * 2, graphic.height + delta * 2);

  const x = largerGraphic.width / 2;
  const y = largerGraphic.height / 2;

  largerGraphic.noStroke();
  largerGraphic.fill(thisColor);

  largerGraphic.drawingContext.filter = 'blur(' + blurAmount + 'px)';
  largerGraphic.ellipse(x, y, ellipseWidth, ellipseHeight);
  largerGraphic.drawingContext.filter = 'none';

  graphic.image(largerGraphic, -delta, -delta);

  return graphic;
}

function hsla(h, s, l, a) {
  return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
}

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("#home");
  
  colorMode(HSL, 100);
  pixelDensity(1);
  noStroke();
  
  for(let i = 0; i < options.numberOfElements; i++) {
    hue = random(options.hueMin, options.hueMax);
    saturation = random(options.saturationMin, options.saturationMax);
    lightness = random(options.lightnessMin, options.lightnessMax);
    alpha = {
      alphaMin: options.alphaMin,
      alphaMax: options.alphaMax,
    };
    color = {
      hue: hue,
      saturation: saturation,
      lightness: lightness,
      alpha: alpha
    };

    blurAmount = random(options.blurMin, options.blurMax);
    velocity = random(options.minVelocity, options.maxVelocity);
    size = random(options.minSize, options.maxSize);

    marble = getBlurredEllipses(blurAmount, size, color);
    marbles.push(new Marble(marble, size, velocity));
  }
}

function draw() {
  clear();
  for(let i = 0; i < marbles.length; i++) {
    marbles[i].show();
    marbles[i].reposition();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasWidth = width;
  canvasHeight = height;
}