
_t = function (p) {
	Phaser.BitmapText.call(this, p.g, p.x, p.y, p.police, p.message, p.taille);
	p.anchorx != null ? this.anchor.x = p.anchorx : this.anchor.x = .5
	p.anchory != null ? this.anchor.y = p.anchory : this.anchor.y = .5
	p.alpha != null ? this.anchor.y = p.alpha : this.alpha = 1
	p.g.add.existing(this);
	p.v != null ? this.visible = p.v : this.visible = true
	this.inputEnabled=true
	d.debug && this.input.enableDrag(true)
	d.dedug && this.input.enableSnap(20,20,true,true)
	d.debug && this.events.onDragStop.add(()=>{f.debug_pos(this)},this)
	d.debug && this.events.onDragStart.add(()=>{f.debug_pos(this)},this)	

};
_t.prototype = Object.create(Phaser.BitmapText.prototype);
_t.prototype.constructor = _t;


//_t.prototype.show = function () {
//    this.text.scale.setTo(0, 0);
//    this.tween1 = game.add.tween(this.text.scale).to({ x: 1, y: 1 }, time_to_show_describe_text, Phaser.Easing.Linear.None, true, delay_for_show_describe_text);
//    this.tween1 = game.add.tween(this.text).to({ alpha: 1 }, time_to_show_describe_text, Phaser.Easing.Linear.None, true, delay_for_show_describe_text);
//    this.tween1.onComplete.add(this.hide, this);
//    this.tween1.onStart.add(function () { this.text.visible = true; }, this);
//};
//_t.prototype.show2 = function () {
//    this.text.visible = true;
//    this.text.scale.setTo(1, 0);
//    this.tween1 = game.add.tween(this.text.scale).to({ x: 1, y: 1 }, time_to_show_describe_text, Phaser.Easing.Linear.None, true, delay_for_game_begin - 400);
//    this.tween1 = game.add.tween(this.text).to({ alpha: 1 }, time_to_show_describe_text, Phaser.Easing.Linear.None, true, delay_for_game_begin - 400);
//};
//
//_t.prototype.hide = function () {
//    this.tween2 = game.add.tween(this.text.scale).to({ x: 1, y: 0 }, time_to_show_describe_text, Phaser.Easing.Linear.None, true, delay_for_hide_describe_text);
//    this.tween2 = game.add.tween(this.text).to({ alpha: 0 }, time_to_show_describe_text, Phaser.Easing.Linear.None, true, delay_for_hide_describe_text);
//};
