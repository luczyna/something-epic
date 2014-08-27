/* helper functions */

//quickly add events to long named things
function addclickevent(everything) {
	//everything should be an array with things you want to do
	for (var i = 0; i < everything.length; i++) {
		// var argument = (everything[i][2] !== null)
		var elem = document.getElementById(everything[i][0]); 
		elem.addEventListener('click', everything[i][1], false);
	}
}

//check local storage for sctuff
function gls(name) {
	var check = 'se-' + name;
	var gotten = window.localStorage[check];
	return gotten;
}
//set local storage info
function sls(name, value) {
	var set = 'se-' + name;
	window.localStorage.setItem(set, value);
}




//show home screen about
function showAbout(evt) {
	evt.stopPropagation();

	sescreens.about.style.display = 'block';
	sescreens.about.style.opacity = 0.01;
	window.setTimeout(function() {
		sescreens.about.style.opacity = 1;
	}, 100)

	//remove ability to open about secton
	this.removeEventListener('click', showAbout);

	//finish her
	document.getElementsByClassName('about-closer')[0].addEventListener('click', hideAbout, false);
}
function hideAbout() {
	sescreens.about.style.opacity = 0;
	
	//remove ability to x out, and add ability to get back
	var closer = document.getElementsByClassName('about-closer')[0];
	var opener = document.getElementById('about');
	closer.removeEventListener('click', hideAbout, false);
	opener.addEventListener('click', showAbout, false);
	
	//finish her
	window.setTimeout(function() {
		sescreens.about.style.display = 'none';
	}, 300)
}




//show the how to instructions
function showHowTo() {
	console.log('poop');
}




//go to the color change screen
function showColorOptions(jumpinggun) {
	//if jumpinggun has a value, then this was brought up
	//bc the player started the game for the first time,
	//and needs to choose a color

	var button = document.getElementById('change-character');
	// console.log(jumpinggun);
	if (jumpinggun.fromElement !== null) {
		button.textContent = 'play!';
		button.addEventListener('click', goPlayGame, false);
	} else {
		button.addEventListener('click', goHomefromColor, false);
	}

	//show us the screen
	sescreens.home.style.opacity = 0;
	window.setTimeout(function() {
		sescreens.home.style.display = 'none';
		sescreens.changechar.style.display = 'block';
		sescreens.changechar.style.opacity = 0.01;
		window.setTimeout(function() {
			sescreens.changechar.style.opacity = 1;
			sizeCharacters();
		}, 100);
	}, 300);

}
//change the color of the player
function changeColor() {
	// console.log(this);
	var button = document.getElementById('change-character');
	var choice = this.getAttribute('data-color');
	button.setAttribute('data-choice', choice);

	for (var i = 0; i < this.parentNode.children.length; i++) {
		this.parentNode.children[i].classList.remove('active-choice');
	}
	this.classList.add('active-choice');

	if (button.classList.contains('inactive')) {
		button.classList.remove('inactive');
	}
}
//show us the characters
function sizeCharacters() {
	for (var i = 0; i < 4; i++) {
		var character = sescreens.changechar.getElementsByClassName('character')[i];
		var position = [segame.images.guy[i][0][0], -(segame.images.guy[i][0][1])];
		var cwidth = character.offsetWidth;
		var ratio = cwidth / segame.fifth;

		character.style.height = cwidth + 'px';
		character.style.background = 'url(images/se_spritesheet.png) no-repeat';
		character.style.backgroundSize = (cwidth * 5) + 'px auto';
		character.style.backgroundPosition = (position[0] * ratio) + 'px ' + (position[1] * ratio) + 'px';

		character.addEventListener('click', changeColor, false);
	}
}
function goHomefromColor() {
	// console.log(this);
	// console.log('make color decisions, win money');
	if (this.classList.contains('inactive')) {
		return;
	}

	//set the localstorage and game variable
	var choice = Number(this.getAttribute('data-choice'));
	segame.color = choice;
	sls('color', choice);

	//show us the screen
	sescreens.changechar.style.opacity = 0;
	window.setTimeout(function() {
		sescreens.changechar.style.display = 'none';
		sescreens.home.style.display = 'block';
		sescreens.home.style.opacity = 0.01;
		window.setTimeout(function() {
			sescreens.home.style.opacity = 1;
		}, 100);
	}, 300);
}




