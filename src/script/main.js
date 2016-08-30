import xorshift from './xorshift';
xorshift( 43235 );
import GLCat from './glcat';
import Triangulation from './triangulation';
import TriangulationDrawer from './triangulation-drawer';

// ------

let clamp = ( v, b, t ) => Math.min( Math.max( v, b ), t );
let saturate = ( v ) => clamp( v, 0.0, 1.0 );

// ------

let width = canvas.width = 300;
let height = canvas.height = 300;
let context = canvas.getContext( '2d' );

let frame = 0;
let time = 0.0;
let deltaTime = 0.0;

let step = 1;

// ------

let HOLE_L = 0.45;
let HOLE_R = 0.65;
let HOLE_H = 0.05;
let EDGE = 0.1;

let letters = [
  [ 0, 0, 1, 0, 1, 1.5, 3.5, 1.5, 3.5, 2.5, 1, 2.5, 1, 4, 4, 4, 4, 0, 5, 0, 5, 4.5, 4.5, 5, 0.5, 5, 0, 4.5 ],
  [ 0, 0, 4.5, 0, 5, 0.5, 5, 2, 4.5, 2.5, 5, 3, 5, 4.5, 4.5, 5, 0, 5, 0, 4, 4, 4, 4, 3, 1.5, 3, 1.5, 2, 4, 2, 4, 1, 1, 1, 1, 3.5, 0, 3.5 ],
  [ 0, 0.5, 0.5, 0, 5, 0, 5, 1, 1, 1, 1, 4, 5, 4, 5, 5, 0.5, 5, 0, 4.5 ],
  [ 0, 0, 4.5, 0, 5, 0.5, 5, 4.5, 4.5, 5, 0, 5, 0, 4, 4, 4, 4, 1, 1, 1, 1, 3.5, 0, 3.5 ],
  [ 0, 0.5, 0.5, 0, 5, 0, 5, 1, 1, 1, 1, 2, 5, 2, 5, 3, 1, 3, 1, 4, 5, 4, 5, 5, 0.5, 5, 0, 4.5 ],
  [ 0, 0, 1, 0, 1, 2, 5, 2, 5, 3, 1, 3, 1, 4, 5, 4, 5, 5, 0.5, 5, 0, 4.5 ],
  [ 0, 0.5, 0.5, 0, 5, 0, 5, 2, 4, 2, 4, 1, 1, 1, 1, 4, 5, 4, 5, 5, 0.5, 5, 0, 4.5 ],
  [ 0, 0, 1, 0, 1, 2, 4, 2, 4, 0, 5, 0, 5, 5, 4, 5, 4, 3, 1, 3, 1, 5, 0, 5 ],
  [ 2, 0, 3, 0, 3, 5, 2, 5 ],
  [ 0, 0.5, 0.5, 0, 4.5, 0, 5, 0.5, 5, 5, 4, 5, 4, 1, 1, 1, 1, 2, 0, 2 ],
  [ 0, 0, 1, 0, 1, 2, 4, 2, 4, 0, 5, 0, 5, 2.5, 4.5, 3, 4, 3, 5, 5, 4, 5, 3, 3, 1, 3, 1, 5, 0, 5 ],
  [ 0, 0, 5, 0, 5, 1, 1, 1, 1, 5, 0, 5 ],
  [ 0, 0, 1, 0, 1, 4, 2, 4, 2, 0, 3, 0, 3, 4, 4, 4, 4, 0, 5, 0, 5, 4.5, 4.5, 5, 0, 5 ],
  [ 0, 0, 1, 0, 1, 4, 4, 4, 4, 0, 5, 0, 5, 4.5, 4.5, 5, 0, 5 ],
  [ 0, 3.5, 0, 0.5, 0.5, 0, 4.5, 0, 5, 0.5, 5, 4.5, 4.5, 5, 0.5, 5, 0, 4.5, 0, 4, 4, 4, 4, 1, 1, 1, 1, 3.5 ],
  [ 0, 0, 1, 0, 1, 4, 4, 4, 4, 3, 1.5, 3, 1.5, 2, 4.5, 2, 5, 2.5, 5, 4.5, 4.5, 5, 0, 5 ],
  [ 0, 0.5, 0.5, 0, 5, 0, 5, 0.5, 4.5, 1, 1, 1, 1, 4, 4, 4, 4, 1.5, 5, 1.5, 5, 4.5, 4.5, 5, 0.5, 5, 0, 4.5 ],
  [ 0, 0, 1, 0, 1, 4, 4, 4, 4, 3, 1.5, 3, 1.5, 2, 3, 2, 4, 0, 5, 0, 4, 2, 4.5, 2, 5, 2.5, 5, 4.5, 4.5, 5, 0, 5 ],
  [ 0, 0, 4.5, 0, 5, 0.5, 5, 2.5, 4.5, 3, 1, 3, 1, 4, 5, 4, 5, 5, 0.5, 5, 0, 4.5, 0, 2.5, 0.5, 2, 4, 2, 4, 1, 0, 1 ],
  [ 2, 0, 3, 0, 3, 4, 5, 4, 5, 5, 0, 5, 0, 4, 2, 4 ],
  [ 0, 0.5, 0.5, 0, 4.5, 0, 5, 0.5, 5, 5, 4, 5, 4, 1, 1, 1, 1, 5, 0, 5 ],
  [ 0, 5, 0, 0, 4.5, 0, 5, 0.5, 5, 5, 4, 5, 4, 1, 1, 1, 1, 5 ],
  [ 0, 0.5, 0.5, 0, 4.5, 0, 5, 0.5, 5, 5, 4, 5, 4, 1, 3, 1, 3, 5, 2, 5, 2, 1, 1, 1, 1, 5, 0, 5 ],
  [ 0, 0, 1, 0, 1, 2, 4, 2, 4, 0, 5, 0, 5, 2, 4.5, 2.5, 5, 3, 5, 5, 4, 5, 4, 3, 1, 3, 1, 5, 0, 5, 0, 3, 0.5, 2.5, 0, 2 ],
  [ 0, 5, 0, 2.5, 0.5, 2, 4, 2, 4, 1, 0, 1, 0, 0, 4.5, 0, 5, 0.5, 5, 5, 4, 5, 4, 3, 1, 3, 1, 5 ],
  [ 0, 0, 5, 0, 5, 1, 1, 1, 1, 2, 4.5, 2, 5, 2.5, 5, 5, 0, 5, 0, 4, 4, 4, 4, 3, 0.5, 3, 0, 2.5 ],
];

