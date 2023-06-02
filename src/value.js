import { v4 as uuidv4 } from 'uuid';

class Value {
  constructor(data, children = [], op = '') {
    this.id = uuidv4();
    this.data = data;
    this.children = children;
    this.op = op;
    this._backward = function () {
      return null;
    };

    this.grad = 0.0;
  }

  add(other) {
    const out = new Value(this.data + other.data, [this, other], '+');

    out._backward = () => {
      this.grad += out.grad;
      other.grad += out.grad;
    };

    return out;
  }

  mul(other) {
    const out = new Value(this.data * other.data, [this, other], '*');

    out._backward = () => {
      this.grad += other.data * out.grad;
      other.grad += this.data * out.grad;
    };

    return out;
  }

  relu() {
    const out = new Value(this.data < 0 ? 0.0 : this.data, [this], 'ReLU');

    out._backward = () => {
      this.grad += (out.data > 0.0 ? 1.0 : 0.0) * out.grad;
    };

    return out;
  }

  backward() {
    const topo = [];
    const visited = new Set();
    const build_topo = function (v) {
      if (!visited.has(v)) {
        visited.add(v);
        for (const child of v.children) {
          build_topo(child);
        }
        topo.push(v);
      }
    };

    build_topo(this);

    this.grad = 1;
    topo
      .slice()
      .reverse()
      .forEach(function (v) {
        v._backward();
      });
  }
}

export {
  Value
};
