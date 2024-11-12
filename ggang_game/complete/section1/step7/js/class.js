class Hero {
	constructor(el){
		this.el = document.querySelector(el);
		this.movex = 0;
		this.speed = 16;
	}
	keyMotion(){
		if(key.keyDown['left']){
			this.el.classList.add('run');
			this.el.classList.add('flip');

			this.movex = this.movex - this.speed;
		}else if(key.keyDown['right']){
			this.el.classList.add('run');
			this.el.classList.remove('flip');

			this.movex = this.movex + this.speed;
		}

		if(key.keyDown['attack']){
			this.el.classList.add('attack');
			new Bullet();
		}

		if(!key.keyDown['left'] && !key.keyDown['right']){
			this.el.classList.remove('run');
		}

		if(!key.keyDown['attack']){
			this.el.classList.remove('attack');
		}

		this.el.parentNode.style.transform = `translateX(${this.movex}px)`;
	}
	position(){
		return{
			left: this.el.getBoundingClientRect().left,
			right: this.el.getBoundingClientRect().right,
			top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
			bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height
		}
	}
	size(){
		return{
			width: this.el.offsetWidth,
			height: this.el.offsetHeight
		}
	}
}

class Bullet{
	constructor(){
		this.parentNode = document.querySelector('.game');
		this.el = document.createElement('div');
		this.el.className = 'hero_bullet';
		this.x = 0;
		this.y = 0;
		this.init();
	}
	init(){
		this.x = hero.position().left + hero.size().width / 2;
		this.y = hero.position().bottom - hero.size().height / 2;

		this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
		this.parentNode.appendChild(this.el);
	}
}






















