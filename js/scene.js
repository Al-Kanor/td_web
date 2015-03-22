var scene = function(game)
{
	var self = this;
	this.game = game;
	
	this.background = new Image();
	this.background.src = "res/sprites/bg.png";
	
	this.towerList = [];
	this.index = 0;
	
	this.enemyList = [];
	this.indexEnemyList = 0;
	
	this.shootList = [];
	this.indexShootList = 0;

	var mouseX = 0;
	this.mouseY = 0;
	
	this.nextEnemyPop = 0;
	this.nbPopablEnemy = 10;
	this.currentNbEnemy = 0;

	this.game.canvas.addEventListener('click', function(e){
		//console.log("evolution");
		var offset = getOffset(game.canvas);
		self.create(e.clientX - offset.left, e.clientY - offset.top);
	});
	
	this.game.canvas.addEventListener('contextmenu', function(ev) {
		ev.preventDefault();
		console.log("placement");
		return false;
	}, false);
	
};

scene.prototype.popEnemy = function()
{
	var en = new enemy(this, "res/sprites/towers/Bhobo/bhobo_baby_petit.png"); 
	en.placement(-32, Math.random() * 600);
	en.moveTo(677, 372);
	
	this.enemyList[this.indexEnemyList] = en;
	this.indexEnemyList++;
}

scene.prototype.create = function(X,Y)
{
	var thetower = new landTower(this);
	thetower.placement(X, Y);
	console.log("tower.x:" + X);
	console.log("tower.y:" + Y);
	this.towerList[this.index] = thetower;
	this.index++;
}

scene.prototype.getEnemy = function () {
    return this.enemyList[0];
}

scene.prototype.add = function(tower)
{
	this.towerList[this.index] = tower;
	this.index++;
}

scene.prototype.update = function(timeData)
{
	if(timeData.local > this.nextEnemyPop)
	{
	    if (this.currentNbEnemy < this.nbPopablEnemy)
	    {
	        this.popEnemy();
	        this.nextEnemyPop = timeData.local + 3000;
	        this.currentNbEnemy++;
	    }
	}

	for(var i=0; i<this.towerList.length; i++)
	{
		this.towerList[i].update(timeData);
	}
	
	for(var i=0; i<this.enemyList.length; i++)
	{
	    this.enemyList[i].update(timeData);
	}

	for (var i = 0; i < this.shootList.length; i++) {
	    this.shootList[i].update(timeData);
	}
}

scene.prototype.render = function(g)
{
	g.save();
	
		//g.translate(-this.backgroundX, -this.backgroundY);
		
		g.drawImage(this.background, 0, 0);
		
		for(var i=0; i<this.towerList.length; i++)
		{
			this.towerList[i].render(g);
		}
		
		for(var i=0; i<this.enemyList.length; i++)
		{
			this.enemyList[i].render(g);
		}

		for (var i = 0; i < this.shootList.length; i++) {
			this.shootList[i].render(g);
		}
		
	g.restore();
};