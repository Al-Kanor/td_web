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
	this.deathImage = new Image();
	this.deathImage.src = "res/sprites/death.png";

	this.deathRow = 1;
	this.deathCol = 5;
	this.frameRate = 16;
	this.frameDuration = 1 / this.frameRate * 1000;
	this.frameCount = this.deathCol * this.deathRow;
	this.currentFrame = 0;
	this.frameWidth = this.deathImage.width / this.deathCol;
	this.frameHeight = this.deathImage.height / this.deathRow;
	this.lastFrameUpdate = 0;
	this.deathX = 0;
	this.deathY = 0;

	this.deathListener = {};

	this.dead = false;

	this.deadMonster = new Audio('res/sound/dead.mp3');
	this.lostLive = new Audio('res/sound/lost.mp3');
};

Enemy.prototype.addMoveListener = function(listener)
{
	this.deathListener.push(listener);
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
	if (this.dead) return;
	
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
		this.PrepareToDie();
		this.scene.player.removeLife();
	}
};

Enemy.prototype.PrepareToDie = function()
{
	this.dead = true;
	this.deathX = this.x;
	this.deathY = this.y;
}

Enemy.prototype.remove = function()
{
    this.scene.removeEnemy(this);
	this.scene.currentNbEnemy --;
}

Enemy.prototype.render = function (g)
{
	g.save();
		g.translate(this.x, this.y);
		if(this.currentSprite)
		{
		    g.scale(1, 1);

		    if(this.dead)
		    {
				var elapsedTime = g.timeData.local - this.lastFrameUpdate;

				if(elapsedTime >= this.frameDuration)
				{
					this.elapsedFrame = Math.floor(elapsedTime / this.frameDuration);
					
					if(this.currentFrame == this.frameCount - 1)
					{
						this.remove();
					}
					else
					{
						this.currentFrame = (this.currentFrame + this.elapsedFrame) % this.frameCount;
					}

					this.lastFrameUpdate = g.timeData.local;
				}
				
				var currentCol = this.currentFrame % this.deathCol;
				var currentRow = Math.floor(this.currentFrame / this.deathCol);

				g.drawImage(this.deathImage, 
					this.currentFrame * currentCol, 0, this.frameWidth, this.frameHeight,
					0 - this.frameWidth / 2, 0 - this.frameHeight / 2, this.frameWidth, this.frameHeight
				);

			}
			else
			{
		    	g.drawImage(this.currentSprite, -this.currentSprite.width / 2, -this.currentSprite.height / 2);
		    }
		}
	g.restore();
};