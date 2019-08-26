<?php

$domains = new SimpleXMLElement(file_get_contents('crossdomain.xml'));
$host = '';
$domainsAllowed = array();

foreach ($domains->{"allow-access-from"} as $domain) {
    foreach ($domain->attributes() as $domainTxt) {
        $domainsAllowed[] = $domainTxt->__toString();
    }
}

if ( isset($_SERVER['HTTP_ORIGIN']) )
    $host = parse_url($_SERVER['HTTP_ORIGIN']);

//if ( isset($_GET['api']) )
$widgetFolder = str_replace('w-chat', 'w', $_POST['widgetName']);

if ( $_POST['chatFolder'] == "request" ) {
	$_POST['widgetName'] = "templates/" . $_POST['template'] . "/" . $_POST['chatFolder'] . "/" . $_POST['chatFolder'];
}else {
	$_POST['widgetName'] = 'w-chat-ChatBot';
}

if ( !$host || in_array($host['host'], $domainsAllowed) ) {
    header('Access-Control-Allow-Origin: *');
    include( 'config.php' );
    include( $widgetFolder . '/' . $_POST['widgetName'] . '.php' );
}else{
    header('HTTP/1.1 403 Forbidden');
}