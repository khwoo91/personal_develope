
const key = {
	keyDown : {},
	keyValue : {
		37: 'left',
		39: 'right',
		88: 'attack'
	}
}

const gameProp = {
	screenWidth : window.innerWidth,
	screenHeight : window.innerHeight
}

const renderGame = () => {
	hero.keyMotion();
	window.requestAnimationFrame(renderGame);

}

const windowEvent = () => {
	window.addEventListener('keydown', e => {
		key.keyDown[key.keyValue[e.which]] = true;
	});

	window.addEventListener('keyup', e => {
		key.keyDown[key.keyValue[e.which]] = false;
	});
}

const loadImg = () => {
	const preLoadImgSrc = ['../../../lib/images/ninja_attack.png', '../../../lib/images/ninja_run.png'];
	preLoadImgSrc.forEach( arr => {
		const img = new Image();
		img.src = arr;
	});
}

let hero;
const init = () => {
	hero = new Hero('.hero');
	loadImg();
	windowEvent();
	renderGame();
}

window.onload = () => {
	init();
}






