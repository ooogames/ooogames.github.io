_b = function (p) {
	Phaser.Button.call(this,p.g,p.x,p.y,p.image,p.callback,this,0,0,0);
	p.a != null ? this.alpha = p.a : this.alpha = 1
	p.v != null ? this.visible = p.v : this.visible = true
	p.anchorx != null ? this.anchor.x = p.anchorx : this.anchor.x = .5
	p.anchory != null ? this.anchor.y = p.anchory : this.anchor.y = .5
	p.flag != null ? this.flag = p.flag : this.flag = "undefined"
	p.g.add.existing(this)
};

_b.prototype = Object.create(Phaser.Button.prototype);
_b.prototype.constructor = _b
