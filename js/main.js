window.addEventListener("load", function(){
	game = new Game();
});

function getOffset(elm)
{
	var offset = {
		left:0,
		top:0
	};
	do{
		offset.left += elm.offsetLeft;
		offset.top += elm.offsetTop;
	}while(elm = elm.offsetParent);
	
	return offset;
}