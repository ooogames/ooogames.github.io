f.check_if_username_is_not_in_database_enemy=(st)=>{
	for (var i = 0; i < name_opponent.length; i++){
		return (st === name_opponent[i])
	}
}

//récupérer un valeur dans le localStorage
//doit être associé à une variable;
f.open=(value)=>{
	let temp=localStorage.getItem(value)
	return temp
	//var temp;
	//var variable;
	//f.write("essai",variable)
	//temp=f.open("essai")
}

//écrire dans le localStorage
//value est une chaine de caractères => "string"
f.write=(value,variable)=>{
	// localStorage.setItem("value",variable)
	localStorage.setItem(value,variable)
}
//entrer le nom du player
f.prompt = ()=> {
	//attention car cela boucle tant que name_player n'est pas enregistré dans le localStorage
	//pour tester que c'est bien une chaine de caractères
	name_player = f.open("username")
	if (typeof test != "string") {
		//enter name si pas de valeur on boucle
		while (name_player === null){
			name_player = prompt("please enter your name");
		}
		//si la valeur n'est pas supérieur à 8 on boucle
		while (name_player.length > 8 ) {
			name_player = prompt("name must be 4 character maximum");
		}

		while (f.check_if_username_is_not_in_database_enemy(name_player) == true ) {
			name_player = prompt("name already exist");
		}

		f.write("username",name_player)
	}

}

//loop an function avec un timer spécifique
f.loop=(timer,callback)=>{
	game.time.events.loop( timer,callback );
}


//démmarer la chute des joueurs
f.wait_start_game = (obj, time) => {
	wait(() => { obj.body.moves = true }, time)
}

//divisions
f.random_division = () => {
	let [n, total, m = n] = [200, 0];
	const [min, arr, range = min + min / (Math.random(0, 1) * 3)] = [30, []];

	do {
		let r = Math.random() * (range - min) + min; // random number in our range
		n -= r; // subtract `min` from `n`
		o.opponent_actions.push(Math.round(n > min ? r : m - total)); // push `r` or remainder 
		total += o.opponent_actions[o.opponent_actions.length - 1]; // keep track of total
	} while (n > min);

	co(o.opponent_actions);
}

//teste la rencontre entre 2 objets
f.checkOverlap = (obj, obj2) => {
	var boundsA = obj.getBounds();
	var boundsB = obj2.getBounds();
	return Phaser.Rectangle.intersects(boundsA, boundsB);
}

//check
f.check = () => {
	f.check_deep(o.paper[0])
	f.check_deep(o.paper[1])
}

//check pour voir si on peut clicker
f.check_pre_sensor = () => {
	f.check_deep_pre_sensor(o.paper[0])
	f.check_deep_pre_sensor(o.paper[1])
}

//verrouiller une fonction pour éviter qu'elle ne se lance plus de deux fois
f.lock = (obj, callback) => {
	if (obj.flag == false) {
		obj.flag = true;
		callback();
	}
}

//check pour voir si le joueur dépasse la limite du gameover
f.check_deep = (obj) => {
	if (f.checkOverlap(obj, o.sensor)) {

		if(obj.name == 0){
			f.lock(obj,()=>{_tr(o.looser_tw[0])})
			f.lock(o.looser[0].text,()=>{_tr(o.looser_tw_text[0])})
			o.paper[0].gameover=true
		}else{
			f.show_button_restart()
			f.lock(obj,()=>{_tr(o.looser_tw[1])})
			f.lock(o.looser[1].text,()=>{_tr(o.looser_tw_text[1])})
		}
	}
}

//test pour voir si on peut commencer à clicker en fonction de la position de o.pre_sensor
f.check_deep_pre_sensor = (obj) => {
	if (f.checkOverlap(obj, o.pre_sensor)) {
		if (obj.flag_pre_sensor == false) {
			obj.flag_pre_sensor = true
		}
	}
}

