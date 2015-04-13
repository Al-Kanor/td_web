var Player = function(scene)
{
    this.life = 20;
    this.gold = 1000;
	this.score = 0;
}

Player.prototype.removeLife = function ()
{
   this.life - Math.min (this.life - 1, 0);
   
   if (0 == this.life)
   {
       console.log("perdu");
   }
}