!function(o){o.fn.blobber=function(e){var r=1,s=o.extend({complete:null,preloader:!0,preloaderBackground:"#FFFFFF",progressBar:!0,progressBarColor:"#000000",progressSpinner:!0,progressSpinnerColor:"#000000",progressStatus:!0,progressStatusColor:"#999999",preloaderAnimation:null},e);1==s.preloader&&o("body").append('<div class="progress" style="background: '+s.preloaderBackground+'"></div>'),1==s.progressBar&&o(".progress").append('<div class="progress-bar" style="background: '+s.progressBarColor+'"></div>'),1==s.progressSpinner&&o(".progress").append('<div class="progress-animation" style="border-color: '+s.preloaderBackground+"; border-top-color: "+s.progressSpinnerColor+'"></div>'),1==s.progressStatus&&o(".progress").append('<div class="progress-status" style="color: '+s.progressStatusColor+'"><span></span></div>'),o(this).find("video").each(function(){var e=o(this).attr("src"),t="#"+o(this).attr("id"),a=o("video").length,n=0;function l(e){o(".progress-status span").fadeOut(function(){o(this).text(""),o(this).text(e),o(this).fadeIn()})}!function(e,r){var s=new XMLHttpRequest;s.callback=r,s.arguments=Array.prototype.slice.call(arguments,2),s.onload=function(){if(this.callback.apply(this,this.arguments),4==s.readyState&&200==s.status){var e=this.response,r=URL.createObjectURL(e);o(t).attr("src",r)}else console.error(s.statusText)},s.onerror=function(){console.error(this.statusText),console.log(":-( Sorry! We have an error.")},s.open("GET",e,!0),s.responseType="blob",s.addEventListener("progress",function(o){o.lengthComputable?n=o.loaded/o.total/a*100:console.log("We have an error")},!1),s.send(null)}(e,function(e){var t=o(".progress-bar").width()/o(document).width()*100+n;o(".progress-bar").animate({width:t+"%"}),a>1?(console.log("Downloading Videos: "+r+" of "+a+" Videos Downloaded. (Ready at "+a+")"),l("Downloading Videos: "+r+" of "+a+" Videos Downloaded. (Ready at "+a+")")):(l("Downloading Videos: Video is Downloaded."),console.log("Downloading Videos: Video is Downloaded.")),(r+=1)==a+1&&(o.isFunction(s.complete)?(s.complete.call(this),o(".progress").fadeOut()):(console.log("Hooray! We're Ready to Fire."),o(".progress").fadeOut()))})})}}(jQuery);
//# sourceMappingURL=blobber.js.map