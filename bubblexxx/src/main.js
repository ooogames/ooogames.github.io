/* jshint expr: true */
/* jshint esnext: true */
// sj inception VV
/* *************************************************************************
 * 2092 lines
 * bubx
 * 0o0o0ogames@gmail.com
 * __________________
 * 
 *  [2016] - [2017] Gregory Dailly  
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Gregory Dailly and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Gregory Dailly
 * and its suppliers and may be covered by Europe law and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Gregory Dailly - 0o0o0ogames@gmail.com - 0032486/925736 
 * rue de Brionsart 36a-5340 Gesves-Belgium
 */
//
//TODO
//regler particle canon en fonction de l'inclinaison
var videoreward;
var level_name=[
	"1. for beginners :)",
	"2. beginners out !",
	"3. ha ha ha",
"4. think!",
	"5. grass mode",
	"6. spider",
	"7. on...off",
	"8 red fire",
	"9 take the time",
	"10 surprise !!!",
	"11. your heart ? ",
	"12. difficult is not it?",
	"13. a step above !",
	"14. two big eyes in the dark",
"15. olé!",
"16. old printer",
"17. stop imitating me",
"18. car crusher",
"19. accordion",
"20. boxing",
"21. comet",
"22. don't touch circles",
"23. mama mia !",
"24. oh my god !"
];

var music;
var is_rewarded_video_completed=false;
var is_preload_rewarded_video=false;
var text_passed_level;
var game_begin=false;
var delay_for_show_describe_text;
var delay_for_hide_describe_text;
var time_to_show_describe_text;
var additional_time;
var delay_for_game_begin;
var time_hide;
var initialise_time_and_delay=function(){
	additional_time=800;
	delay_for_hide_describe_text=400;
	time_to_show_describe_text = 200;
	time_hide=500;
	if(level_number===0){
		delay_for_show_describe_text=3000;
		additional_time=1000;
	}else{
		delay_for_show_describe_text=400;
		additional_time=800;
	}

	delay_for_game_begin=delay_for_show_describe_text+ time_to_show_describe_text+ time_to_show_describe_text+additional_time;
};
initialise_time_and_delay();
var count_hero;
var level_number_adapt;
var text_to_describe_level;
var text_to_number_level;

var animate_touch;
var tw_name;
var flag_tween_en_cours=true;
var delay_circle_timer = 2400;

var gui;
var PLAYER_DATA;
var level_json={};
var canon=[];
var pulsar=[];
var asteroid=[];
var dalle_moving=[];
var dalle=[];
var hero;
var flag_level_complete=false;
var flag_hide=true;
//ADS
var banner;
var interstitial;
var demoPosition;
var first_launch;
var adService;
var detectmob=function(){ 
	if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)
	){
		console.log("mobile");
		is_mobile=true;
	} else {
		console.log('not mobile');
		is_mobile=false;
	}
};
detectmob();
var storage_level;

//pour peupler PLAYER_DATA car il est peuplé via LevelSel et il y a des incohérences par après
var initiate_player_data=function () {
	co("first_launch")
	PLAYER_DATA=[];
	for (var i = 0; i < NUMBER_OF_LEVELS-1; i++){
		PLAYER_DATA[i]=-1;
	}
	PLAYER_DATA[0]=0;	
	co(PLAYER_DATA)
};

//initiate_player_data array one time at the first_launch
var check_first_launch = function(){
	if (localStorage.getItem("hasCodeRunBefore") === null ) {
		//code here 
		initiate_player_data();
		localStorage.setItem("hasCodeRunBefore",true)
	} else {

	}
}
check_first_launch();

// find the current_level on loop the last PLAYER_DATA[-1]
var find_the_current_level=function(){
	var niveau_actuel;
	// search the first level blocked in PLAYER_DATA => niveau_actuel
	// must be launch only if initiate_player_data has been launch
	niveau_actuel=PLAYER_DATA.indexOf(-1)
	//parce que lorsqu'on relance trop vite le premier level => user qui quitte et relance il donne le premier level
	//égal à -1 ce qui conduit à une erreur car le niveau_actuel =-2 
	if (niveau_actuel === -1) {
		level_number=0
	}	else{
		level_number=niveau_actuel-1
	}
}
// store level
var memoryze_progress_in_level= function(){
	// array might be undefined at first time start up
	if (!PLAYER_DATA) {
		// retrieve from local storage (to view in Chrome, Ctrl+Shift+J -> Resources -> Local Storage)
		storage_level = window.localStorage.getItem('mygame_progress');
		co(storage_level)
		// error checking, localstorage might not exist yet at first time start up
		try {
			PLAYER_DATA = JSON.parse(storage_level);
			//TODO : 

		} catch(e){
			PLAYER_DATA = []; //error in the above string(in this case,yes)!
		}
		// error checking just to be sure, if localstorage contains something else then a JSON array (hackers?)
		if (Object.prototype.toString.call( PLAYER_DATA ) !== '[object Array]' ) {
			PLAYER_DATA = [];
		}
	}
			find_the_current_level();
}

var email=JSON.stringify(sto[level_number],null, "\t")
//co(email,"email")
//class for text intitulé dans chaque level
_text=function(message,posx,posy,taille){
	this.text=game.add.bitmapText(posx,posy,'police',message,taille);
	this.text.anchor.setTo(0.5,0.5);
	game.add.existing(this.text);
};

_text.prototype=Object.create(_text.prototype);

_text.prototype.show = function() {
	this.text.scale.setTo(0,0);
	this.tween1 = game.add.tween(this.text.scale).to({x:1,y:1},time_to_show_describe_text,Phaser.Easing.Linear.None,true,delay_for_show_describe_text);
	this.tween1 = game.add.tween(this.text).to({alpha:1},time_to_show_describe_text,Phaser.Easing.Linear.None,true,delay_for_show_describe_text);
	this.tween1.onComplete.add(this.hide,this);
	this.tween1.onStart.add(function(){this.text.visible=true;},this);
};
_text.prototype.show2 = function() {
	this.text.visible=true;
	this.text.scale.setTo(1,0);
	this.tween1 = game.add.tween(this.text.scale).to({x:1,y:1},time_to_show_describe_text,Phaser.Easing.Linear.None,true,delay_for_game_begin-400);
	this.tween1 = game.add.tween(this.text).to({alpha:1},time_to_show_describe_text,Phaser.Easing.Linear.None,true,delay_for_game_begin-400);
};

_text.prototype.hide = function() {
	this.tween2 = game.add.tween(this.text.scale).to({x:1,y:0},time_to_show_describe_text,Phaser.Easing.Linear.None,true,delay_for_hide_describe_text);
	this.tween2 = game.add.tween(this.text).to({alpha:0},time_to_show_describe_text,Phaser.Easing.Linear.None,true,delay_for_hide_describe_text);
};
//energique
//music_ambiance=new Audio('sounds/music_ambiance/Electrodoodle.ogg');
//relaxant
//music_ambiance=new Audio('sounds/music_ambiance/Floating Cities.ogg');
//style mario
//music_ambiance=new Audio('sounds/music_ambiance/Video Dungeon Boss.ogg');
//class for mechant

_mechant = function(game,name,number,posx,posy,image_body,image_drag){
	//this = this.sprite_for_drag
	this.visible=true;
	this.name=name;
	this.number=number;
	this.image_body=image_body;
	this.image_drag=image_drag;
	this.posx=posx;
	this.posy=posy;
	this.flag=true;
	Phaser.Sprite.call(this,game,this.posx,this.posy,this.image_drag);
	this.scale.setTo(0,0);
	debug_position ? this.alpha=0.5 : this.alpha=0;
	this.anchor.setTo(0.5,0.5);
	if (debug_position) {
		this.inputEnabled=true	
		this.input.enableDrag(true);
		this.input.enableSnap(40,40,true,true);
		this.events.onDragStop.add(logic_position,this);
		this.events.onDragStart.add(show_grid_on_logic_position,this);
	}
	this.sprite_for_body=game.add.sprite(this.posx,this.posy,this.image_body);
	this.sprite_for_body.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(this.sprite_for_body);
	this.sprite_for_body.immovable=true;
	this.sprite_for_body.scale.setTo(0,0);
	this.sprite_for_body.visible=false;
	this.sprite_for_body.alpha=1;
	//particle pour apparaitre et die
	this.particle = game.add.emitter(this._x,this._y);
	this.particle.makeParticles("particle_character");
	this.particle.minParticleSpeed.setTo(-600,-600);
	this.particle.maxParticleSpeed.setTo(700,700);
	this.particle.setAlpha(0.8,0.5);
	this.particle.minParticleScale = 0.1;
	this.particle.maxParticleScale = 0.5;
	this.particle.minRotation = 0;
	this.particle.maxRotation = 0;
	this.particle.on=false;
	this.show();
	this.flag_wait_before_fire=false;
	game.time.events.add( time_appears_enemies,function(){this.flag_wait_before_fire=true;},this);
};


_mechant.prototype=Object.create(Phaser.Sprite.prototype);

_mechant.prototype.hide=function(){
	this.tween1=game.add.tween(this.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0);
	this.tween2=game.add.tween(this.sprite_for_body.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0);
	this.sprite_for_body.enable=false;
	this.tween1.onComplete.add(function(){this.visible=false;this.inputEnabled=false;},this);
	this.tween2.onComplete.add(function(){this.sprite_for_body.visible=false;},this);
};

_mechant.prototype.show=function(){
	game.time.events.add( delay_for_game_begin,this.particle_show,this );
	game.time.events.add( delay_for_game_begin,function(){this.sprite_for_body.visible=true;},this );
	this.tween1=game.add.tween(this.scale).to({x:1,y:1},time_appears_enemies,Phaser.Easing.Bounce.Out,true,delay_for_game_begin);
	this.tween2=game.add.tween(this.sprite_for_body.scale).to({x:1,y:1},time_appears_enemies,Phaser.Easing.Bounce.Out,true,delay_for_game_begin);
};

