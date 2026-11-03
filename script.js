
const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");
const shuffleButton = document.getElementById("shuffleButton");
const successPanel = document.getElementById("successPanel");
const continueButton = document.getElementById("continueButton");

const imagePath = "images/puzzle-photo.jpg";

let pieces = [];
let firstSelected = null;
let completed = false;

// Create the nine puzzle pieces
function createPuzzle() {
    puzzle.innerHTML = "";

    pieces.forEach((piece, index) => {
        const tile = document.createElement("button");

        tile.className = "puzzle-tile";
        tile.type = "button";
        tile.setAttribute("aria-label", "Puzzle piece " + (index + 1));

        tile.style.backgroundImage = `url("${imagePath}")`;
        tile.style.backgroundSize = "300% 300%";

        const row = Math.floor(piece / 3);
        const column = piece % 3;

        tile.style.backgroundPosition =
            `${column * 50}% ${row * 50}%`;

        tile.addEventListener("click", function() {
            selectPiece(index, tile);
        });

        puzzle.appendChild(tile);
    });
}

// Shuffle puzzle pieces
function shufflePuzzle() {
    pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }

    if (pieces.every((piece, index) => piece === index)) {
        [pieces[0], pieces[1]] = [pieces[1], pieces[0]];
    }

    firstSelected = null;
    completed = false;

    successPanel.style.display = "none";
    shuffleButton.style.display = "inline-block";
    message.textContent = "Take your time. You've got this! 🌸";

    createPuzzle();
}

// Select and swap puzzle pieces
function selectPiece(index, tile) {
    if (completed) return;

    if (firstSelected === null) {
        firstSelected = index;
        tile.classList.add("selected");
        message.textContent = "Now select another piece! 💗";
        return;
    }

    if (firstSelected === index) {
        firstSelected = null;
        message.textContent = "Choose two different pieces.";
        createPuzzle();
        return;
    }

    const first = firstSelected;

    [pieces[first], pieces[index]] =
        [pieces[index], pieces[first]];

    firstSelected = null;

    createPuzzle();
    checkPuzzle();
}

// Check puzzle completion
function checkPuzzle() {
    const isSolved = pieces.every(
        (piece, index) => piece === index
    );

    if (isSolved) {
        completed = true;
        message.textContent = "All pieces are in the right place! 🌷";
        successPanel.style.display = "block";
        shuffleButton.style.display = "none";
    }
}

// Shuffle button
shuffleButton.addEventListener("click", shufflePuzzle);

// Page 1 → Page 2
continueButton.addEventListener("click", function() {
    document.querySelector(".puzzle-page").style.display = "none";
    document.getElementById("galleryPage").style.display = "block";

    window.scrollTo(0, 0);
});

// Gallery photo viewer
const galleryImages = document.querySelectorAll(".gallery-image");
const photoViewer = document.getElementById("photoViewer");
const largePhoto = document.getElementById("largePhoto");
const closeViewer = document.getElementById("closeViewer");

galleryImages.forEach(function(photo) {
    photo.addEventListener("click", function() {
        largePhoto.src = photo.src;
        largePhoto.alt = photo.alt;
        photoViewer.style.display = "flex";
    });
});

closeViewer.addEventListener("click", function() {
    photoViewer.style.display = "none";
    largePhoto.src = "";
});

photoViewer.addEventListener("click", function(event) {
    if (event.target === photoViewer) {
        photoViewer.style.display = "none";
        largePhoto.src = "";
    }
});

// Page 2 → Page 3
const nextPageButton = document.getElementById("nextPageButton");

nextPageButton.addEventListener("click", function() {
    document.getElementById("galleryPage").style.display = "none";
    document.getElementById("timelinePage").style.display = "block";

    window.scrollTo(0, 0);
});

// Page 3 → Page 4
const nextTimelineButton = document.getElementById("nextTimelineButton");

nextTimelineButton.addEventListener("click", function() {

    document.getElementById("timelinePage").style.display = "none";

    document.getElementById("surprisePage").style.display = "block";

    window.scrollTo(0, 0);

});
// Page 4: Open surprise envelopes

const envelopes = document.querySelectorAll(".envelope");

envelopes.forEach(function(envelope) {

    envelope.addEventListener("click", function() {

        const messageId = envelope.dataset.message;

        const selectedMessage = document.getElementById(messageId);

        selectedMessage.style.display = "block";

        envelope.textContent = "💗";

    });

});

// Page 4 → Page 5

document.getElementById("nextSurpriseButton").addEventListener("click", function() {

    document.getElementById("surprisePage").style.display = "none";

    document.getElementById("finalPage").style.display = "block";

    window.scrollTo(0, 0);

});
// Start puzzle
shufflePuzzle();

// Reveal final surprise

document.getElementById("finalSurpriseButton").addEventListener("click", function() {

    document.getElementById("finalSurprise").style.display = "block";

    this.style.display = "none";

    window.scrollTo(0, document.body.scrollHeight);

});