//collision
f.collide = (obj, obj2, callback) => {
	game.physics.arcade.collide(obj, obj2, callback, null, this);
}
//converti les points dans un format 100
f.convert_points_to_100=(position)=>{
	let max =h*0.58 //100
	let value;
	//ne sait pas pourquoi il faut rajouter 4 pour avoir 100 ????
	value=((position*100)/max)+4
	return value
}

//texte qui suit le papier
f.follow_text = (obj) => {
	o.paper[0].points.y = o.paper[0].fil.y-55
	//o.paper[0].points.x = o.paper[0].fil.x
	o.paper[0].points.text = Math.round(f.convert_points_to_100(o.paper[0].points.y))
	o.paper[1].points.y = o.paper[1].fil.y-55
	//o.paper[1].points.x = o.paper[1].fil.x
	o.paper[1].points.text = Math.round(f.convert_points_to_100(o.paper[1].points.y))
}

//animation du flash lorsque le joueur clic
f.click=()=>{
	clic.play()
}

// stop le papier 
f.stop_opponent = (obj) => {
	if (f.checkOverlap(obj, o.paper[0])) {
		if (obj.flag == false) {
			obj.flag = true

			//f.lock(o.flash[0], ()=> {f.show_flash(o.flash_tw_p0)})
			o.paper[0].body.moves = false
			wait(() => { o.paper[0].body.moves = true }, random(200, 500))
		}
	}
}

//stop le papier => dernier coup 
f.stop_opponent_on_the_last = (obj) => {
	if (f.checkOverlap(obj, o.paper[0])) {
		if (obj.flag == false && o.paper[0].gameover == false) {
			//wait(()=>{d.could_anim_score[0]=true},t.delay_to_anim_score)
			// fait apparaître flash lumineux blanc 
			co("flash")
			_a(ap.flash_blanc[0])	
			co("stop_opponent_on_the_last :");
			f.show_points(o.paper[0])
			obj.flag = true
			scroll.play()	
			o.paper[0].body.moves = false
			o.paper[0].flag_dont_move = true
		}
	}
}

//actions à réaliser lorsque longue pression
f.actions_on_long_press=(obj)=>{
	// fait apparaître flash lumineux blanc 
	co(obj,"actions_on_long_press")
	//son du click validant l'arrêt 
	//joue le son de grossissement du pointer
	grow.play()
	_a(ap.flash_blanc[1])	
	co("actions_on_long_press");
	//montre le score pour le player, l'enemi a une autre logique voir last
	f.show_points(obj)
	//enregistre le score
	obj.flag_test_duration = true // to lock the function
	obj.flag_dont_move = true
	// joue le son de chute
	wait(()=>{scroll.play()},250)
}

//grossit le pointer
f.pointer_big=(obj,speed)=>{
	if (obj.scale.x < 3) {
		obj.scale.setTo(obj.scale.x + speed)

	}
	if(obj.scale.x > 2.9){
		obj.visible=false
		//ici lancer la fonction avec f.lock 
		f.lock(o.paper[1].fil,()=>{f.actions_on_long_press(o.paper[1])})

	}
}

//reduit le pointer
f.pointer_little=(obj,speed)=>{
	if(obj.scale.x > .2 ){
		obj.scale.setTo(obj.scale.x-speed)
	}
}


//lorsqu'on clic 
//stop tw du curseur
//lance augmente la taille du curseur après un certain délai (pointer.duration)
f.get_duration = (condition,pointer,flag,anim) => {
	if (condition){
		// pour agrandir
		flag.scale=true
		//pour stopper la tween
		anim.pause()
	}
}
//anim le pointer en l'augmentant ou en le retrecissant et relance l'animation de pulsion 
f.anim_pointer=(obj,anim)=>{
	if(obj.scale.x < .1){
		// on la bloque pour la debloquer il faut remettre obj sur false
		f.lock(obj,()=>{anim.resume()})
	}
	// automatic avec update grossit ou agrandit suivant le flag
	if(d.scale == true){
		//grossit
		f.pointer_big(obj,.2)
		// pour debloquer la tween
		obj.flag=false
	}else{
		//retrecit
		f.pointer_little(obj,2)
	}

	//lorsqu'on relache le clic, rétrecit 
	game.input.onUp.add(function() {
		//drapeau qui rétrecit via update
		d.scale=false
	});

	// ne sert plus à rien
	game.input.onDown.add(function() {
		//rien à faire ici
	});
}

