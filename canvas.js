'use strict'
const canvas = document.querySelector('.cnv');
const context = canvas.getContext('2d');

const inputWidth = document.querySelector("#mandelbub-width");
const inputHeight = document.querySelector("#mandelbub-height");
const inputIterations = document.querySelector("#mandelbub-iterations");
const inputExponent = document.querySelector("#mandelbub-exponent");
const buttonGenerate = document.querySelector("#generate-button");
const processingSpan = document.querySelector("#processing");

window.addEventListener('resize', resize);

onButtonClick();

function resize(width, height) {
	canvas.width = width;
	canvas.height = height;
}

function onButtonClick() {
	let canvasWidth = new Number(inputWidth.value);
	let canvasHeight = new Number(inputHeight.value);
	let maxIteration = new Number(inputIterations.value);
	let exponent = new Number(inputExponent.value);

	resize(canvasWidth, canvasHeight);
  	context.clearRect(0, 0, canvas.width, canvas.height);
	draw(maxIteration, exponent, 1.4);
}

function draw(maxIteration = 100, exponent = 2, c) {
	let centerx = 0.0, centery = 0.0;
	let min_x = centerx - c*canvas.width/canvas.height;
	let max_x = centerx + c*canvas.width/canvas.height;
	let min_y = centery - c;
	let max_y = centery + c;

	for(let i = 0; i < canvas.width; i++)
	for(let j = 0; j < canvas.height; j++)
	{
		let x = min_x + i * (max_x - min_x) / canvas.width;
		let y = min_y + j * (max_y - min_y) / canvas.height;
		let t = mandelbrotIteration(x, y, maxIteration, exponent);
		let r = 255 * t / maxIteration;
		let g = 255 * t / maxIteration;
		let b = 255 * t / maxIteration;
		let hue = Math.floor(360 * t / maxIteration);
		context.fillStyle = `hsl(${hue}, 60%, 60%)`;
		context.fillRect(i, canvas.height - j, 1, 1);
	}
}


function mandelbrotIteration(x, y, maxIteration, n)
{
	var i=0, a=0, b=0;
	while(i<maxIteration && a*a+b*b<4)
	{
		let tmp = Math.pow(a*a+b*b, n/2)*Math.cos(n*Math.atan2(b, a))+x;
		b = Math.pow(a*a+b*b, n/2)*Math.sin(n*Math.atan2(b, a))+y;
		a = tmp;
		i++;
	}
	return i;
}


function mandelbrotIteration2(x, y, maxIteration)
{

	var i=0, a=0, b=0;
	while(i<maxIteration && a*a+b*b<4)
	{
		let tmp = a*a-b*b+x;
		b=2*a*b+y;
		a=tmp;
		i++;
	}
	return i;
}


function mandelbrotIteration3(x, y, maxIteration)
{
	var i=0, a=0, b=0;
	while(i<maxIteration && a*a+b*b<4)
	{
		let tmp = a*a*a-3*a*b*b+x;
		b=3*a*a*b-b*b*b+y;
		a=tmp;
		i++;
	}
	return i;
}


function mandelbrotIteration4(x, y, maxIteration)
{
	var i=0, a=0, b=0;
	while(i<maxIteration && a*a+b*b<4)
	{
		let tmp = a*a*a*a - 6*a*a*b*b + b*b*b*b + x;
		b = 4*a*a*a*b - 4*a*b*b*b + y;
		a = tmp;
		i++;
	}
	return i;
}

