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
	console.log(jumpinggun);
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
	console.log(this);
	console.log('make color decisions, win money');
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
	var can = sescreens.game.getElementsByTagName('canvas')[0]
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
}