_mechant.prototype.kill=function(){
	co("kill");
	this.visible=false;
	this.sprite_for_body.enable=false;
	this.sprite_for_body.visible=false;
	this.particle.on=false;
};
_mechant.prototype.update2=function(){
	if(this.sprite_for_body.visible){
		this.sprite_for_body.x=this.x;
		this.sprite_for_body.y=this.y;
	}
};
_mechant.prototype.particle_show = function(){
	this.particle.x=this.x;
	this.particle.y=this.y;
	this.particle.on=true;
	//this.particle.start(true,650,null,5);
	this.particle.start(true,650,null,9);
	game.time.events.add( 650,function(){this.particle.on=false;},this);
};
//class button for click
_button=function(posx,posy,image,fun_call_back){
	this.image=image;
	this.posx=posx;
	this.posy=posy;
	this.fun_call_back=fun_call_back;
	this.button=game.add.button(this.posx,this.posy,this.image,this.anim_on_click,this,0,1,2);
	this.button.visible=false;
	this.button.anchor.setTo(0.5,0.5);
	this.button.scale.setTo(0,0);
	this.flag=true;
	this.sound_click=game.add.audio('click');
};
_button.prototype.audio_click = function() {
	this.sound_click.play();
};
_button.prototype.show_button=function(){
	this.button.visible=true;
	this.tween_scale_button = game.add.tween(this.button.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,0);
};
_button.prototype.anim_on_click=function(){
	if(this.flag){
		this.flag=false;
		this.audio_click();
		this.tween_anim_on_click = game.add.tween(this.button.scale).to({x:0.8,y:0.8},150,Phaser.Easing.Bounce.Out,true,0);
		this.tween_anim_on_click.onComplete.add(this.fun_call_back,this.button);
	}
};

//class button for click but not the button not dissapear on click
_button_stay=function(posx,posy,image){
	this.image=image;
	this.posx=posx;
	this.posy=posy;
	this.button=game.add.button(this.posx,this.posy,this.image,this.anim_on_click,this);

	this.button.visible=false;
	this.button.anchor.setTo(0.5,0.5);
	this.button.scale.setTo(0,0);
	this.flag=true;
	this.sound_click=game.add.audio('click');
};
_button_stay.prototype.audio_click = function() {
	this.sound_click.play();
};
_button_stay.prototype.show_button=function(){
	this.button.visible=true;
	this.tween_scale_button = game.add.tween(this.button.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,0);
};
_button_stay.prototype.anim_on_click=function(){

	if(this.button.frame==1){

		this.button.frame=0
		//this.flag=false;
		this.audio_click();
		music.pause();
		//music_ambiance_mute();
		return true;
	}else{
		//this.flag=false;
		this.audio_click();
		music.resume();
		//music_ambiance_activate();
		this.button.frame=1
		return true;
	}
};

//var level={}
screen_first = function(){
	Phaser.Sprite.call(this,game,game.world.centerX,800,'title');
	this.testlink=function(){
		var link="https://www.google.com"
		//game.time.events.add(1000,function(){window.location.href = link}) 

		game.time.events.add(4000,function(){cordova.InAppBrowser.open(link, '_blank', 'location=yes')}) 
	};
	is_mobile && this.testlink();

	//music_ambiance.play()
	this.anchor.setTo(0.5,0.5);
	this.button_menu=new _button(game.world.centerX,game.world.centerY+400,'button_menu',this.next_menu);
	this.button_next=new _button(game.world.centerX,game.world.centerY,'button_play',this.next_level);
	this.button_sound=new _button_stay(game.world.centerX,game.world.centerY+800,'button_sound');
	game.time.events.add( 200,this.button_sound.show_button,this.button_sound );

	game.time.events.loop( 500,this.explosion,this );
	game.time.events.add( 200,this.button_menu.show_button,this.button_menu );
	game.time.events.add( 200,this.button_next.show_button,this.button_next );
	this._x=game.rnd.integerInRange(0,w);
	this._y=game.rnd.integerInRange(0,h);
	this.particle = game.add.emitter(this._x,this._y);
	this.particle.makeParticles("particle_character");
	this.particle.minParticleSpeed.setTo(-600,-600);
	this.particle.maxParticleSpeed.setTo(800,800);
	this.particle.setAlpha(0.5,0.2);
	this.particle.minParticleScale = 0.2;
	this.particle.maxParticleScale = 0.5;
	this.particle.minRotation = 0;
	this.particle.maxRotation = 0;
	this.particle.on=false;
	this.particle.start(true,3900,null,8);
};
screen_first.prototype = Object.create(Phaser.Sprite.prototype);
screen_first.prototype.constructor = screen_first;
screen_first.prototype.audio_click = function(){
	this.sound_click.play();
};
screen_first.prototype.next_level = function(){
	if(!PLAYER_DATA[23] || PLAYER_DATA[23] == -1){
		decide_if_ads_time(level_number);
	}else{
		level_number=23
		decide_if_ads_time(level_number);
	}
};

screen_first.prototype.next_menu = function(){
	this.game.state.start("levsel");
};
screen_first.prototype.explosion = function(){
	this.particle.on=true;
	this.particle.x=game.rnd.integerInRange(0,w);
	this.particle.y=game.rnd.integerInRange(0,h);
};

character = function(){
	Phaser.Sprite.call(this,game,game.world.centerX,2270+500,'particle_character');
	this._x=game.rnd.integerInRange(0,w);
	this._y=game.rnd.integerInRange(0,h);
	this.particles_explode = game.add.emitter(this._x,this._y);
	this.particles_explode.makeParticles("particle_character");
	this.particles_explode.minParticleSpeed.setTo(-600,-600);
	this.particles_explode.maxParticleSpeed.setTo(800,800);
	this.particles_explode.setAlpha(0.3,0.1);
	this.particles_explode.minParticleScale = 0.2;
	this.particles_explode.maxParticleScale = 0.5;
	this.particles_explode.minRotation = 0;
	this.particles_explode.maxRotation = 0;
	this.particles_explode.on=false;
	this.particles_explode.start(true,5900,null,8);
	this.particles_explode.flag=true
	game.time.events.loop( 900,this.explosion_particles,this );

	this.background_white=game.add.sprite(w2,h2,'background_white');
	this.background_white.anchor.setTo(0.5,0.5);
	this.background_white.alpha=0;
	this.flag_mouse=true;
	this.flag_show_button=true;
	this.cible_shadow=game.add.sprite(game.world.centerX,300,'cible_shadow');
	this.cible_shadow.anchor.setTo(0.5,0.5);
	this.cible_shadow.scale.setTo(1.5,1.5);
	this.cible_shadow.alpha=0.15;
	this.grid=game.add.sprite(0,0,'grid');
	this.grid.visible=false
	this.cible=game.add.sprite(game.world.centerX,300,'cible');
	this.cible.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(this.cible,Phaser.Physics.ARCADE);
	this.cible.body.immovable=true;
	this.cible.scale.setTo(1.5,1.5);
	this.anchor.setTo(0.5,0.5);
	this.flag_hide_enemies=false;
	this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.flag_spacekey=true;
	this.count=-1;
	this.player={};
	for (var i = 0; i < 3; i++){
		this.player[i]=game.add.sprite(game.world.centerX,h+420,'particle_character')	;
		game.physics.arcade.enable(this.player[i],Phaser.Physics.ARCADE);
		this.player[i].anchor.setTo(0.5,0.5);
		this.player[i].body.enable=false;
		this.player[i].flag_check=true;
		this.player[i].is_exploding=false;
	} 
	this.score = game.add.bitmapText(game.world.centerX,300,'police','',100);
	this.score.anchor.setTo(0.5,0.5);
	this.life = game.add.bitmapText(game.world.centerX,2200,'police','3',120);
	this.life.anchor.setTo(0.5,0.5);
	this.life.visible=false;
	this.touch_button = game.add.sprite(this.life.x,this.life.y-20,'touch');
	this.touch_button.anchor.setTo(0.5,0.5);
	this.touch_button.alpha=0;
	this.touch_button.visible=true;
	this.sound_game_over=game.add.audio('game_over');
	this.sound_launch=game.add.audio('launch');
	this.sound_star=game.add.audio('win');
	this.sound_pop=game.add.audio('pop_minder');
	this.sound_click=game.add.audio('click');
	//TODO:publish
	if (super_dev){
		this.button_publish=new _button(game.world.centerX,game.world.centerY+800,'button_publish',this.send_data_mail);
	}else{
		this.button_publish=new _button(game.world.centerX,game.world.centerY+800,'button_back',this.back_to_menu);
	}
	this.button_restart=new _button(game.world.centerX,game.world.centerY,'button_restart',this.restart_level);
	this.button_next=new _button(game.world.centerX,this.cible.y,'button_next',this.next_level);
	this.button_video=new _button(game.world.centerX,game.world.centerY+400,'button_video',this.signal_video);
	this.star= this.game.add.sprite(game.world.centerX, ((2270*0.5)-300), 'star', 0);
	this.star.anchor.setTo(0.5,0.5);
	this.star.frame=2;
	this.star.visible=false;
	this.star.scale.setTo(0,0);
	this.big_star=game.add.sprite(game.world.centerX,((2270*0.5)-300),'big_star');
	this.big_star.anchor.setTo(0.5,0.5);
	this.big_star.visible=false;
	this.big_star.scale.setTo(0,0);
	this._levelNumber = 1;
	this.count_dead=0;
	this.anim_cible();
	is_mobile && chartboost_preload_reward_video();
	this.circle_timer = null;
	this.counterMax = 100;
	this.counter = null;
	this.counterDisplay = null;
	this.timer = null;
	this.timer_touch = null;
	this.circle_timer = this.game.add.graphics(this.life.x, this.life.y-15);
	this.circle_timer.anchor.setTo(0.5,0.5);
	this.counter = 100;
	this.delay_for_launch_next_player=500;
	this.particle = game.add.emitter(this.x,this.y);
	this.particle.makeParticles("particle_character");
	this.particle.minParticleSpeed.setTo(-600,-600);
	this.particle.maxParticleSpeed.setTo(800,800);
	this.particle.setAlpha(0.8,0.6);
	this.particle.minParticleScale = 0.2;
	this.particle.maxParticleScale = 0.5;
	this.particle.minRotation = 0;
	this.particle.maxRotation = 0;
	this.particle.on=false;
	this.tuto=[];
	this.tuto.hand=game.add.sprite(w2,h2+550,'hand_tuto');
	this.tuto.hand.anchor.setTo(0.3,0.5);
	this.tuto.hand.alpha=0;
	this.tuto.little_circle=[];
	for (var j=0; j < 5; j++) {
		this.tuto.little_circle[j]=game.add.sprite(w2,h2+200-j*150,'little_circle_tuto');
		this.tuto.little_circle[j].anchor.setTo(0.5,0.5);
		this.tuto.little_circle[j].alpha=0;
	}
	this.tuto.circle=game.add.sprite(this.cible.x,this.cible.y,'circle_tuto');
	this.tuto.circle.anchor.setTo(0.5,0.5);
	this.tuto.circle.alpha=0;
	this.tuto.hand_level_win=game.add.sprite(w2,this.cible.y+90,'hand_tuto');
	this.tuto.hand_level_win.angle=45;
	this.tuto.hand_level_win.alpha=0;
	if(level_number ==0 ){
		this.show_tuto();
	}
};

