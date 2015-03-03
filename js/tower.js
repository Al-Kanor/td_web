var tower = function(scene, sprite)
{
	var self = this;
	
	if(typeof(sprite) == "undefined")
	{
		return;
	}
	
	this.scene = scene;
	this.game = this.scene.game;
	
	this.speed = 500;
	this.lastShoot = 0;
	this.range = 5;
	this.evolution= 0;
	this.x = 0;
	this.y = 0;
	this.target = null;
	this.sprite = sprite;
	
	self.loadSprite(this.sprite);
};

tower.prototype.placement = function(x,y)
{
	this.x = x;
	this.y = y;
};

tower.prototype.tir = function()
{
	console.log("tir");
};

tower.prototype.evolution = function()
{
	
};

tower.prototype.loadSprite = function(srcImg)
{
	var self = this;
	var image = new Image();
	image.src = srcImg;
	this.currentSprite = image;
};

tower.prototype.update = function(timeData)
{
	if(self.game.timeData.global - this.lastShoot > 50)
	{
		this.tir();
		this.lastShoot = self.game.timeData.global;
	}
};

tower.prototype.render = function(g)
{
	g.save();
		g.translate(this.x, this.y);
		if(this.currentSprite)
		{
			g.scale(0.1, 0.1);
			g.drawImage(this.currentSprite, -this.currentSprite.width / 2, -this.currentSprite.height / 2);
		}
	g.restore();
};