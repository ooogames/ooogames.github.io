_p = (p)=>{
	co(p)
	p.x != null ? p.x = p.x : p.x = 0
	p.y != null ? p.y = p.y : p.y = 0
	p.max != null ? p.max = p.max : p.max = [1900,-1900] 
	p.min != null ? p.min = p.min : p.min = [-1900,1900] 
	p.repeat != null ? p.repeat = p.repeat : p.repeat = 100
	p.lifetime != null ? p.lifetime = p.lifetime : p.lifetime = 1000
	p.alpha != null ? p.alpha = p.alpha : p.alpha = [.5,.1]
	p.min_particle_scale != null ? p.min_particle_scale = p.min_particle_scale : p.min_particle_scale = .1
	p.max_particel_scale != null ? p.max_particel_scale = p.max_particel_scale : p.max_particel_scale = .5
	p.min_rotation != null ? p.min_rotation = p.min_rotation : p.min_rotation =  0
	p.max_rotation != null ? p.max_rotation = p.max_rotation : p.max_rotation =  0
	p.number != null ? p.number = p.number : p.number = 20
	p.particle_per_frame != null ? p.particle_per_frame = p.particle_per_frame : p.particle_per_frame = .0020

	p.name = game.add.emitter(p.x,p.y,p.number);
	p.name.makeParticles(p.image);
	p.name.maxParticleSpeed.setTo(p.max[0],p.max[1]);
	p.name.minParticleSpeed.setTo(p.min[0],p.min[1]);
	p.name.setAlpha(p.alpha[0],p.alpha[1]);
	p.name.minParticleScale = 0.1;
	p.name.maxParticleScale = 0.4;
	p.name.minRotation = 0;
	p.name.maxRotation = 0;
	p.name.on=false;

	//to start one time the particles
	p.start = function () {
		p.name.start(true,p.lifetime,null,p.particle_per_frame)	
		//p.name.x = random(0,800)
		//p.name.y = random(0,800)
	}
	//to repeat the particles
	p.loop = function () {
		game.time.events.loop( p.repeat,p.start,this );
	}
}

