const API_URL = "http://localhost:3000/api/feedback";

const form = document.getElementById("feedback-form");
const nameInput = document.getElementById("user-name");
const messageInput = document.getElementById("user-message");
const listEl = document.getElementById("feedback-list");
const errorBox = document.getElementById("error-box");

// 1. READ: Fetch all feedback from Express
async function fetchFeedback() {
  showError(null);
  try {
    const msg= await fetch(API_URL);

    if (!msg.ok) throw new Error(`HTTP Error: ${msg.status}`);
    console.log(msg)
    inJson=await msg.json()
    console.log(inJson)

  tasks = inJson.map((item) => ({
      id: item.id,
      name: item.name,
      message: item.message || "Loaded via Fetch API",
    }));

    console.log(tasks)
    renderFeedback(tasks)
    // renderFeedback(tasks)
    // TODO 1: Use fetch(API_URL), check response.ok, parse JSON, and pass data to renderFeedback(data)
    // Hint: Check f() in TaskFlow!

  } catch (err) {
    showError(err.message);
  }
}

// 2. CREATE: Send new feedback to Express
async function submitFeedback(e) {
  e.preventDefault();
  showError(null);

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  try {
      const resp = await fetch(API_URL, {
      method: "POST",                                      // Verb: Create new resource
      headers: { "Content-Type": "application/json" },     // Envelope label: Sending JSON text
      body: JSON.stringify({ name, message}) // Pack JS object -> JSON string
    });

    
  if (!resp.ok){
    const err= await resp.json();
    throw new Error(err.error);
  };


    form.reset();
    fetchFeedback();
    // TODO 2: Send a POST request to API_URL with JSON headers and body: { name, message }
    // If !response.ok, read the error JSON from the server and throw new Error(errData.error)
    // On success: call form.reset() and fetchFeedback() to refresh the list!
    
  } catch (err) {
    showError(err.message);
  }
}

// --- Already Built Helpers ---
function renderFeedback(items) {
  listEl.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.name}</strong><span>${item.message}</span>`;
    listEl.appendChild(li);
  });
}

function showError(msg) {
  errorBox.classList.toggle("hidden", !msg);
  errorBox.textContent = msg || "";
}

form.addEventListener("submit", submitFeedback);
fetchFeedback();