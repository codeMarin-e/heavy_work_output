<?php
    header('Content-Encoding: chunked');
    // header('Transfer-Encoding: chunked');
    header('Content-Type: text/html');
    header('Connection: keep-alive');

    $multiplier = 4;
    $packageFill =  str_pad('', 1024 * $multiplier);
    //https://www.sitepoint.com/php-streaming-output-buffering-explained/

    function flush_buffers(){
        global $packageFill; 
        echo $packageFill;
        @ob_flush(); 
        flush();  
    } 

for($i=1;$i<=100;$i++) {
    echo json_encode([
        'type' => 'message',  
        'message' => "{$i}/100"
    ])."\n";
    flush_buffers();
    sleep(1);
}
    // sleep(3);
    // echo json_encode([
    //     'type' => 'message',  
    //     'message' => 'aloha2'
    // ])."\n";
    // flush_buffers();

    // sleep(3);
    // echo json_encode([
    //     'type' => 'message',  
    //     'message' => 'aloha3'
    // ])."\n";
    // flush_buffers();
    // @ob_end_flush();


