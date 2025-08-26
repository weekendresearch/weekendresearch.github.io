// Example data structure: projects and their videos
const videosBySubject = {
  "Project 1": [
    { title: "What is Single Layer QAOA?", id: "brvUuIOOQdg" },
    { title: "Another Talk on QAOA", id: "brvUuIOOQdg" }
  ],
  "Project 2": [],
  "Project 3": []
};

// Example data structure: projects and their notes (PDFs)
const notesBySubject = {
  "Project 1": [
    { title: "My first paper-test", link: "https://drive.google.com/file/d/1sbsGxnnGkvqxd8JXU6IpTrb8ECum4rmW/preview" },
    { title: "Additional Material", link: "https://drive.google.com/file/d/your-second-file-id/preview" }
  ],
  "Project 2": [
    { title: "Project 2 Notes", link: "https://drive.google.com/file/d/your-project2-file-id/preview" }
  ],
  "Project 3": []
};

const talksSubjectsDiv = document.getElementById("subjects-talks");
const videoListDiv = document.getElementById("video-list");
const videoFrame = document.getElementById("video-frame");

const notesSubjectsDiv = document.getElementById("subjects-notes");
const notesListDiv = document.getElementById("notes-list");
const pdfFrame = document.getElementById("pdf-frame");

let activeTalkButton = null;
let activeNotesButton = null;
let currentPlaying = null;
let currentNote = null;

// ====== Talks Section ======
Object.keys(videosBySubject).forEach((subject, idx) => {
  const btn = document.createElement("button");
  btn.innerText = subject;
  btn.className = "subject-btn";
  btn.onclick = () => {
    if (activeTalkButton) activeTalkButton.classList.remove("active");
    btn.classList.add("active");
    activeTalkButton = btn;
    loadVideos(subject);
  };
  talksSubjectsDiv.appendChild(btn);

  // Load first project on page load
  if (idx === 0) {
    btn.classList.add("active");
    activeTalkButton = btn;
    loadVideos(subject);
  }
});

function loadVideos(subject) {
  videoListDiv.innerHTML = "";
  const videos = videosBySubject[subject];

  videos.forEach((video, index) => {
    const div = document.createElement("div");
    div.className = "video-title";
    div.innerText = video.title;
    div.dataset.videoId = video.id;
    div.onclick = () => playVideo(video.id, div, true);
    videoListDiv.appendChild(div);

    if (index === 0) {
      playVideo(video.id, div, true);
    }
  });
}

function playVideo(videoId, titleElement, autoplay = false) {
  let url = "https://www.youtube.com/embed/" + videoId;
  if (autoplay) {
    url += "?autoplay=1&mute=1";
  }
  videoFrame.src = url;

  if (currentPlaying) {
    currentPlaying.classList.remove("playing");
  }
  if (titleElement) {
    titleElement.classList.add("playing");
    currentPlaying = titleElement;
  }
}

// ====== Notes Section ======
Object.keys(notesBySubject).forEach((subject, idx) => {
  const btn = document.createElement("button");
  btn.innerText = subject;
  btn.className = "subject-btn";
  btn.onclick = () => {
    if (activeNotesButton) activeNotesButton.classList.remove("active");
    btn.classList.add("active");
    activeNotesButton = btn;
    loadNotes(subject);
  };
  notesSubjectsDiv.appendChild(btn);

  // Load first project notes on page load
  if (idx === 0) {
    btn.classList.add("active");
    activeNotesButton = btn;
    loadNotes(subject);
  }
});

function loadNotes(subject) {
  notesListDiv.innerHTML = "";
  const notes = notesBySubject[subject];

  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note-title";
    div.innerText = note.title;
    div.dataset.link = note.link;
    div.onclick = () => openPDF(note.link, div);
    notesListDiv.appendChild(div);

    if (index === 0) {
      openPDF(note.link, div);
    }
  });
}

function openPDF(link, noteElement) {
  pdfFrame.src = link;

  if (currentNote) {
    currentNote.classList.remove("playing");
  }
  if (noteElement) {
    noteElement.classList.add("playing");
    currentNote = noteElement;
  }
}
