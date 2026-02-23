const titleInput = document.getElementById("titleInput");
const yearInput = document.getElementById("yearInput");

const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const editBtn = document.getElementById("editBtn");

const movieList = document.getElementById("movieList");

let movies = [];
let nextId = 1;

/* =========================
   Renderizar películas
========================= */
function renderMovies() {
  movieList.innerHTML = "";

  for (const m of movies) {
    const li = document.createElement("li");
    li.className = "item";
    li.dataset.id = String(m.id);

    li.innerHTML = `
      <div>
        <strong>${m.title}</strong>
        <span class="badge">${m.year}</span>
      </div>
    `;

    // Sistema de selección
    li.addEventListener("click", () => {
      document
        .querySelectorAll(".item")
        .forEach(el => el.classList.remove("selected"));

      li.classList.add("selected");
    });

    movieList.appendChild(li);
  }
}

/* =========================
   Añadir película
========================= */
function addMovie() {
  const title = titleInput.value.trim();
  const year = Number(yearInput.value);

  if (!title || !year) {
    alert("Introduce título y año válidos.");
    return;
  }

  movies.push({
    id: nextId++,
    title,
    year
  });

  titleInput.value = "";
  yearInput.value = "";

  renderMovies();
}

addBtn.addEventListener("click", addMovie);

/* =========================
   Eliminar película
========================= */
deleteBtn.addEventListener("click", () => {
  const selected = movieList.querySelector(".selected");

  if (!selected) {
    alert("Selecciona una película para eliminar.");
    return;
  }

  const id = Number(selected.dataset.id);
  movies = movies.filter(m => m.id !== id);

  renderMovies();
});

/* =========================
   Editar película
========================= */
editBtn.addEventListener("click", () => {
  const selected = movieList.querySelector(".selected");

  if (!selected) {
    alert("Selecciona una película para editar.");
    return;
  }

  const id = Number(selected.dataset.id);
  const movie = movies.find(m => m.id === id);

  if (!movie) return;

  const newTitle = prompt("Nuevo título:", movie.title);
  if (newTitle === null) return;

  const newYearStr = prompt("Nuevo año:", movie.year);
  if (newYearStr === null) return;

  const newYear = Number(newYearStr);

  if (!newTitle.trim() || !newYear) {
    alert("Datos inválidos.");
    return;
  }

  movie.title = newTitle.trim();
  movie.year = newYear;

  renderMovies();
});

renderMovies();