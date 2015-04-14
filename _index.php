<?php
include 'connection.php';
?>

<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="UTF-8"/>
		<title>td web</title>
        <script src="js/game.js"></script>
        <script src="js/GroundType.js"></script>
        <script src="js/Storage.js"></script>
        <script src="js/player.js"></script>
		<script src="js/projectile.js"></script>
		<script src="js/tower.js"></script>
		<script src="js/enemy.js"></script>
		<script src="js/landTower.js"></script>
		<script src="js/scene.js"></script>
		<script src="js/sprite.js"></script>
		<script src="js/main.js"></script>
		<script src="js/level-design.json"></script>
	</head>
	<body>
	<?php
	include 'loadData.php';
	?>
	<div id="screen">
		<canvas id="game"></canvas>
		<div id="gui">
			<div id="main-win" class="window">

			</div>
		</div>
	</div>
	</body>
</html>