//what else?





//calculate sizes for things
function sizeThings() {
	//what is the size of the container?
	var container = document.querySelector('.container');
	var conwidth = container.offsetWidth;

	//what is the height of our window?
	var windowheight = window.innerHeight;

	//prepare our canvas element, too
	var can = document.getElementById('can')
	var fifth;
	if (conwidth < windowheight) {
		// container.style.height = window.innerHeight + 'px';
		can.style.height = conwidth + 'px';
		can.style.width = conwidth + 'px';
		fifth = conwidth / 5;
	} else {
		can.style.height = windowheight + 'px';
		can.style.width = windowheight + 'px';
		fifth = windowheight / 5;
	}
	//the container should only show us the window's height
	container.style.height = windowheight - 50 + 'px';

	//now let's size the grid for the canvas
	for (var i = 0; i < segame.coordinates.length; i++) {
		for (var j = 0; j < 5; j++) {
			var newcoor = [fifth * i, fifth * j];
			segame.coordinates[i][j] = newcoor;
		}
	}
	// console.log(segame.coordinates);

	return fifth;
}
//calculate the image map
function imageMapSizes() {
	//these are the left top coordinates of each sprite for each thing
	
	//what is the square size?
	var sqr = segame.fifth;

	//the guys first, they take up the first 5 rows
	for (var i = 0; i < segame.images.guy.length; i++) {
		var thisguy = segame.images.guy[i];
		for (var j = 0; j < 5; j++) {
			thisguy[j] = [sqr * j, sqr * i];
		}
	}

	//the bombs next, they take up 1 row
	for (var j = 0; j < 3; j++) {
		segame.images.bomb[j] = [sqr * j, sqr * 5];
	}

	//now the points, there are only 2 in 1 row
	for (var k = 0; k < 2; k++) {
		segame.images.point[k] = [sqr * k, sqr * 6];
	}	

	//last for the monsters, there are 4 rows for 4 directions
	for (var el = 0; el < segame.images.monster.length; el++) {
		var thisguy = segame.images.monster[el];
		for (var j = 0; j < 4; j++) {
			thisguy[j] = [sqr * j, sqr * (el + 7)];
		}
	}
	// console.log(segame.images);

	//let's just set up the two players
	segame.me.style.backgroundSize = sqr*5 + 'px auto';
	segame.it.style.backgroundSize = sqr*5 + 'px auto';

	

}






