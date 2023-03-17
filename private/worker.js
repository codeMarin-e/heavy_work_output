
import ndjsonStream from "can-ndjson-stream";

self.onmessage = function(e) {
    var workerMe = self;

    fetch(e.data)
        .then( ( response ) => {
            return ndjsonStream( response.body ); //ndjsonStream parses the response.body
        } )
        .then( ( exampleStream ) => {
            const reader = exampleStream.getReader();
            let read;
            reader.read().then( read = ( result ) => {
                if ( result.done ) {
                    return;
                }
                let data = result.value;
                if(data.type && data.type != 'nothing' ) {
                    workerMe.postMessage( result.value );
                }
                reader.read().then( read );

            } );
        } );

}