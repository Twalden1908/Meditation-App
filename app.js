//Make the page interactive with javascript.
//Narrow functions makes the code eaiser to read.

const app = () => {
    const song = document.querySelector('.song'); 
    const play = document.querySelector('.play'); 
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video-container video');  

//Sounds
    const sounds = document.querySelectorAll('.sound button');

 //Time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll(".timer button");

 //Get the length of the timer's outline
    const outlineLength = outline.getTotalLength(); 
    console.log(outlineLength); 

//Duration
    let defaultDuration = 600; 
        
        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset = outlineLength; 

// Selecting different sounds. 
    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);

        });
    });

    // Play and pauuse sound. Click on the play button icon.
        play.addEventListener("click", function() {
        checkPlaying(song);
    });

    //Selecting the durations.
    timeSelect.forEach(option =>{
    option.addEventListener('click', function(){
        defaultDuration = this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(defaultDuration / 60)}:${'0' + Math.floor(defaultDuration % 60)}`
    });
});
   
//Create a function that will pause and play the audio and video. 
    //The icons on the player will change for each event.
const checkPlaying = song => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
    } else {
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
    }
    };

//Adding animation to the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = defaultDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //Animate the circle.
        let progress = outlineLength - (currentTime / defaultDuration) * outlineLength;
            outline.style.strokeDashoffset = progress;
        //Animate the text. This part with change on its on. 
        timeDisplay.textContent = `${minutes}:${seconds}`;

        //To stop circle animation once time is up.
        if(currentTime>= defaultDuration){
            song.pause(); 
            song.currentTime = 0; 
            play.src = '/svg/play.svg'
            video.pause();
        }
    };
};

app();