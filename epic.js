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
	images: {
		guy: [ [], [], [], [], [] ],
		bomb: [],
		point: [],
		monster: [ [], [], [], [] ]
	},
	source: {
		guy: [ 
				[ [0, 0], [50, 0], [100, 0], [150, 0], [200, 0] ],
				[ [0, 50], [50, 50], [100, 50], [150, 50], [200, 50] ], 
				[ [0, 100], [50, 100], [100, 100], [150, 100], [200, 100] ], 
				[ [0, 150], [50, 150], [100, 150], [150, 150], [200, 150] ],
				[ [0, 200], [50, 200], [100, 200], [150, 200], [200, 200] ]
			],
		bomb: [ [0, 250], [50, 250], [100, 250] ],
		point: [ [0, 300], [50, 300] ],
		monster: [
				[ [0, 350], [50, 350], [100, 350] ],
				[ [0, 400], [50, 400], [100, 400] ],
				[ [0, 450], [50, 450], [100, 450] ],
				[ [0, 500], [50, 500], [100, 500] ]
			]
	},
	fifth: 0,
	moving: false,
	playing: false
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
	//can we play this?
	var canvas = document.getElementById('can');
	if (!canvas.getContext) {
		//we can't play this, this browser does not support canvas
		var unfortunate = document.createElement('p');
		unfortunate.classList.add('misfortune');
		unfortunate.textContent = 'Oops, it looks like the browser you\'re using is outdated or simply not equipped to play this wonderful game. Please switch to a modern browser to experience something truly epic.';
		segames.home.insertBefore(unfortunate, segames.home.children[1]);
		return;
	}
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

function prepareCanvas() {
	console.log('good luck, asshole');

	var context = document.getElementById('can').getContext('2d');
	var img = new Image();
	img.onload = function() {
		// context.drawImage(img, sx, sy, sw, sh, cx, cy, cw, ch);

		//draw bomb
		context.drawImage(img, segame.source.bomb[0][0], segame.source.bomb[0][1], 50, 50, 0, 0, segame.fifth, segame.fifth);

		//draw first guy
		context.drawImage(img, segame.source.guy[0][0][0], segame.source.guy[0][0][1], 50, 50, segame.fifth * 2, segame.fifth * 3, segame.fifth, segame.fifth);		
		
	}
	img.src = 'images/se_spritesheet.svg'

}