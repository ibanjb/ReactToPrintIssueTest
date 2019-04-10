import React, { PureComponent } from 'react';
import { Tooltip, Icon, Button } from 'antd';
import { formatMessage } from 'umi/locale';

const explanation = 'Abbreviations';
const leftBreast = 'Left';
const rightBreast = 'Right';

const node = 'N';
const hardening = 'H';
const line = 'Line';
const circle = 'Circle';
const rectangleWidth = 400;
const rectangleHeight = 300;

class CanvasTest extends PureComponent {
  /* eslint-disable */
  state = {
    pencil: '',
    isDrawing: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    currentId: 0,
    coordinates: this.props.coordinates ? this.props.coordinates : [],
  };
  /* eslint-enable */

  constructor(props) {
    super(props);
    this.btnRef = React.createRef();
  }

  componentDidMount() {
    this.mountCoordinates();
    this.drawForm();
    this.drawCoordinates(true);
  }

  componentWillUnmount() {
    this.mouseUnsubscribe();
  }

  mountCoordinates = () => {
    const { coordinates } = this.state;
    let id = 0;
    for (let i = 0; i < coordinates.length; i += 1) {
      id += 1;
      coordinates[i].id = id;
    }
    this.setState({ currentId: id });
  };

  handleClickOnCanvas = e => {
    const { pencil } = this.state;
    if (pencil === node || pencil === hardening) {
      this.handleLetter(e);
    }
  };

  handleLetter = e => {
    const { pencil } = this.state;
    const position = this.getRelativePositionOnCanvas(e);
    this.drawLetter(pencil, position.x, position.y, true);
    this.saveCoordinates(pencil, position.x, position.y);
  };

  setMark = type => {
    this.setState({ pencil: type, isDrawing: false });
    this.mouseUnsubscribe();
    if (type === line || type === circle) {
      this.mouseSubscribe();
    }
  };

  undoLast = () => {
    const { coordinates } = this.state;
    if (coordinates.length > 0) {
      if (coordinates[coordinates.length - 1].isNew) {
        coordinates.pop();
      }
    }
    this.setState({ pencil: '', startX: 0, startY: 0, isDrawing: false, coordinates });
    this.drawForm();
    this.drawCoordinates(false);
  };

  reset = () => {
    this.removeAllCoordinates();
    this.drawForm();
    this.drawCoordinates();
  };

  removeAllCoordinates = () => {
    const newCoords = [];
    this.setState({ coordinates: newCoords });
  };

  isIntersect = (x, y) => {
    const ctx = this.btnRef.current.getContext('2d');
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    if (pixel[0] === 255 && pixel[1] === 255 && pixel[2] === 255 && pixel[3] === 255) {
      return true;
    }
    return false;
  };

  handleMouseDown = e => {
    const { pencil, coordinates } = this.state;
    const position = this.getRelativePositionOnCanvas(e);
    if (this.isIntersect(position.x, position.y)) {
      if (pencil === line) {
        this.saveCoordinates(pencil, position.x, position.y);
      }
      if (pencil === circle) {
        this.saveCoordinates(pencil, position.x, position.y);
        const currentCoord = coordinates[coordinates.length - 1];
        currentCoord.coords = [];
        currentCoord.coords.push({ x: position.x, y: position.y });
        currentCoord.coords.push({ x: position.x, y: position.y });
      }
    }

    this.setState({ isDrawing: true, startX: position.x, startY: position.y });
  };

  handleMouseUp = () => {
    this.setState({ isDrawing: false });
    this.drawForm();
    this.drawCoordinates(false);
    this.stopPropagation();
  };

  handleMouseMove = e => {
    const { currentId, coordinates, pencil, isDrawing, startX, startY } = this.state;
    if (isDrawing) {
      const position = this.getRelativePositionOnCanvas(e);

      if (pencil === line) {
        this.drawLine(position.x, position.y);
        const currentCoord = coordinates.find(x => x.id === currentId);
        currentCoord.coords.push({ x: position.x, y: position.y });
      }

      if (pencil === circle) {
        this.drawForm();
        this.drawCoordinates(false);
        this.stopPropagation();
        const currentCoord = coordinates.find(x => x.id === currentId);
        currentCoord.coords = [];
        currentCoord.coords.push({ x: startX, y: startY });
        currentCoord.coords.push({ x: position.x, y: position.y });
        this.drawOval(startX, startY, position.x, position.y);
      }
    }
  };

  handleMouseOut = () => {
    // nothing to do
  };

  mouseSubscribe = () => {
    const canvas = document.getElementById('canvas');
    canvas.addEventListener('mousedown', this.handleMouseDown, false);
    canvas.addEventListener('mousemove', this.handleMouseMove, false);
    canvas.addEventListener('mouseup', this.handleMouseUp, false);
    canvas.addEventListener('mouseout', this.handleMouseOut, false);
  };

