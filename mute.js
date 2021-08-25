$(document).ready(function() {
    if ($("audio").prop('muted', false)){
    $("#mute").css("background-image","url(img/unmute1.png)");
  }

$("#mute").click( function (){
  if( $("audio").prop('muted') ) {
    $("audio").prop('muted', false);
    $("#mute").css("background-image","url(img/unmute1.png)");
  } else {
    $("audio").prop('muted', true);
    $("#mute").css("background-image","url(img/mute.png)");
  }
});
});