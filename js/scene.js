var Scene = function(game, terrain)
{
	var self = this;
	this.game = game;
	
	this.background = new Image();
	this.background.src = "res/sprites/bg.png";
	
	this.towerList = [];
	this.index = 0;
	
	this.terrain = terrain;

	this.enemyList = [];
	this.indexEnemyList = 0;
	
	this.shootList = [];
	this.indexShootList = 0;

	var mouseX = 0;
	this.mouseY = 0;
	
	this.nextEnemyPop = 0;
	this.nbPopablEnemy = 10;
	this.currentNbEnemy = 0;

	this.player = new Player(this);

	this.game.canvas.addEventListener('click', function(e){
		var offset = getOffset(game.canvas);
		self.WorldToGrid(e.clientX - offset.left, e.clientY - offset.top, 0);
	});
	
	this.game.canvas.addEventListener('contextmenu', function(ev) {
	    ev.preventDefault();
	    var offset = getOffset(game.canvas);
		return false;
	}, false);
	
};

Scene.prototype.WorldToGrid = function(X,Y, action)
{
    var caseLength = this.game.caseSize;

    for(var i= 0; i < level1.length; i++) //lignes (y)
    {
        for (var j = 0; j < level1[i].length; j++) //colonnes (x)
        {
            if(i*caseLength < Y && (i*caseLength)+caseLength > Y && j*caseLength < X && (j*caseLength)+caseLength > X)
            {
                if(level1[i][j] == GroundType.EMPTY && action == 0)
                {
                    if (this.player.gold >= 100)
                    {
                        level1[i][j] = 3;
                        this.create((j * caseLength) + caseLength / 2, (i * caseLength) + caseLength / 2);
                        this.player.gold -= 100;
                    }
                }
                else if(level1[i][j] == GroundType.TOWER && action == 0)
                {
                    if (this.player.gold >= 500)
                    {
                        level1[i][j] = 4;
                        var theTower = this.getTower((j * caseLength) + caseLength / 2, (i * caseLength) + caseLength / 2);
                        theTower.evolve();
                        this.player.gold -= 500;
                   }
                }
            }
        }
    }
}

Scene.prototype.getTower = function(X, Y)
{
    for(var i=0; i < this.towerList.length; i++)
    {
        if (this.towerList[i].x == X && this.towerList[i].y == Y)
        {
            return this.towerList[i];
        }
    }
}

Scene.prototype.popEnemy = function ()
{
	var en = new Enemy(this, "res/sprites/towers/Bhobo/bhobo_baby_petit.png"); 
	en.placement(-32, Math.random() * 600);
	en.moveTo(677, 372);
	en.index = this.indexEnemyList;
	this.enemyList[this.indexEnemyList] = en;
	this.indexEnemyList++;
}

Scene.prototype.create = function (X, Y)
{
	var thetower = new LandTower(this);
	thetower.placement(X, Y);
	this.towerList[this.index] = thetower;
	this.index++;
}

Scene.prototype.getEnemy = function () {
    return this.enemyList[0];
}

Scene.prototype.add = function (tower)
{
	this.towerList[this.index] = tower;
	this.index++;
}

Scene.prototype.update = function (timeData)
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
		if(this.enemyList[i] != undefined)
			this.enemyList[i].update(timeData);
	}

	for (var i = 0; i < this.shootList.length; i++) {
	    if (this.shootList[i] != undefined)
	        this.shootList[i].update(timeData);
	}
}

Scene.prototype.render = function (g)
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
			if(this.enemyList[i] != undefined)
				this.enemyList[i].render(g);
		}

		for (var i = 0; i < this.shootList.length; i++) {
		    if (this.shootList[i] != undefined)
			    this.shootList[i].render(g);
		}
		
	g.restore();
};