
f.start_game = () => {

	f.prompt();
	f.create_main()
	//camera() // to zoom th game with keyboard up and down
	//f.random_division(330)
	co(o.opponent_actions)
	start_timer("a")
	//tw.searching_opponent = _tr(o.searching_opponent_tw)


	//here all the timer to start the succession of action
	var ev={//events
		t:[
			//premier temps dépend du timer de recherche de l'enemi
			t.animate_timer * 8 * (o.searching_opponent.number) * 2,
			// animation du ready
			t.cloud + o.cloud_tw[0].d,
			900,
			8000,
			500,
		]
	}
	//all events are sum to the previous
	ev.tc=[];
	let summed_actions = 0
	f.convert_events_time = () => {
		for (var i = 0; i < ev.t.length; i++){
			summed_actions += ev.t[i] 
			ev.tc.push(summed_actions)
		}
	}	

	f.convert_events_time()

	//animation pour faire apparaitre le nom de l'enemi
	f.start_cloud = () => {
		for (var i = 0; i < o.searching_opponent.length; i++){
			// faire disparaitre le timer de recherche de l'enemi






			o.searching_opponent[i].visible = false












		}
		//o.circle_search_opponent.alpha = 0
		for (let i = 0; i < o.cloud_length; i++) {
			//wait(() => { o.cloud[i].visible = true }, o.cloud_tw[0].d)
			//_tr(o.cloud_tw[i])
		}
		let tw_appears_enemy={
			o:interface[0],
			t:500,
			d:0,
			e:Phaser.Easing.Exponential.Out,
			sy:1,
			sx:1,
		}
		let tw_appears_progress={
			o:interface.progress[0],
			t:500,
			d:0,
			e:Phaser.Easing.Exponential.Out,
			sy:1,
			sx:1,
		}
		let tw_appears_roll={
			o:interface.roll[0],
			t:500,
			d:0,
			e:Phaser.Easing.Exponential.Out,
			sy:1,
			sx:1,
		}

		let tw_appears_expl={
			o:interface.puissance[0],
			t:500,
			d:0,
			e:Phaser.Easing.Exponential.Out,
			sy:1,
			sx:1,
		}
		let tw_appears_cirle_under_puissance={
			o:interface.explode_circle_under_puissance[0],
			t:500,
			d:0,
			e:Phaser.Easing.Exponential.Out,
			sy:1,
			sx:1,
		}
		let tw_appears_points={
			o:interface.points[0],
			t:500,
			d:0,
			e:Phaser.Easing.Exponential.Out,
			sy:1,
			sx:1,
		}
		let tw_appears_progress_bg={
			o:interface.progress[0].bg,
			t:500,
			d:0,
			e:Phaser.Easing.Exponential.Out,
			sy:1,
			sx:1,
		}
		let tw_appears_progress_main={
			o:interface.progress[0].main,
			t:500,
			d:0,
			e:Phaser.Easing.Exponential.Out,
			sy:1,
			sx:1,
		}
		//À RÉTABLIR
		wait(()=>{pop.play()},o.cloud_tw[0].d-70)
		wait(() => { interface[0].visible = true }, o.cloud_tw[0].d)
		wait(() => { _tr(tw_appears_enemy) }, o.cloud_tw[0].d)

		wait(() => { interface[0].puissance.visible = true }, o.cloud_tw[0].d)
		wait(() => { _tr(tw_appears_expl) }, o.cloud_tw[0].d)


		wait(() => { interface[0].explode_circle_under_puissance.visible = true }, o.cloud_tw[0].d)
		wait(() => { _tr(tw_appears_cirle_under_puissance) }, o.cloud_tw[0].d)


		wait(() => { interface.roll[0].visible = true }, o.cloud_tw[0].d)
		wait(() => { _tr(tw_appears_roll) }, o.cloud_tw[0].d)
		wait(() => { interface.points[0].visible = true }, o.cloud_tw[0].d)
		wait(() => { _tr(tw_appears_points) }, o.cloud_tw[0].d)

		wait(() => { interface.puissance[0].visible = true }, o.cloud_tw[0].d)
		wait(() => { _tr(tw_appears_puissance) }, o.cloud_tw[0].d)

		wait(() => { interface.progress[0].visible = true }, o.cloud_tw[0].d)
		//pour que le pointer apparaisse en même temps que l'enemy
		wait(() => { o.click.visible = true }, o.cloud_tw[0].d)
		//progress bar de l'enemy
		wait(() => { _tr(tw_appears_progress_bg) }, o.cloud_tw[0].d)
		wait(() => { _tr(tw_appears_progress_main) }, o.cloud_tw[0].d)


	}

	// compte à rebours pour lancer le jeu
	f.start_timer = ()=>{
		interface.decount.visible=true
		var ready = ()=>{
			interface.decount.text = "ready"
			o.ready_tw = {
				o: interface.decount, //object
				t: 900, //time
				d: 100, //delay
				//a: 1, //alpha
				e: Phaser.Easing.Exponential.Out, //Easing
				r: 0, //rotation
				//dx: 2.5,
				dx: w2,
				dy: h2*.5,
				y: true,
			}
			_tr(o.ready_tw)
		}
		//wait(decount,700)
		//wait(decount,1400)
		wait(ready,100)
		//wait(()=>{interface.decount.visible=false},800)
	}



	tw_click=game.add.tween(o.click.scale).to({ x: .4, y :.4 }, 200, Phaser.Easing.Linear.None, true, 0, -1, true);

	//appel des differents events avec les time_converted spécifique
	wait(f.start_cloud,ev.tc[0])
	wait(()=>{interface.progress[0].main.visible=true},ev.tc[0])
	wait(()=>{interface.progress[0].bg.visible=true},ev.tc[0])
	wait(f.start_timer,ev.tc[1])

	wait(()=>{f.wait_start_game(o.paper[0], 0)},ev.tc[2])
	wait(()=>{f.wait_start_game(o.paper[1], 0)},ev.tc[2])
	wait(f.input, ev.tc[2])
	//wait(f.stop_opponent, t.start_game + t.start_opponent)
	//wait(() => { o.paper[0].body.moves = false; o.paper[0].flag_dont_move = true }, t.start_opponent)









	//wait(f.check_distance, ev.tc[3])



















	// pour que le button restart apparaisse après check_distance => ev.tc[4]
	//wait(()=>{interface.restart.visible=true}, ev.tc[4])
	//wait(() => { f.show_looser(o.looser_tw_1) }, ev.tc[3])
	flag.start_game=true

	//animation des papiers vers le joueur gagnant
	//wait(()=>{f.anim_paper_winner(interface.roll_0.x)},8000)
}
