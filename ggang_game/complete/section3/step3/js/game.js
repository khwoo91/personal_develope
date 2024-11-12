
const key = {
	keyDown : {},
	keyValue : {
		37: 'left',
		39: 'right',
		88: 'attack'
	}
}

const allMonsterComProp = {
	arr: []
}

const bulletComProp = {
	launch: false,
	arr: []
}

const gameBackground ={
	gameBox: document.querySelector('.game')
}

const stageInfo = {
	stage: []
}

const gameProp = {
	screenWidth : window.innerWidth,
	screenHeight : window.innerHeight,
	gameOver : false
}

const renderGame = () => {
	hero.keyMotion();
	setGameBackground();

	bulletComProp.arr.forEach((arr, i) => {
		arr.moveBullet();
	});
	allMonsterComProp.arr.forEach((arr, i) => {
		arr.moveMonster();
	});

	window.requestAnimationFrame(renderGame);

}

const endGame = () => {
	gameProp.gameOver = true;
	key.keyDown.left = false;
	key.keyDown.right = false;
	document.querySelector('.game_over').classList.add('active');
}

const setGameBackground = () => {
	let parallaxValue = Math.min(0, (hero.movex-gameProp.screenWidth/3) * -1);

	gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`;
}

const windowEvent = () => {
	window.addEventListener('keydown', e => {
		if(!gameProp.gameOver) key.keyDown[key.keyValue[e.which]] = true;
	});

	window.addEventListener('keyup', e => {
		key.keyDown[key.keyValue[e.which]] = false;
	});

	window.addEventListener('resize', e => {
		gameProp.screenWidth = window.innerWidth;
		gameProp.screenHeight = window.innerHeight;
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
	stageInfo.stage = new Stage();

	loadImg();
	windowEvent();
	renderGame();
}

window.onload = () => {
	init();
}






