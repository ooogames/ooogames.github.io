//  	le boutton restart apparait trop vite, il doit apparaître après un certain délai + son roulement de tambour pour désigner le vainqueur

// 	papiers sur écran scores

// 	faire un spritesheet des papiers suivant le rang

// 	empêcher les flash suites aux pression de clic

// 	animer la progress bar lorsqu'on marque des points

//  	répartir les papiers gagnés dans le rank




var stars;

var boot = {
	preload: function () {
		// on definit ici car game subit un scale et les valeurs w2 ,h2 sont faussées après global.js
		w2 = game.world.centerX;
		h2 = game.world.centerY;
		//	this.game.load.image("loading","assets/loading.png");
		//	this.game.load.image("loading_back","assets/loading_back.png");
	},
	create: function () {
		//to scale the game
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		//red color to see the background of the game itself
		// you must change the background in the index.html to have the same color in the background game 
		// > change the yellow in red it's only to see how the game is scalling
		//this.game.stage.backgroundColor = '#ffe063';
		this.game.stage.backgroundColor = '#fe3e63';
		this.game.scale.refresh();
		this.game.state.start('preloader');
	}
};

var preloader = {
	preload: function () {
		//loadingBar
		//var loadingBar_back = this.add.sprite(game.width/2,h2,"loading_back");
		//loadingBar_back.anchor.setTo(0.5,0.5);
		//var loadingBar = this.add.sprite(game.width/2,h2,"loading");
		//loadingBar.anchor.setTo(0.5,0.5);
		//this.load.setPreloadSprite(loadingBar);
		//tuto
		this.game.load.image("rank", "assets/rank.png");
		this.game.load.image("roll_rank", "assets/roll_rank.png");
		this.game.load.image("background_start", "assets/background_start.png");
		this.game.load.image("background_main", "assets/background_main.png");
		this.game.load.image("background_top", "assets/background_top.png");
		this.game.load.image("progress", "assets/progress.png");
		this.game.load.image("gray_filter", "assets/gray_filter.png");
		this.game.load.image("paper", "assets/paper.png");
		this.game.load.image("shadow", "assets/shadow.png");
		this.game.load.image("paper_winner", "assets/paper_winner.png");
		this.game.load.image("heart", "assets/heart.png");
		this.game.load.image("line_collision", "assets/line_collision.png");
		this.game.load.image("cursor_palpitant", "assets/cursor_palpitant.png");
		this.game.load.image("line", "assets/line.png");
		this.game.load.image("flash0", "assets/flash0.png");
		this.game.load.image("flash1", "assets/flash1.png");
		this.game.load.image("distance_0", "assets/distance_0.png");
		this.game.load.image("distance_1", "assets/distance_1.png");
		this.game.load.image("searching_opponent", "assets/searching_opponent.png");
		this.game.load.image("looser0", "assets/looser0.png");
		this.game.load.image("looser_text0", "assets/looser_text0.png");
		this.game.load.image("looser1", "assets/looser1.png");
		this.game.load.image("looser_text1", "assets/looser_text1.png");
		this.game.load.image("cloud", "assets/cloud.png");
		this.game.load.image("play_button", "assets/play_button.png");
		this.game.load.image("rank_button", "assets/rank_button.png");
		this.game.load.image("particle", "assets/particle.png");
		this.game.load.image("roll_bondissant", "assets/roll_bondissant.png");
		this.game.load.image("shadow_roll_bondissant", "assets/shadow_roll_bondissant.png");
		this.game.load.image("timer", "assets/timer.png");
		this.game.load.image("restart", "assets/restart.png");
		this.game.load.image("button_next_screen", "assets/button_next_screen.png");
		this.game.load.image("button_home", "assets/button_home.png");
		this.game.load.image("background_start", "assets/background_start.png");
		this.game.load.image("title_game", "assets/title_game.png");
		this.game.load.image("background_button_play", "assets/background_button_play.png");
		this.game.load.image("flash_blanc_0", "assets/flash_blanc_0.png");
		this.game.load.image("flash_blanc_1", "assets/flash_blanc_1.png");
		this.game.load.image("heart_particle", "assets/heart_particle.png");
		//spritesheet
		this.game.load.spritesheet("roll", "assets/roll.png",60,60);
		this.game.load.spritesheet("level0", "assets/level0.png",100,100);
		this.game.load.spritesheet("level1", "assets/level1.png",100,100);
		//this.game.load.spritesheet("puissance", "assets/puissance.png",75,90);
		//font bitmapFont
		this.game.load.bitmapFont('police_red', 'fonts/font_red.png', 'fonts/font.fnt');
		this.game.load.bitmapFont('police_yellow', 'fonts/font_yellow.png', 'fonts/font.fnt');
		this.game.load.bitmapFont('police', 'fonts/font.png', 'fonts/font.fnt');
		//audio
		this.game.load.audio("clic", "sounds/clic.ogg");
		this.game.load.audio("grow", "sounds/grow.ogg");
		this.game.load.audio("pop", "sounds/pop.ogg");
		this.game.load.audio("scroll", "sounds/scroll.ogg");
		this.game.load.audio("score", "sounds/score.ogg");
		//	this.game.load.audio("music", "sounds/Attack-of-the-Flaming-Pie-Tins.ogg");
		//		this.game.load.audio("music", "sounds/music/Another-Day-in-8_Bit-Land.ogg");
		//this.game.load.audio("music", "sounds/music/Attack-of-the-Flaming-Pie-Tins.ogg");
		//	this.game.load.audio("music", "sounds/music/Crazy-Candy-Highway-2.ogg");
		this.game.load.audio("music", "sounds/music/Hypnotic-Puzzle3.ogg");
		//	this.game.load.audio("music", "sounds/music/Monsters-in-Bell-Bottoms.ogg");
		//	this.game.load.audio("music", "sounds/music/The-8-bit-Princess.ogg");
	},
	create: function () {
		this.game.time.events.add(1000, function () { this.game.state.start("game_main"); }, this);
		this.game.time.events.add(1000, function () { this.game.state.start("game_first_screen"); }, this);
	}
};