//move our characters
function moveGuys() {
	segame.moving = true;
	//where to put me?
	var mex = segame.player.me[0];
	var mey = segame.player.me[1];

	segame.me.style.top = segame.coordinates[mex][mey][1] + 'px';
	segame.me.style.left = segame.coordinates[mex][mey][0] + 'px';

	//where to put it?
	var itx = segame.player.it[0];
	var ity = segame.player.it[1];

	segame.it.style.top = segame.coordinates[itx][ity][1] + 'px';
	segame.it.style.left = segame.coordinates[itx][ity][0] + 'px';
	segame.me.addEventListener('transitionend', endMove, false);
}
function endMove() {
	segame.moving = false;
	segame.me.removeEventListener('transitionend', endMove, false);

	//did we collect a thing?
	checkForPointCollision();
	// cleanupPoints();

}
function keydown(e) {
	segame.kd[e.keyCode] = true;
}
function keyup(e) {
	delete segame.kd[e.keyCode];
}
function changeMessage() {
	var r = Math.floor(Math.random() * messages.length);
	var m = messages[r];
	document.getElementById('talking').textContent = m;
}
function checkALot() {
	if (38 in segame.kd) { // Player holding up
		// console.log(' pressing up ')
		//can we move up?
		if (segame.player.me[1] > 0 && !segame.moving) {
			segame.player.me[1]--;
			segame.player.it[1]++;
			moveGuys();
		}
	}
	if (40 in segame.kd) { // Player holding down
		// console.log(' pressing down ')
		if (segame.player.me[1] < 4 && !segame.moving) {
			segame.player.me[1]++;
			segame.player.it[1]--;
			moveGuys();
		}
	}
	if (37 in segame.kd) { // Player holding left
		// console.log(' pressing left ')
		if (segame.player.me[0] > 0 && !segame.moving) {
			segame.player.me[0]--;
			segame.player.it[0]++;
			moveGuys();
		}
	}
	if (39 in segame.kd) { // Player holding right
		// console.log(' pressing right ')
		if (segame.player.me[0] < 4 && !segame.moving) {
			segame.player.me[0]++;
			segame.player.it[0]--;
			moveGuys();
		}
	}
}
function checkForPointCollision() {
	//where are we?
	var a = [segame.player.me[0], segame.player.me[1]],
		b = [segame.player.it[0], segame.player.it[1]];

	var cleanup = [];

	for (var i = 0; i < segame.points.length; i++) {
		var p = segame.points[i];
		if (a[0] === p[0] && a[1] === p[1] || b[0] === p[0] && b[1] === p[1]) {
			// console.log(p);
			//remove this point later
			cleanup.push(i);

			// console.log('we collect a point');
			//they intersect!
			//add points to points
			segame.score += p[2];
			var s = document.getElementById('score');
			s.textContent = segame.score;

			//is this the highest scored score by far??
			if (segame.score > segame.hiscore) {
				//let's make people feel good about themselves
				sls('score', segame.score);
				segame.hiscore = segame.score;
			}

			//remove this point from the dom
			var id = 'point-' + p[3];
			var child = document.getElementById(id);
			// console.log(id);
			// console.log(child);
			if (child) {
				segame.canvas.removeChild(child);
			}

		}
	}

	//now clean up after ourselves
	// console.log('cleanup amount: ' + cleanup.length);
	if (cleanup.length) {
		for (var j = cleanup.length; j > 0; j--) {
			//this point is done with
			// console.log('cleanup item: ' + cleanup[j - 1]);
			segame.points.splice(cleanup[j - 1], 1);
		}
	}


}