//montre le button restart
//doit apparaître après t.show_heart puisque qu'après anim_heart_on_winner
// flag car elle peut se lancer plusieurs fois
f.show_button_restart=()=>{
	if(d.show_button_restart == false){
		d.show_button_restart = true	
		wait(()=>{clic.play();interface.restart.visible=true}, t.show_heart+1000)

		//f.write("score_0", interface.points[0].text)
		//f.write("score_1", interface.points[1].text)
	}
}

//test la distance numA=joueur numB=autre
f.test_distance=(numA,numB)=>{
	co("test_distance")
	if(o.paper[numA].y > o.paper[numB].y){
		// pour que le button restart apparaisse après check_distance => ev.tc[4]
		f.show_looser(o.looser_tw[numB])
		f.show_looser(o.looser_tw_text[numB])
		wait(()=>{f.anim_heart_on_winner(numA)},t.show_heart)
	}else{
		f.show_looser(o.looser_tw[numA])
		f.show_looser(o.looser_tw_text[numA])
		wait(()=>{f.anim_heart_on_winner(numB)},t.show_heart)
	}
}

/* lorsque button pressé 
// calcul de distances et annonces du perdant et gagnant
3 cas de figures :
-1. un joueur valide mais on ne sait pas encore l'etat de l'autre joueur
-2. un joueur valide et l'autre a perdu donc le premier est gagnant
-3. un joueur valide et l'autre aussi donc test de distance
-4. un joueur valide et l'autre aussi mais égalité
*/

f.test_behaviour = (obj) => {
	if(obj.name == 0){
		if(o.paper[1].flag == false && o.paper[1].flag_dont_move == false){
			co("on attend le comportement de paper1","o.paper[1].flag:",o.paper[1].flag,"o.paper[1].flag:",o.paper[1].flag)
			//on vérifie après un laps de temps pour désigner le gagnant
			wait(()=>{if(o.paper[1].flag){f.anim_heart_on_winner(0)}},t.wait_end_game)
		}
		if(o.paper[1].flag){
			co("paper1 a perdu donc paper0 est gagnant")
			wait(()=>{f.anim_heart_on_winner(0)},t.show_looser+300)
		}
		if(o.paper[1].flag_dont_move){
			f.test_distance(0,1);
		}
	}

	if(obj.name == 1){
		if(o.paper[0].flag == false && o.paper[0].flag_dont_move == false){
			co("on attend le comportement de paper0","o.paper[0].flag:",o.paper[0].flag,"o.paper[0].flag:",o.paper[0].flag)
			//on vérifier après un laps de temps pour désigner le gagnant
			wait(()=>{if(o.paper[0].flag){f.anim_heart_on_winner(1)}},t.wait_end_game)
		}
		if(o.paper[0].flag){
			co("paper0 a perdu donc paper1 est gagnant")
			wait(()=>{f.anim_heart_on_winner(1)},t.show_looser+300)
		}
		if(o.paper[0].flag_dont_move && o.paper[0].body.moves == false){
			f.test_distance(1,0);
		}
	}
}
//animation des points => counter
// vérifie si le score est inférieur à la valeur stockée dans create.js
f.anim_score=(num)=>{

	//converti le score en string
	let condition = parseInt(o.score[num])+100
	if(interface.points[num].text <= condition){
		interface.points[num].text = parseInt(interface.points[num].text) + 3
	}
}

