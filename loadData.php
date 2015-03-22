<?php
try {
	$pdo->beginTransaction();

	// Towers
	$query = $pdo->query('SELECT * FROM tower');
	
	$i = 0;
	while ($data = $query->fetch()) {
		echo '<span id="tower' . $i . '" style="display: none">' . $data['full_name'] . '</span>';
		$i++;
	}
	
	$query->closeCursor();
	
	// Enemies
	$query = $pdo->query('SELECT * FROM enemy');
	
	$i = 0;
	while ($data = $query->fetch()) {
		echo '<span id="enemy' . $i . '" style="display: none">' . $data['full_name'] . '</span>';
		$i++;
	}
	
	$query->closeCursor();
	
	$pdo->commit();
}
catch (Exception $e) {
	$pdo->rollback();
    throwPDOException($e);
}
?>