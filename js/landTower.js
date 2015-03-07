var landTower = function(scene)
{
	var self = this;
	tower.call(this, scene, "res/sprites/towers/Awa/awa_baby_petit.png");
	this.game = this.scene.game;
};

landTower.prototype = new tower();