character.prototype = Object.create(Phaser.Sprite.prototype);
character.prototype.constructor = character;
character.prototype.update = function() {
	if(this.game.stage.disableVisibilityChange){
		music.pause()
	}	
};
character.prototype.explosion_particles = function(){
	if(this.particles_explode.flag){
		this.particles_explode.on=true;
		this.particles_explode.x=game.rnd.integerInRange(0,w);
		this.particles_explode.y=game.rnd.integerInRange(0,h);
	}
};
character.prototype.stop_particles_explode=function(){
	this.particles_explode.flag=false
	this.particles_explode.on=false
};
character.prototype.show_background_white=function(){
	this.tw_b0 = game.add.tween(this.background_white).to({alpha:1},100,Phaser.Easing.Linear.None,true,0);
	this.tw_b0.onComplete.add(function(){this.background_white.alpha=0;},this);
};
character.prototype.signal_video=function(){

	l[level_number+1].signal_video_to_pass_level=true;
	chartboost_show_reward_video();
};
character.prototype.show_tuto = function() {
	this.tw_0 = game.add.tween(this.tuto.hand).to({alpha:1},750,Phaser.Easing.Linear.None,true,0);
	this.tw_1 = game.add.tween(this.tuto.hand.scale).to({x:1.2,y:1.2},750,Phaser.Easing.Linear.None,true,0,-1);
	for (var i=0; i < this.tuto.little_circle.length; i++) {
		game.add.tween(this.tuto.little_circle[i]).to({alpha:1},750,Phaser.Easing.Linear.None,true,i*200);
	}
	this.tw_2 = game.add.tween(this.tuto.circle).to({alpha:0.4},750,Phaser.Easing.Linear.None,true,1000);
	this.tw_2.onComplete.add(this.hide_tuto,this);
};
character.prototype.show_tuto_for_win = function() {
	this.tw_3 = game.add.tween(this.tuto.hand_level_win).to({alpha:1},750,Phaser.Easing.Linear.None,true,2500);
	this.tw_4 = game.add.tween(this.tuto.hand_level_win.scale).to({x:1.2,y:1.2},750,Phaser.Easing.Linear.None,true,2500,-1);
};
character.prototype.hide_tuto = function() {
	game.add.tween(this.tuto.hand).to({alpha:0},700,Phaser.Easing.Linear.None,true,800);
	for (var i=0; i < this.tuto.little_circle.length; i++) {
		game.add.tween(this.tuto.little_circle[i]).to({alpha:0},500,Phaser.Easing.Linear.None,true,i*200);
	}
	game.add.tween(this.tuto.circle).to({alpha:0},750,Phaser.Easing.Linear.None,true,800);
};

character.prototype.update_circle_timer = function() {
	this.counter--;
	this.circle_timer.clear();
	this.circle_timer.lineStyle(5, 0xffffff);
	this.circle_timer.arc(0, 0, 115, this.game.math.degToRad(-90), this.game.math.degToRad(-90+(360/this.counterMax)*(this.counterMax-this.counter)), false);
	if(this.counter === 0) {
		this.timer.destroy();
		this.circle_timer.visible=false;
		this.flag_mouse=true;
	}
};
character.prototype.reset_update_circle_timer = function() {
	//plus il est bas plus le cercle ira vite
	this.counter=45	;
	this.timer = this.game.time.create(false);
	this.timer.loop(1, this.update_circle_timer, this);
	this.timer.start();
	this.circle_timer.visible=true;
};
character.prototype.audio_click = function() {
	this.sound_click.play();
};
character.prototype.animate_restart = function() {
	this.restart_level();
};
character.prototype.back_to_menu = function() {
	this.game.state.start("game_first_screen");
};
character.prototype.send_data_mail = function(){
	var current_level=level_number+1;
	var SubjectVariable='bubblex'+current_level;
	var EmailVariable='o0o0ogames@gmail.com';
	var email=JSON.stringify(sto[0],null, "\t")
	co(email,"email")
	window.location='mailto:'+EmailVariable+'?subject='+SubjectVariable+'&body='+email;
};
character.prototype.audio_game_over = function() {
	!flag_level_complete && this.sound_game_over.play() && music.pause();
	//!flag_level_complete && this.sound_game_over.play() && music_ambiance.pause();
};
character.prototype.audio_star = function() {
	music.pause();
	this.sound_star.play();
	//music.pause() && this.sound_star.play();
	//this.sound_star.play() && music_ambiance.pause();
};
character.prototype.audio_pop = function() {
	this.sound_pop.play();
};
character.prototype.audio_launch = function() {
	this.sound_launch.play();
};
character.prototype.checkicharacterisloossomewhere = function(n) {
	if(this.player[n].flag_check){
		this.player[n].flag_check=false;
		game.time.events.add( 6000,function(){this.checkicharacterisloossomewhere2(n);},this );
	}
};
character.prototype.checkicharacterisloossomewhere2 = function(n) {
	if(flag_level_complete==false){
		this.explode(n);
	}
};
character.prototype.calculate_life_remaining= function(n){
	switch(n){
		case 0:
			this.life.text=2 ;
			break;
		case 1:
			this.life.text=1 ;
			break;
		default:
			this.life.text='' ;
			break;
	}

};
character.prototype.anim_cible = function() {
	this.tween6 = game.add.tween(this.cible_shadow.scale).to({x:2.0,y:2.0},750,Phaser.Easing.Linear.None,true,0,-1);
	this.tween7 = game.add.tween(this.cible_shadow).to({alpha:0.01},750,Phaser.Easing.Exponential.In,true,0,-1);
	this.tween6.onComplete.add(function(){this.cible_shadow.scale.setTo(0,0);},this)	;
	this.tween7.onComplete.add(function(){this.cible_shadow.alpha=0;},this);
};
character.prototype.show_star = function() {
	this.big_star.visible=true;
	this.tween_big_star = game.add.tween(this.big_star.scale).to({x:1,y:1},200,Phaser.Easing.Linear.None,true,1000);
	this.tween_big_star = game.add.tween(this.big_star).to({angle:45},200,Phaser.Easing.Linear.None,true,1000);
	this.tween_big_star = game.add.tween(this.big_star).to({alpha:0},3200,Phaser.Easing.Exponential.Out,true,300);
	this.star.visible=true	;
	this.tween5 = game.add.tween(this.star.scale).to({x:1,y:1},200,Phaser.Easing.Linear.None,true,1000);
	this.tween5.onComplete.add(function(){game.time.events.add(100,this.audio_star,this);},this);
};
character.prototype.wins=function(){
	if(level_number == 0 ){
		this.show_tuto_for_win();
	}
	this._levelNumber=level_number+1;
	// just testing, award random nr of stars;
	//var randstars = this.game.rnd.integerInRange(1, 3);
	var randstars = this.star.frame;
	//this._stars = this.game.add.bitmapText(160, 200, 'police', 'You get '+randstars+' stars!', 48);
	// set nr of stars for this level;
	PLAYER_DATA[level_number] = randstars;
	// unlock next level;
	if (this._levelNumber < PLAYER_DATA.length) {
		if (PLAYER_DATA[this._levelNumber] < 0) { // currently locked (=-1)
			PLAYER_DATA[this._levelNumber] = 0; // set unlocked, 0 stars
		}
	}
	// and write to local storage
	window.localStorage.setItem('mygame_progress', JSON.stringify(PLAYER_DATA));
};
character.prototype.restart_level = function() {
	this.next_niveau=level_number;
	this.game.state.start('level'+this.next_niveau,true,false);
};
character.prototype.next_level = function() {
	var next_niveau=level_number+1;
	if (next_niveau > 23) {
		this.game.state.start("message_end_level")
	} else {
		decide_if_ads_time(next_niveau);
		//this.game.state.start('level'+next_niveau,true,false);
	}
};

character.prototype.launch=function(n){
	this.show_background_white();
	this.reset_update_circle_timer();
	this.audio_launch();
	this.player[n].body.enable=true;
	this.checkicharacterisloossomewhere(n);
	this.player[n].visible=true;
	this.player[n].body.velocity.y=-800;
};
character.prototype.explode_cible=function(){
	this.particle.x=this.cible.x;
	this.particle.y=this.cible.y;
	this.particle.on=true;
	this.particle.start(true,3900,null,15);
	game.time.events.add( 100,function(){this.particle.on=false;},this );
};
character.prototype.explode_all=function(n){
	n = n + 1;
	for(var i=n; i<3 ;i++) {
		this.explode(i);
	}
};
character.prototype.explode=function(n){
	if(this.player[n].is_exploding==false){
		if(!flag_level_complete && n < 2){
			this.reset_update_circle_timer();
		}
		count_modif_obj(this.life.text,count_hero,2);
		this.player[n].is_exploding=true;
		this.calculate_life_remaining(n);
		this.audio_pop();
		this.on_explode();
		this.player[n].visible=false;
		this.particle.x=this.player[n].x;
		this.particle.y=this.player[n].y;
		this.particle.on=true;
		this.particle.start(true,3900,null,10);
		game.time.events.add( 100,function(){this.particle.on=false;},this );
		this.player[n].body.enable=false;
	}
};
character.prototype.on_explode=function(){
	this.count_dead=this.count_dead+1;
	if(this.count_dead==3){
		this.decide_if_show_button_restart_level();
	}
};
character.prototype.decide_if_show_button_restart_level = function() {
	game.time.events.add(1200,this.audio_game_over,this);
	this.flag_hide_enemies=true;
	game.time.events.add( 1000,this.button_restart.show_button,this.button_restart );
	var not_last_level;
	if (level_number != 23){
		not_last_level=true
	}else{
		not_last_level=false
	};

	is_preload_rewarded_video && not_last_level && game.time.events.add( 1000,this.button_video.show_button,this.button_video );
	game.time.events.add(1000,this.button_publish.show_button,this.button_publish );
};
character.prototype.land=function(n){
	flag_level_complete=true;
	this.explode_all(n);
	this.cible.body.enable=false;
	this.player[n].body.enable=false;
	this.tween0=game.add.tween(this.player[n]).to({x:game.world.centerX,y:300},500,Phaser.Easing.Linear.None,true,0);
	this.tween0.onComplete.add(function(){this.scale_x(n);},this);
};
character.prototype.calculate_star = function() {
	switch(count_hero){
		case 1:
			this.star.frame=3;
			co(this.star.frame);
			break;
		case 2:
			this.star.frame=2;
			break;
		case 3:
			this.star.frame=1;
			break;
		case 4:
			this.star.frame=0;
			break;
		default:
			this.star.frame=0;
			break;
	}
};
character.prototype.scale_x = function(n){
	this.tween1=game.add.tween(this.player[n].scale).to({x:4.5,y:4.5},500,Phaser.Easing.Bounce.Out,true,0);
	this.tween1.onComplete.add(this.explode_cible,this);
	this.show_button_restart_level_complete();
	game.time.events.add( 300,this.audio_pop,this );
	this.calculate_star();
	this.show_star();
	this.wins();
	text_to_number_level.hide();
	this.button_publish.show_button();
};
character.prototype.hide_life_text = function() {
	this.life.visible=false;
};
character.prototype.show_button_restart_level_complete = function() {
	if(this.flag_show_button){
		this.flag_show_button=false;
		this.button_restart.show_button();
		this.button_next.show_button();
		this.hide_life_text();
		this.stop_particles_explode();
	}
};

