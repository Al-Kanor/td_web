var Enemy = function(scene, sprite, boss)
{
	var self = this;
	
	if(typeof(sprite) == "undefined")
	{
		return;
	}
	
	this.scene = scene;
	this.game = this.scene.game;
	
    this.speed = 0.06;
	this.x = 0;
	this.y = 0;
	
	this.index = 0;

	this.scale = 0.1;

	this.life = 1;
	
	this.goldGiven = 0;

	this.dest = null;
	this.sprite = sprite;
	
	this.move = [];
	this.moveIndex = 0;
	this.moveIndexMax = 3;

	this.isMoving = true;
	this.boss = boss;

	self.loadSprite(this.sprite);

	this.deadMonster = new Audio('res/sound/dead.mp3');
	this.lostLive = new Audio('res/sound/lost.mp3');
};

Enemy.prototype.placement = function (x, y)
{
	this.x = x;
	this.y = y;
	var dis = Math.sqrt(Math.pow(this.targetX - this.x, 2)+Math.pow(this.targetY - this.y, 2))
	if(dis < 10)
	{
		this.isMoving = true;
	}
};

Enemy.prototype.moveTo = function (move)
{
	if(this.moveIndex < this.moveIndexMax)
	{
		this.move = move;

		this.startX = this.x;
		this.startY = this.y;

		this.targetX = move[this.moveIndex][0];
		this.targetY = move[this.moveIndex][1];


		this.moveTime = this.game.timeData.local;
		
		var dis = Math.sqrt(Math.pow(this.targetX - this.startX, 2)+Math.pow(this.targetY - this.startY, 2)) //algorithm de la distance
		this.moveDuration = dis / (this.speed * this.scale);
		var str = "";

		this.moveIndex++;
	}
};

Enemy.prototype.loadSprite = function (srcImg)
{
	var self = this;
	var image = new Image();
	image.src = srcImg;
	this.currentSprite = image;
};

Enemy.prototype.update = function (timeData)
{
	if(this.moveTime && timeData.local < this.moveTime + this.moveDuration){
		var f = (timeData.local - this.moveTime)/this.moveDuration;
		
		/* easeIn>1 , 0>easeOut>1 */
		//f = Math.pow(f,0.6);

		this.placement(
			f * (this.targetX - this.startX) + this.startX,
			f * (this.targetY - this.startY) + this.startY
		);
		
	}
	else if (this.isMoving)
	{
		this.isMoving = false;
		this.moveTo(this.move);
	}
	else if (!this.isMoving)
	{
		this.lostLive.play();
	    this.scene.player.removeLife();
	    this.scene.removeEnemy(this);
		this.scene.currentNbEnemy --;
	}
};

Enemy.prototype.render = function (g)
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