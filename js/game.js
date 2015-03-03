var game = function()
{
	console.log("game created");
	var self = this;
	
	this.canvas = document.getElementById('game');
	this.graphics = this.canvas.getContext('2d');
	
	this.canvas.width = game.WIDTH;
	this.canvas.height = game.HEIGHT;
	
	this.timeData = {
		global:Date.now(),
		globalDelta:0,
		local:0,
		localDelta:0
	};
	
	this.graphics.width = this.canvas.width;
	this.graphics.height = this.canvas.height;
	this.graphics.timeData = this.timeData;
	
	this.scene = new scene(this);
	
	requestAnimationFrame(function loop(){
		self.mainLoop();
		requestAnimationFrame(loop);
	});
};

game.WIDTH = 800;
game.HEIGHT = 600;

game.prototype.mainLoop = function()
{
	var now = Date.now();
	this.timeData.globalDelta = now - this.timeData.global;
	this.timeData.global = now;
	
	this.timeData.localDelta = Math.min(50,this.timeData.globalDelta);
	this.timeData.local += this.timeData.localDelta;
	
	this.update(this.timeData);
	this.render(this.graphics);
}

game.prototype.update = function(timeData)
{
	this.scene.update(timeData);
};

game.prototype.render = function(g)
{
	g.clearRect(0, 0, g.width, g.height);
	g.fillStyle = "red";
	g.fillRect(0, 0, g.width, g.height);
	
	this.scene.render(g);
};