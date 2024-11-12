const levelQuest = {
	positionX: 4500,
	idleMessage: '<p>큰일이야..<br>사람들이 좀비로 변하고 있어..<br><span>대화 Enter</span></p>',
	quest: () => {
		const message ={
			start : '마을에 몬스터가 출몰해 주민들을 좀비로 만들고 있어.. 몬스터를 사냥해 주민을 구하고 <span>레벨을 5이상</span>으로 만들어 힘을 증명한다면 좀비왕을 물리칠 수 있도록 내 힘을 빌려줄게!!',
			ing : '이런 아직 레벨을 달성하지 못했구나..',
			suc : '레벨을 달성했구나! 힘을줄게!',
			end : '고마워! 행운을 빌어!'
		}

		let messageState = '';

		if(!npcOne.questStart){
			messageState = message.start;
			npcOne.questStart = true;
		}else if(npcOne.questStart && !npcOne.questEnd && hero.level < 5){
			messageState = message.ing;
		}else if(npcOne.questStart && !npcOne.questEnd && hero.level >= 5){
			messageState = message.suc;
			npcOne.questEnd = true;
			hero.heroUpgrade(50000);
		}else if(npcOne.questStart && npcOne.questEnd){
			messageState = message.end;
		}

		let text = '';
			text += '<figure class="npc_img">';
			text += '<img src="../../../lib/images/npc.png">';
			text += '</figure>';
			text += '<p>';
			text += messageState;
			text += '</p>';
		const modalInner= document.querySelector('.quest_modal .inner_box .quest_talk');
			modalInner.innerHTML = text;
	}
}

const levelQuestTwo = {
	positionX: 8500,
	idleMessage: '<p>곧 좀비왕이 부활하려고해..<br><span>대화 Enter</span></p>',
	quest: () => {
		const level = 7;
		const message ={
			start : `마을에 몬스터가 출몰해 주민들을 좀비로 만들고 있어.. 몬스터를 사냥해 주민을 구하고 <span>레벨을 ${level}이상</span>으로 만들어 힘을 증명한다면 좀비왕을 물리칠 수 있도록 내 힘을 빌려줄게!!`,
			ing : '이런 아직 레벨을 달성하지 못했구나..',
			suc : '레벨을 달성했구나! 힘을줄게!',
			end : '고마워! 행운을 빌어!'
		}

		let messageState = '';

		if(!npcTwo.questStart){
			messageState = message.start;
			npcTwo.questStart = true;
		}else if(npcTwo.questStart && !npcTwo.questEnd && hero.level < level){
			messageState = message.ing;
		}else if(npcTwo.questStart && !npcTwo.questEnd && hero.level >= level){
			messageState = message.suc;
			npcTwo.questEnd = true;
			hero.heroUpgrade(70000);
		}else if(npcTwo.questStart && npcTwo.questEnd){
			messageState = message.end;
		}

		let text = '';
			text += '<figure class="npc_img">';
			text += '<img src="../../../lib/images/npc.png">';
			text += '</figure>';
			text += '<p>';
			text += messageState;
			text += '</p>';
		const modalInner= document.querySelector('.quest_modal .inner_box .quest_talk');
			modalInner.innerHTML = text;
	}
}










