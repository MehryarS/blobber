(function($) {

    $.fn.blobber = function(options) {

        var i = 1;

        var settings = $.extend({
            complete     : null
        }, options);

        $("video").each(function() {
            var video_url = $(this).attr("src");
            var video_id = "#" + $(this).attr("id");

            var req = new XMLHttpRequest();
            req.open('GET', video_url , true);
            req.responseType = 'blob';

            req.onload = function() {

                if (this.status === 200) {
                    var videoBlob = this.response;
                    var vid = URL.createObjectURL(videoBlob);

                    //New URI loaded in DOM
                    $(video_id).attr("src", vid);

                    //Console progress bar
                    var video_count = $("video").length;

                    if(video_count > 1){
                        console.log("Downloading Videos: " + i + " of " + video_count + " Videos Downloaded. (Ready at " + video_count + ")");
                    } else {
                        console.log("Downloading Videos: 1 Video is Downloaded.");
                    }

                    i = i + 1;

                    if(i == (video_count + 1)){
                        settings.complete.call( this );
                        console.log("Hooray! We're Ready to Fire.");
                    }
                }
            };
            req.onerror = function() {
                console.log(":-( Sorry! We have an error.");
            };

            req.send();
        });
    };

}(jQuery));