//animation de la barre pour la progression des points
f.animate_progress_points=()=>{
	o.decimal = o.decimal + 0.01

	let progress_length = 300*o.decimal
	if(progress_length < 300){
		o.progress.drawRoundedRect(0,0,progress_length,27,10);
	}
}


//animation des coeurs pour montrer que l'on gagne des points
f.anim_heart_on_winner = (side)=>{

	let time = 100
	let delay = 0
	let anim = Phaser.Easing.Linear.None
	let anim2 =  Phaser.Easing.Bounce.Out

	this.game.load.bitmapFont('name', 'fonts/name.png', 'fonts/name.fnt');

	//in tp config
	tp.score={
		g: game,
		x: w2 * 1.1,
		y: h*.075,
		message: "ready",
		taille: 80,
		police: 'police_red',
		v:true,
	}

	//t.score = new _t(tp.score)
	//t.score.alpha =.7

	progress_enemy = progress_enemy +100
	progress_player = progress_player +100
	co(typeof(progress_enemy))
	f.write("progress_0", progress_enemy)
	f.write("progress_1", progress_player)
	co(typeof(progress_enemy))

















	//TODO : animer la progression des points 

	let decimal = 0
	let anim_winner = (num)=>{

		for (var i = 0; i < o.particle.length; i++){
			o.particle[i].x=o.paper[num].points.x;
			o.particle[i].y=o.paper[num].points.y;
			o.particle[i].scale.x = (random(5,10)*.1)
			o.particle[i].scale.y = o.particle[i].scale.x 
			game.add.tween(o.particle[i]).to({x:o.paper[num].points.x + random(-500,500),y:o.paper[num].points.y + random(-500,500)},time*3,anim,true,delay);
			game.add.tween(o.particle[i]).to({alpha:0},time*4,anim,true,delay);
		}
		score.play()
		game.add.tween(interface.roll[num].scale).to({x:1.5,y:1.5},time,anim,true,delay,5,true);
		game.add.tween(interface.points[num].scale).to({x:1.5,y:1.5},time,anim,true,delay,5,true);

	}
	if(flag.heart==false){ //pour éviter de lancer 2 x cette animation
		flag.heart =true	
		f.show_button_restart()
		if (side == 0){
			co("anim winner 0")
			anim_winner(0)
			wait( ()=> {d[0]=true},time)
			wait( ()=> {d[0]=false},time*9)

		}
		if (side == 1){
			co("anim winner 1")
			anim_winner(1)
			wait( ()=> {d[1]=true},time)
			wait( ()=> {d[1]=false},time*9)

		}
		wait(()=>{f.write("score_0", interface.points[0].text)},time*6)
		wait(()=>{f.write("score_1", interface.points[1].text)},time*6)
	}



}
// faire appaitre le fil pour annoncer le score
f.show_points = (obj) => {
	obj.fil.body.moves = true
}

// déplace 
f.move_body = function () {
	if (o.paper[1].flag_dont_move == false) {
		o.paper[1].body.moves = true
	}
}
//stop le player pas de collide mais overlap
f.stop_body = function () {
	if (o.paper[1].flag == false) {
		o.paper[1].body.moves = false
		co("stop")

		//son lorsqu'on clic
		f.click()
	}
}

//objet qui suit le pointer
f.follow_pointer = (obj) => {
	obj.y = game.input.activePointer.y;
}

//regit les interactions souris
f.input = () => {
	game.input.onDown.add(f.stop_body, this);
	game.input.onUp.add(f.move_body, this);
	//game.input.onUp.add(f.get_duration, this);
}

//pour debugger un body
f.debug = (obj) => {
	game.debug.body(obj)
}

//animation flash lorsqu'on clic
f.show_flash = (p) => {
	// son du clic
	clic.play()
	// animation 
	//TODO : 
	//retirer
	//tw.flash = _tr(p)
}

