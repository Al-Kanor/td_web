<?php
try {
	$pdo->beginTransaction();

	$query = $pdo->query('SELECT * FROM tower');
	
	$i = 0;
	while ($data = $query->fetch()) {
		echo '<span id="tower' . $i . '" style="display: none">' . $data['full_name'] . '</span>';
	}
	
	$query->closeCursor();
	$pdo->commit();
}
catch (Exception $e) {
	$pdo->rollback();
    throwPDOException($e);
}
?>