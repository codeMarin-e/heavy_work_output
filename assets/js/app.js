(function($) {
	$(document).ready(function() {
		console.log('http://' + window.location.hostname  + window.location.pathname);

		var setLoading = function(message) {
			$('#js_loading').html( message );
		}

        var myWorker = new Worker(window.location.pathname+"/assets/js/worker.js");
        myWorker.postMessage('http://' + window.location.hostname  + window.location.pathname + '?data=1');
        myWorker.addEventListener('message', function(e) {
            var data = e.data;
            if(data.type == 'message') {
        		setLoading( data.message );
            }
        });

	});
})(jQuery)