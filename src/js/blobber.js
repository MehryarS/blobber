(function($) {

    $.fn.blobber = function() {
    
        var i = 1;

        $("video").each(function() {
            const video_url = $(this).attr("src");
            const video_id  = "#" + $(this).attr("id");

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
                    const video_count = $("video").length;

                    if(video_count > 1){
                        console.log("Downloading Videos: " + i + " of " + video_count + " Videos Loaded (Ready at " + video_count + ")");
                    } else {
                        console.log("Downloading Videos: 1 Video is Loaded.");
                    }

                    i = i + 1;

                    if(i == (video_count + 1)){
                        console.log("Hooray! We're Ready");
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