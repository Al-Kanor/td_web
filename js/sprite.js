var Sprite = function(image)
{
	this.image = image;
}

Sprite.prototype.render = function (g)
{
	g.drawImage(this.image);
}