//faire trembler la camera
f.shake=()=>{
	game.camera.shake(0.008, 100)
}

//montrer le perdant
f.show_looser = (p) => {
	wait(()=>{ _tr(p)},t.show_looser)
}

//ombre qui suit le joueur
f.shadow_follow = (obj,sha)=>{
	sha.x = obj.x+20
	sha.y = obj.y+20
}

//cacher un objet
f.hide_obj=(obj)=>{
	co(obj)
	obj.visible=false
}

//animation de papiers pour le vainqueur
//peut être supprimé
f.anim_paper_winner = (pos)=>{
	for (var i = 0; i < 7; i++){
		let time = 400
		let delay = 150
		let anim = Phaser.Easing.Linear.None
		let rr = random (0,180)
		game.add.tween(o.paper_winner[i]).to({x:pos,y:interface.roll_0.y},time,anim,true,i*delay);
		game.add.tween(o.paper_winner[i].scale).to({x:.2,y:.2},time,anim,true,i*delay);
		game.add.tween(o.paper_winner[i]).to({angle:rr},time,anim,true,i*delay);
		wait(()=>{f.hide_obj(o.paper_winner[i])},6000)
		wait(f.shake,time+i*delay)
	}
	for (var i = 0; i < 7; i++){
		//o.paper_winner[i].visible=false
	}
}

//decide lorsque le score du joueur touche le papier
f.decision = (obj1,obj2)=>{
	if(obj1.flag_dont_move && obj1.flag_press_engaged == false){
		co("decision")
		obj1.flag_press_engaged = true
		f.test_behaviour(obj1)
		co("touch")
	}
}

//regle de trois c étant le nombre à rechercher
// a=b
// c=d
f.proportions = (p)=>{
	//p.a = p.b
	//p.c = p.d
	p.c= (p.a*p.d)/p.b
	return p.c

}

f.arrondir_2_decimales=(num,division)=>{
	let n = Math.round((num/division)*100)/100
	return n
}

//affiche les infos de positions lorsqu'on déplace un objet
// seulement si drapeau debug est en true
f.debug_pos=(obj)=>{
	//if (d.debug) {
	t.debug.visible =true
	let transformx = f.arrondir_2_decimales(obj.x,w)
	let transformy = f.arrondir_2_decimales(obj.y,h)
	t.debug.text="w*" + transformx + "  " + "h*" + transformy
	//}
}
f.mask_scale=(obj,mask)=>{
	if ( obj.y > distance_100 ) {
		mask.visible=true
		mask.scale.y=1-obj.y*dist*50
		// pour éviter un scale négatif
		if (mask.scale.y < 0){
			mask.visible =false
		}
	}
}

//adapter le sprite à l'écran
f.adapt_to_screen=(obj)=>{
	obj.scale.y=game.heigth/2280
}
// transition simple seulement un déplacement ou une modification à la fois => pas des déplacements combinés voir en bas
// from(properties, duration, ease, autoStart, delay, repeat, yoyo)
f.simple_tween = (p) => {
	p.name = game.add.tween(p.o).to({x: p.dx, y: p.dy}, p.t, p.e,true,p.d,p.i,p.y)
	p.name = game.add.tween(p.o.scale).to({x: p.sx, y: p.sy}, p.t, p.e,true,p.d,p.i,p.y)
	p.name.onComplete.add(()=>{p.callback()}, this)
	//p.name.start()
}

// transition complexe avec plusieurs deplacements possibles
//attention seulement une modification par ex : déplacement mais pas scale en même temps
// from(properties, duration, ease, autoStart, delay, repeat, yoyo)
//
f.complex_tween = (p) => {
	p.name = game.add.tween(p.o)
	p.name.to({x: p.sx, y: p.sy}, p.t, p.e,false,p.d,p.i,p.y)
	p.name.onComplete.add(()=>{p.callback()}, this)
	p.name.start()
}