_asteroid = function(number,posx,posy,speed,radius){
	_mechant.call(this,game,"asteroid",number,posx,posy,'asteroid','sprite_for_drag_asteroid');
	this.radius=radius;
	this.speed=speed;
	this.particlex = game.add.emitter(this.sprite_for_body.x, this.sprite_for_body.y-25);
	this.particlex.makeParticles("particle_bullet_color");
	this.particlex.setXSpeed(-100,100);
	this.particlex.setYSpeed(100,-100);
	this.particlex.minParticleAlpha=0.3;
	this.particlex.minParticleScale = 0.1;
	this.particlex.maxParticleScale = 0.7;
	this.particlex.minRotation = 0;
	this.particlex.maxRotation = 0;
	this.particlex.on=false;
	game.time.events.add(delay_for_game_begin,function(){this.particlex.on=true;this.particlex.start(true,500,5);},this);
	this.fire()
	game.time.events.loop(16,this.update2,this);
};
_asteroid.prototype=Object.create(_mechant.prototype);
_asteroid.prototype.update = function() {
	if(this.flag && this.flag_wait_before_fire && game_begin){
		var period = game.time.now * this.speed;
		this.sprite_for_body.x = this.x + Math.cos(period) * this.radius;
		this.sprite_for_body.y = this.y + Math.sin(period) * this.radius;
		this.particlex.x=this.sprite_for_body.x;
		this.particlex.y=this.sprite_for_body.y;
	}
};
_asteroid.prototype.fire = function(){
	this.speed=this.speed;
	this.sprite_for_body.x = this.sprite_for_body.x ;
	this.sprite_for_body.y = this.sprite_for_body.y ;
	this.radius.y=this.radius;
};
_asteroid.prototype.hide=function(){
	this.tween1=game.add.tween(this.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0);
	this.tween2=game.add.tween(this.sprite_for_body.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0);
	this.sprite_for_body.enable=false;
	this.tween1.onComplete.add(function(){this.visible=false;this.inputEnabled=false;},this);
	this.tween2.onComplete.add(function(){this.sprite_for_body.visible=false;},this);
	this.particlex.on=false;
};

_pulsar=function(number,delay,posx,posy,speed,scale_factor){
	_mechant.call(this,game,"pulsar",number,posx,posy,'pulsar','sprite_for_drag');
	this.number=number;
	this.delay=delay;
	this.speed=speed;
	this.scale_factor=scale_factor;
	game.time.events.add( delay_for_game_begin,this.tweens,this );
	this.posx=posx;
	this.posy=posy;
	game.time.events.loop(16,this.update2,this);
};
_pulsar.prototype=Object.create(_mechant.prototype);
_pulsar.prototype.tweens = function() {
	this.tween0=game.add.tween(this.sprite_for_body.scale).to({x:this.scale_factor,y:this.scale_factor},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1);
	this.tween0.yoyo(true,this.speed);
};
_pulsar.prototype.fire = function() {
	//voir si TODO
	//ici mettre is_exist(this.tweens) && game.tweens.remove.this et utiliser fire comme déclencheur
	game.tweens.remove(this.tween0)	;
	this.sprite_for_body.scale.setTo(0,0);
	this.tween0=game.add.tween(this.sprite_for_body.scale).to({x:this.scale_factor,y:this.scale_factor},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1);
	this.tween0.yoyo(true,this.speed);
};

_dalle = function(number,delay,posx,posy,speed,wait){
	_mechant.call(this,game,"dalle",number,posx,posy,'dalle','sprite_for_drag');
	this.delay=delay;
	this.speed=speed;
	this.wait=wait;
	this.sprite_for_body.alpha=0;
	game.time.events.loop(16,this.update2,this);
	// démarre + this delay
	game.time.events.add( delay_for_game_begin+this.delay,this.start_tween0,this );
};
_dalle.prototype=Object.create(_mechant.prototype);
// fire

_dalle.prototype.start_tween0 = function() {
	//start B - delay N - repeat N - yoyo B
	this.tween0 = game.add.tween(this.sprite_for_body).to({alpha:1},this.speed,Phaser.Easing.Linear.None,true,0,0,false);
	this.tween0.onComplete.add(function(){this.retartadeur_tween(this.start_tween1)},this)
};
_dalle.prototype.start_tween1 = function() {
	//start B - delay N - repeat N - yoyo B
	this.tween1=game.add.tween(this.sprite_for_body).to({alpha:0},this.speed,Phaser.Easing.Linear.None,true,0,0,false);
	this.tween1.onComplete.add(function(){this.retartadeur_tween(this.start_tween0)},this)
};

/**
 * retartadeur_tween
 *
 * @param tween
 * @returns {tween0 or tween1}
 */
_dalle.prototype.retartadeur_tween = function(param) {
	game.time.events.add( this.wait,param,this );
};

_dalle.prototype.update = function() {
	if(this.sprite_for_body.body != null ){
		if (this.sprite_for_body.alpha > 0.5) {
			this.sprite_for_body.body.enable=true;
		} else {
			this.sprite_for_body.body.enable=false;

		}
	}
};
/**
 * fire => store data
 *
 * @returns {begin_to_exist => tween0 and tween1}
 */
_dalle.prototype.fire = function() {

	game.time.events.remove(this.tween0);
	game.time.events.remove(this.tween1);
	this.sprite_for_body.alpha=0;
	this.start_tween0();
};

