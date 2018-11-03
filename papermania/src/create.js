
f.create_game_first_screen = () => {
	//in op config
	op.background_start={
		image: "background_start",
		x: 0,
		y: 0,
		a: 1,
		flag: true,
		anchorx: 0,
		anchory: 0,
		g: game,
	}

	o.background_start = new _obj(op.background_start)
	o.background_start.scale.y = game.height/2270 

	//in op config
	op.title_game={
		image: "title_game",
		x: w2,
		y: h*.2,
		a: 1,
		flag: true,
		g: game,
	}

	o.title_game = new _obj(op.title_game)

	o.title_game.angle =-15

	//in ap config
	ap.title_game={
		e: Phaser.Easing.Bounce.Out,
		o: o.title_game,
		i: -1, //number repeat
		y: true, //yoyo
		//a: 0, // alpha
		t: 1200, //time
		d: 400, // delay
		r: 15, //rotation
		//dx: w2, //distance
		//dy: h*.2+20,
		//sx:1, //scale
		//sy:1,
	}
	_a(ap.title_game)

	o.shadow_roll_p = {
		image: "shadow_roll_bondissant",
		x: w2,
		y: h*.89,
		a: .6,
		flag: true,
		g: game,
	}
	o.shadow_roll = new _obj(o.shadow_roll_p)

	o.roll_p = {
		image: "roll_bondissant",
		x: w2,
		y: h*.87,
		a: 1,
		flag: true,
		g: game,
	}
	o.roll = new _obj(o.roll_p)
	o.roll.scale.x=1.2
	o.roll.scale.y=.8

	//animation tire de simple tween pour faire sauter le rouleau de papier
	f.anim_roll = (p) => {
		p.name = game.add.tween(p.o).to({x: p.dx, y: h*.8}, p.t, p.e,true,p.d,p.i,true)
		p.name = game.add.tween(p.o.scale).to({x: .8, y: 1.2}, p.t, p.e,true,p.d,p.i,true)
		p.name.onComplete.add(()=>{p.callback()}, this)
	}

	a.roll={
		o:o.roll,
		t:280,
		d:0,
		e:Phaser.Easing.Bounce.InOut,
		dx:w2,
		dy:h2+600,
		sx:1.2,
		sy:.7,
		//y:true,
		i:0,
		callback : ()=>{f.anim_roll(a.roll)},
		name: "anim_roll",
		ctime:0,
		//tw : "roll",
		c: true,
		y:false,
	}

	f.anim_roll(a.roll)

	//in op config
	op.background_button_play={
		image: "background_button_play",
		x: w2,
		y: h2,
		a: 1,
		flag: true,
		g: game,
	}

	o.background_button_play = new _obj(op.background_button_play)

	o.button_play_p={
		g:game,
		callback: ()=>{game.state.start("game_main"),clic.play()},
		image:"play_button",
		x:w2,
		y:h2,
	}
	o.button_play = new _b(o.button_play_p)
	o.button_rank_p={
		g:game,
		callback: ()=>{game.state.start("rank_screen"),clic.play()},
		image:"rank_button",
		x:w2,
		y:h2*1.40,
	}
	o.button_rank = new _b(o.button_rank_p)

	//in ap config
	ap.button_play={
		o: o.background_button_play,
		e: Phaser.Easing.Linear.None,
		i: -1, //number repeat
		y: true, //yoyo
		//a: 0, // alpha
		t: 800, //time
		//d:100, // delay
		//r: 45, //rotation
		//dx:100, //distance
		//dy:200,
		sx:1.2, //scale
		sy:1.2,
	}
	_a(ap.button_play)	
	//objects particles
	pp.heart={
		image: "heart_particle",
		//x: game.rnd.integerInRange(0,w),
		//y: game.rnd.integerInRange(0,h),
		x: w2,
		y: h2,
		lifetime: 1000,
		repeat : 100,
		particle_per_frame : 8,
		g: game,
		alpha : [.3,.8],
		number : 100,
	}

	p.heart=_p(pp.heart)
	pp.heart.start()
	pp.heart.loop()

}
//creer les papiers gagnés dans la collection
f.create_rank=()=>{

	//in op config
	op.rank={
		image: "rank",
		x: 0,
		y: 0,
		a: 1,
		flag: true,
		g: game,
		anchorx:0,
		anchory:0,
	}

	o.rank = new _obj(op.rank)

	bp.button_home={
		callback: ()=>{game.state.start("game_main"),clic.play()},
		image:"button_home",
		x: w2,
		y: h*.92,
		g:game,
	}
	b.button_home = new _b(bp.button_home)
}

