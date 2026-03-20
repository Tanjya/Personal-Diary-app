const form = document.getElementById('diaryForm');
const list = document.getElementById('entries');

// load it
async function loadEntries() {
    const res = await fetch('/diary');
    const data = await res.json();

    list.innerHTML = '';

    data.forEach(entry => {
        const li = document.createElement('li');

        li.innerHTML = `
            <strong>${entry.category}</strong>: 
            ${entry.entry} (${entry.date})
            <button data-id="${entry.id}">Delete</button>
        `;

        list.appendChild(li);
    });
}

// create it
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

// delete
list.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON') {
        const id = e.target.dataset.id;

        await fetch(`/diary/${id}`, {
            method: 'DELETE'
        });

        loadEntries();
    }
});

// load it all
loadEntries();