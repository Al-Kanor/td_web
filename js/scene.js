var scene = function(game)
{
	var self = this;
	this.game = game;
	
	this.towerList = [];
	this.index = 0;
	
	this.enemyList = [];
	this.indexEnemyList = 0;
	
	var mouseX = 0;
	this.mouseY = 0;
	
	this.nextEnemyPop = 0;
	
	this.game.canvas.addEventListener('click', function(e){
		console.log("evolution");
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
	var en = new enemy(self, "res/sprites/towers/Bhobo/bhobo_baby.png");
	en.placement(100, 100);
	en.moveTo(600,600);
	
	this.enemyList[this.indexEnemyList] = en;
	this.indexEnemyList++;
}

scene.prototype.create = function(X,Y)
{
	var thetower = new landTower(self);
	thetower.placement(X,Y);
	this.towerList[this.index] = thetower;
	this.index++;
}

scene.prototype.add = function(tower)
{
	this.towerList[this.index] = tower;
	this.index ++;
}

scene.prototype.update = function(timeData)
{
	if(timeData.local > this.nextEnemyPop)
	{
		this.popEnemy();
		this.nextEnemyPop = timeData.local + 500;
	}

	for(var i=0; i<this.towerList.length; i++)
	{
		this.towerList[i].update(timeData);
	}
	
	for(var i=0; i<this.enemyList.length; i++)
	{
		this.enemyList[i].update(timeData);
	}
}

scene.prototype.render = function(g)
{
	for(var i=0; i<this.towerList.length; i++)
	{
		this.towerList[i].render(g);
	}
	
	for(var i=0; i<this.enemyList.length; i++)
	{
		this.enemyList[i].render(g);
	}
}