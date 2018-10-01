e.arrow = (game) => {
    //game.add.tween(o.arrow[0]).to({ alpha: .7 }, 2000, Phaser.Easing.Linear.None, true);

    //game.time.events.loop(20, function () {
    //game.add.tween(o.mask[0]).to({ width: (o.mask[0].width + 15) }, 20, Phaser.Easing.Linear.None, true);
    //}, this);
    //game.add.tween(o.click.scale).to({ x: 7, y: 7 }, 2000, Phaser.Easing.Bounce.out, true);
    //game.add.tween(o.arrow[1]).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.out, true);
    //game.add.tween(o.arrow[1].scale).to({ x: 1 }, 2000, Phaser.Easing.Bounce.out, true);

    //game.time.events.loop(20, function () {
    //    game.add.tween(o.mask[1]).to({ width: (o.mask[1].width - 15) }, 20, Phaser.Easing.Linear.None, true);
    //}, this);

}

e.arrow_update = (obj) => {
    //obj.updateCrop();
    //obj.y = o.click.y
}


e.cloud_appears = () => {
    for (let i = 0; i < 4; i++) {
        o.cloud[i].alpha = 1
        //o.cloud[i].scale.x = random(1, 3)
        //o.cloud[i].scale.y = o.cloud[i].scale.x
    }


}