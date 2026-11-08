<?php
$p = 'public/index.php';
$s = file_get_contents($p);
if (strpos($s, 'SCRIPT_NAME') === false) {
    $s = str_replace('<?php', '<?php $_SERVER["SCRIPT_NAME"] = "/index.php"; $_SERVER["PHP_SELF"] = "/index.php";', $s, $count);
    file_put_contents($p, $s);
    echo "patched $count\n";
} else {
    echo "already\n";
}
