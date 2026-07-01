const songs = [
    {
        title: "Ready to Spring",
        artist: "Jazz",
        src: "assets/audio/ready-to-spring.mp3",
        cover: "assets/images/cover1.jpg",
    },
    {
        title: "Local Forecast (Daytime)",
        artist: "Wii Forecast Channel",
        src: "assets/audio/local-forecast.mp3",
        cover: "assets/images/cover2.jpg",
    },
    {
        title: "New Look",
        artist: "Wii U Mii Maker",
        src: "assets/audio/new-look.mp3",
        cover: "assets/images/cover6.jpg",
    },
    {
        title: "波",
        artist: "Webinar",
        src: "assets/audio/波.mp3",
        cover: "assets/images/cover7.jpg",
    },
];

let songIndex = 0;

const title = document.getElementById("title");
const cover = document.getElementById("cover");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress");
const progressBarContainer = document.getElementById("progress-bar-container");

const audio = new Audio();
audio.volume = 0.2;

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
}

loadSong(songs[songIndex]);

function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "⏯"
}

let isCurrentlyPlaying = false;
playBtn.addEventListener("click", () => {
    isCurrentlyPlaying ? pauseSong() : playSong();
    isCurrentlyPlaying = !isCurrentlyPlaying;
});

nextBtn.addEventListener("click", () => {
    songIndex++;
    if(songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
    isCurrentlyPlaying = true;
});

prevBtn.addEventListener("click", () => {
    songIndex--;
    if(songIndex < 0) songIndex = songs.length - 1;

    loadSong(songs[songIndex])
    playSong();
    isCurrentlyPlaying = true;
});

audio.addEventListener("timeupdate", () => {
    const progressBarPercentage = (audio.currentTime) / audio.duration * 100;
    progressBar.style.width = progressBarPercentage + "%";
});

progressBarContainer.addEventListener("click", (e) => {
    const width = progressBarContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

audio.addEventListener("ended", () => {
    nextBtn.click();
})

const shinjiTrigger = document.getElementById("shinji-trigger");
const GIF_DURATION_MS = 2620;
let darkModeActive = false;
let animating = false;
 
shinjiTrigger.addEventListener("click", () => {
    if (animating) return;
    animating = true;
 
    const goingDark = !darkModeActive;
 
    shinjiTrigger.src = goingDark
        ? "assets/images/shinji-noloop.gif?t=" + Date.now()
        : "assets/images/shinji-backwards-noloop.gif?t=" + Date.now();
 
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.toggle("dark-mode", goingDark);
        });
    });
 
    setTimeout(() => {
        shinjiTrigger.src = goingDark
            ? "assets/images/shinji-last.png"
            : "assets/images/shinji-first.png";
        darkModeActive = goingDark;
        animating = false;
    }, GIF_DURATION_MS);
});