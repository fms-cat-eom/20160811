let TriangulationDrawer = class {
  constructor( _tri, _canvas ) {
    let it = this;

    it.tri = _tri;

    it.canvas = _canvas;
    it.context = it.canvas.getContext( '2d' );

    it.rmx = 0.0;
    it.rox = 0.0;
    it.rmy = 0.0;
    it.roy = 0.0;

    it.currentA = null;
    it.currentB = null;
  }

  range( _ibx, _itx, _iby, _ity, _obx, _otx, _oby, _oty ) {
    let it = this;

    it.rmx = ( _otx - _obx ) / ( _itx - _ibx );
    it.rox = ( _ibx ) * it.rmx - _obx;
    it.rmy = ( _oty - _oby ) / ( _ity - _iby );
    it.roy = ( _iby ) * it.rmy - _oby;
  }

  drawVert( _index ) {
    let it = this;

    let a = it.tri.getVert( _index );
    let b = it.tri.getVert( _index + 1 );
    it.context.beginPath();
    it.context.moveTo( a.x * it.rmx - it.rox, a.y * it.rmy - it.roy );
    it.context.lineTo( b.x * it.rmx - it.rox, b.y * it.rmy - it.roy );
    it.context.stroke();
  }

  drawTri( _index ) {
    let it = this;

    let tri = it.tri.getTri( _index );
    it.context.beginPath();
    it.context.moveTo( tri.x1 * it.rmx - it.rox, tri.y1 * it.rmy - it.roy );
    it.context.lineTo( tri.x2 * it.rmx - it.rox, tri.y2 * it.rmy - it.roy );
    it.context.lineTo( tri.x3 * it.rmx - it.rox, tri.y3 * it.rmy - it.roy );
    it.context.closePath();
    it.context.fill();
    it.context.stroke();
  }

  drawCurrent() {
    let it = this;

    if ( !it.currentA || !it.currentB ) { return; }

    it.context.beginPath();
    it.context.moveTo( it.currentA.x * it.rmx - it.rox, it.currentA.y * it.rmy - it.roy );
    it.context.lineTo( it.currentB.x * it.rmx - it.rox, it.currentB.y * it.rmy - it.roy );
    it.context.stroke();
  }

  getCurrent() {
    let it = this;

    it.currentA = it.tri.getVert( it.tri.vertIndex - 1 );
    it.currentB = it.tri.getVert( it.tri.vertIndex + 1 );
  }

  draw() {
    let it = this;

    it.context.save();

    it.context.lineCap = 'round';
    it.context.lineJoin = 'round';

    it.context.lineWidth = 1;
    it.context.fillStyle = 'rgb( 220, 220, 220 )';
    it.context.strokeStyle = 'rgb( 30, 30, 30 )';
    for ( let i = 0; i < it.tri.tri.length / 6; i ++ ) {
      it.drawTri( i );
    }

    it.context.lineWidth = 2;
    it.context.strokeStyle = 'rgb( 0, 255, 90 )';
    for ( let i = 0; i < it.tri.vert.length / 2; i ++ ) {
      it.drawVert( i );
    }

    it.context.strokeStyle = 'rgb( 255, 0, 90 )';
    it.drawCurrent();

    it.context.restore();
  }
};

export default TriangulationDrawer;
