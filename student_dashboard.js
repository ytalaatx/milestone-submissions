// Demo data for workshops
const workshops = [
    {
        id: 1,
        title: "Resume Building 101",
        date: "2025-05-20",
        time: "16:00",
        description: "Learn how to craft a professional resume.",
        video: "workshop1.mp4",
        live: true
    },
    {
        id: 2,
        title: "Ace Your Interview",
        date: "2025-05-25",
        time: "18:00",
        description: "Tips and tricks for successful interviews.",
        video: "workshop2.mp4",
        live: false
    }
];

const registeredWorkshops = [];
const notifications = [];

// Workshop Listings
function renderWorkshops() {
    const list = document.getElementById('workshops-list');
    list.innerHTML = '';
    workshops.forEach(ws => {
        const card = document.createElement('div');
        card.className = 'workshop-card';
        card.innerHTML = `
            <h3>${ws.title}</h3>
            <p><strong>Date:</strong> ${ws.date} | <strong>Time:</strong> ${ws.time}</p>
            <button onclick="viewDetails(${ws.id})">View Details</button>
            <button onclick="registerWorkshop(${ws.id})">Register</button>
        `;
        list.appendChild(card);
    });
}

window.viewDetails = function(id) {
    const ws = workshops.find(w => w.id === id);
    alert(`${ws.title}\n${ws.description}`);
};

window.registerWorkshop = function(id) {
    if (!registeredWorkshops.includes(id)) {
        registeredWorkshops.push(id);
        const ws = workshops.find(w => w.id === id);
        notifications.push(`You registered for: ${ws.title} on ${ws.date} at ${ws.time}`);
        renderNotifications();
        // Show access and participation tools for the registered workshop
        document.getElementById('workshop-access-section').style.display = '';
        document.getElementById('participation-section').style.display = '';
        document.getElementById('post-workshop-section').style.display = '';
        // Set up video
        document.getElementById('workshop-video').src = ws.video;
        // Set up join live button
        document.getElementById('join-live-btn').style.display = ws.live ? '' : 'none';
    } else {
        alert('Already registered for this workshop.');
    }
};

function renderNotifications() {
    const list = document.getElementById('notifications-list');
    list.innerHTML = '';
    notifications.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        list.appendChild(li);
    });
}

// Media Player Controls
const video = document.getElementById('workshop-video');
document.getElementById('play-btn').onclick = () => video.play();
document.getElementById('pause-btn').onclick = () => video.pause();
document.getElementById('stop-btn').onclick = () => {
    video.pause();
    video.currentTime = 0;
};

// Join Live Workshop
const joinLiveBtn = document.getElementById('join-live-btn');
joinLiveBtn.onclick = () => {
    alert('Joining live workshop... (Demo)');
};

// Note-taking
const notesArea = document.getElementById('notes-area');
document.getElementById('save-notes-btn').onclick = () => {
    localStorage.setItem('workshopNotes', notesArea.value);
    alert('Notes saved!');
};
// Load saved notes
notesArea.value = localStorage.getItem('workshopNotes') || '';

// Chat Box
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');

function addChatMessage(msg, from = 'You') {
    const div = document.createElement('div');
    div.textContent = `${from}: ${msg}`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    // Notification
    if (from !== 'You') {
        showChatNotification();
    }
}

sendChatBtn.onclick = () => {
    if (chatInput.value.trim()) {
        addChatMessage(chatInput.value.trim());
        chatInput.value = '';
    }
};

// Simulate receiving a chat message every 30s
setInterval(() => {
    addChatMessage('This is a message from another attendee.', 'Attendee');
}, 30000);

function showChatNotification() {
    if (Notification.permission === 'granted') {
        new Notification('New chat message!');
    }
}
if (window.Notification && Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// Feedback Form
const feedbackForm = document.getElementById('feedback-form');
feedbackForm.onsubmit = function(e) {
    e.preventDefault();
    alert('Thank you for your feedback!');
    feedbackForm.reset();
};

// Download Certificate
const downloadBtn = document.getElementById('download-certificate-btn');
downloadBtn.onclick = () => {
    // For demo, just download a dummy certificate
    const cert = 'Certificate of Attendance\nStudent Name: John Doe\nWorkshop: Demo Workshop';
    const blob = new Blob([cert], {type: 'text/plain'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'certificate.txt';
    link.click();
};

// Initial render
renderWorkshops();
renderNotifications();
