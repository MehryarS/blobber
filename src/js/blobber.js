(function($) {

    $.fn.blobber = function(options) {

        var i = 1;

        //Default settings
        var settings = $.extend({

            complete     : null,
            progressbar  :  true

        }, options);

        $(this).find("video").each(function() {
            var video_url = $(this).attr("src");
            var video_id = "#" + $(this).attr("id");
            var video_total_count = $("video").length;
            var percnet = 0;

            function loadFile(url, callback) {
                var req = new XMLHttpRequest();
                req.callback = callback;
                req.arguments = Array.prototype.slice.call(arguments, 2);
                req.onload = reqSuccess;
                req.onerror = reqError;
                req.open("GET", url, true);
                req.responseType = 'blob';

                req.addEventListener("progress", updateProgress, false);
                function updateProgress (event) {
                    if (event.lengthComputable) {
                        percnet = ((event.loaded / event.total) / video_total_count) * 100;
                    } else {
                        console.log("We have an error");
                    }
                }

                function reqSuccess() { 
                    this.callback.apply(this, this.arguments); 
                    if (req.readyState == 4 && req.status == 200) {
                        var videoBlob = this.response;
                        var vid = URL.createObjectURL(videoBlob);
    
                        //New URI loaded in DOM
                        $(video_id).attr("src", vid);
                    } else {
                        console.error(req.statusText);
                    }
                }
                
                function reqError() { 
                    console.error(this.statusText); 
                    console.log(":-( Sorry! We have an error.");
                }
                req.send(null);
            }

            function showMessage(message) {

                //Progress bar
                var progressbar_width = (($(".progress").width() / $(document).width()) * 100) + percnet;
                $(".progress").animate({width: progressbar_width + "%"});

                //Console progress notification
                if(video_total_count > 1){
                    console.log("Downloading Videos: " + i + " of " + video_total_count + " Videos Downloaded. (Ready at " + video_total_count + ")");
                } else {
                    console.log("Downloading Videos: 1 Video is Downloaded.");
                }

                i = i + 1;

                if(i == (video_total_count + 1)){

                    //Check callback function is defined
                    if ( $.isFunction( settings.complete ) ) {
                        settings.complete.call( this );
                    } else {
                        console.log("Hooray! We're Ready to Fire.");
                        $(".progress").fadeOut();
                    }                        
                }
            }

            loadFile(video_url, showMessage);
        });
    };

}(jQuery));