f.create_main = () => {
	//f.start_config_main()
	co(d,"debug")

	//pour reseter les drapeaux au lancement du jeu
	flag.heart =false
	d.show_button_restart = false	

	o.background_start_p = {
		image: "background_start",
		x: w2,
		y: h2,
		a: 1,
		flag: true,
		g: game,
	}
	o.background_start_left_p = {
		image: "background_start_left",
		x: w2,
		y: h2,
		a: 1,
		flag: true,
		g: game,
	}
	o.background_start_right_p = {
		image: "background_start_right",
		x: w2,
		y: h2,
		a: 1,
		flag: true,
		g: game,
	}

	o.background_main_p = {
		image: "background_main",
		x: 0,
		y: 0,
		a: 1,
		anchorx : 0,
		anchory : 0,
		flag: true,
		g: game,
	}
	o.background_main = new _obj(o.background_main_p)
	o.distance_0={
		image: "distance_0",
		x: (w2*.5)-20,
		y: h*.58,
		a: 1,
		anchorx : 0.5,
		anchory : 1,
		flag: true,
		g: game,
		v:false,
	}
	o.distance_1={
		image: "distance_1",
		x: (w2*1.5)-20,
		y: h*.58,
		a: 1,
		anchorx : 0.5,
		anchory : 1,
		flag: true,
		g: game,
		v:false,
	}

	o.distance={
		0:new _obj(o.distance_0),
		1:new _obj(o.distance_1),
	}
	o.shadow_p0 = {
		g: game,
		image:"shadow",
		x: 10,
		y: 10,
		v:true,
	}
	o.shadow_p1 = {
		g: game,
		image:"shadow",
		x: 10,
		y: 10,
		v:true,
	}
	o.shadow_0 = new _obj(o.shadow_p0)
	o.shadow_1 = new _obj(o.shadow_p1)

	o.paper_p0 = {
		image: "paper",
		x: w2 * .5,
		y: -h2,
		a: 1,
		flag: false,
		g: game,
		physics: true,
		gravity: true,
		//pour tester les collisions immovable doit être à false
		immovable: true,
		moves: false,
		name : 0,
	}
	o.paper_p1 = {
		image: "paper",
		x: w2 * 1.5,
		y: -h2,
		a: 1,
		flag: false,
		g: game,
		physics: true,
		gravity: true,
		//pour tester les collisions immovable doit être à false
		immovable: true,
		moves: false,
		name : 1,
	}
	o.paper = {
		0: new _obj(o.paper_p0),
		1: new _obj(o.paper_p1),
	}

	o.paper[0].gameover = false // pour alerter quand il dépasse le milieu de la table
	o.paper[0].flag_pre_sensor = false
	o.paper[0].flag_press_engaged = false
	o.paper[1].flag_press_engaged = false
	o.paper[1].flag_pre_sensor = false
	o.paper[0].flag_dont_move = false
	o.paper[1].flag_dont_move = false
	// pour lancer long press seulement une fois
	o.paper[0].flag_test_duration = false
	o.paper[1].flag_test_duration = false

	o.filter_gray_p = {
		image: "gray_filter",
		x: 0,
		y: 0,
		a: 1,
		flag: true,
		g: game,
		anchorx : 0,
		anchory : 0,
	}
	o.filter_gray = new _obj(o.filter_gray_p)

	o.sensor_p = {
		image: "line_collision",
		x: w2,
		y: h*0.58+2400,
		a: 1,
		flag: true,
		anchorx: .5,
		anchory: 1,
		g: game,
		physics: true,
		immovable: true,
	}
	o.sensor = new _obj(o.sensor_p)

	o.pre_sensor_p = {
		image: "line_collision",
		x: w2,
		y: h*1.273,
		a: 1,
		flag: true,
		g: game,
		physics: true,
		immovable: true,
		anchorx: .5,
		anchory: 1,
	}

	o.click_p = {
		image: "cursor_palpitant",
		x: w2 * 1.5,
		y: h2,
		a: 1,
		flag: false,
		g: game,
		v:false,
	}
	o.click = new _obj(o.click_p)

	o.click.height = 100
	o.click.width = 100
	o.click_tw = {
		o: o.click, //object
		t: 200, //time
		d: 0, //delay
		//a: 1, //alpha
		e: Phaser.Easing.Linear.None, //Easing
		i: true,
		//r: 85, //rotation
		sx: 2, //scalex
		sy: 2, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		y: true, //yoyo,
		dyo: 200, //delay yoyo
		i: -1,
	}

	o.points_p0 = {
		g: game,
		x: w2 * .5,
		y: -200,
		message: "984",
		taille: 110,
		police: 'police',
		anchorx: .5,
		anchory: .5,
	}
	o.fil_p0 = {
		image: "line",
		x: w2 * .5,
		y: -200,
		a: 1,
		flag: true,
		g: game,
		physics: true,
		gravity: true,
		moves: false,
		//bounce: 1.0,
		anchorx: .5,
		anchory: 1,
	}
	o.points_p1 = {
		g: game,
		x: w2 * 1.5,
		y: -200,
		message: "984",
		taille: 110,
		police: 'police',
		anchorx: .5,
		anchory: .5,
	}
	o.fil_p1 = {
		image: "line",
		x: w2 * 1.5,
		y: -200,
		a: 1,
		//on s'en sert pour valider long_press
		flag: false,
		g: game,
		physics: true,
		gravity: true,
		moves: false,
		bounce: 1.0,
		anchorx: .5,
		anchory: 1,
	}

	o.paper[0].points = new _t(o.points_p0)
	o.paper[0].fil = new _obj(o.fil_p0)
	o.paper[1].points = new _t(o.points_p1)
	o.paper[1].fil = new _obj(o.fil_p1)

	o.background_top_p = {
		image: "background_top",
		x: 0,
		y: 0,
		a: 1,
		anchorx : 0,
		anchory : 0,
		flag: true,
		g: game,
	}
	o.background_top = new _obj(o.background_top_p)
	o.flash_p0 = {
		image: "flash0",
		x: 0,
		y: 0,
		a: 1,
		anchorx : 0,
		anchory : 0,
		flag: false,
		g: game,
	}
	o.flash_p1 = {
		image: "flash1",
		x: 0,
		y: 0,
		a: 1,
		anchorx : 0,
		anchory : 0,
		flag: false,
		g: game,
	}

	o.flash = []
	o.flash = {
		0: new _obj(o.flash_p0),
		1: new _obj(o.flash_p1),
	}
	o.flash[0].alpha = 0
	o.flash[1].alpha = 0
	o.flash_tw_p0 = {
		o: o.flash[0], //object
		t: 30, //time
		d: 0, //delay
		a: 1, //alpha
		//e: Phaser.Easing.Elastic.Out, //Easing
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		y: true, //yoyo,
		dyo: 30, //delay yoyo
		c: true,
		ctime : 15,
		callback : ()=> {o.flash[0].flag=false},
		i: 0,
	}
	o.flash_tw_p1 = {
		o: o.flash[1], //object
		t: 30, //time
		d: 0, //delay
		a: 1, //alpha
		//e: Phaser.Easing.Elastic.Out, //Easing
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		ctime : 15,
		y: true, //yoyo,
		dyo: 30, //delay yoyo
		c: true,
		callback : ()=> {o.flash[1].flag=false},
		i:0,
	}
	o.looser_p0_text = {
		image: "looser_text0",
		x: w2*.5,
		y: h2,
		a: 0,
		flag: false,
		g: game,
	}
	o.looser_p1_text = {
		image: "looser_text1",
		x: w2*1.5,
		y: h2,
		a: 0,
		flag: false,
		g: game,
	}

	o.looser_p0 = {
		image: "looser0",
		x: 0,
		y: 0,
		a: 0,
		flag: true,
		g: game,
		anchorx:0,
		anchory:0,
	}
	o.looser_p1 = {
		image: "looser1",
		x: 0,
		y: 0,
		a: 0,
		flag: true,
		g: game,
		anchorx:0,
		anchory:0,
	}

	o.looser = []
	o.looser = {
		0: new _obj(o.looser_p0),
		1: new _obj(o.looser_p1),
	}
	o.looser[0].text = new _obj(o.looser_p0_text)
	o.looser[0].text.alpha =  0
	o.looser[1].text = new _obj(o.looser_p1_text)
	o.looser[1].text.alpha =  0
	o.looser[0].alpha = 0
	o.looser[1].alpha = 0
	o.looser_tw=[]
	o.looser_tw[0] = {
		o: o.looser[0], //object
		t: t.looser, //time
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Exponential.Out, //Easing
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		//y: true, //yoyo,
		//dyo: 30, //delay yoyo
		//i: 0,
	}
	o.looser_tw_text=[]
	o.looser_tw_text[0] = {
		o: o.looser[0].text, //object
		t: t.looser, //time
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Exponential.Out, //Easing
		flag:false,
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		//y: true, //yoyo,
		//dyo: 30, //delay yoyo
		//i: 0,
	}
	o.looser_tw_text[1] = {
		o: o.looser[1].text, //object
		t: t.looser, //time
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Exponential.Out, //Easing
		flag:false,
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		//y: true, //yoyo,
		//dyo: 30, //delay yoyo
		//i: 0,
	}

	o.looser_tw[1] = {
		o: o.looser[1], //object
		t: t.looser, //time
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Exponential.Out, //Easing
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		//y: true, //yoyo,
		//dyo: 30, //delay yoyo
		//i: 0,
	}

	o.circle_search_opponent_p = {
		image: "circle_search_opponent",
		x: w2*.5,
		y: 800,
		flag: true,
		g: game,

	}

	o.searching_opponent =[] 
	for (var i = 0; i < 8; i++){
		o.searching_opponent[i]=game.add.sprite(w2*.5,h2*.75,"timer");
		o.searching_opponent[i].anchor.x = .5  
		o.searching_opponent[i].anchor.y = 0  
		o.searching_opponent[i].angle = i*45  
		o.searching_opponent[i].alpha = 1  

	}

	/*
transition pour le cercle pour montrer l'attente d'un enemy
première transition
ensuite on chaine avec les transitions suivantes et la dernière renvoie à la fonction de départ
si et seulement si le nombre de transition est atteint
*/
	//nombre aléatoire définissant le nombre de fois l'animation va se jouer
	o.searching_opponent.number = random(2, 5)
	//paramètre des transitions


	ap.searching_opponent={
		// pas d'objet car impossible à incrementer dans un paramètre
		e: Phaser.Easing.Linear.None,
		i: 0, //number repeat
		y: true, //yoyo
		a: 0, // alpha
		t: t.animate_timer, //time
		d:0, // delay
	}
	//pour démarrer le tableau
	a.searching_opponent=[]
	//
	f.launch_animation_searching_opponent=(p,n)=>{
		n = n -1
		//démarrage de la première transition
		a.searching_opponent[0]=game.add.tween(o.searching_opponent[0]).to({alpha: p.a}, p.t, p.e,false,p.d,p.i,p.y)
		for (var i = 1; i < 8 ; i++){
			//transitions de 1 à 8 qui vont être chainées
			a.searching_opponent[i]=game.add.tween(o.searching_opponent[i]).to({alpha: p.a}, p.t, p.e,false,p.d,p.i,p.y)
		}

		// on retire 1 de 8 car le dernier = 7+1
		for (var i = 0; i < 7; i++){
			//chainer les transitions 0 avec 1 , 1 avec 2 etc...
			a.searching_opponent[i].chain(a.searching_opponent[i+1])
		}
		a.searching_opponent[7].onComplete.add(()=>{f.restart_if_number(p,n)})
		a.searching_opponent[0].start();

	}
	f.restart_if_number=(p,n)=>{
		if(n >1){
			co("restart_if_number")
			f.launch_animation_searching_opponent(p,n)
		}
	}
	f.launch_animation_searching_opponent(ap.searching_opponent,o.searching_opponent.number)

	// normalement plus nécessaire
	o.searching_opponent_tw=[]
	let ts=200
	let ds=200
	let rs=90
	f.start_timer_search_opponent=()=>{
		for (var i = 0; i < o.searching_opponent.length; i++){
			o.searching_opponent_tw[i]={
				o:o.searching_opponent[i],
				t:ts,
				d:ds+i*rs,	
				a:.2,	
				y:true,
			}
			_transition(o.searching_opponent_tw[i])
		}
	}

	o.text_searching_opponent_p = {
		image: "searching_opponent",
		x: w2*.5,
		y: h*.21,
		a: 0,
		flag: true,
		g: game,

	}
	o.text_searching_opponent= new _obj(o.text_searching_opponent_p)

	o.text_searching_opponent_tw = {
		o: o.text_searching_opponent, //object
		//t: 500t.searching_opponent, //time
		//t: t.searching_opponent,
		t: t.animate_timer*8,
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Linear.None, //Easing
		//r: 85, //rotation
		//sx :2, //scalerx
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		y: true, //yoyo,
		//dyo: t.searching_opponent, //delay yoyo

		//normalement va de pair avec le timer de recherche d'un enemi
		i: o.searching_opponent.number-1,
	}
	_a(o.text_searching_opponent_tw)

	o.pre_sensor = new _obj(o.pre_sensor_p)

	interface.player_p = {
		g: game,
		x: w2 * 1.5,
		y: h*.064,
		//message: "dev - l4",
		message: localStorage.getItem("username"),
		taille: 100,
		police: 'police_red',
		v:true,
	}

	//rond qui explose lors du passage à un nouveau roll
	interface.player_explode_circle_under_roll={
		image: "circle_pink",
		x: w2 * 1.1,
		y: h*.105,
		a: 1,
		flag: true,
		g: game,
	}

	// papier en desous des points du joueur
	interface.player_roll_p = {
		image: "roll",
		x: w2 * 1.1,
		y: h*.105,
		a: 1,
		flag: true,
		g: game,
		v:true,
		frame:0,
	}

	interface.player_points_p = {
		g: game,
		x: w2 * 1.1,
		y: h*.085,
		message: localStorage.getItem("score_1") != null ? localStorage.getItem("score_1") :  "50",
		taille: 40,
		police: 'police_red',
		v:true,
	}

	interface.progress_p0 = {
		g: game,
		x:w2*.5,
		y: h*.105,
		color : '0xffe063',
		alpha : .4,
		width : 300,
		heigth :30,
		round : 10,
		initial_value:10,
	}
	interface.progress_p1 = {
		g: game,
		x:w2*1.5,
		y: h*.105,
		color : '0xfe3e63',
		alpha : .4,
		width : 300,
		heigth :30,
		round : 10,
		initial_value : f.open("progress_1") != null ? parseInt(f.open("progress_1")) : 0,
	}

	let random_name = random(0,name_opponent.length-1)
	interface.enemy_p = {
		g: game,
		x: w2 * .5,
		y: h*.064,
		message: name_opponent[random_name],
		taille: 100,
		police: 'police_yellow',
		v:true,
	}
	//rond qui explose lors du passage à un nouveau roll
	interface.enemy_explode_circle_under_roll={
		image: "circle_yellow",
		x: w2 * 145,
		y: h*.105,
		a: 1,
		flag: true,
		g: game,
	}

	// papier en desous des points du joueur
	interface.enemy_roll_p = {
		image: "roll",
		x: w2 * .145,
		y: h*.105,
		a: 1,
		flag: true,
		g: game,
		v:false,
	}
	interface.enemy_progress_p = {
		image: "progress",
		x: w2 * .5,
		y: h*.105,
		a: 1,
		flag: true,
		g: game,
		v:false,
	}

	interface.enemy_points_p = {
		g: game,
		x: w2 * .145,
		y: h*.085,
		message: "",
		taille: 40,
		police: 'police_yellow',
		v:true,
	}

	//message ready pour commencer le jeu
	interface.decount_p = {
		g: game,
		x: w2,
		y: -200,
		message: "ready",
		taille: 250,
		police: 'police',
		v: true,
	}
	//rond qui explose lors du passage à un nouveau level/rank
	interface.player_explode_circle_under_puissance={
		image: "circle_pink",
		x: w2*.85+ w2,
		y: h*.10,
		a: 1,
		flag: true,
		g: game,
	}
	//rond qui explose lors du passage à un nouveau level/rank
	interface.enemy_explode_circle_under_puissance={
		image: "circle_yellow",
		x: w2*.85,
		y: h*.10,
		a: 1,
		flag: true,
		g: game,
	}

	interface.puissance_p0 = {
		g: game,
		image:"level0",
		x: w2*.85,
		y: h*.10,
		v:false,
	}

	interface.puissance_p1 = {
		g: game,
		image:"level1",
		x: w2*.85+ w2,
		y: h*.10,
		v:true,
	}

	interface = {
		0: new _t(interface.enemy_p),
		1: new _t(interface.player_p),
		explode_circle_under_roll:{
			0:new _obj(interface.enemy_explode_circle_under_roll),
			1:new _obj(interface.player_explode_circle_under_roll),
		},
		roll:{
			0:new _obj(interface.enemy_roll_p),
			1:new _obj(interface.player_roll_p),
		},
		points:{
			0:new _t(interface.enemy_points_p),
			1:new _t(interface.player_points_p),

		},
		explode_circle_under_puissance:{
			0:new _obj(interface.enemy_explode_circle_under_puissance),
			1:new _obj(interface.player_explode_circle_under_puissance),
		},
		puissance:{
			0:new _obj(interface.puissance_p0),
			1:new _obj(interface.puissance_p1),
		},
		decount : new _t(interface.decount_p),
		progress:{
			0:new _graph(interface.progress_p0),
			1:new _graph(interface.progress_p1),
		},
	}
	// on met le scaley à 0 pour avoir un effet de repli lors de l'apparition de l'enemy
	interface[0].scale.y = 0
	interface.roll[0].scale.y = 0
	interface.points[0].scale.y = 0
	interface.progress[0].main.scale.y = 0
	interface.progress[0].bg.scale.y = 0
	interface.puissance[0].scale.y = 0
	interface.explode_circle_under_puissance[0].scale.y = 0

	//si local storage est nul on définit la valeur par défaut sinon on renseigne celle stockée pour la progression
	//attention on doit spécifier parseInt sinon la valeur retournée est une string

	progress[1] = f.open("progress_1") != null ? parseInt(f.open("progress_1")) : 0
	interface.puissance[1].frame = f.open("puissance_1") != null ? parseInt(f.open("puissance_1")) : 0
	interface.roll[1].frame = f.open("roll_1") != null ? parseInt(f.open("roll_1")) : 0

	//on écrit le score du player, l'enemy on s'en fout
	f.write_data_player=()=>{
		f.write("progress_1", progress[1])
		f.write("puissance_1",interface.puissance[1].frame)
		f.write("roll_1",interface.roll[1].frame)
	}
	//ensuite on l'écrit
	f.write_data_player()

	//définition des scores respectifs
	//TODO : mettre le score pour le joeur

	o.score={
		0:localStorage.getItem("score_0") != null ? localStorage.getItem("score_0") :  "50",
		1:localStorage.getItem("score_1") != null ? localStorage.getItem("score_1") :  "50",

	}

	//attribution de l'enemy en fonction du niveau du joueur 
	f.attribute_enemy_fn_player=(category,num)=>{
		co(interface.points[1].text)
		if(parseInt(interface.points[1].text) > category ){
			interface.points[0].text = num
			o.score[0]=interface.points[0].text = num
		}
	}
	for (var i = 0; i < 5; i++){
		f.attribute_enemy_fn_player(cat[i],numero[i]);
	}

	//on définit la puissance de l'enemy en fonctions des points
	if (interface.points[0].text > 0 && interface.points[0].text < 1000) {
		interface.puissance[0].frame=0
	}	

	if (interface.points[0].text >= 1000 && interface.points[0].text < 50000) {
		interface.puissance[0].frame=1
	}	
	if (interface.points[0].text >= 50000 && interface.points[0].text < 100000) {
		interface.puissance[0].frame=2
	}	
	if (interface.points[0].text >= 100000 && interface.points[0].text < 500000) {
		interface.puissance[0].frame=3
	}	
	if (interface.points[0].text >= 50000 && interface.points[0].text < 900000) {
		interface.puissance[0].frame=4
	}	

	if(interface.puissance[0].frame == 0){
		ex = 500 
	}
	if(interface.puissance[0].frame == 1){
		ex = 300 
	}
	if(interface.puissance[0].frame == 2){
		ex = 200 
	}
	if(interface.puissance[0].frame == 3){
		ex = 300 
	}
	if(interface.puissance[0].frame == 4){
		ex = 0 
	}

	difficulty = random(0,ex)
	let ecart = o.sensor.y - o.pre_sensor.y-difficulty
	//let ecart = o.sensor.y - o.pre_sensor.y
	//let ecart = o.sensor.y - o.pre_sensor.y+40
	let minima = random(70, 180)
	o.opponent_actions = []

	//obstacles aléatoires avec ecart =distance à partir de laquelle on peut presser et maxima => distance pour la dernière touche
	f.random_division = (maxima, minimus) => {
		let [n, total, m = n] = [maxima, 0];
		const [min, arr, range = min + min / (Math.random(0, 1) * 3)] = [minimus, []];

		do {
			let r = Math.random() * (range - min) + min; // random number in our range
			n -= r; // subtract `min` from `n`
			o.opponent_actions.push(Math.round(n > min ? r : m - total)); // push `r` or remainder 
			total += o.opponent_actions[o.opponent_actions.length - 1]; // keep track of total
		} while (n > min);
	}
	f.random_division(ecart, minima)

	o.sensor_opponent_p = []
	o.sensor_opponent = []
	let summed_actions = 0

	for (let i = 0; i < o.opponent_actions.length; i++) {
		summed_actions += o.opponent_actions[i]

		o.sensor_opponent_p[i] = {
			image: "line_collision",
			x: w2,
			y: o.pre_sensor.y + summed_actions,
			a: 1,
			flag: false,
			g: game,
			physics: true,
			immovable: true,
			anchory : 1,
			anchorx : .5,
		}
		o.sensor_opponent[i] = new _obj(o.sensor_opponent_p[i])
	}

	o.cloud = []
	o.cloud_p = {
		image: "cloud",
		x: w2 * .5,
		y: 165,
		flag: true,
		sx: 1,
		sy: 1,
		g: game,
	}
	o.cloud_length = 19
	for (let i = 0; i < o.cloud_length; i++) {
		o.cloud[i] = new _obj(o.cloud_p)
		o.cloud[i].alpha = .8
		o.cloud[i].visible = false
		o.cloud[i].de(w2 * .5 + random(-200, 500), 165 + random(-90, 90))
		o.cloud[i].sc(random(5, 10) / 10, o.cloud[i].scale.x)

	}
	o.cloud_tw = []
	for (let i = 0; i < o.cloud_length; i++) {
		o.cloud_tw[i] = {
			o: o.cloud[i], //object
			t: t.cloud, //time
			d: 500, //delay
			a: 0, //alpha
			e: Phaser.Easing.Linear.None, //Easing
			r: 35, //rotation
			sx: 0,
			sy: 0,
			c: true,
			ctime: 1000,
			//ccdx: o.cloud[i].x + random(-300, 300), //displacementx
			//dy: o.cloud[i].y + random(-50, 50), //displacementy 
			//y: true, //yoyo,
			//dyo: 30, //delay yoyo
			//i: 0,
		}
	}

	o.particle_p = {
		image: "particle",
		x: w2,
		y: h*2,
		flag: true,
		g: game,
	}

	o.particle = [];
	for (var i = 0; i < 7; i++){
		o.particle[i]=new _obj(o.particle_p);
	}


	localStorage.getItem("name")

	o.transition_background_start={
		o:o.background_start,
		t:500,
		d:500,
		dy:-4000,
	}
	o.transition_background_start_right={
		o:o.background_start_right,
		t:1500,
		d:500,
		dx:2*w,
	}
	o.transition_background_start_left={
		o:o.background_start_left,
		t:1500,
		d:500,
		dx:-w,
	}

	tp.debug={
		g: game,
		x: w2,
		y: 50,
		message: "ready",
		taille: 40,
		police: 'police',
		v: false,

	}

	t.debug = new _t(tp.debug)

	//in op config
	op.flash_blanc={
		0:{
			image: "flash_blanc_0",
			x: w2,
			y: h2,
			a: 0,
			flag: true,
			g: game,
		},
		1:{
			image: "flash_blanc_1",
			x: w2,
			y: h2,
			a: 0,
			flag: true,
			g: game,
		},
	}

	o.flash_blanc =[]
	o.flash_blanc[0]= new _obj(op.flash_blanc[0])
	o.flash_blanc[1]= new _obj(op.flash_blanc[1])

	//in ap config
	ap.flash_blanc={
		0:{
			o: o.flash_blanc[0],
			//e: Phaser.Easing.Bounce.In,
			i: 0, //number repeat
			y: true, //yoyo
			a: 1, // alpha
			t: 250, //time
			d:0, // delay
			//r: 45, //rotation
			//dx:100, //distance
			//dy:200,
			//sx:1, //scale
			//sy:1,
		},
		1:{
			o: o.flash_blanc[1],
			//e: Phaser.Easing.Bounce.In,
			i: 0, //number repeat
			y: true, //yoyo
			a: 1, // alpha
			t: 250, //time
			d:0, // delay
			//r: 45, //rotation
			//dx:100, //distance
			//dy:200,
			//sx:1, //scale
			//sy:1,
		},
	}

	var restart =()=>{game.state.start("game_main");interface.restart.visible=false}

	interface.restart_p = {
		g: game,
		image:"restart",
		x: w2*1.5,
		y: h2+400,
		v:false,
		callback : restart,
	}

	interface.restart = new _b(interface.restart_p)
	game.add.tween(interface.restart.scale).to({x:1.2,y:1.2},800,Phaser.Easing.Linear.None,true,0,-1,true);
}