_dalle_moving = function(number,delay,posx,posy,speed,posx_in_tween){
	_mechant.call(this,game,"dalle_moving",number,posx,posy,'dalle_moving','sprite_for_drag_dalle_moving');
	this.posx_in_tween=posx_in_tween;
	co(this.posx_in_tween)
	this.delay=delay;
	this.speed=speed;
	game.time.events.add( time_appears_enemies,this.tweens,this );
};
_dalle_moving.prototype=Object.create(_mechant.prototype);
_dalle_moving.prototype.tweens = function() {
	this.tween0=game.add.tween(this.sprite_for_body).to({x:this.posx+this.posx_in_tween},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1);
	this.tween0.yoyo(true,this.speed);
};
_dalle_moving.prototype.update = function() {
	this.sprite_for_body.y=this.y;
};
_dalle_moving.prototype.fire = function() {
	game.tweens.remove(this.tween0)	;
	this.sprite_for_body.x=this.x;
	this.sprite_for_body.y=this.posy;
	this.posx_in_tween=this.posx_in_tween;
	this.tween0=game.add.tween(this.sprite_for_body).to({x:this.posx+this.posx_in_tween},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1);
	this.tween0.yoyo(true,this.speed);
};
_canon = function(number,delay,posx,posy,speed,frequency,variance,angular,_flag,kill_with_world,special_color,_rotate,_value_rotate){
	_mechant.call(this,game,"canon",number,posx,posy,'canon','sprite_for_drag');
	this.special_color=special_color;
	this.kill_with_world=kill_with_world;
	this.delay=delay;
	this.name="canon";
	this.flag_explode=false;
	this.speed=speed;
	this.angular=angular;
	this.frequency=frequency;
	this._flag=_flag;
	this._rotate=_rotate;
	this._value_rotate=_value_rotate;
	this.variance=variance;
	this.sound_pop=game.add.audio('pop');
	this.flag_for_fire=false;
	this._flag=true;
	//particle pour animation lors du tir
	if(this.x < game.world.centerX){
		this.particlex = game.add.emitter(this.x+40,this.y);
		this.particlex.makeParticles("particle_canon");
		this.particlex.minParticleSpeed.setTo(100,-120);
		this.particlex.maxParticleSpeed.setTo(300,120);
		this.particlex.setAlpha(0.6,0.2);
		this.particlex.minParticleScale = 0.1;
		this.particlex.maxParticleScale = 0.9;
		this.particlex.minRotation = 0;
		this.particlex.maxRotation = 0;
		this.particlex.on=false;
	}else{
		this.particlex = game.add.emitter(this.x-40,this.y);
		this.particlex.makeParticles("particle_canon");
		this.particlex.minParticleSpeed.setTo(-100,-129);
		this.particlex.maxParticleSpeed.setTo(-300,120);
		this.particlex.setAlpha(0.5,0.2);
		this.particlex.minParticleScale = 0.1;
		this.particlex.maxParticleScale = 0.9;
		this.particlex.minRotation = 40;
		this.particlex.maxRotation = -40;
		this.particlex.on=false;
	}
	game.physics.arcade.enable(this);
	this.special_color ? this.weapon=game.add.weapon(9,'bullet_color'):this.weapon=game.add.weapon(9,'bullet');
	if(this.kill_with_world){
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	}else{
		for (var i = 0; i <  9; i++) {
			this.weapon.bulletCollideWorldBounds=true;
			this.weapon.bullets.children[i].body.bounce.setTo(1,1);
		}
	}
	//  Because our bullet is drawn facing up, we need to offset its rotation:
	this.weapon.bulletAngleOffset = 0;
	//  The speed at which the bullet is fired
	this.weapon.bulletSpeed = this.speed;
	//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
	this.weapon.fireRate = this.frequency ;
	//  Add a variance to the bullet angle by +- this value
	this.weapon.bulletAngleVariance = this.variance;
	//  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
	this.weapon.trackSprite(this.sprite_for_body,0,0,true);
	game.time.events.add( this.delay,function(){this._flag=false;},this );
	game.time.events.add( this.delay,function(){this.flag_for_fire=true;},this );
	this.time_for_count=0;
	this.ratio_time=8;
	this.frequency > (this.ratio_time*100) ? this.time_total=Math.round(this.frequency*0.01):this.time_total=8;
	this.time_part=Math.round(this.time_total/this.ratio_time);

	// pour animer le retour du canon
	game.time.events.loop(16,this.update2,this);
	this.signal_fire=false;
	this.weapon.onFire.add(this.explosion,this);
	this.weapon.onFire.add(this.hide_explosion,this);
	this.sprite_for_body.angle=this.angular;

};
_canon.prototype=Object.create(_mechant.prototype);
_canon.prototype.audio_pop = function() {
	this.sound_pop.play();
};
_canon.prototype.update = function(){
	if(this.flag_wait_before_fire && game_begin){
		if(this._rotate && this.flag_for_fire){
			this.sprite_for_body.angle += this._value_rotate;
		}
		this._flag==false && this.flag_for_fire && this.weapon.fire();
		this.particlex.x=this.x;
		this.particlex.y=this.y;
		// animation lors du tir
		if(this.signal_fire){
			this.time_for_count=this.time_for_count+1;
			switch(this.time_for_count){
				case this.time_part:
					this.x=this.x+2;
					this.scale.y=1.1;
					break;
				case this.time_part*2:
					this.x=this.x+4;
					this.scale.y=1.2;
					break;
				case this.time_part*3:
					this.x=this.x+6;
					this.scale.y=1.3;
					break;
				case this.time_part*4:
					this.x=this.x+8	;
					this.scale.y=1.4;
					//this.explosion();
					break;
				case this.time_part*5:
					this.x=this.x-2;	
					this.scale.y=1.3;
					break;
				case this.time_part*6:
					this.x=this.x-4;
					this.scale.y=1.2;
					break;
				case this.time_part*7:
					this.x=this.x-6;
					this.scale.y=1.1;
					break;
				case this.time_total:
					this.x=this.x-8;
					this.scale.y=1.0;
					this.time_for_count=0;
					this.signal_fire=false;
					//this.hide_explosion();
					break;
			}
		}
	}
};
_canon.prototype.transition = function(posx,posy,_time,delay) {
	this.tween_characteristic = game.add.tween(this.sprite_for_body).to({x:posx,y:posy},_time,Phaser.Easing.Linear.None,true,delay);
	this.tween_characteristic.yoyo(_time,true);
};
_canon.prototype.kill = function(){
	this.explode_bullet(this.weapon.bullets);
	this.weapon.bullets.visible=false;
	this.hide();
	this.hide_explosion();
	this.destroy();
	this.weapon.bullets.forEach(function(item){
		if(item.alive){	
			item.body.enable=false;
		}});
};
_canon.prototype.fire = function() {
	this.flag_for_fire=true;
	this.sprite_for_body.angle=this.angular;
	//this.angular=this.sprite_for_body.angle;
	this.weapon.fireRate = this.frequency;
	this.weapon.bulletSpeed = this.speed;
	this.weapon.bulletAngleVariance = this.variance;
	this.delay=this.delay;
};
_canon.prototype.explosion = function() {
	if(this.visible && game_begin){
		this.signal_fire=true;
		this.particlex.on=true;
		this.particlex.start(true,450,null,1);
	}
};
_canon.prototype.hide_explosion = function() {
	game.time.events.add(20,function(){this.particlex.on=false;},this);
};
_canon.prototype.explode_bullet=function(){
	if(this.flag_explode==false){
		this.flag_explode=true;
		this.audio_pop();
		if(this.special_color){
			this.weapon.bullets.forEach(function(item){
				if(item.alive){	
					this.particle = game.add.emitter(item.x,item.y);
					this.particle.makeParticles("particle_bullet_color");
					this.particle.minParticleSpeed.setTo(-300,-300);
					this.particle.maxParticleSpeed.setTo(800,800);
					this.particle.setAlpha(0.8,0.6);
					this.particle.minParticleScale = 0.2;
					this.particle.maxParticleScale = 0.5;
					this.particle.minRotation = 0;
					this.particle.maxRotation = 0;
					this.particle.on=false;
					this.particle.start(true,9000,null,2);
				}});
		}else{
			this.weapon.bullets.forEach(function(item){
				if(item.alive){	
					this.particle = game.add.emitter(item.x,item.y);
					this.particle.makeParticles("particle_bullet");
					this.particle.minParticleSpeed.setTo(-300,-300);
					this.particle.maxParticleSpeed.setTo(800,800);
					this.particle.setAlpha(0.8, 0.6);
					this.particle.minParticleScale = 0.2;
					this.particle.maxParticleScale = 0.5;
					this.particle.minRotation = 0;
					this.particle.maxRotation = 0;
					this.particle.on=false;
					this.particle.start(true,9000,null,2);
				}});
		}
	}
};

var boot = {
	preload: function() {
		// on definit ici car game subit un scale et les valeurs w2 ,h2 sont faussées après global.js
		w2=game.world.centerX;
		h2=game.world.centerY;
		this.game.load.image("loading","assets/loading.png");
		this.game.load.image("loading_back","assets/loading_back.png");
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		//this.game.stage.backgroundColor = '#0d1018';
		this.game.stage.backgroundColor = '#101520';
		this.game.scale.refresh();
		this.game.state.start('preloader');
	}
};

var preloader = {
	preload: function(){ 
		//loadingBar
		var loadingBar_back = this.add.sprite(game.width/2,h2,"loading_back");
		loadingBar_back.anchor.setTo(0.5,0.5);
		var loadingBar = this.add.sprite(game.width/2,h2,"loading");
		loadingBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(loadingBar);
		//tuto
		this.game.load.image("hand_tuto","assets/hand_tuto.png");
		this.game.load.image("little_circle_tuto","assets/little_circle_tuto.png");
		this.game.load.image("circle_tuto","assets/circle_tuto.png");
		//interface
		//this.game.load.image("background","assets/background.png");
		this.game.load.spritesheet('button_sound','assets/button_sound.png', 300, 300);
		this.game.load.image("mention","assets/mention.png");
		this.game.load.image("background_white","assets/background_white.png");
		this.game.load.image("button_back","assets/button_back.png");
		this.game.load.image("title","assets/title.png");
		this.game.load.spritesheet('star','assets/star.png', 450, 150);
		this.game.load.image("big_star","assets/big_star.png");
		this.game.load.image("levelselecticons","assets/levelselecticons.png");
		this.game.load.image("cible","assets/cible2.png");
		this.game.load.image("cible_shadow","assets/cible_shadow.png");
		this.game.load.image("grid","assets/grid.png");
		//audio
		//this.game.load.audio("ambiance","sounds/music_ambiance/airtone_-_nightWalk.ogg");
		// pip pop ta ta ta 
		this.game.load.audio("music",'sounds/music_ambiance/Floating Cities.ogg');
		//this.game.load.audio("ambiance","sounds/music_ambiance/Blip Stream.ogg");
		//this.game.load.audio("game_over","sounds/loose/melodic_lose_01.ogg");
		//this.game.load.audio("game_over","sounds/loose/magic_crystal_interface_25.ogg");
		//this.game.load.audio("game_over","sounds/loose/magic_crystal_interface_28.ogg");
		this.game.load.audio("game_over","sounds/loose/magic_alert_18.ogg");
		//this.game.load.audio("launch","sounds/launch/gum_drop_interface_53.ogg");
		this.game.load.audio("launch","sounds/launch/ching02.ogg");
		//this.game.load.audio("win","sounds/win/success_elegant_04.ogg");
		this.game.load.audio("win","sounds/win/magic_crystal_interface_04.ogg");
		//this.game.load.audio("pop_minder","sounds/pop2.ogg");
		this.game.load.audio("pop_minder","sounds/explode/Tiny Button Push-SoundBible.com-513260752.ogg");
		//this.game.load.audio("pop","sounds/pop2.ogg");
		this.game.load.audio("pop","sounds/explode/Tiny Button Push-SoundBible.com-513260752.ogg");
		this.game.load.audio("click","sounds/button/glossy_click_25.ogg");
		this.game.load.audio("menu_no","sounds/menu/pleasant_interface_37.ogg");
		//images_enemy
		this.game.load.image("canon","assets/canon.png");
		this.game.load.image("asteroid","assets/asteroid.png");
		this.game.load.image("sprite_for_drag_asteroid","assets/sprite_for_drag_asteroid.png");
		this.game.load.image("sprite_for_drag","assets/sprite_for_drag.png");
		this.game.load.image("pulsar","assets/pulsar.png");
		this.game.load.image("dalle","assets/dalle.png");
		this.game.load.image("dalle_moving","assets/dalle_moving.png");
		this.game.load.image("touch","assets/touch.png");
		this.game.load.image("sprite_for_drag_dalle_moving","assets/sprite_for_drag_dalle_moving.png");
		//images_button
		this.game.load.image("button_video","assets/button_video.png");
		this.game.load.image("button_menu","assets/button_menu.png");
		this.game.load.image("button_play","assets/button_play.png");
		this.game.load.image("button_menu_level_select","assets/button_menu_level_select.png");
		this.game.load.image("button_restart","assets/button_restart.png");
		this.game.load.image("button_next","assets/button_next.png");
		this.game.load.image("button_publish","assets/button_publish.png");
		//particles
		this.game.load.image("bullet_color","assets/bullet_color.png");
		this.game.load.image("bullet","assets/bullet.png");
		this.game.load.image("particle_canon","assets/particle_canon.png");
		this.game.load.image("particle_bullet_color","assets/particle_bullet_color.png");
		this.game.load.image("particle_bullet","assets/particle_bullet.png");
		this.game.load.image("particle_character","assets/particle_character.png");
		//font bitmapFont
		this.game.load.bitmapFont('police','fonts/font.png', 'fonts/font.fnt');
	},
	create: function(){
		this.game.time.events.add(1000,function(){this.game.state.start("game_first_screen");},this);
	}
};

