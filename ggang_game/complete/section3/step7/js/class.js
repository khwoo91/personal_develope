class Stage {
	constructor(){
		this.level = 0;
		this.isStart = false;
		this.stageStart();
	}
	stageStart(){
		setTimeout( () => {
			this.isStart = true;
			this.stageGuide(`START LEVEL${this.level+1}`);
			this.callMonster();
		}, 2000);
	}
	stageGuide(text){
		this.parentNode = document.querySelector('.game_app');
		this.textBox = document.createElement('div');
		this.textBox.className = 'stage_box';
		this.textNode = document.createTextNode(text);
		this.textBox.appendChild(this.textNode);
		this.parentNode.appendChild(this.textBox);

		setTimeout(() => this.textBox.remove(), 1500);
	}
	callMonster(){
		for(let i=0; i <=10; i++){

			if(i === 10){
				allMonsterComProp.arr[i] = new Monster(stageInfo.monster[this.level].bossMon, hero.movex + gameProp.screenWidth + 600 * i);
			}else{
				allMonsterComProp.arr[i] = new Monster(stageInfo.monster[this.level].defaultMon, hero.movex + gameProp.screenWidth + 700 * i);
			}

		}
	}
	clearCheck(){
		if(allMonsterComProp.arr.length === 0 && this.isStart){
			this.isStart = false;
			this.level++;

			if(this.level < stageInfo.monster.length){
				this.stageGuide('CLEAR!!');
				this.stageStart();
				hero.heroUpgrade();
			}else {
				this.stageGuide('ALL CLEAR!!');
			}
		}
	}
}

