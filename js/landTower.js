var LandTower = function(scene)
{
	var self = this;
	Tower.call(this, scene, "res/sprites/towers/Awa/awa_baby_petit.png");
	this.game = this.scene.game;
};

LandTower.prototype = new Tower();

LandTower.prototype.evolve = function()
{
    this.loadSprite("res/sprites/towers/Awa/awa_young.png");
    this.evolution = 1;
    this.timeToShoot = 500;
}