var game_first_screen = {
	background_music: function(){
		music=game.add.audio('music');
		// si super dev est sur true alors pas de music d'ambiance
		super_dev ? music.volume=0 : music.volume=0.4
		music.play();
		music.loopFull();
	},
	create: function(){
		memoryze_progress_in_level();
		this.background_music();	
		//this.initProgressData();
		this.title=new screen_first();
		this.mention=game.add.sprite(w2,h+175,'mention')
		this.mention.anchor.setTo(.5,1)
		game.add.existing(this.title);
	},
};
/*	
	clic0 - stop anim0 >c0 -e -anim1
	clic1 - stop anim1 >c1 -e -anim2
	clic2 - stop anim2 >c2 -e

-e -anim1 via collide dans update on incremente manuellement de 1
ensuite via accion dans clic l'incrementation se fait automatiquement
*/
//tween on the circle
start_tw = function(obj){
	tw_action(obj);
	flag_tween_en_cours=true;
};
// declaration of tw_action
tw_action= function(obj){
	obj.scale.setTo(1,1);
	tw_name= game.add.tween(obj.scale).to({x:1.5,y:1.5},1000,Phaser.Easing.Linear.None,true,delay_circle_timer,-1);
	tw_name = game.add.tween(obj).to({alpha:1},1000,Phaser.Easing.Linear.None,true,delay_circle_timer,-1);
};
//stop tween
stop_tw = function(obj,tw){
	if(tw != 'undefined'){
		obj.alpha=0;
		game.tweens.remove(tw);
		flag_tween_en_cours=false;
	}
};
animate_touch = start_tw;
var conditional_animate_touch = function(){!flag_tween_en_cours && animate_touch(hero.touch_button);};
function create_level(num){ 
	find_the_current_level();
	level_number=num;
	music.resume();
	initialise_time_and_delay();
	game_begin=false;
	flag_hide=false;
	game.time.events.add(delay_for_game_begin,function(){flag_hide=true;});
	game.time.events.add(delay_for_game_begin,function(){game_begin=true;});
	game.time.events.add(delay_for_game_begin,function(){flag_level_complete=false;});
	is_rewarded_video_completed=false;
	is_preload_rewarded_video=false;
	hero = new character() ;
	count_hero=0;
	game.time.events.add(delay_for_game_begin,function(){hero.life.visible=true;});
	game.time.events.add(delay_for_game_begin,function(){animate_touch(hero.touch_button);});
	var _level_name=level_name[level_number];
	text_to_describe_level=new _text(_level_name,game.world.centerX,game.world.centerY,100);
	text_to_describe_level.visible=false;
	text_to_describe_level.alpha=0;
	text_to_describe_level.show();
	level_number_adapt=level_number+1;
	text_to_number_level=new _text(level_number_adapt,game.world.centerX,320,140);
	text_to_number_level.alpha=0;
	text_to_number_level.visible=false;
	text_to_number_level.show2();
}

function logic(){
	logic_add();
	logic_update();
}

is_clic_valid =function(count,f){
	var condition = function(count){
		switch(count){
			case 0:
				return true;
			case 1:
				return true;
			case 2:
				return true;
			default:
				return false;
		}
	};
	var cond = condition(count);

	if (condition(count) && f){
		return true;
	}else{
		return false;
	}
};

condition_update_circle_timer = function(count){
	count_modif_obj(hero.life.text,count,2);
};
action=function(count){
	condition_update_circle_timer(count);
	stop_tw(hero.touch_button,tw_name)	;
	count_hero++;
	hero.launch(count);
};
can_t_launch = function(count,f){
	if(is_clic_valid(count,f)){
		action(count);
	}  
};
_tap = function(){
	game.input.onTap.add(onTap);
	function onTap(pointer, doubleTap) {
		if(flag_level_complete==false){
			if (!doubleTap && hero.flag_mouse==true && game_begin){
				can_t_launch(count_hero,hero.flag_mouse);
				hero.flag_mouse=false;
				var _action = function(){hero.flag_mouse=true;};
				game.time.events.add(hero.delay_for_launch_next_player,_action);
			}
		}
	}
};
var levsel={
	// define needed variables for mygame.LevelSelect
	preload: function() {
		this.game.load.spritesheet('levelselecticons', 'assets/levelselecticons.png', 275, 300);
		this.game.load.bitmapFont('police','fonts/font.png', 'fonts/font.fnt');
		memoryze_progress_in_level();
	},
	create: function() {
		this.holdicons = [];
		this.text=game.add.bitmapText(w2,200,'police','Select a level!',100);
		this.text.anchor.setTo(0.5,0.5);
		this.createLevelIcons();
		this.animateLevelIcons();
	},
	update: function() {
		// nothing to do but wait until player selects a level
	},
	render: function() {
		// display some debug info..?
	},
	initProgressData: function() {
		// array might be undefined at first time start up
		if (!PLAYER_DATA) {
			// retrieve from local storage (to view in Chrome, Ctrl+Shift+J -> Resources -> Local Storage)
			var str = window.localStorage.getItem('mygame_progress');
			// error checking, localstorage might not exist yet at first time start up
			try {
				PLAYER_DATA = JSON.parse(str);
			} catch(e){
				PLAYER_DATA = []; //error in the above string(in this case,yes)!
			}
			// error checking just to be sure, if localstorage contains something else then a JSON array (hackers?)
			if (Object.prototype.toString.call( PLAYER_DATA ) !== '[object Array]' ) {
				PLAYER_DATA = [];
			}
		}
	},
	createLevelIcons: function() {
		var levelnr = 0;
		var nbr_colonnes=4
		var nbr_lines=(NUMBER_OF_LEVELS-1)/4
		for (var y=0; y < (NUMBER_OF_LEVELS-1)/4; y++) {
			for (var x=0; x < nbr_colonnes; x++) {
				// next level
				levelnr = levelnr + 1;
				// check if array not yet initialised
				if (typeof PLAYER_DATA[levelnr-1] !== 'number') {
					// value is null or undefined, i.e. array not defined or too short between app upgrades with more levels
					if (levelnr == 1) {
						PLAYER_DATA[levelnr-1] = 0; // level 1 should never be locked
					} else {
						PLAYER_DATA[levelnr-1] = -1;
					}
				}
				// player progress info for this level
				var playdata = PLAYER_DATA[levelnr-1];
				// decide which icon
				var isLocked = true; // locked
				var stars = 0; // no stars
				// check if level is unlocked
				// super_dev unlock all levels here it's the icon image who's unlocked
				if (super_dev) {
					isLocked = false; // unlocked
					stars = 2; // 0..3 stars
				}else{
					if (playdata > -1) {
						isLocked = false; // unlocked
						if (playdata < 4) {stars = playdata;} // 0..3 stars
					}
				}
				// calculate position on screen
				// la formule est la suivante
				// w - 300x(nbr de colonnes -1) -2x marges à gauche et droite =0
				//marges à gauche et droite = w-300x(nbr de colonnes -1)*.5
				//1280-100/2  100 vient de 200/2 1280+200 =1480
				var marge=((1280-300*(nbr_colonnes-1))/2)
				//var marge=((1480-((1480-1280))-300*(nbr_colonnes-1))/2)
				//var marge=(1230-300*(nbr_colonnes-1))/2
				var xpos = marge + (x*300);
				var ypos = 395 + (y*300);
				// create icon
				this.holdicons[levelnr-1] = this.createLevelIcon(xpos, ypos, levelnr, isLocked, stars);
				var backicon = this.holdicons[levelnr-1].getAt(0);
				// keep level nr, used in onclick method
				backicon.health = levelnr;
				// input handler
				backicon.inputEnabled = true;
				backicon.events.onInputDown.add(this.onSpriteDown, this);
			}
		}
	},
	// -------------------------------------
	// Add level icon buttons
	// -------------------------------------
	createLevelIcon: function(xpos, ypos, levelnr, isLocked, stars) {
		// create new group
		var IconGroup = this.game.add.group();
		IconGroup.x = xpos;
		IconGroup.y = ypos;
		// keep original position, for restoring after certain tweens
		IconGroup.xOrg = xpos;
		IconGroup.yOrg = ypos;
		// determine background frame
		var frame = 0;
		if (isLocked == false) {frame = 1;}
		// add background
		var icon1 = this.game.add.sprite(0, 0, 'levelselecticons', frame);
		IconGroup.add(icon1);
		// add stars, if needed
		if (isLocked == false) {
			var txt = this.game.add.bitmapText(137, 147, 'police', ''+levelnr, 100);
			txt.anchor.setTo(0.5,0.5);
			var icon2 = this.game.add.sprite(0, 0, 'levelselecticons', (2+stars));
			IconGroup.add(icon2);
			IconGroup.add(txt);
		}else{
			var txt_locked = this.game.add.bitmapText(137, 147, 'police', ''+levelnr, 100);
			txt_locked.anchor.setTo(0.5,0.5);
			//txt_locked.tint=0x9a136b
			IconGroup.add(txt_locked);
		}
		return IconGroup;
	},
	onSpriteDown: function(sprite, pointer) {
		this.sound_menu_no=game.add.audio('menu_no');
		this.sound_click=game.add.audio('click');
		// retrieve the iconlevel
		var levelnr = sprite.health;
		// animation pour entrer dans les levels
		this.access_level_icon=function () {
			this.sound_click.play();
			// simulate button press animation to indicate selection
			var IconGroup = this.holdicons[levelnr-1];
			var tween = this.game.add.tween(IconGroup.scale)
				.to({ x: 0.9, y: 0.9}, 100, Phaser.Easing.Linear.None)
				.to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.None)
				.start();
			// it's a little tricky to pass selected levelnr to callback function, but this works:
			this.onLevelSelected(levelnr-1);
		};

		// animation pour montrer que le level est bloqué
		this.dont_access_level_icon=function () {
			// indicate it's locked by shaking left/right
			this.sound_menu_no.play();
			var IconGroup = this.holdicons[levelnr-1];
			var xpos = IconGroup.xOrg;
			var tween = this.game.add.tween(IconGroup)
				.to({ x: xpos+6 }, 20, Phaser.Easing.Linear.None)
				.to({ x: xpos-5 }, 20, Phaser.Easing.Linear.None)
				.to({ x: xpos+4 }, 20, Phaser.Easing.Linear.None)
				.to({ x: xpos-3 }, 20, Phaser.Easing.Linear.None)
				.to({ x: xpos+2 }, 20, Phaser.Easing.Linear.None)
				.to({ x: xpos }, 20, Phaser.Easing.Linear.None)
				.start();
		};

		if (super_dev) {
			this.access_level_icon();
		} else { 
			if (PLAYER_DATA[levelnr-1] < 0) {
				this.dont_access_level_icon();	
			} else {
				this.access_level_icon();	
			}
		}

	},
	animateLevelIcons: function() {
		// slide all icons into screen
		for (var i=0; i < this.holdicons.length; i++){
			// get variables
			var IconGroup = this.holdicons[i];
			IconGroup.y = IconGroup.y + 600;
			var y = IconGroup.y;
			// tween animation
			this.game.add.tween(IconGroup).to( {y: y-600}, 500, Phaser.Easing.Back.Out, true, (i*40));
		}
	},
	onLevelSelected: function(levelnr) {
		this.number_level=levelnr;
		co('level'+this.number_level)
		this.game.state.start('level'+ this.number_level,true,false);
	}
};

