$(document).ready(function(){

    $("#video-container").blobber({
        complete : function(){
            $("#main-container").addClass("active");
        }
    });

    $("span.bullet").click(function(){
        
        //video changer
        var videoID = $(this).data("video");
        $("video").removeClass("active");
        $("video#" + videoID).addClass("active");

        //bullets
        $("span.bullet").removeClass("active");
        $(this).addClass("active");

    });
});