var sprite = function(image)
{
	this.image = image;
}

sprite.prototype.render = function(g)
{
	g.drawImage(this.image);
}