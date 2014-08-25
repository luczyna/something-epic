/*do amazing things*/

// things to use
var segame = {
	color: null,
	round: 0,
	score: 0,
	player: {
		me: [2, 2, 1],
		it: [2, 2, 1]
	},
	coordinates: [[],[],[],[],[]],
	monsters: [],
	bombs: [],
	points: [],
	count: {
		points: 0,
		bombs: 0,
		monsters: 0
	},
	images: {
		guy: [ [], [], [], [], [] ],
		bomb: [],
		point: [],
		monster: [ [], [], [], [] ]
	},
	fifth: 0,
	moving: false,
	playing: false,
	me: document.getElementById('me'),
	it: document.getElementById('it'),
	canvas: document.getElementById('can'),
	kd: []
}
var sescreens = {
	home: document.getElementById('homescreen'),
	about: document.querySelector('.about'),
	howto: document.getElementById('howscreen'),
	changechar: document.getElementById('changescreen'),
	game: document.getElementById('gamescreen')
}

//initialize the game
function init() {
	//check for local storage stuff
	var col = gls('color');
	if (typeof col !== 'undefined') {
		segame.color = Number(gls('color'));
	}

	var scr = gls('score');
	if (typeof src !== 'undefined') {
		console.log('poop');
		var elem = document.createElement('p');
		elem.textContent = 'max-score: ' + gls('score');
		sescreens.home.insertBefore(elem, sescreens.home.children[3]);
	}

	//fill the coordinate variables
	//size things that need sizing
	segame.fifth = sizeThings();
	imageMapSizes();

	//get the home screen buttons working
	var things = [
		//all the things
		['playme', getReadyToPlay],
		['howto', showHowTo],
		['change', showColorOptions],
		['about', showAbout]
	]
	addclickevent(things);
}
init();




//lets get it all started
function getReadyToPlay() {
	//reset all our info
	segame.round = 0;
	segame.score = 0;
	segame.player.me = [2, 2, 1];
	segame.player.it = [2, 2, 1];
	segame.monsters.length = 0;
	segame.bombs.length = 0;
	segame.points.length = 0;
	segame.playing = true;

	//is there a color?
	if (segame.color === null) {
		//show the character screen
		showColorOptions('yes');
	} else {
		// document.getElementById('playme').click;
		// document.getElementById('playme').call('click');
		goPlayGame();
	}


}
function goPlayGame() {
	// console.log(this);
	if (this !== window && this.classList.contains('inactive')) {
		return;
	}

	var from;
	if (this.id === 'change-character') {
		from = sescreens.changechar;
		//set the localstorage and game variable
		var choice = Number(this.getAttribute('data-choice'));
		segame.color = choice;
		sls('color', choice);
	} else {
		from = sescreens.home;
	}


	//go to the game screen
	//show us the screen
	from.style.opacity = 0;
	window.setTimeout(function() {
		from.style.display = 'none';
		sescreens.game.style.display = 'block';
		sescreens.game.style.opacity = 0.01;
		window.setTimeout(function() {
			sescreens.game.style.opacity = 1;
			prepareCanvas();
		}, 100);
	}, 300);
}

var checking, spawning;

function prepareCanvas() {
	console.log('good luck, asshole');

	segame.me.style.height = segame.me.offsetWidth + 'px';
	segame.it.style.height = segame.it.offsetWidth + 'px';

	moveGuys();

	segame.playing = true;
	window.addEventListener("keydown", keydown, false);
	window.addEventListener("keyup", keyup, false);

	checking = window.setInterval(checkALot, 50);
	spawning = window.setInterval(spawning, 1000);

}