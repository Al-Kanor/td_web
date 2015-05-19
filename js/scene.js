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
	
	this.nbEnemies = 19;	// Number of different existing creatures
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


	this.audio = new Audio('res/sound/w3.mp3');
	this.audio.loop = true;
	this.audio.play();
};

//action 0 : placement, action 1 : recuperation de la case
Scene.prototype.WorldToGrid = function(X,Y, action)
{
    var caseLength = this.game.caseSize;

    for(var i= 0; i < level1.length; i++) //lignes (y)
    {
        for (var j = 0; j < level1[i].length; j++) //colonnes (x)
        {
            if(i*caseLength < Y && (i*caseLength)+caseLength > Y && j*caseLength < X && (j*caseLength)+caseLength > X)
            {
                if(level1[i][j] == GroundType.TREE && action == 0)
                {
                    if (this.player.gold >= 100)
                    {
                        level1[i][j] = 3;
                        this.create((j * caseLength) + caseLength / 2, (i * caseLength) + caseLength / 2);
                        this.player.gold -= 100;
                    }
                }
                else if(level1[i][j] == GroundType.GRADE1 || level1[i][j] == GroundType.GRADE2 && action == 0)
                {
                	var theTower = this.getTower((j * caseLength) + caseLength / 2, (i * caseLength) + caseLength / 2);
                    if (this.player.gold >= theTower.cost)
                    {
                        level1[i][j] ++;    
                        theTower.evolve();
                        this.player.gold -= theTower.cost;
                   }
                }
                else if(level1[i][j] == GroundType.EMPTY && action == 1)
                {
                	return level1[i][j];
                }
            }
        }
    }
}