var logic_add=function(){
	game.add.existing(hero);
	var logic_add_intenal=function(obj){
		if(obj[0]){
			for_each(obj,game.add.existing.bind(game));
		}	
	};
	logic_add_intenal(canon);
	logic_add_intenal(dalle);
	logic_add_intenal(dalle_moving);
	logic_add_intenal(pulsar);
	logic_add_intenal(asteroid);
};
var logic_update=function(){
	game.time.events.loop( 50,function(){ 
		for (var j = 0; j < 3; j++){
			game.physics.arcade.collide(hero.cible,hero.player[j],function(){hero.land(j);});
		}
		//si reussi niveau
		flag_level_complete && flag_hide && flag_level_complete==false & console.log("ok") & game.time.events.add( 9,hide_weapon,this );
		//si checkicharacterisloossomewhere
		hero.flag_hide_enemies && flag_hide && hero.flag_hide_enemies==false & game.time.events.add( 300,hide_weapon,this );
		if(canon[1]){
			game.physics.arcade.collide(canon[0].weapon.bullets,canon[1].weapon.bullets,touch_between_enemies,null,this);
		}
		if(canon[2]){
			game.physics.arcade.collide(canon[0].weapon.bullets,canon[2].weapon.bullets,touch_between_enemies,null,this);
			game.physics.arcade.collide(canon[1].weapon.bullets,canon[2].weapon.bullets,touch_between_enemies,null,this);
		}
		var collide_function=function(obj){
			if(obj[0]){
				for (var i = 0; i < 3; i++){
					for (var j = 0; j < obj.length; j++){
						game.physics.arcade.collide(obj[j].sprite_for_body,hero.player[i],function(){hero.explode(i);conditional_animate_touch();});
					}
				}
			}
		};
		if(canon[0]){
			for (var i = 0; i < 3; i++){
				for (var k = 0; k < canon.length; k++){
					if(canon[k].special_color){
						game.physics.arcade.collide(canon[k].weapon.bullets,hero.player[i],hide_weapon,null,this);
					}else{
						game.physics.arcade.collide(canon[k].weapon.bullets,hero.player[i],function(){hero.explode(i);});
					}
				}
			}
		}
		collide_function(dalle_moving);
		collide_function(pulsar);
		collide_function(asteroid);
		collide_function(dalle);
	});
};
var touch_between_enemies=function(){
	console.log("touch");
};

var hide_weapon=function(){
	if(flag_hide){
		console.log("hide_weapon");
		hero.touch_button.visible=false;
		flag_hide = false;
		console.log('hide');
		if(canon[0]){
			for (var j = 0; j < canon.length; j++){
				canon[j].explode_bullet(canon[j].weapon.bullets);
				canon[j].visible=false;
				canon[j].weapon.bullets.visible=false;
				canon[j].hide_explosion();
				canon[j].destroy();
				canon[j].weapon.bullets.forEach(function(item){
					if(item.alive){	
						item.body.enable=false;
					}});
			}
		}
		for_action(dalle,'hide');
		for_action(canon,'hide');
		for_action(dalle_moving,'hide');
		for_action(asteroid,'hide');
		for_action(pulsar,'hide');
	}
};
//must be comment when canvas mode because .onChange()
var show_grid_on_logic_position=function(sprite){
	//	logic_position(sprite);
	//	if(debug_position){
	//		hero.grid.visible=true;
	//		gui && gui.destroy();
	//		gui=new dat.GUI();
	//		gui.start=true;
	//		var guit={};
	//		/**
	//		 * declare param with dat.gui and if  
	//		 * @param {args[]}  
	//		 * @callback _create_canon - the function who create the enemy.
	//		 * @callback canon - the function who create the enemy via sto.
	//		 */
	//
	//
	//		var guit_declare=function(...args){
	//			var condition=args.length;
	//			//obligé ...ne sait pas pourquoi
	//			var parameter=args[1];
	//			if (condition> 2){	
	//				guit.parameter=gui.add(args[0],args[1],args[2],args[3]);
	//				co(args[1],"args");
	//				guit.parameter.onChange(function(value){
	//					args[0].fire();
	//					logic_position(args[0]);
	//				});
	//			}else{
	//				guit.parameter=gui.add(args[0],args[1]);
	//				guit.parameter.onChange(function(value){
	//					args[0].kill();
	//					logic_position(args[0]);
	//				});
	//			}
	//		};
	//		switch(sprite.name){
	//			case "canon":
	//				gui.add(sprite,'name');
	//				guit_declare(sprite,'speed',0,5000);
	//				guit_declare(sprite,'frequency',0,5000);
	//				guit.kill=gui.add(sprite,'kill_with_world');
	//				guit.kill.onChange(function(value) {
	//					sprite.fire();// Fires on every change, drag, keypress, etc.;
	//					logic_position(sprite);
	//				});
	//				guit.kill=gui.add(sprite,'_rotate');
	//				guit.kill.onChange(function(value) {
	//					sprite.fire();// Fires on every change, drag, keypress, etc.;
	//					logic_position(sprite);
	//				});
	//				guit_declare(sprite,'_value_rotate',0,10);
	//				//guit_declare(sprite,'_rotate')
	//				guit.kill=gui.add(sprite,'special_color');
	//				guit.kill.onChange(function(value) {
	//					sprite.fire();// Fires on every change, drag, keypress, etc.;
	//					logic_position(sprite);
	//				});
	//				guit_declare(sprite,'angular',0,360);
	//				guit_declare(sprite,'variance',0,1000);
	//				guit_declare(sprite,'kill');
	//				break;
	//			case "pulsar":
	//				gui.add(sprite,'name');
	//				guit_declare(sprite,'speed',300,9000);
	//				guit_declare(sprite,'kill');
	//				break;
	//			case "asteroid":
	//				//erreur pas de guit_declare donc les valeurs ne sont pas stockées
	//				gui.add(sprite,'name');
	//				guit_declare(sprite,'radius',50,900);
	//				guit_declare(sprite,'speed',0,0.01);
	//				guit_declare(sprite,'kill');
	//				break;
	//			case "dalle_moving":
	//				gui.add(sprite,'name');
	//				guit_declare(sprite,'speed',100,3000);
	//				guit_declare(sprite,'posx_in_tween',-900,900);
	//				guit_declare(sprite,'kill');
	//				break;
	//			case "dalle":
	//				gui.add(sprite,'name');
	//				guit_declare(sprite,'speed',300,3000);
	//				guit_declare(sprite,'kill');
	//				guit_declare(sprite,'wait',100,9000);
	//				break;
	//			default:
	//				break;
	//		}
	//	}
};
var logic_position=function(sprite){
	if (debug_position){
		hero.grid.visible=false	;
		var _table;
		var _name_json;
		var _name_sprite=sprite.name
		co(_name_sprite)
		switch(sprite.name){
			case 'canon':
				_table=sto[level_number][sprite.name];
				_name_json='canon';
				_table[sprite.number] = {
					number:sprite.number,
					delay:Math.round(sprite.delay),
					x:Math.round(sprite.x),
					y:Math.round(sprite.y),
					speed:Math.round(sprite.speed),
					frequency:Math.round(sprite.frequency),
					variance:Math.round(sprite.variance),
					angular:Math.round(sprite.angular),
					_flag:sprite._flag,
					kill_with_world:sprite.kill_with_world,
					special_color:sprite.special_color,
					_rotate:sprite._rotate,
					_value_rotate:sprite._value_rotate,
				};
				break;
			case 'asteroid':
				_table=sto[level_number][sprite.name];
				_name_json='asteroid';
				_table[sprite.number] = {
					number:sprite.number,
					x:Math.round(sprite.x),
					y:Math.round(sprite.y),
					speed:sprite.speed,
					radius:Math.round(sprite.radius),
				};
				break;
			case 'dalle_moving':
				_table=sto[level_number][sprite.name];
				_name_json='dalle_moving';
				_table[sprite.number] = {
					number:sprite.number,
					delay:Math.round(sprite.delay),
					x:Math.round(sprite.x),
					y:Math.round(sprite.y),
					speed:Math.round(sprite.speed),
					posx_in_tween:Math.round(sprite.posx_in_tween),
				};
				break;
			case 'pulsar':
				co(sprite.x)
				_table=sto[level_number][sprite.name];
				_name_json='pulsar';
				_table[sprite.number] = {
					number:sprite.number,
					delay:Math.round(sprite.delay),
					x:Math.round(sprite.x),
					y:Math.round(sprite.y),
					speed:Math.round(sprite.speed),
					scale_factor:sprite.scale_factor,
				};
				break;
			case 'dalle':
				_table=sto[level_number][sprite.name];
				_name_json='dalle';
				_table[sprite.number] = {
					number:sprite.number,
					delay:Math.round(sprite.delay),
					x:Math.round(sprite.x),
					y:Math.round(sprite.y),
					speed:Math.round(sprite.speed),
					wait:Math.round(sprite.wait),
				};
				break;
		}
		this.level=level_number;
		this.name_level='lev';
		this.combined_level=this.name_level+this.level;
		debug_store && localStorage.setItem(_name_json+sprite.number+this.combined_level, JSON.stringify(_table[sprite.number]));
	}
};
/**
 * check in the localStorage if enemy exist if no create them.
 * @param {sto[]} table to store the enemy sto[level_number].obj[0].param 
 * @callback _create_canon - the function who create the enemy.
 * @callback canon - the function who create the enemy via sto.
 */

