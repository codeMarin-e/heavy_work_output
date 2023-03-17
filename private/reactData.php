<?php

	include dirname(__DIR__).'/vendor/autoload.php';
	define('EOL', ( php_sapi_name() == 'cli' ? PHP_EOL : '<br />' ));


	$GLOBALS['server'] = IoServer::factory(
	    new HttpServer(
            new WsServer(
                $GLOBALS['chat']
            )
        ),
	    $serverPort
	);

	$loop = \React\EventLoop\Factory::create();

	$writeStream = new \React\Stream\WritableResourceStream(fopen('php://output', 'w'), $loop);


	// $writeStream->write(json_encode([
 //    	'type' => 'message',  
 //    	'message' => 'aloha'
 //    ]).'\n'); 

	echo json_encode([
    	'type' => 'message',  
    	'message' => 'aloha'
    ]).EOL; 


	$GLOBALS['server']->addTimer(3, function() use ($writeStream){	     
		echo json_encode([
	    	'type' => 'message',  
	    	'message' => 'aloha2'
	    ]).EOL; 

		// $writeStream->write(json_encode([
	 //    	'type' => 'message',  
	 //    	'message' => 'aloha2'
	 //    ]).'\n'); 
	});


	$loop->addTimer(5, function() {
	     $GLOBALS['server']->stop();
	});

	$GLOBALS['server']->run();