  mouseUnsubscribe = () => {
    const canvas = document.getElementById('canvas');
    canvas.removeEventListener('mousedown', this.handleMouseDown, false);
    canvas.removeEventListener('mousemove', this.handleMouseMove, false);
    canvas.removeEventListener('mouseup', this.handleMouseUp, false);
  };

  getRelativePositionOnCanvas = e => {
    const ctx = this.btnRef.current.getContext('2d');
    const rect = ctx.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const position = { x, y };
    return position;
  };

  generateNewId = () => {
    let { currentId } = this.state;
    currentId += 1;
    this.setState({ currentId });
    return currentId;
  };

  saveCoordinates = (pencil, x, y) => {
    const { coordinates } = this.state;
    const id = this.generateNewId();
    coordinates.push({ id, type: pencil, coords: [{ x, y }], isNew: true });
    this.setState({ coordinates });
  };

  stopPropagation = () => {
    const ctx = this.btnRef.current.getContext('2d');
    ctx.beginPath();
    ctx.closePath();
    ctx.stroke();
  };

  getPositionOnCanvas = e => {
    let x = e.layerX;
    let y = e.layerY;
    if (e.layerX || e.layerX === 0) {
      x = e.offsetX;
      y = e.offsetY;
    }
    return { x, y };
  };

  drawCoordinates = displaySavedOnly => {
    const { coordinates } = this.state;
    for (let i = 0; i < coordinates.length; i += 1) {
      const { type, coords, isNew } = coordinates[i];

      if (!isNew || (!displaySavedOnly && isNew)) {
        if (coordinates[i].type === line) {
          for (let j = 0; j < coords.length; j += 1) {
            const { x, y } = coords[j];
            this.drawLine(x, y);
          }
        }

        if (coordinates[i].type === circle) {
          const initCircle = coords[0];
          const endCircle = coords[1];
          this.drawOval(initCircle.x, initCircle.y, endCircle.x, endCircle.y);
        }

        if (coordinates[i].type === node || coordinates[i].type === hardening) {
          const { x, y } = coords[0];
          this.drawLetter(type, x, y);
        }

        this.stopPropagation();
      }
    }
  };

  drawLetter = (pencil, x, y) => {
    const ctx = this.btnRef.current.getContext('2d');
    ctx.fillStyle = '#000';
    switch (pencil) {
      case node:
        ctx.fillText(node, x, y);
        break;
      case hardening:
        ctx.fillText(hardening, x, y);
        break;
      default:
        break;
    }
    ctx.stroke();
  };

