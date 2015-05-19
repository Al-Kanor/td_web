var Player = function(scene)
{
	this.scene = scene;
  this.init();
}

Player.prototype.removeLife = function ()
{
   
   if(this.life > 0)
   {
		this.life -= 1;
   }
   
   if (0 == this.life)
   {
       console.log("perdu");
	   this.scene.reset();
   }
}

Player.prototype.init = function ()
{
	this.life = 20;
  this.gold = 500;
	this.score = 0;
}