let tris = [];
let tridraws = [];
let iTri = 0;

letters.map( ( _v ) => {
  let tri = new Triangulation( _v );
  tris.push( tri );

  let tridraw = new TriangulationDrawer( tri, canvas );
  tridraw.range( 0, 5, 5, 0, 20, 280, 20, 280 );
  tridraws.push( tridraw );
} );

// ------

let renderA = document.createElement( 'a' );

let saveFrame = () => {
  renderA.href = canvas.toDataURL();
  renderA.download = ( '0000' + frame ).slice( -5 ) + '.png';
  renderA.click();
};

// ------

let update = () => {
  if ( !checkboxPlay.checked ) {
    setTimeout( update, 100 );
    return;
  }

  if ( tris.length === iTri ) {
    for ( let i = 0; i < tris.length; i ++ ) {
      tris[ i ].reset();
    }
    iTri = 0;
  }

  tridraws[ iTri ].getCurrent();

  if ( !tris[ iTri ].finished ) {
    tris[ iTri ].step();
  }

  context.fillStyle = 'rgb( 30, 30, 30 )';
  context.fillRect( 0, 0, width, height );

  tridraws[ iTri ].draw();

  if ( tris[ iTri ].finished ) {
    iTri ++;
  }

  if ( checkboxSave.checked ) {
    saveFrame();
  }
  frame = ( frame + 1 );

  setTimeout( update, 40 );
}
update();

window.addEventListener( 'keydown', ( _e ) => {
  if ( _e.which === 27 ) {
    checkboxPlay.checked = false;
  }
} );