  drawLine = (x, y) => {
    const ctx = this.btnRef.current.getContext('2d');
    ctx.setLineDash([0, 0]);
    ctx.strokeStyle = '#000';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  drawOval = (x1, y1, x2, y2) => {
    const ctx = this.btnRef.current.getContext('2d');
    ctx.beginPath();
    ctx.setLineDash([0, 0]);
    ctx.strokeStyle = '#000';
    ctx.moveTo(x1, y1 + (y2 - y1) / 2);
    ctx.bezierCurveTo(x1, y1, x2, y1, x2, y1 + (y2 - y1) / 2);
    ctx.bezierCurveTo(x2, y2, x1, y2, x1, y1 + (y2 - y1) / 2);
    ctx.closePath();
    ctx.stroke();
  };

  drawForm() {
    const ctx = this.btnRef.current.getContext('2d');

    // clean
    //
    ctx.clearRect(0, 0, rectangleWidth, rectangleHeight);

    // background
    //
    ctx.beginPath();
    ctx.fillStyle = '#EAEAEA';
    ctx.font = '8px Arial';
    ctx.fillRect(0, 0, rectangleWidth, rectangleHeight);
    ctx.stroke();
    ctx.closePath();

    // left breast
    // circle
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.arc(100, 170, 80, 0, Math.PI * 2, true);
    ctx.fillStyle = '#FFF';
    ctx.strokeStyle = '#A9A9A9';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // left breast
    // coord X-Y
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillText('X1', 95, 80);
    ctx.fillText('X2', 95, 270);
    ctx.fillText('Y1', 1, 170);
    ctx.fillText('Y2', 185, 170);
    ctx.stroke();
    ctx.closePath();

    // left breast crossed lines
    // horizontal
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(20, 167);
    ctx.lineTo(180, 167);
    ctx.strokeStyle = '#A9A9A9';
    ctx.stroke();
    ctx.closePath();

    // left breast crossed lines
    // vertical
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(100, 90);
    ctx.lineTo(100, 250);
    ctx.strokeStyle = '#A9A9A9';
    ctx.stroke();
    ctx.closePath();

    // right breast
    // circle
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.arc(300, 170, 80, 0, Math.PI * 2, true);
    ctx.fillStyle = '#FFF';
    ctx.strokeStyle = '#A9A9A9';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // right breast
    // coord X-Y
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillText('X1', 297, 80);
    ctx.fillText('X2', 297, 270);
    ctx.fillText('Y1', 203, 170);
    ctx.fillText('Y2', 384, 170);
    ctx.stroke();
    ctx.closePath();

    // right breast crossed lines
    // horizontal
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(222, 167);
    ctx.lineTo(378, 167);
    ctx.strokeStyle = '#A9A9A9';
    ctx.stroke();
    ctx.closePath();

    // left breast crossed lines
    // vertical
    ctx.beginPath();
    ctx.strokeStyle = '#A9A9A9';
    ctx.setLineDash([5, 5]);
    ctx.moveTo(302, 90);
    ctx.lineTo(302, 250);
    ctx.stroke();
    ctx.closePath();

    // right-left breast
    // title
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.fillText(rightBreast, 265, 50);
    ctx.fillText(leftBreast, 70, 50);
    ctx.stroke();
    ctx.closePath();
  }

  render() {
    const { disabled } = this.props;
    const { pencil } = this.state;
    return (
      <div>
        <canvas
          id="canvas"
          style={{
            zIndex: 0,
            border: '1px solid #EAEAEA',
            boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.15)',
          }}
          onClick={event => this.handleClickOnCanvas(event)}
          ref={this.btnRef}
          width={400}
          height={300}
        />
        {disabled && (
          <div
            style={{
              opacity: '0.4',
              position: 'absolute',
              marginTop: '-300px',
              backgroundColor: '#EAEAEA',
              zIndex: 2,
              width: '400px',
              height: '300px',
            }}
          />
        )}
        {!disabled && (
          <div>
            <Tooltip placement="bottom" title="Clear">
              <Button type="danger" onClick={this.reset}>
                {formatMessage({ id: 'clear' })}
              </Button>
            </Tooltip>
            <Tooltip placement="bottom" title="Undo">
              <Button style={{ margin: '5px 0 0 0' }} type="danger" onClick={this.undoLast}>
                <Icon style={{ fontSize: '18px' }} type="undo" />
              </Button>
            </Tooltip>
            <div style={{ textAlign: 'start', margin: '-31px 0 0 120px' }}>
              <Tooltip placement="bottom" title="Node">
                <Button
                  onClick={() => this.setMark(node)}
                  style={{
                    borderColor: pencil === node ? '#008FD5' : '#EAEAEA',
                    backgroundColor: '#fff',
                    color: pencil === node ? '#008FD5' : '#000',
                  }}
                >
                  <span>{node}</span>
                </Button>
              </Tooltip>
              <Tooltip placement="bottom" title="Scar">
                <Button
                  onClick={() => this.setMark(hardening)}
                  style={{
                    borderColor: pencil === hardening ? '#008FD5' : '#EAEAEA',
                    backgroundColor: '#fff',
                    color: pencil === hardening ? '#008FD5' : '#000',
                  }}
                >
                  <span>{hardening}</span>
                </Button>
              </Tooltip>
              <Tooltip placement="bottom" title="Line">
                <Button
                  onClick={() => this.setMark(line)}
                  style={{
                    borderColor: pencil === line ? '#008FD5' : '#EAEAEA',
                    backgroundColor: '#fff',
                    color: pencil === line ? '#008FD5' : '#000',
                  }}
                  type="primary"
                >
                  <span>{line}</span>
                </Button>
              </Tooltip>
              <Tooltip placement="bottom" title="Circle">
                <Button
                  onClick={() => this.setMark(circle)}
                  style={{
                    borderColor: pencil === circle ? '#008FD5' : '#EAEAEA',
                    backgroundColor: '#fff',
                    color: pencil === circle ? '#008FD5' : '#000',
                  }}
                  type="primary"
                >
                  <span>{circle}</span>
                </Button>
              </Tooltip>
            </div>
          </div>
        )}
        <br />
        <div style={{ marginTop: '24px' }}>
          <span style={{ fontWeight: 600, margin: '5px' }}>{explanation}:</span>
        </div>
        <div style={{ paddingTop: '10px' }}>
          <span style={{ color: '#008FD5', fontWeight: 600, margin: '5px' }}>{node}:</span>
          <span style={{ margin: '5px' }}>Node</span>
          <span style={{ color: '#008FD5', fontWeight: 600, margin: '5px' }}>{hardening}:</span>
          <span style={{ margin: '5px' }}>Hardening</span>
          <span style={{ color: '#008FD5', fontWeight: 600, margin: '5px' }}>{line}:</span>
          <span style={{ margin: '5px' }}>Scar</span>
          <span style={{ color: '#008FD5', fontWeight: 600, margin: '5px' }}>{circle}:</span>
          <span style={{ margin: '5px' }}>Skin lesions</span>
        </div>
      </div>
    );
  }
}
export default CanvasTest;
