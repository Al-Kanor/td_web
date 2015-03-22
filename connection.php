<?php
function throwPDOException (Exception $e) {
	echo 'ERROR #' . $e->getCode() . ': ' . $e->getMessage() . '<br/>';
    exit();
}

try {
	$pdo = new PDO('mysql:host=localhost;dbname=td', 'root', null);
}
catch (Exception $e) {
    throwPDOException($e);
}
?>