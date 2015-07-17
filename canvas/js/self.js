var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 500;
var RADIUS = 8;
var MARGIN_TOP = 80;
var MARGIN_LEFT = 120;

const endTime = new Date(2015, 0, 7, 18, 47, 52);
var curShowTime = new Date();
var count=2;

var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

window.onload = function() {
	var cancas = document.getElementById('canvas');
	var context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTime = new Date();

	setInterval(
		function() {
			render(context);
			update();
		}, 50);
};

function update() {
	var nextShowTime = new Date();

	var nextHours = nextShowTime.getHours();
	var nextMinutes = nextShowTime.getMinutes();
	var nextSeconds = nextShowTime.getSeconds();

	var curHours = curShowTime.getHours();
	var curMinutes = curShowTime.getMinutes();
	var curSeconds = curShowTime.getSeconds();

	if (nextSeconds != curSeconds) {

		addBalls(MARGIN_LEFT + 55 * (RADIUS + 1), MARGIN_TOP, 3);
		// addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(nextHours % 10));
		// addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes / 10));
		
		curShowTime = nextShowTime;

	}
	updateBalls();
	console.log(balls.length);
}

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}

	var cnt = 0;
	for (var i = 0; i < balls.length; i++)
		if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
			balls[cnt++] = balls[i];

	while (balls.length > cnt) {
		balls.pop();
	}
}

function addBalls(x, y, num) {
	var vr=Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4
	for (var i = 0; i < font[num].length; i++) {
		for (var j = 0; j < font[num][i].length; j++) {
			if (font[num][i][j] == 1) {
				var aBall = {
					x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
					y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
					g: 1.5 + Math.random(),
					vx: vr,
					vy: -5,
					color: colors[Math.floor(Math.random() * colors.length)]
				}

				balls.push(aBall);
			}
		}
	}
}

function render(cxt) {

	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

	renderDigit(MARGIN_LEFT, MARGIN_TOP, 0, cxt);
	renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, 1, cxt);
	renderDigit(MARGIN_LEFT + 36 * (RADIUS + 1), MARGIN_TOP, parseInt(2), cxt);
	renderDigit(MARGIN_LEFT + 55 * (RADIUS + 1), MARGIN_TOP, parseInt(3), cxt);
	
	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
		cxt.closePath();

		cxt.fill();
	}

}

function renderDigit(x, y, num, cxt) {
	cxt.fillStyle = "rgb(0,102,153)";
	if(num==1)
		cxt.fillStyle = "#FF4444";

	for (var i = 0; i < font[num].length; i++) {
		for (var j = 0; j < font[num][i].length; j++) {
			if (font[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x + (2 * j + 1) * (RADIUS + 1), y + (2 * i + 1) * (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}