//spawn stuff
function spawnThings() {
	console.log('spawning things');
	spawnPoints();
	bombCountdown();
	spawnBombs();
}
function spawnPoints() {
	//there will always be at most 5 points on screen
	if (segame.points.length < 5) {
		segame.count.points++;

		//we need to spawn a new one!
		var point = [];
		var p = document.createElement('div');
		p.classList.add('point');
		p.id = 'point-' + segame.count.points;
		p.style.height = segame.fifth + 'px';
		p.style.backgroundSize = segame.fifth * 5 + 'px auto';

		//where should we put it?
		point[0] = outofFive();
		point[1] = outofFive();
		p.style.top = segame.coordinates[point[0]][point[1]][1]+ 'px';
		p.style.left = segame.coordinates[point[0]][point[1]][0]+ 'px';

		//how many points will it be?
		var chance = Math.random();
		if (chance <= 0.95) {
			//regular point
			point[2] = 10;
			p.style.backgroundPosition = -(segame.images.point[0][0]) + 'px ' + -(segame.images.point[0][1]) + 'px';
		} else {
			//super mega point
			point[2] = 100;
			p.style.backgroundPosition = -(segame.images.point[1][0]) + 'px ' + -(segame.images.point[1][1]) + 'px';
		}
		point[3] = (segame.count.points);

		segame.points.push(point);
		segame.canvas.appendChild(p);
		// console.log(segame.points.length);
	} else {
		// console.log('you shouldn\'t be adding points');
	}
}
function spawnBombs() {
	//there should be at most 6 bombs on screen
	//scratch that.
	//at most, 15 bombs. The number will increase with the length of the game
	//we will measure the game by the amount of bombs spawned
	//not perfect, but it's a start
	var limit = Math.max(15, segame.bombs.length/5 + 6);
	if (segame.bombs.length >= limit) {
		// console.log('too many bombs');
		return;
	}

	//will we spawn a bomb this turn?
	var maybe = Math.random();
	if (maybe >= 0.6) {
		// console.log('the odds were never in the bomb favorian');
		//60% chance to spawn bomb
		return;
	}


	var bomb = [];
	var b = document.createElement('div');
	b.classList.add('bomb', 'slow');
	b.style.height = segame.fifth + 'px';
	b.style.backgroundSize = segame.fifth * 5 + 'px auto';

	//where does it go?
	bomb[0] = outofFive();
	bomb[1] = outofFive();

	//is there a bomb there already?
	//it'll cancel this whole spawn
	if (checkBombPlacement(bomb[0], bomb[1])) {
		//it shared a square with another bomb, no go!
		// console.log('there was already a bomb there');
		return;
	}
	//okay, now the bomb will for real exist
	segame.count.bombs++;
	
	b.id = 'bomb-' + segame.count.bombs;
	// console.log('now we spawn a bomb!')	
	b.style.left = segame.coordinates[bomb[0]][bomb[1]][0] + 'px';
	b.style.top = segame.coordinates[bomb[0]][bomb[1]][1] + 'px';
	b.style.backgroundPosition = -(segame.images.bomb[0][0]) + 'px ' + -(segame.images.bomb[0][1]) + 'px';

	//set it's timer
	bomb[2] = 3;
	//tell us what image it's at
	bomb[3] = 0;
	//identify the bomb
	bomb[4] = segame.count.bombs;

	//make it official
	segame.bombs.push(bomb);
	segame.canvas.appendChild(b)

}
//check for bombs
function checkBombPlacement(bx, by) {
	for (var i = 0; i < segame.bombs.length; i++) {
		//check this bomb
		var cb = segame.bombs[i];
		if (cb[0] === bx && cb[1] === by) {
			// console.log('found a bomb there');
			return false;
		}
	}
}
//every second turns down a bomb
function bombCountdown() {
	if (!segame.bombs.length) {
		return;
	}

	var explode = [];
	for (var i = 0; i < segame.bombs.length; i++) {
		var check = segame.bombs[i];
		check[2]--;

		if (check[2] === 1) {
			//make it's animation faster
			var thisbombID = 'bomb-' + check[4];
			var thisBomb = document.getElementById(thisbombID);
			thisBomb.classList.remove('slow');
			thisBomb.classList.add('fast');
		} else if (check[2] <= 0) {
			//it's exploding!
			explode.push(i);
		}
	}

	if (explode.length) {
		bombExplode(explode);
	}
}
function bombExplode(list) {
	//where are we?
	var a = [segame.player.me[0], segame.player.me[1]],
		b = [segame.player.it[0], segame.player.it[1]];

	for (var j = list.length; j > 0; j--) {
		//which bomb are we checking out?
		var cb = segame.bombs[list[j - 1]];
		
		//check if you were on the bomb
		if ( (a[0] === cb[0] && a[1] === cb[1]) || (b[0] === cb[0] && b[1] === cb[1]) ) {
			//girl, you as'ploded
			// console.log('it\'s game over!');
			console.log('this one killed you: ' + cb[0] + ', ' + cb[1]);
			youDie();
			gameOver();
		}

		//let's remove the bomb from the DOM and our bomb list
		segame.bombs.splice((j - 1), 1);
		var id = 'bomb-' + cb[4];
		// console.log('removing bomb with id: ' + id);
		var child = document.getElementById(id);
		if (child) {
			child.style.backgroundPosition = -(segame.images.bomb[2][0]) + 'px ' + -(segame.images.bomb[2][1]) + 'px';
			window.setTimeout(function() {
					// segame.canvas.removeChild(child);
					child.parentNode.removeChild(child);
			}, 300);
		}
	}
}
function youDie() {
	console.log('you die now');
	window.clearInterval(checking);
	window.clearInterval(spawning);
	window.clearInterval(talking);
	window.removeEventListener('keyup', keyup. false);
	window.removeEventListener('keydown', keydown, false);
	segame.kd.length = 0;
	segame.playing = false;
}
function backToHome() {
	//clean up our game area
	//segame.canvas.children doesn't collect correctly?
	var rubbish = [];
	var message = segame.canvas.querySelector('.endmessage');
	rubbish.push(message);
	var points = segame.canvas.getElementsByClassName('point');
	for (var j = 0; j < points.length; j++) {
		rubbish.push(points[j]);
	}
	var bombs = segame.canvas.getElementsByClassName('bomb');
	for (var k = 0; k < bombs.length; k++) {
		rubbish.push(bombs[k]);
	}

	// console.log(rubbish);
	for (var i = 0; i < rubbish.length; i++) {
		// console.log(rubbish[i]);
		segame.canvas.removeChild(rubbish[i]);
	}

	//go back to home screen
	var from = sescreens.game;
	var to = sescreens.home;
	from.style.opacity = 0;
	window.setTimeout(function() {
		from.style.display = 'none';
		to.style.display = 'block';
		to.style.opacity = 0.01;
		window.setTimeout(function() {
			to.style.opacity = 1;
		}, 100);
	}, 300);

}



