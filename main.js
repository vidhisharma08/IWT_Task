// Music player state
let isPlaying = false;

// DOM Elements
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const trackTitle = document.getElementById('track-title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const tracks = document.querySelectorAll('.track');

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', playPrevious);
nextBtn.addEventListener('click', playNext);
tracks.forEach(track => track.addEventListener('click', selectTrack));

// Functions
function togglePlay() {
  isPlaying = !isPlaying;
  playBtn.textContent = isPlaying ? '⏸' : '▶';
}

function playPrevious() {
  const active = document.querySelector('.track.active');
  const prev = active.previousElementSibling || tracks[tracks.length - 1];
  active.classList.remove('active');
  prev.classList.add('active');
  updateTrackInfo(prev.textContent);
}

function playNext() {
  const active = document.querySelector('.track.active');
  const next = active.nextElementSibling || tracks[0];
  active.classList.remove('active');
  next.classList.add('active');
  updateTrackInfo(next.textContent);
}

function selectTrack(e) {
  document.querySelector('.track.active').classList.remove('active');
  e.target.classList.add('active');
  updateTrackInfo(e.target.textContent);
  if (!isPlaying) togglePlay();
}

function updateTrackInfo(trackInfo) {
  const [title, artistName] = trackInfo.split(' - ');
  trackTitle.textContent = title;
  artist.textContent = artistName;
}

// Simulate progress bar movement when playing
setInterval(() => {
  if (isPlaying) {
    const currentWidth = parseFloat(progress.style.width || '0');
    progress.style.width = ((currentWidth + 1) % 100) + '%';
  }
}, 1000);