var check_storage=function(_create_canon,_create_asteroid,_create_dalle_moving,_create_pulsar,_create_dalle,num_canon,num_asteroid,num_dalle_moving,num_pulsar,num_dalle){
	var check_in_local_storage=function(obj,num,table){
		for(var i=0;i<num;i++){
			table[i] = JSON.parse( localStorage.getItem( obj+i+'lev'+level_number));
		}
	};
	check_in_local_storage("canon",num_canon,sto[level_number].canon);
	check_in_local_storage("asteroid",num_asteroid,sto[level_number].asteroid);
	check_in_local_storage("dalle_moving",num_dalle_moving,sto[level_number].dalle_moving);
	check_in_local_storage("pulsar",num_pulsar,sto[level_number].pulsar);
	check_in_local_storage("dalle",num_dalle,sto[level_number].dalle);

	for(var i=0;i<num_canon;i++){
		if (sto[level_number].canon[i]===null){
			_create_canon();
			break;
		}else{
			canon[i]=new _canon(i,sto[level_number].canon[i].delay,sto[level_number].canon[i].x,sto[level_number].canon[i].y,sto[level_number].canon[i].speed,sto[level_number].canon[i].frequency,sto[level_number].canon[i].variance,sto[level_number].canon[i].angular,flag_level_complete,sto[level_number].canon[i].kill_with_world,sto[level_number].canon[i].special_color,sto[level_number].canon[i]._rotate,sto[level_number].canon[i]._value_rotate);
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * check in the localStorage if enemy exist if no create them.
	 * @param {number} number of object to create
	 * @callback _create_canon - the function who create the enemy.
	 */

	for(var j=0;j<num_asteroid;j++){
		if (sto[level_number].asteroid[j]===null){
			_create_asteroid();
			break;
		}else{
			//asteroid = function(number,posx,posy,speed,radius)
			asteroid[j]=new _asteroid(j,sto[level_number].asteroid[j].x,sto[level_number].asteroid[j].y,sto[level_number].asteroid[j].speed,sto[level_number].asteroid[j].radius);
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////

	for(var k=0;k<num_dalle_moving;k++){
		if (sto[level_number].dalle_moving[k]===null){
			_create_dalle_moving();
			break;
		}else{
			//dalle_moving = function(number,delay,posx,posy,speed)
			dalle_moving[k]=new _dalle_moving(k,sto[level_number].dalle_moving[k].delay,sto[level_number].dalle_moving[k].x,sto[level_number].dalle_moving[k].y,sto[level_number].dalle_moving[k].speed,sto[level_number].dalle_moving[k].posx_in_tween);
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////
	for(var n=0;n<num_pulsar;n++){
		if (sto[level_number].pulsar[n]===null){
			_create_pulsar();
			break;
		}else{
			//pulsar = function(number,delay,time,posx,posy,speed,scale_factor)
			pulsar[n]=new _pulsar(n,sto[level_number].pulsar[n].delay,sto[level_number].pulsar[n].x,sto[level_number].pulsar[n].y,sto[level_number].pulsar[n].speed,sto[level_number].pulsar[n].scale_factor);
		}
	}

	for(var m=0;m<num_dalle;m++){
		if (sto[level_number].dalle[m]===null){
			_create_dalle();
			break;
		}else{
			//dalle = function(number,delay,posx,posy,speed)
			dalle[m]=new _dalle(m,sto[level_number].dalle[m].delay,sto[level_number].dalle[m].x,sto[level_number].dalle[m].y,sto[level_number].dalle[m].speed,sto[level_number].dalle[m].wait);
		}
	}
};
/**
 * intermediate_screen after the videoreward to signify the level passed 
 * @param {obj} text 
 * @callback next_action => pass_level 
 */
var decide_if_ads_time=function(n){
	music.pause();
	//music_ambiance.pause()
	if(l[n].ads && is_preload_rewarded_video) {

		this.game.state.start("ads_time");

	}else{
		this.game.state.start("level"+ n);
	}
};
var chartboost_preload_reward_video=function(){
	// ancien identifiant
	var appId = "593f9e2504b0160769416382";
	var appSignature = "41fd9a8fc8adea90df03e94772ffa7e5373afcc6";
	window.chartboost.setUp(appId, appSignature);

	window.chartboost.onInterstitialAdPreloaded = function(location) {
		alert('onInterstitialAdPreloaded: ' + location);
	};
	window.chartboost.onInterstitialAdLoaded = function(location) {
		alert('onInterstitialAdLoaded: ' + location);
	};
	window.chartboost.onInterstitialAdShown = function(location) {
		alert('onInterstitialAdShown: ' + location);
	};
	window.chartboost.onInterstitialAdHidden = function(location) {
		alert('onInterstitialAdHidden: ' + location);
	};
	window.chartboost.onMoreAppsAdPreloaded = function(location) {
		alert('onMoreAppsAdPreloaded: ' + location);
	};
	window.chartboost.onMoreAppsAdLoaded = function(location) {
		alert('onMoreAppsAdLoaded: ' + location);
	};
	window.chartboost.onMoreAppsAdShown = function(location) {
		alert('onMoreAppsAdShown: ' + location);
	};
	window.chartboost.onMoreAppsAdHidden = function(location) {
		alert('onMoreAppsAdHidden: ' + location);
	};
	window.chartboost.onRewardedVideoAdPreloaded = function(location) {
		is_preload_rewarded_video=true;
		//alert('onRewardedVideoAdPreloaded: ' + location);
	};
	window.chartboost.onRewardedVideoAdLoaded = function(location) {
		//alert('onRewardedVideoAdLoaded: ' + location);
		//is_rewarded_video_completed && this.game.state.start('intermediate_screen');
	};
	window.chartboost.onRewardedVideoAdShown = function(location) {
		//alert('onRewardedVideoAdShown: ' + location);
	};
	window.chartboost.onRewardedVideoAdHidden = function(location) {
		//alert('onRewardedVideoAdHidden: ' + location);

		is_rewarded_video_completed=true;
		//car on doit anticiper le prochain level
		if (l[level_number+1].next_with_video == true && l[level_number+1].signal_video_to_pass_level == true){
			l[level_number+1].signal_video_to_pass_level = false;
			game.state.start('intermediate_screen');
		}
		if (l[level_number+1].ads == true && l[level_number+1].signal_ads == true){
			l[level_number+1].signal_ads=false
			var level_number_ads=level_number+1;
			game.state.start("level"+level_number_ads);
		}
	};
	window.chartboost.onRewardedVideoAdCompleted = function(location) {
	};
	is_mobile && window.chartboost.preloadRewardedVideoAd('Default');
};
var chartboost_show_reward_video = function() {
	music.pause();
	//music_ambiance.pause();
	window.chartboost.showRewardedVideoAd('Default');
};
var ads_time={
	create:function(){
		text_passed_level = new _text("ads time",game.world.centerX,game.world.centerY,100);
		this.particlex = game.add.emitter(text_passed_level.text.x,text_passed_level.text.y);
		this.particlex.makeParticles("particle_canon");
		this.particlex.minParticleSpeed.setTo(-900,900);
		this.particlex.maxParticleSpeed.setTo(900,-900);
		this.particlex.setAlpha(0.5,0.1);
		this.particlex.minParticleScale = 0.1;
		this.particlex.maxParticleScale = 0.4;
		this.particlex.minRotation = 0;
		this.particlex.maxRotation = 0;
		this.particlex.on=false;
		game.time.events.add(600,function(){this.particlex.start(true,2950,null,5);},this);
		game.time.events.add(800,function(){this.particlex.on=true;},this);
		var next_screen=function(){
			l[level_number+1].signal_ads=true
			chartboost_show_reward_video();
		};
		var next_action2 = function(){
			game.time.events.add(550,next_screen,this);
		};
		next_action2();
	}
};

var store_level_in_game_progress=function(n){
	//on définit que le niveau concerné vaut 0 pas d'étoiles
	PLAYER_DATA[n] = 0;
	//on écrit les données dans le localStorage
	window.localStorage.setItem('mygame_progress', JSON.stringify(PLAYER_DATA));
};

var pass_level=function(){
	var next_niveau=level_number+1;
	store_level_in_game_progress(level_number);
	game.state.start('level'+ next_niveau,level_state[next_niveau]);
};
ecran_intermediaire_pour_passer_level=function(obj,next_action){
	co(obj,next_action);
	obj.alpha =1;
	obj.scale.setTo(0,0);
	next_tw=function(){
		this.tween_scale2 = game.add.tween(obj.scale).to({x:0,y:0},600,Phaser.Easing.Elastic.In,true,100);
		this.tween_scale2.onComplete.add(next_action);
	};
	this.tween_rotate = game.add.tween(obj).to({angle:45},1100,Phaser.Easing.Elastic.Out,true,900);
	this.tween_scale = game.add.tween(obj.scale).to({x:1.5,y:1.5},1100,Phaser.Easing.Elastic.Out,true,900);
	this.tween_alpha = game.add.tween(obj).to({alpha:1},800,Phaser.Easing.Linear.None,true,1200);
	this.tween_alpha.onComplete.add(next_tw,this);
};
var intermediate_screen={
	create:function(){
		text_passed_level = new _text("level passed",game.world.centerX,game.world.centerY,100);
		this.particlex = game.add.emitter(text_passed_level.text.x,text_passed_level.text.y);
		this.particlex.makeParticles("particle_canon");
		this.particlex.minParticleSpeed.setTo(-900,900);
		this.particlex.maxParticleSpeed.setTo(900,-900);
		this.particlex.setAlpha(0.5,0.1);
		this.particlex.minParticleScale = 0.1;
		this.particlex.maxParticleScale = 0.4;
		this.particlex.minRotation = 0;
		this.particlex.maxRotation = 0;
		this.particlex.on=false;
		game.time.events.add(600,function(){this.particlex.start(true,2950,null,5);},this);
		game.time.events.add(800,function(){this.particlex.on=true;},this);

		var next_action = function(){
			game.time.events.add(300,pass_level);
		};
		ecran_intermediaire_pour_passer_level(text_passed_level.text,next_action);
	}
};
var message_end_level={
	create:function(){
		this.message_text="Congratulations !!!\nyou have finish the Game\nPlease rate us :)"
		this.message = new _text(this.message_text,game.world.centerX,game.world.centerY,100);
		this.message.text.anchor.x=.5 
		this.particlex = game.add.emitter(this.message.text.x,this.message.text.y);
		this.particlex.makeParticles("particle_bullet_color");
		this.particlex.minParticleSpeed.setTo(-900,900);
		this.particlex.maxParticleSpeed.setTo(900,-900);
		this.particlex.setAlpha(0.5,0.1);
		this.particlex.minParticleScale = 0.3;
		this.particlex.maxParticleScale = 0.8;
		this.particlex.minRotation = 0;
		this.particlex.maxRotation = 0;
		this.particlex.on=false;
		game.time.events.add(300,function(){this.particlex.start(true,3000,null,90);},this);
		var link="https://www.google.com"
		game.time.events.add(1000,function(){window.open(link, "_system")}) 
	}
};

var level_config={
	constructor_canon:_canon,
	canon:canon,
	_flag_level_complete:flag_level_complete,
	asteroid:asteroid,
	constructor_asteroid:_asteroid,
	dalle_moving:dalle_moving,
	constructor_dalle_moving:_dalle_moving,
	pulsar:pulsar,
	constructor_pulsar:_pulsar,
	dalle:dalle,
	constructor_dalle:_dalle,
	debug_store:debug_store,
	_check_storage:check_storage,
	create_level:create_level,
	logic:logic,
	tap:_tap,
};
var level_state=[];
for (var i=0; i < NUMBER_OF_LEVELS; i++) {
	level_state[i]=level_constructor(level_config,i);
}
