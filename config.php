<?php

$dir = str_replace('w-chat', 'w', $_POST['widgetName']) . '/'; // en el widgetName reemplazamos w-chat por w
$query = $_SERVER['PHP_SELF'];// obtengo el archivo que se ejecuta actualmente
$path = pathinfo( $query );
$widgetUrl = "http://{$_SERVER['SERVER_NAME']}" . ":8080" . "{$path['dirname']}/{$_POST['widgetName']}/";
$widgetName = $path['filename'];
$tpl = '';

//$cache = new Memcached();
//$cache->addServer('localhost', 11211);