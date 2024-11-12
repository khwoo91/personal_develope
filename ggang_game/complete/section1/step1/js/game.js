
const key = {
	keyDown : {},
	keyValue : {
		37: 'left',
		39: 'right'
	}
}

const windowEvent = () => {
	window.addEventListener('keydown', e => {
		key.keyDown[key.keyValue[e.which]] = true;
	});

	window.addEventListener('keyup', e => {
		key.keyDown[key.keyValue[e.which]] = false;
	});
}

const init = () => {
	windowEvent();
}

window.onload = () => {
	init();
}