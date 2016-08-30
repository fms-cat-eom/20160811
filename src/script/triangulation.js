let Triangulation = class {
  constructor( _vert ) {
    let it = this;

    it.vert = _vert.concat();
    it.vertOri = it.vert.concat();
    it.vertIndex = 0;
    it.tri = [];

    it.finished = false;
  }

  reset() {
    let it = this;

    it.vert = it.vertOri.concat();
    it.vertIndex = 0;
    it.tri = [];

    it.finished = false;
  }

  getVert( _index, _array ) {
    let it = this;

    let array = _array || it.vert;
    let len = array.length / 2;
    let i = ( _index + len ) % len;
    return {
      x: array[ i * 2 ],
      y: array[ i * 2 + 1 ]
    };
  }

  getTri( _index ) {
    let it = this;

    let i = _index;
    return {
      x1: it.tri[ i * 6 ],
      y1: it.tri[ i * 6 + 1 ],
      x2: it.tri[ i * 6 + 2 ],
      y2: it.tri[ i * 6 + 3 ],
      x3: it.tri[ i * 6 + 4 ],
      y3: it.tri[ i * 6 + 5 ]
    };
  }

  // ref: http://qiita.com/ykob/items/ab7f30c43a0ed52d16f2
  isIntersect( _a, _b, _c, _d ) {
    let a = ( _c.x - _d.x ) * ( _a.y - _c.y ) + ( _c.y - _d.y ) * ( _c.x - _a.x );
    let b = ( _c.x - _d.x ) * ( _b.y - _c.y ) + ( _c.y - _d.y ) * ( _c.x - _b.x );
    let c = ( _a.x - _b.x ) * ( _c.y - _a.y ) + ( _a.y - _b.y ) * ( _a.x - _c.x );
    let d = ( _a.x - _b.x ) * ( _d.y - _a.y ) + ( _a.y - _b.y ) * ( _a.x - _d.x );

    return c * d < 0 && a * b < 0;
  }

  rotate( _v, _r ) {
    return {
      x: _v.x * Math.cos( _r ) - _v.y * Math.sin( _r ),
      y: _v.x * Math.sin( _r ) + _v.y * Math.cos( _r )
    };
  }

  isConvex( _a, _b ) {
    let it = this;

    let r = Math.atan2( _a.y, _a.x );
    let b = it.rotate( _b, -r );
    return b.y < 0.0;
  }

  isContain( _a, _b, _c, _p ) {
    let a = ( _b.x - _a.x ) * ( _p.y - _b.y ) - ( _b.y - _a.y ) * ( _p.x - _b.x );
    let b = ( _c.x - _b.x ) * ( _p.y - _c.y ) - ( _c.y - _b.y ) * ( _p.x - _c.x );
    let c = ( _a.x - _c.x ) * ( _p.y - _a.y ) - ( _a.y - _c.y ) * ( _p.x - _a.x );

    if ( a === 0 || b === 0 || c === 0 ) {
      return false;
    }

    return Math.sign( a ) === Math.sign( b ) && Math.sign( b ) === Math.sign( c );
  }

  isValid( _index ) {
    let it = this;

    // if the vertex is convex
    let va = {
      x: it.getVert( _index - 1 ).x - it.getVert( _index ).x,
      y: it.getVert( _index - 1 ).y - it.getVert( _index ).y
    };
    let vb = {
      x: it.getVert( _index + 1 ).x - it.getVert( _index ).x,
      y: it.getVert( _index + 1 ).y - it.getVert( _index ).y
    };
    if ( !it.isConvex( va, vb ) ) {
      return false;
    }

    // if there are no intersecting vertices
    for ( let i = 0; i < it.vertOri.length / 2; i ++ ) {
      let va = it.getVert( _index - 1 );
      let vb = it.getVert( _index );
      let vc = it.getVert( _index + 1 );

      if ( i !== _index - 1 || i !== _index || i !== _index + 1 ) {
        let vp = it.getVert( i );
        if ( it.isContain( va, vb, vc, vp ) ) {
          return false;
        }
      }

      if ( it.isIntersect(
        va,
        vc,
        it.getVert( i, it.vertOri ),
        it.getVert( i + 1, it.vertOri )
      ) ) {
        return false;
      }
    }

    return true;
  }

  isOnSameLine( _a, _b, _c ) {
    let d = ( _c.x - _a.x ) * ( _b.y - _a.y ) - ( _c.y - _a.y ) * ( _b.x - _a.x );
    return ( Math.abs( d ) < 1E-7 );
  }

  makeTri( _index ) {
    let it = this;

    let a = it.getVert( _index - 1 );
    let b = it.getVert( _index );
    let c = it.getVert( _index + 1 );
    if ( !it.isOnSameLine( a, b, c ) ) {
      it.tri.push( a.x, a.y, b.x, b.y, c.x, c.y );
    }

    it.vert.splice( _index * 2, 2 );
  }

  step() {
    let it = this;

    let valid = it.isValid( it.vertIndex );

    if ( it.vert.length === 6 ) {
      it.makeTri( 0 );
      it.vert = [];
      it.finished = true;
    } else if ( valid ) {
      it.makeTri( it.vertIndex );
    } else {
      it.vertIndex ++;
    }

    it.vertIndex = it.vertIndex % ( it.vert.length / 2.0 );
  }
};

export default Triangulation;
