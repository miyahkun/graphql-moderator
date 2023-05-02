import p5 from "p5";
import { Particle, QuadTree } from "./quadtree";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;
const SCALE = 1000;

const PARTICLE_RADIUS = 2.5;

const drawParticles = (p: p5, particles: Particle[], scale: number) => {
  particles.forEach((part) => {
    const x = part.x * scale;
    const y = CANVAS_HEIGHT - part.y * scale;
    p.ellipse(x, y, PARTICLE_RADIUS * 2);
  });
};

const drawNodes = (p: p5, node: QuadTree, scale: number) => {
  const x = node.region.left * scale;
  const y = CANVAS_HEIGHT - node.region.top * scale;
  const width = node.region.width * scale;
  const height = node.region.height * scale;
  p.rect(x, y, width, height);
};

const sketch = (p: p5) => {
  const rootQuadTree = new QuadTree(0, 0, 1, 1, 5);

  const particles = [...Array(2000)].map(() => {
    const radius = p.random();
    const theta = 2 * Math.PI * p.random();
    const x = radius * Math.cos(theta) + 0.5;
    const y = radius * Math.sin(theta) + 0.5;
    const particle = new Particle(x, y);
    rootQuadTree.insert(particle);
    return particle;
  });

  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    p.randomSeed(1);
  };

  p.draw = () => {
    p.background(220);

    p.noStroke();
    p.fill("blue");
    drawParticles(p, particles, SCALE);

    p.stroke("black");
    p.noFill();

    rootQuadTree.traverse((node) => {
      drawNodes(p, node, SCALE);
    });

    const x = p.mouseX / SCALE;
    const y = (CANVAS_HEIGHT - p.mouseY) / SCALE;
    const particle = new Particle(x, y);
    const node = rootQuadTree.find(particle);

    if (node !== null) {
      p.stroke("red");
      drawNodes(p, node, SCALE);

      p.noStroke();
      p.fill("red");
      drawParticles(p, node.bucket, SCALE);
    }
  };
};

new p5(sketch);
