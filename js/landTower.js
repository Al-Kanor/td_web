var LandTower = function(scene)
{
	var self = this;
	Tower.call(this, scene, "res/sprites/towers/Awa/awa_baby_petit.png");
	this.game = this.scene.game;
};

LandTower.prototype = new Tower();

LandTower.prototype.evolve = function()
{
	switch (this.evolution) {
		case 0:
		    this.loadSprite("res/sprites/towers/Awa/awa_young.png");
		    this.timeToShoot = 500;
		    this.cost = 3000;
		    break;
		case 1:
			this.loadSprite("res/sprites/towers/Awa/awa_adult.png");
		    this.timeToShoot = 200;
		    break;
	}
	this.evolution ++;
}
