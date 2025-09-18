document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio-element");
  const songTitle = document.getElementById("song-title");
  const songArtist = document.getElementById("song-artist");
  const prevButton = document.getElementById("prev-button");
  const playPauseButton = document.getElementById("play-pause-button");
  const nextButton = document.getElementById("next-button");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeSpan = document.getElementById("current-time");
  const durationTimeSpan = document.getElementById("duration-time");
  const volumeBar = document.getElementById("volume-bar");
  const fileInput = document.getElementById("file-input");
  const addSongsButton = document.getElementById("add-songs-button");
  const playlistUl = document.getElementById("playlist");

  let playlist = [];
  let currentIndex = -1;
  let isPlaying = false;

  /**
   * @param {number} seconds
   * @return {string}
   */
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  /**
   * @param {number} index
   */
  function loadSong(index) {
    if (playlist.length === 0) {
      songTitle.textContent = "Nenhuma música carregada";
      songArtist.textContent = "Carregue suas músicas para começar!";
      audio.src = "";
      progressBar.value = 0;
      currentTimeSpan.textContent = "00:00";
      durationTimeSpan.textContent = "00:00";
      playPauseButton.innerHTML = "<i class='fas fa-play'></i>";
      isPlaying = false;
      return;
    }

    if (index < 0) {
      currentIndex = playlist.length - 1;
    } else if (index >= playlist.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const song = playlist[currentIndex];
    audio.src = song.url;
    songTitle.textContent = song.name;
    songArtist.textContent = song.file.name.includes("-")
      ? song.file.name.split("-")[0].trim()
      : "Artista Desconhecido";

    updatePlaylistActiveClass();

    if (isPlaying) {
      audio.play();
    } else {
      playPauseButton.innerHTML = "<i class='fas fa-play'></i>";
    }
  }

  function playSong() {
    if (playlist.length === 0) {
      alert("Por favor, adicione músicas à lista de reprodução primeiro.");
      return;
    }
    if (audio.src === "" && currentIndex === -1) {
      loadSong(0);
    }
    audio.play();
    isPlaying = true;
    playPauseButton.innerHTML = "<i class='fas fa-pause'></i>";
  }

  function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseButton.innerHTML = "<i class='fas fa-play'></i>";
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }

  function nextSong() {
    if (playlist.length === 0) return;
    loadSong(currentIndex + 1);
    playSong();
  }

  function prevSong() {
    if (playlist.length === 0) return;
    loadSong(currentIndex - 1);
    playSong();
  }

  function renderPlaylist() {
    playlistUl.innerHTML = "";
    if (playlist.length === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.classList.add("empty-playlist-message");
      emptyMessage.textContent = "Nenhuma música na lista de reprodução. Clique em 'Adicionar Músicas' para começar.";
      playlistUl.appendChild(emptyMessage);
      return;
    }

    playlist.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = song.name;
      li.dataset.index = index;
      if (index === currentIndex) {
        li.classList.add("active");
      }
      li.addEventListener("click", () => {
        loadSong(index);
        playSong();
      });
      playlistUl.appendChild(li);
    });
  }

  function updatePlaylistActiveClass() {
    document.querySelectorAll("#playlist li").forEach((li) => {
      li.classList.remove("active");
    });
    if (currentIndex !== -1 && playlist[currentIndex]) {
      const activeLi = playlistUl.querySelector(`li[data-index='${currentIndex}']`);
      if (activeLi) {
        activeLi.classList.add("active");
        activeLi.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } 
  }
  // --- Event Listeners ---
  playPauseButton.addEventListener("click", togglePlayPause);
  nextButton.addEventListener("click", nextSong);
  prevButton.addEventListener("click", prevSong);

  audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    currentTimeSpan.textContent = formatTime(currentTime);

    if (!isNaN(duration)) {
      durationTimeSpan.textContent = formatTime(duration);
      progressBar.max = 100;
      progressBar.value = (currentTime / duration) * 100;
    } else {
      durationTimeSpan.textContent = "00:00";
      progressBar.value = 0;
    }
  });

  audio.addEventListener("ended", () => {
    nextSong();
  });

  progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });

  volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
  });
  
  // Set initial volume
  audio.volume = 1;

  addSongsButton.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    playlist = [];
    currentIndex = -1;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        playlist.push({
          name: file.name.replace(/\.(mp3|wav|ogg)$/i, '').trim(),
          file: file,
          url: url
        });
      } else {
        alert(`O arquivo "${file.name}" não é um tipo de áudio suportado e será ignorado.`);
      }
    });

    renderPlaylist();
    loadSong(0); // Load the first song automatically after adding files
  });
});
