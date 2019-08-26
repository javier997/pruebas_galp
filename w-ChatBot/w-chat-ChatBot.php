<?php

// Definición de variables

$response = array('error' => 0, 'errorMsg' => '', 'tpl' => '');

$options = array(
    'lang'             => isset($_POST['lang']) ? $_POST['lang'] : 'es',
    'template'      => isset($_POST['template']) ? $_POST['template'] : 'default',
);

// DIR Template


$dirTemplate = $dir . 'templates/' . $options['template'] . '/';
$widgetUrl .= 'templates/' . $options['template'] . '/';


// Parce TPL
$tpl = file_get_contents($dirTemplate . 'tpl.php');

$replaces = array(
    '{{url}}' => $widgetUrl,
);

$tpl = str_replace(array_keys($replaces), array_values($replaces), $tpl);

$response['tpl'] = $tpl;

echo json_encode($response);
