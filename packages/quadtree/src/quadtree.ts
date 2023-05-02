export class Rectangle {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.top = y + height;
    this.right = x + width;
    this.bottom = y;
    this.left = x;
  }
}

export class Particle {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class QuadTree {
  region: Rectangle;
  nw: QuadTree | null;
  ne: QuadTree | null;
  se: QuadTree | null;
  sw: QuadTree | null;
  bucket: Particle[];
  limit: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    limit: number
  ) {
    this.region = new Rectangle(x, y, width, height);
    this.nw = null;
    this.ne = null;
    this.se = null;
    this.sw = null;
    this.bucket = [];
    this.limit = limit;
  }

  insert(particle: Particle): void {
    if (!this.include(particle)) {
      return;
    }

    if (this.sw === null) {
      if (this.bucket.length < this.limit) {
        this.bucket.push(particle);
        return;
      }
      this.divide();
    }

    this.nw?.insert(particle);
    this.ne?.insert(particle);
    this.se?.insert(particle);
    this.sw?.insert(particle);
  }

  include(particle: Particle): boolean {
    return (
      this.region.left <= particle.x &&
      particle.x <= this.region.right &&
      this.region.bottom <= particle.y &&
      particle.y <= this.region.top
    );
  }

  divide(): void {
    const x = this.region.left;
    const y = this.region.bottom;
    const width = this.region.width * 0.5;
    const height = this.region.height * 0.5;
    this.nw = new QuadTree(x, y + height, width, height, this.limit);
    this.ne = new QuadTree(x + width, y + height, width, height, this.limit);
    this.se = new QuadTree(x + width, y, width, height, this.limit);
    this.sw = new QuadTree(x, y, width, height, this.limit);

    this.bucket.forEach((particle) => {
      this.nw?.insert(particle);
      this.ne?.insert(particle);
      this.se?.insert(particle);
      this.sw?.insert(particle);
    });
  }

  find(particle: Particle): QuadTree | null {
    if (!this.include(particle)) {
      return null;
    }

    if (this.sw === null) {
      return this;
    }

    return (
      this.nw?.find(particle) ||
      this.ne?.find(particle) ||
      this.se?.find(particle) ||
      this.sw?.find(particle)
    );
  }

  traverse(fn: (node: QuadTree) => void): void {
    if (this.sw === null) {
      fn(this);
    } else {
      this.nw?.traverse(fn);
      this.ne?.traverse(fn);
      this.se?.traverse(fn);
      this.sw.traverse(fn);
    }
  }
}
