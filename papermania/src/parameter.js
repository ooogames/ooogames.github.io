// si true montre la grille snap des enemis et render debug
var pop;
var clic;
var grow;
var score;
var scroll;
var music;
var flag = {
	start_game: false,
	heart:false,//pour éviter de lancer 2 x cette animation
}
var te={}
var f = {}


//nom du joueur accessible via le localStorage
var name_player;

//boleen pour checker si le nom du joeueur a déjà été entré.
var name_player_entered = false


// animation
var a={};

// object
var o = {
	background_main: "obj",
}

// object config
var op={};

// texte
var te = {}
// texte config
var tp={};

// buttons
var b = {
	play: "",
	how_to: "",
	timer: "",
}
// button config
var bp={};
var e = {//effects

}

// animation config
var ap={};

//particle 
var p={};

//particle config 
var pp={};

//sounds
var s = {

}

//drapeau
var d={
	debug : false, // pour déplacer les objets  	
	nomusic:true, //rendre muet le son
	scale : "undefined", // pour agrandir ou pas le pointer dépend d'une fonction f.lock
	scroll:{
		0:false,
		1:false,
	},
	0:false,
	1:false,
	//pour lancer les progressions de la progress bar, doit être différent de 0 et 1 car sinon anim_score est lié
	enemy:false,
	player:false,
	show_button_restart:false,
};



var interface = {

}
// a supprimer

var tw = {
	0:"something",
	1:"something",
};
var click_tw;
//TODO : changer en time

var t = {
	searching_opponent: 500,// temps pour faire apparaitre/disparaitre "search opponent"
	animate_timer: 70,// temps pour faire apparaitre/disparaitre "search opponent"
	pointer_duration: 500,
	start_opponent: 3000,
	show_looser: 2000, //temps du délai de l'animation du looser
	show_heart : 1500,//temps du délai de l'animation du gagnant
	looser: 1500, //temps de l'animation pour l'apparition du looser
	cloud: 500,
	start_game: 1500 + 4000,
	wait_end_game : 3000,
}
// pour renseigner un paramètre propre à un objet
t.show_heart = t.show_looser - 500

// ne sait pas pourquoi mais doit rester ainsi 
// calcul des dimensions de l'écran
var h = 2270;
var w = 1480;
var h2 = h * .5;
var w2 = w * .5;
var w0 = Math.round(w * .19);
var w4 = Math.round(w * .75);

// voir dans main.js => update
// affiche un mask variant suivant la position du papier
//100% = distance
//0% = distance
// => proportions
var distance_100= h*.58 - 400  // papier = 2400 => 2400/2 = 1200 
var distance_0 =  h*58 // limite du jeu
var distance={
	a : 1,
	b : distance_100,
	c: "inconnue",	
	d: distance_0,
};
var dist = 1/(distance_0-distance_100)

//caterogies pour afficher la puissance de l'enemi en fonction du player
var cat={
	0:10,
	1:5000,
	2:20000,
	3:50000,
	4:100000,
}

var joker = random(1,4)
var supplement = random(1,99999)
var numero = {
	0:joker == 1 ? random(1,3500) : supplement,
	1:joker == 1 ? random(1,8500) : supplement,
	2:joker == 1 ? random(1,13500) : supplement,
	3:joker == 1 ? random(1,35000) : supplement,
	4:joker == 1 ? random(1,555200) : supplement,
}
//difficulté du joueur plus la valeur est basse plus fort le joueur est
var ex ;  
var difficulty
var progress_player; //valeur toujours inférieure à 300  
var progress_enemy; //valeur toujours inférieure à 300  


