// Example data structure: projects and their videos
const videosBySubject = {
  "Project 1": [
    { title: "What is Single Layer QAOA?", id: "brvUuIOOQdg" },
    { title: "Another Talk on QAOA", id: "brvUuIOOQdg" }
  ],
  "Project 2": [],
  "Project 3": []
};

const subjectsDiv = document.getElementById("subjects");
const videoListDiv = document.getElementById("video-list");
const videoFrame = document.getElementById("video-frame");
let activeButton = null;
let currentPlaying = null; // track the playing title element

// Create subject buttons
Object.keys(videosBySubject).forEach(subject => {
  const btn = document.createElement("button");
  btn.innerText = subject;
  btn.className = "subject-btn";
  btn.onclick = () => {
    if (activeButton) activeButton.classList.remove("active");
    btn.classList.add("active");
    activeButton = btn;
    loadVideos(subject);
  };
  subjectsDiv.appendChild(btn);
});

// Load videos for selected subject
function loadVideos(subject) {
  videoListDiv.innerHTML = ""; // clear old list
  const videos = videosBySubject[subject];

  videos.forEach((video, index) => {
    const div = document.createElement("div");
    div.className = "video-title";
    div.innerText = video.title;
    div.dataset.videoId = video.id; // store id for later
    div.onclick = () => playVideo(video.id, div, true);
    videoListDiv.appendChild(div);

    // Auto-play the first video
    if (index === 0) {
      playVideo(video.id, div, true);
    }
  });
}

// Play a selected video (with autoplay option)
function playVideo(videoId, titleElement, autoplay = false) {
  let url = "https://www.youtube.com/embed/" + videoId;
  if (autoplay) {
    url += "?autoplay=1&mute=1"; 
    // note: 'mute=1' is needed because most browsers block auto-playing sound
  }
  videoFrame.src = url;

  // Update playing highlight
  if (currentPlaying) {
    currentPlaying.classList.remove("playing");
  }
  if (titleElement) {
    titleElement.classList.add("playing");
    currentPlaying = titleElement;
  }
}
