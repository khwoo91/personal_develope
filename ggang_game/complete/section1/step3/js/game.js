
const key = {
	keyDown : {},
	keyValue : {
		37: 'left',
		39: 'right',
		88: 'attack'
	}
}

const windowEvent = () => {
	window.addEventListener('keydown', e => {
		key.keyDown[key.keyValue[e.which]] = true;
		hero.keyMotion();
	});

	window.addEventListener('keyup', e => {
		key.keyDown[key.keyValue[e.which]] = false;
		hero.keyMotion();
	});
}
let hero;
const init = () => {
	hero = new Hero('.hero');
	windowEvent();
}

window.onload = () => {
	init();
}






