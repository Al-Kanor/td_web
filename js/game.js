var Game = function()
{
	var self = this;
	
	this.canvas = document.getElementById('game');
	this.graphics = this.canvas.getContext('2d');

	this.canvas.width = Game.WIDTH;
	this.canvas.height = Game.HEIGHT;
	
	this.timeData = {
		global:Date.now(),
		globalDelta:0,
		local:0,
		localDelta:0
	};
	
	this.graphics.width = this.canvas.width;
	this.graphics.height = this.canvas.height;
	this.graphics.timeData = this.timeData;
	
	this.drawGrid(this.graphics);

	this.colNum = 16;
	this.rowNum = 11;
	this.caseSize = Game.WIDTH / this.colNum;

	console.log(this.colNum);
	console.log(this.rowNum);
	console.log(this.caseSize);

	this.scene = new Scene(this, level1);
	
	requestAnimationFrame(function loop(){
		self.mainLoop();
		requestAnimationFrame(loop);
	});
};

Game.WIDTH = 1024;
Game.HEIGHT = 672;

Game.prototype.mainLoop = function ()
{
	var now = Date.now();
	this.timeData.globalDelta = now - this.timeData.global;
	this.timeData.global = now;
	
	this.timeData.localDelta = Math.min(50,this.timeData.globalDelta);
	this.timeData.local += this.timeData.localDelta;
	
	this.update(this.timeData);
	this.render(this.graphics);
}

Game.prototype.update = function (timeData)
{
	this.scene.update(timeData);
};

Game.prototype.drawGrid = function (g)
{
    g.fillStyle = "red";
    g.beginPath();
    for (var col = 0; col <= this.colNum; col++) {
        for (var row = 0; row <= this.rowNum ; row++) {
            g.moveTo(col * this.caseSize, row * this.caseSize);
            g.lineTo((col * this.caseSize), (row * this.caseSize) + this.caseSize); // ligne verticale
            g.moveTo(col * this.caseSize, row * this.caseSize);
            g.lineTo((col * this.caseSize) + this.caseSize, (row * this.caseSize)); // ligne horizontale
        }
    }
    g.closePath();
    g.stroke();
}

Game.prototype.render = function (g)
{
	g.clearRect(0, 0, g.width, g.height);
	g.fillStyle = "red";
	g.fillRect(0, 0, g.width, g.height);

	this.scene.render(g);

	this.drawGrid(g);

	g.fillStyle = "red";
	g.font = "25px Verdana";
	g.fillText("LIVES : " + this.scene.player.life, 20, 30);
	g.fillText("GOLD : " + this.scene.player.gold, 300, 30);
};