var game_first_screen = {
	create: function () {
		//game.time.advancedTiming = true;
		//game.time.desiredFps = 30;
		music=game.add.audio('music');
		// si nomusic est true la musique ne se joue pas
		!d.nomusic && music.play()
		pop=game.add.audio('pop');
		clic=game.add.audio('clic');
		grow = game.add.audio("grow")
		scroll = game.add.audio("scroll")
		score = game.add.audio("score")
		h=game.height
		f.prompt()
		f.create_game_first_screen();
	},
	update: function () {
		// paramètre pour calucler la proportion de l'ombre du papier bondissant
		var param_shadow={
			a:.5,
			b:w2+200,
			c:"inconnue",
			d:o.roll.y-100,
		}
		o.shadow_roll.scale.x = f.proportions(param_shadow)
		o.shadow_roll.scale.y = o.shadow_roll.scale.x

		//progress update
		o.decimal = o.decimal + 0.01

		let progress_length = 300*o.decimal
		if(progress_length < 300){
			o.progress.drawRoundedRect(0,0,progress_length,27,10);
		}
	},
};

var rank_screen = {
	create: function () {
		//game.time.advancedTiming = true;
		//game.time.desiredFps = 30;
		game.physics.arcade.gravity.y = 1000;
		this.game.stage.backgroundColor = '#ffe063';
		pop=game.add.audio('pop');
		clic=game.add.audio('clic');
		grow = game.add.audio("grow")
		scroll = game.add.audio("scroll")
		score = game.add.audio("score")

		//creer les papiers gagnés dans la collection
		f.create_rank()

		//défini des limites pour que les papiers rebondissent
		game.world.setBounds(0,0,1400,2200)

		//pool pour augmenter les performances
		o.lot_of_roll = game.add.spriteBatch();

		stars = [];

		for (var i = 0; i < 500; i++)
		{

			//o.rolls = new _obj(op.rolls)
			o.rolls = game.add.sprite(random(50,w-50),random(400,h),'roll_rank') 
			o.rolls.scale.x=4
			o.rolls.scale.y=4

			game.physics.enable( [ o.rolls ], Phaser.Physics.ARCADE);

			o.rolls.body.collideWorldBounds = true;
			o.rolls.body.bounce.y = 1.2;
			o.rolls.body.gravity.y = 800;
			o.rolls.body.allowGravity = true;
			o.lot_of_roll.addChild(o.rolls);
			stars.push(o.rolls);

			//in op config
			op.collision={
				image: "line_collision",
				x: w2,
				y: 400,
				a: 0,
				flag: true,
				g: game,
				physics:true,
				immovable:true,
				moves:false,
			}
			o.collision = new _obj(op.collision)
			//o.collision.body.immovable=true


		}

	},
	update : function(){
		f.collide(o.collision,stars)
	},
};
function scale_assets_to_screen(){
	o.background_main.scale.x = game.width/320 
	o.background_main.scale.y = game.height/491 
	o.flash[0].scale.y = game.height/2270 
	o.flash[1].scale.y = game.height/2270 
	o.background_top.scale.x = game.width/320 
	o.background_top.scale.y = game.height/491 
	o.filter_gray.scale.y = game.height/2270 
	o.looser[0].scale.x = game.width/320 
	o.looser[0].scale.y = game.height/491 
	o.looser[1].scale.x = game.width/320 
	o.looser[1].scale.y = game.height/491 
	o.pre_sensor.y = o.pre_sensor.y + game.height/2270
	//o.flash_blanc[0].scale.y = game.height/2270
	o.flash_blanc[0].scale.y = game.height/246
	o.flash_blanc[0].scale.x = game.width/160
	o.flash_blanc[1].scale.y = game.height/246
	o.flash_blanc[1].scale.x = game.width/160
}

