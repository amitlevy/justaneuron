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

  static labeled_value(data, label) {
    const new_val = new Value(data);
    new_val.label = label;
    return new_val;
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

    this.grad = 1.0;
    topo
      .slice()
      .reverse()
      .forEach(function (v) {
        v._backward();
      });
  }

  parent(root, resetGrad) {
    const child = this;
    let parent = null;
    const visited = new Set();

    function search(v) {
      if (!visited.has(v)) {
        visited.add(v);
        for (const c of v.children) {
          if (resetGrad) {
            c.grad = 0;
          }

          if (c.id === child.id) {
            parent = v;
            if (!resetGrad) break;
          }

          if (c.children.length > 0) {
            search(c);
          }
        }
      }
    }

    search(root)
    return parent;
  }

  update(val, root) {
    function forward(v, d) {
      if (v.id === root.id) {
        v.data = d;
        v.grad = 0.0;
        return;
      }

      v.data = d;
      const parent = v.parent(root, true);
      let newData = d;
      const [ child1, child2 ] = parent.children;
      if (parent.op === '+') {
        newData = child1.data + child2.data;
      } else if (parent.op === '*') {
        newData = child1.data * child2.data;
      } else if (parent.op === 'ReLU') {
        newData = child1.data < 0 ? 0.0 : child1.data;
      }

      forward(parent, newData);
    }

    forward(this, val);
    root.backward();
  }
}

export {
  Value
};
