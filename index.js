// Initialize the Swiper
var swiper = new Swiper(".swiper-container", {
  slidesPerView: 3, // Show 3 slides at once
  spaceBetween: 0,
  arrows: true,
  speed: 500, // Speed of transition
  slideTo: 0, // Initial slide

  watchOverflow: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true, // Loop the slides
  centeredSlides: false,
  // making it responsive ->
  // breakpoints: {
  //   768: {
  //     slidesPerView: 2,
  //   },
  //   480: {
  //     slidesPerView: 1,
  //   },
  // },
});

// For dish modal
// Get the modal and buttons
const modal = document.getElementById("dishModal");
const requestDishBtn = document.getElementById("req-a-dish");
const closeBtn = document.getElementById("closeBtn");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Open the modal when the "Request a Dish" button is clicked
requestDishBtn.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Disable scrolling on the body when modal is open
});

// Close the modal when the "X" (close) button is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Enable scrolling again when modal is closed
});

// Close the modal when the "Cancel" button is clicked
cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Enable scrolling again when modal is closed
});

submitBtn.addEventListener("click", () => {
  const dishTitle = document.getElementById("name-of-dish").value;
  const uploadImage = document.getElementById("upload-an-image").value;

  if (dishTitle && uploadImage) {
    alert(`Dish Request Submitted!\nName: ${dishTitle}\nURL: ${uploadImage}`);
    modal.style.display = "none"; // Close the modal
    document.body.style.overflow = "auto"; // Enable scrolling again after submitting
  } else {
    alert("Please fill in both fields!");
  }
});

// Close the modal if the user clicks outside the modal
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Enable scrolling again when modal is closed
  }
});

// --------------------------------------------------------- cart below--------------
// Get modal and buttons
const modalCart = document.getElementById("cart_empty_modal");
const openModalBtn = document.getElementById("open-cart-modal-btn");
const closeBtnCart = document.getElementById("close_modal_btn");
const backToMenuBtn = document.getElementById("back_to_menu_btn");

// disable body scrolling
function disableScroll() {
  document.body.style.overflow = "hidden";
}

//  enable body scrolling
function enableScroll() {
  document.body.style.overflow = "auto";
}

// Open the modal when the "Open Cart" button is clicked
openModalBtn.addEventListener("click", () => {
  modalCart.style.display = "block";
  disableScroll(); // Disable body scroll
});

// Close the modal when the "Close" button is clicked
closeBtnCart.addEventListener("click", () => {
  modalCart.style.display = "none"; // Hide the modal
  enableScroll();
});

// Close the modal when the "Back to Menu" button is clicked
backToMenuBtn.addEventListener("click", () => {
  modalCart.style.display = "none";
  enableScroll();
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", (event) => {
  if (event.target === modalCart) {
    modalCart.style.display = "none";
    enableScroll();
  }
});

// ------handle video playback ----------
const video = document.getElementById("my-video");
const playButton = document.getElementById("video-play");
const pauseButton = document.getElementById("video-pause");

// Disable the default play/pause behavior when clicking the video
video.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the video from playing or pausing on click
});

// Play the video when the play button is clicked
playButton.addEventListener("click", () => {
  video.play();
  playButton.style.display = "none"; // Hide the play button
  pauseButton.style.display = "block"; // Show the pause button
});

// Pause the video when the pause button is clicked
pauseButton.addEventListener("click", () => {
  video.pause();
  playButton.style.display = "block";
  pauseButton.style.display = "none";
});

// Listen for when the video is played
video.addEventListener("play", () => {
  playButton.style.display = "none";
  pauseButton.style.display = "block";
});

// Listen for when the video is paused
video.addEventListener("pause", () => {
  playButton.style.display = "block";
  pauseButton.style.display = "none";
});

// --------------video ends-------------

// a check to alert user once if window size is not 1440px

let alertShown = false;

function checkWindowSize() {
  const currentWidth = window.innerWidth;

  if (currentWidth !== 1440 && !alertShown) {
    alert("Your screen size is not 1440px! as given in the task");
    alertShown = true;
  }
}

window.addEventListener("resize", checkWindowSize);

checkWindowSize();
