var socket = require('./socket.js').socket;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var height = 1000
var width = 1000

socket.on('shotty', function (data) {
  console.log(data);
  player.fire(data.x, data.y, 10, 10, data.velX, data.velY, data.colour, data.harmful);
});

function diverge(c, times, bound) {
	var z = [0,0];
	div = false;
	for (var i = 0; i < times; i ++) {
		a = z[0] ** 2 - z[1] ** 2;
		b = 2 * z[0] * z[1];
		z[0] = a + c[0];
		z[1] = b + c[1];
		if (z[0] ** 2 + z[1] ** 2 > bound) {
			div = true;
			break;
		}
		
	}
	return div;
}

var density = 0.001;

const xMin = -2;
const xMax = 1;
const yMax = 1;
const yMin = -1;

function draw(xMin, xMax, yMax, yMin, density){
	
	for (var y = yMin; y < yMax; y += density){
		for (var x = xMin; x < xMax; x += density){
			
			var yPixel = (y - yMin) / density;
			var xPixel = (x - xMin) / density;
			if (diverge([x,y], 1000, 1000) == false) {
				ctx.fillRect(xPixel,yPixel,1,1);
			}
		}
	}
	
}

function test() {
	socket.emit('mine', {real: 2});
}

draw(xMin, xMax, yMax, yMin, density);







