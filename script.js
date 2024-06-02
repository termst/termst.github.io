    const songs = [
        { id: 1, name: "Melatodine", artist: "Alex", lyrics: "Lyrics of Song 1", url: "songs/Melatodine.mp3" },
        { id: 2, name: "Ziek op School, Door de Ogen van Senne", artist: "Alex", lyrics: "Lyrics of Song 2", url: "songs/Ziek op School, Door de Ogen van Senne.mp3" },
        { id: 3, name: "Your a Scammer", artist: "Alex", lyrics: "Lyrics of Song 1", url: "songs/Your a Scammer.wav" },
    ];
    
    const songList = document.getElementById('songs');
    const queue = document.getElementById('queue');
    const searchInput = document.getElementById('search');
    const songName = document.getElementById('song-name');
    const songArtist = document.getElementById('song-artist');
    const lyrics = document.getElementById('lyrics');
    const audioPlayer = document.getElementById('audio-player');
    
    let currentQueue = [];
    let currentSongIndex = 0;
    let dragStartIndex;
    
    function displaySongs() {
        songList.innerHTML = '';
        songs.forEach(song => {
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');
            songItem.innerHTML = `<strong>${song.name}</strong><br><small>${song.artist}</small>`;
            songItem.onclick = () => addToQueue(song);
            songList.appendChild(songItem);
        });
    }
    
    function addToQueue(song) {
        currentQueue.push(song);
        updateQueue();
    }
    
    function updateQueue() {
        queue.innerHTML = '';
        currentQueue.forEach((song, index) => {
            const queueItem = document.createElement('div');
            queueItem.classList.add('queue-item');
            queueItem.innerHTML = `<strong>${song.name}</strong><br><small>${song.artist}</small>`;
            queueItem.draggable = true;
            queueItem.ondragstart = (e) => dragStart(e, index);
            queueItem.ondragover = dragOver;
            queueItem.ondrop = (e) => drop(e, index);
            queueItem.ondragend = dragEnd;
            queueItem.onclick = () => removeFromQueue(index);
            queue.appendChild(queueItem);
        });
    }
    
    function removeFromQueue(index) {
        const queueItem = queue.children[index];
        queueItem.classList.add('removing');
        setTimeout(() => {
            currentQueue.splice(index, 1);
            updateQueue();
            if (currentSongIndex >= index && currentSongIndex > 0) {
                currentSongIndex--;
            }
        }, 500);
    }
    
    function dragStart(e, index) {
        e.target.classList.add('dragging');
        dragStartIndex = index;
    }
    
    function dragOver(e) {
        e.preventDefault();
    }
    
    function drop(e, index) {
        const draggedItem = currentQueue[dragStartIndex];
        currentQueue.splice(dragStartIndex, 1);
        currentQueue.splice(index, 0, draggedItem);
        updateQueue();
    }
    
    function dragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(searchTerm));
        songList.innerHTML = '';
        filteredSongs.forEach(song => {
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');
            songItem.innerHTML = `<strong>${song.name}</strong><br><small>${song.artist}</small>`;
            songItem.onclick = () => addToQueue(song);
            songList.appendChild(songItem);
        });
    });
    
    function playSong() {
        if (currentQueue.length > 0) {
            audioPlayer.src = currentQueue[currentSongIndex].url;
            audioPlayer.play();
            updateSongInfo();
        }
    }
    
    function pauseSong() {
        audioPlayer.pause();
    }
    
    function stopSong() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    
    function setVolume(volume) {
        audioPlayer.volume = volume;
    }
    
    function prevSong() {
        if (currentSongIndex > 0) {
            currentSongIndex--;
            playSong();
        }
    }
    
    function nextSong() {
        if (currentSongIndex < currentQueue.length - 1) {
            removeFromQueue(currentSongIndex);
            playSong();
        } else {
            stopSong();
            removeFromQueue(currentSongIndex);
        }
    }
    
    function updateSongInfo() {
        if (currentQueue.length > 0) {
            const currentSong = currentQueue[currentSongIndex];
            songName.textContent = currentSong.name;
            songArtist.textContent = currentSong.artist;
            lyrics.textContent = currentSong.lyrics;
        }
    }
    
    audioPlayer.addEventListener('ended', () => {
        nextSong();
    });
    
    document.getElementById('play').addEventListener('click', playSong);
    document.getElementById('pause').addEventListener('click', pauseSong);
    document.getElementById('stop').addEventListener('click', stopSong);
    document.getElementById('prev').addEventListener('click', prevSong);
    document.getElementById('next').addEventListener('click', nextSong);
    document.getElementById('volume').addEventListener('input', (event) => setVolume(event.target.value));
    
    displaySongs();
    