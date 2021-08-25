/*
    Default constructor configuration:
        autoplay: false,
        shuffle: false,
        loop: false,
        playerId: "audioPlayer",
        playlistId: "playlist",
        currentClass: "current-song"
        
    Methods:
        setLoop
        setShuffle
        toggleShuffle
        toggleLoop
        prevTrack
        nextTrack
    
    Can access player by .player variable
    example playlist.player.pause();
*/
 
class AudioPlaylist{
    
    setTrack(arrayPos){
    
        var liPos = this.trackOrder[arrayPos]; // convert array index to html index
        this.player.src = $("#"+this.playlistId+ " li a").eq(liPos).attr("href");
        $("."+this.currentClass).removeClass(this.currentClass);
        $("#"+this.playlistId+ " li").eq(liPos).addClass(this.currentClass);
        this.trackPos = arrayPos; // update based on array index position
    }
    
    setLoop(val){
        if(val === true)
            this.loop = true;
        else
            this.loop = false;
        return this.loop;
    }
    
    
    constructor(config = {} ){
        
        /***
        *
        *       setting defaults, and initialzing player 
        *
        */
        
        var classObj = this; // store scope for event listeners
        this.shuffle = (config.shuffle === true) ? true : false;
        this.playerId = (config.playerId) ? config.playerId : "audioPlayer";
        this.playlistId = (config.playlistId) ? config.playlistId : "playlist";
        this.currentClass = (config.currentClass) ? config.currentClass : "current-song"
        this.length = $("#"+this.playlistId+" li").length; 
        this.player = $("#"+this.playerId)[0];
        this.autoplay = (config.autoplay === true || this.player.autoplay) ? true : false;
        this.loop = (config.loop === true) ? true : false;
        this.trackPos = 0;
        this.trackOrder = [];
        for(var i = 0; i < this.length; i++){
            this.trackOrder.push(i);
        }
        
        if(this.shuffle)
            this.randomizeOrder();
        
        this.setTrack(this.trackPos);
        if(this.autoplay)
            this.player.play();
        
         /***
        *
        *       handle link clicks
        *
        */
        $("#"+this.playlistId+" li a ").click(function(e){
            e.preventDefault();
            // set track based on index of 
            classObj.setTrack(classObj.trackOrder.indexOf($(this).parent().index()));
            classObj.player.play();
        });
        
         /***
        *
        *       handle end of track
        *
        */
        
        this.player.addEventListener("ended", function(){
            // if last track ended
            if(classObj.trackPos < classObj.length - 1){
                classObj.setTrack(classObj.trackPos+1);
                classObj.player.play();
            }
            else{
                if(classObj.loop){
                    if(classObj.shuffle)
                        classObj.randomizeOrder();
                    classObj.setTrack(0);
                    classObj.player.play();
                }
            }
        });
        
    }
}



