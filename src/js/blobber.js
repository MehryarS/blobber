(function($) {

    $.fn.blobber = function(options) {

        var i = 1;

        //Default settings
        var settings = $.extend({

            complete                :   null,
            preloader               :   true,
            preloaderBackground     :   "#FFFFFF",
            progressBar             :   true,
            progressBarColor        :   "#000000",
            progressSpinner         :   true,
            progressSpinnerColor    :   "#000000",
            progressStatus          :   true,
            progressStatusColor     :   "#999999",
            preloaderAnimation      :   null

        }, options);

        if ( settings.preloader == true ) {
            $("body").append('<div class="progress" style="background: ' + settings.preloaderBackground  + '"></div>');
        }

        if ( settings.progressBar == true ) {
            $(".progress").append('<div class="progress-bar" style="background: ' + settings.progressBarColor  + '"></div>');
        }

        if ( settings.progressSpinner == true ) {
            $(".progress").append('<div class="progress-animation" style="border-color: ' + settings.preloaderBackground + '; border-top-color: ' + settings.progressSpinnerColor  + '"></div>');
        }

        if ( settings.progressStatus == true ) {
            $(".progress").append('<div class="progress-status" style="color: ' + settings.progressStatusColor  + '"><span></span></div>');
        }

        $(this).find("video").each(function() {
            var videoURL = $(this).attr("src");
            var videoID = "#" + $(this).attr("id");
            var videoTotalCount = $(this).find("video").length;
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
                        percnet = ((event.loaded / event.total) / videoTotalCount) * 100;
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
                        $(videoID).attr("src", vid);
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

            function changeStatus(status){

                $(".progress-status span").fadeOut(function(){
                    $(this).text("");
                    $(this).text(status);
                    $(this).fadeIn();
                });
            }

            function showMessage(message) {

                //Progress bar
                var progressbarWidth = (($(".progress-bar").width() / $(document).width()) * 100) + percnet;
                $(".progress-bar").animate({width: progressbarWidth + "%"});

                //Console progress notification
                if(videoTotalCount > 1){
                    console.log("Downloading Videos: " + i + " of " + videoTotalCount + " Videos Downloaded. (Ready at " + videoTotalCount + ")");
                    changeStatus("Downloading Videos: " + i + " of " + videoTotalCount + " Videos Downloaded. (Ready at " + videoTotalCount + ")");
                } else {
                    changeStatus("Downloading Videos: Video is Downloaded.");
                    console.log("Downloading Videos: Video is Downloaded.");
                }

                i = i + 1;

                if(i == (videoTotalCount + 1)){

                    //Check callback function is defined
                    if ( $.isFunction( settings.complete ) ) {
                        settings.complete.call( this );
                        $(".progress").fadeOut();
                    } else {
                        console.log("Hooray! We're Ready to Fire.");
                        $(".progress").fadeOut();
                    }                        
                }
            }

            loadFile(videoURL, showMessage);
        });
    };

}(jQuery));