function create_sounds(game){
	pop=game.add.audio('pop');
	clic=game.add.audio('clic');
	grow = game.add.audio("grow")
	score = game.add.audio("score")
}

var game_main = {
	create: function () {
		music.stop()
		//game.time.advancedTiming = true;
		//game.time.desiredFps = 30;
		grow.flag=false
		this.game.stage.backgroundColor = '#ffe063';
		scroll = game.add.audio("scroll")
		scroll.flag =false
		h=game.height
		//scale the sprites to the screen
		game.physics.arcade.gravity.y = 1000;
		f.start_game()
		scale_assets_to_screen()
		create_sounds(game)
		wait(() => { e.arrow(game) }, 3000)


		// pour éviter de mettre ceci dans update et gagner de la ressource
		f.pseudo_update=()=>{
			if(flag.start_game){
				//anim le score en fonction du drapeau
				d[0] &&	f.anim_score(0)
				d[1] && f.anim_score(1)

				// pointer qui suit le mouvement
				f.follow_pointer(o.click)
				//pour permettre aux points de descendre
				if (o.paper[0].flag == false) {
					f.follow_text(o.paper[0])
				}
				//pour permettre au point de descendre
				if (o.paper[1].flag == false) {
					f.follow_text(o.paper[1])
				}

				// ombre qui suit le papier lors de sa chute
				f.shadow_follow(o.paper[0],o.shadow_0)
				f.shadow_follow(o.paper[1],o.shadow_1)

			}
		}
		// pour éviter de mettre ceci dans update et gagner de la ressource
		f.loop(15,f.pseudo_update)



	},

	update: function () {
		// distance à partir de laquelle le mask s'affiche pour signifier au joueur que la fin est proche
		if(flag.start_game){
			//TODO : 

			//pas nécessaire
			//if (o.paper[0].flag) { o.paper[0].body.moves = true }

			//anime le mask signifiant la fin proche de la limite du gameover
			f.mask_scale(o.paper[0],o.distance[0])
			f.mask_scale(o.paper[1],o.distance[1])

			// collision entre le texte et le papier puis décision
			f.collide(o.paper[0], o.paper[0].fil, f.decision)
			f.collide(o.paper[1], o.paper[1].fil, f.decision)

			//f.collide(o.paper[1], o.sensor)

			// vérifier si le papier touche le dernier repère physique et donc par conséquent provoque un gameover
			f.check()

			//pour arrêter et redémarrer l'enemi sur les obstacles
			// on met -2 car si o.length = 3 c'est à dire 0 1 2 donc l'avant dernier = 3-2
			for (let i = 0; i < o.opponent_actions.length-2; i++) {
				f.stop_opponent(o.sensor_opponent[i])
			}
			f.stop_opponent_on_the_last(o.sensor_opponent[o.sensor_opponent.length-1])

			// vérifie si on peut cliquer pour arrêter le papier
			f.check_pre_sensor()

			//pour animer la progress bar avec 200 points soit 200 de 300 de width
			interface.progress[0].anim(50)


			let cond = game.input.activePointer.duration > 500 && o.paper[1].flag_pre_sensor == true && o.paper[1].flag_test_duration == false && o.paper[1].flag == false
			//en fonction de la durée anime le score ou pas
			f.get_duration(cond,game.input.activePointer,d,tw_click)
			f.anim_pointer(o.click,tw_click)
		}
	},
	render: function () {
		//f.debug(o.paper[0])
		//f.debug(o.paper[0].fil)
		//f.debug(o.sensor)
		//f.debug(o.pre_sensor)

	},
}

var how_to = {
	create: function () {
	},
};
