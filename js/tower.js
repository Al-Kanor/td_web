var Tower = function(scene, sprite)
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
	this.timeToShoot = 1000;
	this.evolution= 0;
	this.x = 0;
	this.y = 0;
	this.target = null;
	this.sprite = sprite;
	
	this.target = null;
	self.loadSprite(this.sprite);
};

Tower.prototype.placement = function (x, y)
{
	this.x = x;
	this.y = y;
};

Tower.prototype.tir = function ()
{
    if (this.scene.enemyList.length > 0)
    {
        this.index = 0;
        this.target = this.scene.enemyList[this.index];
        this.dist = 500;
        if (this.target != undefined)
        {
            this.dist = Math.sqrt(Math.pow((this.target.x - this.x), 2) + Math.pow((this.target.y - this.y),2));
        }
        while (this.target == undefined || this.dist > 200)
        {
            this.index++;
            this.target = this.scene.enemyList[this.index];
            if (this.target != undefined)
            {
                this.dist = Math.sqrt(((this.target.x - this.x) * (this.target.x - this.x)) + ((this.target.y - this.y) * (this.target.y - this.y)));
            }
            if (this.index == 100)
            {
                this.target = null;
                break;
            }
        }
	    if(this.target != null)
	    {
		    var tir = new Projectile(this.scene, "res/sprites/tir.png");
		    tir.placement(this.x, this.y);
		    tir.moveTo(this.target.x, this.target.y);
		    tir.index = this.scene.indexShootList;
		    this.scene.shootList[this.scene.indexShootList] = tir;
		    this.scene.indexShootList++;
	    }
    }
};

Tower.prototype.evolution = function ()
{
	
};

Tower.prototype.loadSprite = function (srcImg)
{
	var self = this;
	var image = new Image();
	image.src = srcImg;
	this.currentSprite = image;
};

Tower.prototype.update = function (timeData)
{
    if (self.game.timeData.global - this.lastShoot > this.timeToShoot)
	{
		this.tir();
		this.lastShoot = self.game.timeData.global;
	}
};

Tower.prototype.render = function (g)
{
	g.save();
		g.translate(this.x, this.y);
		if(this.currentSprite)
		{
			g.scale(1, 1);
			g.drawImage(this.currentSprite, -this.currentSprite.width / 2, -this.currentSprite.height / 2);
		}
	g.restore();
};