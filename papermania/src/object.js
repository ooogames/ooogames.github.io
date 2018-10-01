_obj = function (p) {
	p.flag != null ? this.flag = p.flag : this.flag = "undefined"
	Phaser.Sprite.call(this, p.g, p.x, p.y, p.image);
	p.frame != null ? this.frame = 0 : console.log()
	p.a != null ? this.alpha = p.a : this.alpha = 1
	p.v != null ? this.visible = p.v : this.visible = true
	p.name != null ? this.name = p.name : this.name = "undefined"
	p.anchorx != null ? this.anchor.x = p.anchorx : this.anchor.x = .5
	p.anchory != null ? this.anchor.y = p.anchory : this.anchor.y = .5
	p.sx != null ? this.scale.x = p.sx : this.scale.x = 1
	p.sy != null ? this.scale.y = p.sy : this.scale.y = 1
	if (p.physics != null) {
		p.g.physics.arcade.enable(this)
		if (p.gravity) {
			this.body.allowGravity = true
		} else {
			this.body.allowGravity = false
		}
		if (p.immovable) {
			this.body.immovable = true
		}
		if (p.moves != null) {
			this.body.moves = false
		}
		if (p.bounce != null) {
			this.body.bounce.set(p.bounce)
		}
		if (p.noscale == null) {
			//			this.scale.y = p.g.heigth/2270 
			//			this.scale.x = this.scale.y *.65 
			//			co(p.g.heigth,"here")
		}
	}
	this.inputEnabled=true
	if(d.debug == true){
		this.input.enableDrag(true)
		this.input.enableSnap(20,20,true,true)
		this.events.onDragStop.add(()=>{f.debug_pos(this)},this)
		this.events.onDragStart.add(()=>{f.debug_pos(this)},this)	

	}


	p.g.add.existing(this)
}


_obj.prototype = Object.create(Phaser.Sprite.prototype);

_obj.prototype.constructor = _obj

//define x and y position
_obj.prototype.de = function (...arg) {
	this.x = arg[0]
	this.y = arg[1]
}

//define xscale and yscale 
_obj.prototype.sc = function (...arg) {
	this.scale.x = arg[0]
	this.scale.y = arg[1]
}
//define anchor  
_obj.prototype.an = function (...arg) {
	this.anchor.x = arg[0]
	this.anchor.y = arg[1]
}

_graph = function (p) {
	// for anchor .5 :) 
	let x_adapted = p.x - p.width/2
	let y_adapted = p.y - p.heigth/2
	this.bg = p.g.add.graphics(x_adapted,y_adapted);

	//Phaser.Graphics.call(this,x_adapted,y_adapted)
	//this.lineStyle(2, '0x000000');
	this.bg.beginFill(p.color,.5)
	this.bg.drawRoundedRect(0,0,p.width,p.heigth,p.round);
	this.bg.endFill()
	this.main = p.g.add.graphics(x_adapted,y_adapted);
	this.main.beginFill(p.color,1)
	//this.main.clear()
	this.main.drawRoundedRect(0,0,p.initial_value,p.heigth,p.round);
	this.g = p.g
	this.color = p.color
	this.height = p.heigth
	this.width = p.width
	this.round = p.round
	this.decimal =0
}

//_graph.prototype = Object.create(Phaser.Graphics.prototype);

_graph.prototype.constructor = _graph

// dans update
_graph.prototype.anim = function(points){
	this.decimal = this.decimal + 0.01
	let progress_length = this.width*this.decimal
	if(progress_length < this.width){
		if(progress_length < points){
			this.main.clear()
			this.main.drawRoundedRect(0,0,progress_length,this.height,this.round);


		}
	}
}

