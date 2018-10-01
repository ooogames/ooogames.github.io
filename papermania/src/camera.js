var camera = () => {
    game.world.scale.y = .3
    game.world.scale.x = .3
    game.world.setBounds(1100, 0, 2000, 2000);
    scale_world = () => {
        game.world.scale.y = .3
        game.world.scale.x = .3
        game.world.setBounds(1100, 0, 2000, 2000);
    }
    reset_scale_world = () => {
        game.world.scale.y = 1
        game.world.scale.x = 1
        game.world.setBounds(0, 0, 1580, 2380);
    }
    game.world.setBounds(1100, 2000, 2000, 2000);
    cursors = game.input.keyboard.createCursorKeys();

    var loop_f = () => {
        if (cursors.left.isDown) {
            game.camera.x -= 2;
        }
        else if (cursors.right.isDown) {
            game.camera.x += 2;
        }

        if (cursors.up.isDown) {
            scale_world()
            game.camera.y -= 2;
        }
        else if (cursors.down.isDown) {
            game.camera.y += 2;
            reset_scale_world()
        }

    }
    game.time.events.loop(10, loop_f)
}