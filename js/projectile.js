var Projectile = function(scene, sprite)
{
    var self = this;

    if (typeof (sprite) == "undefined") {
        return;
    }

    this.scene = scene;
    this.game = this.scene.game;

    this.speed = 3;
    this.scale = 0.1;

    this.sprite = sprite;

    this.index = 0;

    self.loadSprite(this.sprite);

    this.deadMonster = new Audio('res/sound/dead.mp3');
    //this.audio = new Audio('res/sound/bubble2.mp3');
    this.audio = new Audio('res/sound/arrow.mp3');
    this.audio.play();
}

Projectile.prototype.moveTo = function (X, Y) {
    this.startX = this.x;
    this.startY = this.y;
    this.targetX = X;
    this.targetY = Y;
    this.moveTime = this.game.timeData.local;

    var dis = Math.sqrt(Math.pow(this.targetX - this.startX, 2) + Math.pow(this.targetY - this.startY, 2)) //algorithm de la distance
    this.moveDuration = dis / (this.speed * this.scale);
    this.isMoving = true;
};

Projectile.prototype.loadSprite = function (srcImg) {
    var self = this;
    var image = new Image();
    image.src = srcImg;
    this.currentSprite = image;
};

Projectile.prototype.placement = function (x, y) {
    this.x = x;
    this.y = y;
};

Projectile.prototype.update = function (timeData)
{
    if (this.moveTime && timeData.local < this.moveTime + this.moveDuration) {
        var f = (timeData.local - this.moveTime) / this.moveDuration;

        /* easeIn>1 , 0>easeOut>1 */
        //f = Math.pow(f,0.6);

        this.placement(
			f * (this.targetX - this.startX) + this.startX,
			f * (this.targetY - this.startY) + this.startY);
		
		if (Math.abs(1 - f) < 0.1) {
			// Die !
		}
    }
    else if (this.isMoving) {
        this.isMoving = false;
        this.placement(this.targetX, this.targetY);
    }
	else if (!this.isMoving) {
		for(var i=0; i< this.scene.enemyList.length; i++)
		{
			if(this.scene.enemyList[i] != undefined)
		    {
			    var dest = this.lineDistance(this.scene.enemyList[i], this);
			    if (dest < 50)
			    {
			        this.scene.enemyList[i].life--;
			        if (this.scene.enemyList[i].life == 0)
			        {
                        this.deadMonster.play();
                        if(this.scene.enemyList[i].boss)
                        {
                            this.scene.player.life++;
                        }
                        this.scene.player.gold += this.scene.enemyList[i].goldGiven;
                        this.scene.enemyList[i].PrepareToDie();
						this.scene.currentNbEnemy--;
			            
						this.scene.player.score++;
			        }
				}
				this.scene.shootList[this.index] = null;
				return;
			}
		}
		this.scene.shootList[this.index] = null;
	}
}

Projectile.prototype.lineDistance = function (point1, point2)
{
  var xs = 0;
  var ys = 0;
 
  xs = point2.x - point1.x;
  xs = xs * xs;
 
  ys = point2.y - point1.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

Projectile.prototype.render = function (g) {
    g.save();
    g.translate(this.x, this.y);
    if (this.currentSprite) {
        g.scale(1, 1);
        g.drawImage(this.currentSprite, -this.currentSprite.width / 2, -this.currentSprite.height / 2);
    }
    g.restore();
};