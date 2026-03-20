const form = document.getElementById('diaryForm');
const list = document.getElementById('entries');
const searchInput = document.getElementById('search');

let allEntries = [];

async function loadEntries() {
    const res = await fetch('/diary');
    const data = await res.json();

    allEntries = data;
    renderEntries(allEntries);
}

function renderEntries(entries) {
    list.innerHTML = '';

    entries.forEach(entry => {
        const li = document.createElement('li');
        const formattedDate = new Date(entry.date).toLocaleDateString('en-GB');

        li.innerHTML = `
            <div class="entry-content">
                <span class="entry-category">${entry.category}</span>
                <p>${entry.entry}</p>
                <span class="entry-date">${formattedDate}</span>
            </div>
            <div class="entry-actions">
                <button data-id="${entry.id}" class="edit-btn">Edit</button>
                <button data-id="${entry.id}" class="delete-btn">Delete</button>
            </div>
        `;

        list.appendChild(li);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newEntry = {
        category: document.getElementById('category').value,
        entry: document.getElementById('entry').value,
        date: document.getElementById('date').value
    };

    await fetch('/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
    });

    form.reset();
    loadEntries();
});

list.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains('delete-btn')) {
        await fetch(`/diary/${id}`, {
            method: 'DELETE'
        });
        loadEntries();
    }

    if (e.target.classList.contains('edit-btn')) {
        const newText = prompt('Edit your diary entry:');

        if (!newText) return;

        await fetch(`/diary/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entry: newText })
        });

        loadEntries();
    }
});

searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();

    const filtered = allEntries.filter(entry =>
        entry.category.toLowerCase().includes(term) ||
        entry.entry.toLowerCase().includes(term) ||
        entry.date.includes(term)
    );

    renderEntries(filtered);
});

loadEntries();