Scene.prototype.reset = function()
{
    this.towerList = [];
	this.index = 0;

	this.enemyList = [];
	this.indexEnemyList = 0;
	
	this.shootList = [];
	this.indexShootList = 0;
	
	this.player.init();
	
	level1 = [
		[1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1],
		[1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1],
		[0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,0],
		[0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0],
		[0,0,1,0,1,0,0,0,0,1,0,0,0,2,0,0],
		[1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1]
	];
	
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
	var rand = Math.floor (Math.random () * this.nbEnemies + 1);
	var score = this.game.scene.player.score;
	var boss = false;
	if (score < 10) {
		var level = 1;
	}
	else if (score < 20) {
		var level = 2;
	}
	else {
		var level = 3;
	}
	switch (rand) {
		case 0:
			switch (level) {
				case 1:
					var enemyStr = "Agoros/agoros_baby_small.png";
					var speed = 200/500;
					var life = 3;
					break;
				case 2:
					var enemyStr = "Agoros/agoros_young_small.png";
					var speed = 150/500;
					var life = 6;
					break;
				case 3:
					var enemyStr = "Agoros/agoros_adult_small.png";
					var speed = 100/500;
					var life = 9;
					break;
			}
			break;
		case 1:
			switch (level) {
				case 1:
					var enemyStr = "Bhobo/bhobo_baby_small.png";
					var speed = 150/500;
					var life = 4;
					break;
				case 2:
					var enemyStr = "Bhobo/bhobo_young_small.png";
					var speed = 100/500;
					var life = 10;
					break;
				case 3:
					var enemyStr = "Bhobo/bhobo_adult_small.png";
					var speed = 50/500;
					var life = 16;
					break;
			}
			break;
		case 2:
			switch (level) {
				case 1:
					var enemyStr = "Bugjo/bugjo_baby_small.png";
					var speed = 300/500;
					var life = 1;
					break;
				case 2:
					var enemyStr = "Bugjo/bugjo_young_small.png";
					var speed = 400/500;
					var life = 6;
					break;
				case 3:
					var enemyStr = "Bugjo/bugjo_adult_small.png";
					var speed = 500/500;
					var life = 8;
					break;		
				}
			break;
		case 3:
			switch (level) {
				case 1:
					var enemyStr = "Deathkoogo/deathkoogo_baby_small.png";
					var speed = 200/500;
					var life = 3;
					break;
				case 2:
					var enemyStr = "Deathkoogo/deathkoogo_young_small.png";
					var speed = 150/500;
					var life = 6;
					break;
				case 3:
					var enemyStr = "Deathkoogo/deathkoogo_adult_small.png";
					var speed = 100/500;
					var life = 9;
					break;
			}
			break;
		case 4:
			switch (level) {
				case 1:
					var enemyStr = "Dudamo/dudamo_baby_small.png";
					var speed = 150/500;
					var life = 4;
					break;
				case 2:
					var enemyStr = "Dudamo/dudamo_young_small.png";
					var speed = 100/500;
					var life = 10;
					break;
				case 3:
					var enemyStr = "Dudamo/dudamo_adult_small.png";
					var speed = 50/500;
					var life = 16;
					break;
			}
			break;
		case 5:
			switch (level) {
				case 1:
					var enemyStr = "Godjaho/godjaho_baby_small.png";
					var speed = 300/500;
					var life = 1;
					break;
				case 2:
					var enemyStr = "Godjaho/godjaho_young_small.png";
					var speed = 400/500;
					var life = 6;
					break;
				case 3:
					var enemyStr = "Godjaho/godjaho_adult_small.png";
					var speed = 500/500;
					var life = 8;
					break;
			}
			break;
		case 6:
			switch (level) {
				case 1:
					var enemyStr = "Gourouzad/gourouzad_baby_small.png";
					var speed = 200/500;
					var life = 3;
					break;
				case 2:
					var enemyStr = "Gourouzad/gourouzad_young_small.png";
					var speed = 150/500;
					var life = 6;
					break;
				case 3:
					var enemyStr = "Gourouzad/gourouzad_adult_small.png";
					var speed = 100/500;
					var life = 9;
					break;
			}
			break;
		case 7:
			switch (level) {
				case 1:
					var enemyStr = "Govamey/govamey_baby_small.png";
					var speed = 150/500;
					var life = 4;
					break;
				case 2:
					var enemyStr = "Govamey/govamey_young_small.png";
					var speed = 100/500;
					var life = 10;
					break;
				case 3:
					var enemyStr = "Govamey/govamey_adult_small.png";
					var speed = 50/500;
					var life = 16;
					break;
			}
			break;
		case 8:
			switch (level) {
				case 1:
					var enemyStr = "Jahar/jahar_baby_small.png";
					var speed = 300/500;
					var life = 1;
					break;
				case 2:
					var enemyStr = "Jahar/jahar_young_small.png";
					var speed = 400/500;
					var life = 6;
					break;
				case 3:
					var enemyStr = "Jahar/jahar_adult_small.png";
					var speed = 500/500;
					var life = 8;
					break;
			}
			break;
		case 9:
			switch (level) {
				case 1:
					var enemyStr = "Leviarkna/leviarkna_baby_small.png";
					var speed = 200/500;
					var life = 3;
					break;
				case 2:
					var enemyStr = "Leviarkna/leviarkna_young_small.png";
					var speed = 150/500;
					var life = 6;
					break;
				case 3:
					var enemyStr = "Leviarkna/leviarkna_adult_small.png";
					var speed = 100/500;
					var life = 9;
					break;
			}
			break;
		case 10:
			switch (level) {
				case 1:
					var enemyStr = "Modraemi/modraemi_baby_small.png";
					var speed = 150/500;
					var life = 4;
					break;
				case 2:
					var enemyStr = "Modraemi/modraemi_young_small.png";
					var speed = 100/500;
					var life = 10;
					break;
				case 3:
					var enemyStr = "Modraemi/modraemi_adult_small.png";
					var speed = 50/500;
					var life = 16;
					break;
			}
			break;
		case 11:
			switch (level) {
				case 1:
					var enemyStr = "Odaguda/odaguda_baby_small.png";
					var speed = 300/500;
					var life = 1;
					break;
				case 2:
					var enemyStr = "Odaguda/odaguda_young_small.png";
					var speed = 400/500;
					var life = 6;
					break;
				case 3:
					var enemyStr = "Odaguda/odaguda_adult_small.png";
					var speed = 500/500;
					var life = 8;
					break;
			}
			break;
		case 12:
			switch (level) {
				case 1:
					var enemyStr = "Shadoa/shadoa_baby_small.png";
					var speed = 200/500;
					var life = 3;
					break;
				case 2:
					var enemyStr = "Shadoa/shadoa_young_small.png";
					var speed = 150/500;
					var life = 6;
					break;
				case 3:
					var enemyStr = "Shadoa/shadoa_adult_small.png";
					var speed = 100/500;
					var life = 9;
					break;
			}
			break;
		case 13:
			switch (level) {
				case 1:
					var enemyStr = "Urajam/urajam_baby_small.png";
					var speed = 150/500;
					var life = 4;
					break;
				case 2:
					var enemyStr = "Urajam/urajam_young_small.png";
					var speed = 100/500;
					var life = 10;
					break;
				case 3:
					var enemyStr = "Urajam/urajam_adult_small.png";
					var speed = 50/500;
					var life = 16;
					break;
			}
			break;
		case 14:
			switch (level) {
				case 1:
					var enemyStr = "Zyukiran/zyukiran_baby_small.png";
					var speed = 300/500;
					var life = 1;
					break;
				case 2:
					var enemyStr = "Zyukiran/zyukiran_young_small.png";
					var speed = 400/500;
					var life = 6;
					break;
				case 3:
					var enemyStr = "Zyukiran/zyukiran_adult_small.png";
					var speed = 500/500;
					var life = 8;
					break;
			}
			break;
		case 15:
			var enemyStr = "../boss/bezelvice_small.png";
			var speed = 50/500;
			var life = 100;
			boss = true;
			break;
		case 16:
			var enemyStr = "../boss/deusexachina_small.png";
			var speed = 200/500;
			var life = 30;
			boss = true;
			break;
		case 17:
			var enemyStr = "../boss/dioegenes_small.png";
			var speed = 400/500;
			var life = 10;
			boss = true;
			break;
		case 18:
			var enemyStr = "../boss/dioegenes_small.png";
			var speed = 250/500;
			var life = 50;
			boss = true;
			break;
	}
	var en = new Enemy(this, "res/sprites/enemies/" + enemyStr, boss); 
	en.speed = speed;
	en.life = life;// * 2;
	en.goldGiven = en.life * 20;

	var caseLength = this.game.caseSize;
	var pattern = Math.floor(Math.random() * 3);
	var move = [];
	switch (pattern) {
		case 0:
			en.placement(-32, this.game.caseSize * 4 + this.game.caseSize / 2);
			move[0] = [1 * caseLength + caseLength / 2, 4 * caseLength + caseLength / 2];
			move[1] = [1 * caseLength + caseLength / 2, 2 * caseLength + caseLength / 2];
			move[2] = [12 * caseLength + caseLength / 2, 2 * caseLength + caseLength / 2];
			move[3] = [12 * caseLength + caseLength / 2, 6 * caseLength + caseLength / 2];
			move[4] = [13 * caseLength + caseLength / 2, 6 * caseLength + caseLength / 2];
			break;
		case 1:
			en.placement(-32, this.game.caseSize * 5 + this.game.caseSize / 2);
			move[0] = [5 * caseLength + caseLength / 2, 5 * caseLength + caseLength / 2];
			move[1] = [5 * caseLength + caseLength / 2, 6 * caseLength + caseLength / 2];
			move[2] = [8 * caseLength + caseLength / 2, 6 * caseLength + caseLength / 2];
			move[3] = [8 * caseLength + caseLength / 2, 5 * caseLength + caseLength / 2];
			move[4] = [10 * caseLength + caseLength / 2, 5 * caseLength + caseLength / 2];
			move[5] = [10 * caseLength + caseLength / 2, 6 * caseLength + caseLength / 2];
			move[6] = [13 * caseLength + caseLength / 2, 6 * caseLength + caseLength / 2];
			break;
		case 2:
			en.placement(-32, this.game.caseSize * 6 + this.game.caseSize / 2);
			move[0] = [1 * caseLength + caseLength / 2, 6 * caseLength + caseLength / 2];
			move[1] = [1 * caseLength + caseLength / 2, 8 * caseLength + caseLength / 2];
			move[2] = [13 * caseLength + caseLength / 2, 8 * caseLength + caseLength / 2];
			move[3] = [13 * caseLength + caseLength / 2, 6 * caseLength + caseLength / 2];
			break;
	}
	en.moveIndexMax = move.length;
	en.index = this.indexEnemyList;
	this.enemyList[this.indexEnemyList] = en;
	en.move = move;
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
		{
			this.enemyList[i].update(timeData);
		}
	}

	for (var i = 0; i < this.shootList.length; i++) {
	    if (this.shootList[i] != undefined)
	        this.shootList[i].update(timeData);
	}
}

Scene.prototype.removeEnemy = function (en)
{
	for(var i=0; i<this.enemyList.length; i++)
		{
			if(this.enemyList[i] == en)
			{
				this.enemyList[i] = null;
			}
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
			{
				this.enemyList[i].render(g);
			}
		}

		for (var i = 0; i < this.shootList.length; i++) {
		    if (this.shootList[i] != undefined)
			    this.shootList[i].render(g);
		}
		
	g.restore();
};