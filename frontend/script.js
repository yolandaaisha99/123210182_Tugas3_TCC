const API_URL =
  "https://notes-backend-802214430478.asia-southeast2.run.app";

async function getNotes() {
  const res = await fetch(`${API_URL}/notes`);
  const data = await res.json();

  const list = document.getElementById("notesList");
  const noteCount = document.getElementById("noteCount");
  const emptyState = document.getElementById("emptyState");

  list.innerHTML = "";

  if (data.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  noteCount.textContent = `${data.length} catatan`;

  data.forEach(note => {
    list.innerHTML += `
      <div class="note">
        <h3>${note.judul}</h3>
        <p>${note.isi}</p>
        <button onclick="deleteNote(${note.id})">Hapus</button>
      </div>
    `;
  });
}

async function addNote() {
  const judul = document.getElementById("judul").value;
  const isi = document.getElementById("isi").value;

  await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ judul, isi })
  });

  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";

  getNotes();
}

async function deleteNote(id) {
  await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE"
  });

  getNotes();
}

function cancelEdit() {
  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";
}

getNotes();
