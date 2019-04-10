import React, { PureComponent } from 'react';

const canvasWidth = 400;
const canvasHeight = 400;
let interval = null;

// Thanks to Chris DeLeon of Gamkedo
// https://www.youtube.com/watch?v=xGmXxpIj6vs
//
class Easter extends PureComponent {
  state = {
    px: 10,
    py: 10,
    ax: 15,
    ay: 15,
    xv: 0,
    yv: 0,
    tail: 5,
    gs: 20,
    tc: 20,
    trail: [],
  };

  constructor(props) {
    super(props);
    this.btnRef = React.createRef();
  }

  componentDidMount() {
    const docBody = document.body;
    docBody.addEventListener('keydown', this.keyPushed);
    interval = setInterval(this.refresh, 1000 / 15);
  }

  componentWillUnmount() {
    const docBody = document.body;
    docBody.removeEventListener('keydown', this.keyPushed);
    clearInterval(interval);
  }

  keyPushed = e => {
    let { xv, yv } = this.state;
    switch (e.keyCode) {
      case 37:
        xv = -1;
        yv = 0;
        break;
      case 38:
        xv = 0;
        yv = -1;
        break;
      case 39:
        xv = 1;
        yv = 0;
        break;
      case 40:
        xv = 0;
        yv = 1;
        break;
      default:
        break;
    }
    this.setState({ xv, yv });
  };

  refresh = () => {
    let { px, py, ax, ay, tail } = this.state;
    const { xv, yv, gs, tc, trail } = this.state;
    if (this.btnRef && this.btnRef.current) {
      const ctx = this.btnRef.current.getContext('2d');
      px += xv;
      py += yv;
      if (px < 0) {
        px = tc - 1;
      }
      if (px > tc - 1) {
        px = 0;
      }
      if (py < 0) {
        py = tc - 1;
      }
      if (py > tc - 1) {
        py = 0;
      }

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = 'lime';
      for (let i = 0; i < trail.length; i += 1) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        if (trail[i].x === px && trail[i].y === py) {
          tail = 5;
        }
      }
      trail.push({ x: px, y: py });
      while (trail.length > tail) {
        trail.shift();
      }

      if (ax === px && ay === py) {
        tail += 1;
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
      }
      ctx.fillStyle = 'red';
      ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
    }
    this.setState({ px, py, ax, ay, xv, yv, tail, gs, tc, trail });
  };

  render() {
    return (
      <div style={{ zIndex: 2, marginLeft: '36px' }}>
        <canvas
          id="canvas"
          style={{
            zIndex: 3,
            border: '1px solid #EAEAEA',
            boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.15)',
          }}
          ref={this.btnRef}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
    );
  }
}
export default Easter;
