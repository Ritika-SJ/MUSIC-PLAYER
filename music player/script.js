 const musiccontainer = document.querySelector('.music-container');
 const playBtn = document.querySelector('#play');
 const prevBtn = document.querySelector('#prev');
 const nextBtn = document.querySelector('#next');
 const audio = document.querySelector('#audio');
 const progress = document.querySelector('.progress');
 const progressContainer = document.querySelector('.progress-container');
 const title = document.querySelector('#title');
 const cover = document.querySelector('#cover');

const songs = ['husn','baby','lover','ranjha' , 'june','people'];

let songIndex = 3 ;

loadSong(songs[songIndex]);

function loadSong(song){
    title.innerText = song;
    audio.src = `audio/${song}.mp3`
    cover.src = `images/${song}.jpg`   
}

function playSong(){
    musiccontainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
     
    audio.play();
}

function pauseSong(){
    musiccontainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function prevsong(){
    songIndex--

    if(songIndex < 0){
        songIndex=songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function nextsong(){
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX;
    const duration = audio.duration 

    audio.currentTime = (clickX / width) * duration
}

playBtn.addEventListener('click', () =>{
    const isplaying = musiccontainer.classList.contains('play');

    if(isplaying){
        pauseSong();
    }
    else{
        playSong();
    }
})

prevBtn.addEventListener('click', prevsong);
nextBtn.addEventListener('click', nextsong);

audio.addEventListener('timeupdate' , updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended' , nextsong )