//touch inputs
function touchstart(evt) {
	if (segame.playing) {
		evt.preventDefault();
		//log where we touched
		segame.touch[0] = evt.touches[0].clientX;
		segame.touch[1] = evt.touches[0].clientY;
	}
}
function touchEnd(evt) {
	if (segame.playing) {
		evt.preventDefault();
		//log where we let go
		segame.touch[2] = evt.changedTouches[0].screenX;
		segame.touch[3] = evt.changedTouches[0].screenY;

		if (!segame.moving) {
			if ((segame.touch[3] > segame.touch[1]) && (segame.touch[3] - segame.touch[1] > 50)) {
		 		//swipe down
				if (segame.player.me[1] < 4 && !segame.moving) {
					segame.player.me[1]++;
					segame.player.it[1]--;
					moveGuys();
				}
			} else if ((segame.touch[3] < segame.touch[1]) && (segame.touch[1] - segame.touch[3] > 50)) {
				//swipe up
				if (segame.player.me[1] > 0 && !segame.moving) {
					segame.player.me[1]--;
					segame.player.it[1]++;
					moveGuys();
				}
			} else if ((segame.touch[2] < segame.touch[0]) && (segame.touch[0] - segame.touch[2] > 50)) {
				// swipe left
				if (segame.player.me[0] > 0 && !segame.moving) {
					segame.player.me[0]--;
					segame.player.it[0]++;
					moveGuys();
				}
			} else if ((segame.touch[2] > segame.touch[0]) && (segame.touch[2] - segame.touch[0] > 50)) {
				//swipe right
				if (segame.player.me[0] < 4 && !segame.moving) {
					segame.player.me[0]++;
					segame.player.it[0]--;
					moveGuys();
				}
			}
		}
	}
}




//random generation
function outofFive() {
	var num = Math.floor(Math.random() * 4);
	return num;
}

//messages
endMess = [
	'Oh poop, you died.',
	'Dude, that sucks.',
	'Bummer. Try again when you aren\'t terrible.',
	'I wouldn\'t tell my grandma about that one.',
	'Death comes to us all, eventually.',
	'Greedy Pig!',
	'Fill heaven with your failure.',
	'Fill hell with your greed for points.',
	'Push through this and keep playing.',
	'Understand that it was you, not me.',
	'I\'d start hating me, too.',
	'Better write down this code: L33T5uX',
	'Remember that secret code? What secret code? ...nevermind.',
	'Remember this on your death bed/in your death throws',
	'It\'s okay, really. We didn\'t like that character color anyway.',
	'Try changing your character color, maybe luck is what you need.',
	'What the heck was that? No, don\'t start crying',
	'I can\'t stand how bad that was.',
	'Your performance fills me with pain.',
	'Don\'t tell me you were actually trying.'
];

messages = [
	'ksjdhfskdjhfadsgjg',
	'Keep moving the guys around!',
	'Don\'t get caught up in all the details.',
	'Have you realised that the character movements are connected?',
	'It\'s like they are connected somehow...',
	'Here\'s the secret code: URAB77M34N13',
	'I think we should be worried about you.',
	'Play the game, butt munch.',
	'Don\'t explode. It\'s as simple as that.',
	'Bombs last for 3 seconds.',
	'You last as long as you live. You are not like the gallon of rotting milk in your fridge.',
	'Light the world up with your farts.',
	'Du ar vacker.',
	'My mom plays better than you.',
	'Keep your cool and play better, GAWSH.',
	'Seien Sie ein Held heute.',
	'Sorry that I\'m not sorry.',
	'Live your life as you like, not how someone else would like.',
	'These little guys don\'t want to be assplodified.',
	'Bomb them, just bomb the little guys already!',
	'Be greedy and collect as many as the glowing points as you can.'
];