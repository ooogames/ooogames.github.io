/* jshint expr: true */
/* jshint esnext: true */
if_undefined = function (obj, action) {
	if (obj == null) {
		action();
	}
};
var wait = function (callback, duration) {
	setTimeout(callback, duration);
}

var loop = function (callback, duration,number) {
	for (var i = 0; i < number; i++){
		wait(callback,i*duration)
	}
}

return_delay = (tbegin, tend) => {
	let tdelay = tend - tbegin
	return tdelay
}

var reduce_decimal = function (num) {
	Math.round(num * 10) / 10
}

var adapt = (n) => {
	let opacity;
	t.cu > t[n - 1] && t.cu < t[n] ? opacity = (t[n] - t.cu) / (t[n] - t[n - 1]) : opacity = 0
	return opacity
}



var delay = (n) => {
	let de = tc[n] - tc.cu
	return de;
}

var ctime = (n) => {
	let t = tc[n] - tc[n - 1]
	return t;
}

var start_timer = (a) => {
	b.begin = performance.now()
	console.time(b.begin)
}
var stop_timer = (a) => {
	if (a != null) {
		b.end = performance.now
		console.time(b.end)
		//console.timeEnd(a)
	}
}
var random = (min, max) => {
	let num = Math.floor(Math.random() * max) + min
	return num
}
random(0, 20)

var tr = function (game, p) { //transition,game,parameter
	this.game = game
	if (p.e !== null) {
		p.e = Phaser.Easing.Linear.None
	}
	this.s = () => { // start tween
		if (p.a !== null) { // alpha
			this.tw = game.add.tween(p.o).to({ alpha: p.a }, p.t, p.e, true, p.d);
		}
		if (p.r !== null) { //rotation
			this.tw = game.add.tween(p.o).to({ angle: p.r }, p.t, p.e, true, p.d);
		}
		if (p.sx !== null) { //scale
			this.tw = game.add.tween(p.o.scale).to({ x: p.sx, y: p.sy }, p.t, p.e, true, p.d);
		}
		if (p.dx !== null) { //displacement
			this.tw = game.add.tween(p.o).to({ x: p.dx, y: p.dy }, p.t, p.e, true, p.d);
		}
	}
	this.c = (callback, time) => { //complete
		let time_adapted = p.d + p.t + time
		wait(callback, time_adapted)
	}
	this.s() //start the tween
	this.y = () => {
		if (p.y !== null) {
			this.tw(true, p.dy)
		}
	}
}

function Unix_timestamp(t) {
	var dt = new Date(t * 1000);
	var hr = dt.getHours() * 60;
	var m = "0" + dt.getMinutes();
	var s = "0" + dt.getSeconds();
	//return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);  
	let min = Number(m.substr(-2))
	let result = Number(hr) + min
	return result
}

//foreach >> for_action
for_each = function (tableau, action) {
	for (var i = 0; i < tableau.length; i++) {
		action(tableau[i]);
	}
};

count_modif_obj = function (obj, i, num_max) {
	i++;
	if (i > num_max) {
		obj = '';
	} else {
		obj = i;
	}
};

const hide_enemies = function (enemies, actionString) { enemies.forEach(function (enemy) { enemy.actionString(); }); };

const for_action = function (obj, action) { obj.forEach(function (item) { item[action](); }); };

al = function (message) {
	alert(message);
};

countor = function (x) {
	x++;
	return x;
};
//console.log

co = console.log.bind(console);