class Hero {
	constructor(el){
		this.el = document.querySelector(el);
		this.movex = 0;
		this.speed = 11;
		this.direction = 'right';
		this.attackDamage = 10000;
		this.hpProgress = 0;
		this.hpValue = 100000;
		this.defaultHpValue = this.hpValue;
		this.realDamage = 0;
	}
	keyMotion(){
		if(key.keyDown['left']){
			this.direction = 'left';
			this.el.classList.add('run');
			this.el.classList.add('flip');

			this.movex = this.movex <= 0 ? 0 : this.movex - this.speed;
		}else if(key.keyDown['right']){
			this.direction = 'right';
			this.el.classList.add('run');
			this.el.classList.remove('flip');

			this.movex = this.movex + this.speed;
		}

		if(key.keyDown['attack']){
			if(!bulletComProp.launch){
				this.el.classList.add('attack');
				bulletComProp.arr.push(new Bullet());

				bulletComProp.launch = true;
			}
		}

		if(!key.keyDown['left'] && !key.keyDown['right']){
			this.el.classList.remove('run');
		}

		if(!key.keyDown['attack']){
			this.el.classList.remove('attack');
			bulletComProp.launch = false;
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
	updateHp(monsterDamage){
		this.hpValue = Math.max(0, this.hpValue - monsterDamage);
		this.hpProgress = this.hpValue / this.defaultHpValue * 100
		const heroHpBox = document.querySelector('.state_box .hp span');
		heroHpBox.style.width = this.hpProgress + '%';
		this.crash();
		if(this.hpValue === 0){
			this.dead();
		}
	}
	crash(){
		this.el.classList.add('crash');
		setTimeout(() => this.el.classList.remove('crash'), 400);
	}
	dead(){
		hero.el.classList.add('dead');
		endGame();
	}
	hitDamage(){
		this.realDamage = this.attackDamage - Math.round(Math.random() * this.attackDamage * 0.1);
	}
	heroUpgrade(){

		this.speed += 1.3;
		this.attackDamage += 15000;
	}
}

class Bullet{
	constructor(){
		this.parentNode = document.querySelector('.game');
		this.el = document.createElement('div');
		this.el.className = 'hero_bullet';
		this.x = 0;
		this.y = 0;
		this.speed = 30;
		this.distance = 0;
		this.bulletDirection = 'right';
		this.init();
	}
	init(){
		this.bulletDirection = hero.direction === 'left' ? 'left' : 'right';
		this.x = this.bulletDirection === 'right' ? hero.movex + hero.size().width / 2 : hero.movex - hero.size().width / 2;

		this.y = hero.position().bottom - hero.size().height / 2;
		this.distance = this.x;
		this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
		this.parentNode.appendChild(this.el);
	}
	moveBullet(){
		let setRotate = '';
		if(this.bulletDirection === 'left'){
			this.distance -= this.speed;
			setRotate = 'rotate(180deg)';
		}else{
			this.distance += this.speed;
		}

		this.el.style.transform = `translate(${this.distance}px, ${this.y}px) ${setRotate}`;
		this.crashBullet();
	}
	position(){
		return{
			left: this.el.getBoundingClientRect().left,
			right: this.el.getBoundingClientRect().right,
			top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
			bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height
		}
	}
	crashBullet(){

		for(let j = 0; j < allMonsterComProp.arr.length; j++){
			if(this.position().left > allMonsterComProp.arr[j].position().left && this.position().right < allMonsterComProp.arr[j].position().right){
				for(let i =0; i < bulletComProp.arr.length; i++){
					if(bulletComProp.arr[i] === this){
						hero.hitDamage();
						bulletComProp.arr.splice(i,1);
						this.el.remove();
						this.damageView(allMonsterComProp.arr[j]);
						allMonsterComProp.arr[j].updateHp(j);
					}
				}
			}
		}

		if(this.position().left > gameProp.screenWidth || this.position().right < 0){
			for(let i =0; i < bulletComProp.arr.length; i++){
				if(bulletComProp.arr[i] === this){
					bulletComProp.arr.splice(i,1);
					this.el.remove();
				}
			}
		}
	}
	damageView(monster){
		this.parentNode = document.querySelector('.game_app');
		this.textDamageNode = document.createElement('div');
		this.textDamageNode.className = 'text_damage';
		this.textDamage = document.createTextNode(hero.realDamage);
		this.textDamageNode.appendChild(this.textDamage);
		this.parentNode.appendChild(this.textDamageNode);
		let textPosition = Math.random() * -100;
		let damagex = monster.position().left + textPosition;
		let damagey = monster.position().top;

		this.textDamageNode.style.transform = `translate(${damagex}px,${-damagey}px)`
		setTimeout(() => this.textDamageNode.remove(), 500);
	}
}

class Monster {
	constructor(property, positionX){
		this.parentNode = document.querySelector('.game');
		this.el = document.createElement('div');
		this.el.className = 'monster_box '+property.name;
		this.elChildren = document.createElement('div');
		this.elChildren.className = 'monster';
		this.hpNode = document.createElement('div');
		this.hpNode.className = 'hp';
		this.hpValue = property.hpValue;
		this.defaultHpValue = property.hpValue;
		this.hpInner = document.createElement('span');
		this.progress = 0;
		this.positionX = positionX;
		this.moveX = 0;
		this.speed = property.speed;
		this.crashDamage = property.crashDamage;
		this.score = property.score;

		this.init();
	}
	init(){
		this.hpNode.appendChild(this.hpInner);
		this.el.appendChild(this.hpNode);
		this.el.appendChild(this.elChildren);
		this.parentNode.appendChild(this.el);
		this.el.style.left = this.positionX + 'px';
	}
	position(){
		return{
			left: this.el.getBoundingClientRect().left,
			right: this.el.getBoundingClientRect().right,
			top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
			bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height
		}
	}
	updateHp(index){
		this.hpValue = Math.max(0, this.hpValue - hero.realDamage);
		this.progress = this.hpValue / this.defaultHpValue * 100;
		this.el.children[0].children[0].style.width = this.progress + '%';

		if(this.hpValue === 0){
			this.dead(index);
		}
	}
	dead(index){
		this.el.classList.add('remove');
		setTimeout(() => this.el.remove(), 200);
		allMonsterComProp.arr.splice(index, 1);
		this.setScore();
	}
	moveMonster(){

		if(this.moveX + this.positionX + this.el.offsetWidth + hero.position().left - hero.movex <= 0){
			this.moveX = hero.movex - this.positionX + gameProp.screenWidth - hero.position().left;
		}else{
			this.moveX -= this.speed;
		}

		this.el.style.transform = `translateX(${this.moveX}px)`;
		this.crash();
	}
	crash(){
		let rightDiff = 30;
		let leftDiff = 90;
		if(hero.position().right-rightDiff > this.position().left && hero.position().left + leftDiff < this.position().right){
			hero.updateHp(this.crashDamage);
		}
	}
	setScore(){
		stageInfo.totalScore += this.score;
		document.querySelector('.score_box').innerText = stageInfo.totalScore;
	}
}




















