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
}






