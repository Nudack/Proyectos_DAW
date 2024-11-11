// VARIABLES GLOBALES
const addForm = document.getElementById('add-form');
const itemNameInput = document.getElementById('item-name');
const searchForm = document.getElementById('search-form');
const searchBar = document.getElementById('search-bar');
const rootCategory = document.getElementById('root-category');

// FUNCIÓN PARA AÑADIR SUBCATEGORÍA O PRODUCTO
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const itemName = itemNameInput.value.trim();
  if (itemName) addItem(itemName, rootCategory);
  itemNameInput.value = '';
});

// FUNCIÓN PARA AÑADIR ELEMENTO
function addItem(name, parent) {
  const selectedParent = parent.querySelector('ul.subcategories') || parent;
  if (!itemExists(selectedParent, name)) {
    createListItem(selectedParent, name);
  } else {
    alert('Elemento ya existe.');
  }
}

// COMPROBAR SI EL ELEMENTO YA EXISTE
function itemExists(parent, name) {
  return Array.from(parent.children).some((child) => 
    child.querySelector('.name').textContent === name
  );
}

// CREAR NUEVO ELEMENTO LI PARA SUBCATEGORÍA O PRODUCTO
function createListItem(parent, name) {
  const li = document.createElement('li');
  const nameSpan = document.createElement('span');
  nameSpan.textContent = name;
  nameSpan.classList.add('name');

  // Checkbox para mostrar/ocultar subcategorías
  const toggleCheckbox = document.createElement('input');
  toggleCheckbox.type = 'checkbox';
  toggleCheckbox.classList.add('toggle-view');
  toggleCheckbox.checked = true;

  // Botón para añadir subcategoría/producto
  const addButton = document.createElement('button');
  addButton.textContent = '+';
  addButton.classList.add('add-btn');
  addButton.addEventListener('click', () => addItemPrompt(li.querySelector('.subcategories') || li));

  // Botón para eliminar subcategoría/producto
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => deleteItem(li));

  li.appendChild(deleteButton);
  li.appendChild(toggleCheckbox);
  li.appendChild(nameSpan);
  li.appendChild(addButton);

  const subcategoryList = document.createElement('ul');
  subcategoryList.classList.add('subcategories');
  li.appendChild(subcategoryList);

  // Toggle para mostrar u ocultar subcategorías
  toggleCheckbox.addEventListener('change', () => {
    subcategoryList.style.display = toggleCheckbox.checked ? 'block' : 'none';
  });

  parent.appendChild(li);
}

// PROMPT PARA AÑADIR NUEVO ELEMENTO
function addItemPrompt(parent) {
  const name = prompt('Ingrese nombre:');
  if (name) {
    if (!itemExists(parent, name)) {
      createListItem(parent, name);
    } else {
      alert('Elemento ya existe.');
    }
  }
}

// ELIMINAR ELEMENTO SI NO TIENE HIJOS
function deleteItem(li) {
  const subcategories = li.querySelector('ul.subcategories');
  if (subcategories && subcategories.children.length > 0) {
    alert('No se puede eliminar una categoría/subcategoría con contenido.');
  } else {
    li.remove();
  }
}

// FILTRADO DE ELEMENTOS
searchForm.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase();
  filterItems(rootCategory, searchTerm);
});

// FILTRAR ELEMENTOS EN BASE A TÉRMINO DE BÚSQUEDA
function filterItems(parent, searchTerm) {
  Array.from(parent.querySelectorAll('li')).forEach((li) => {
    const name = li.querySelector('.name').textContent.toLowerCase();
    const isMatch = name.includes(searchTerm);
    
    li.style.display = isMatch ? 'block' : 'none';
    
    const subcategories = li.querySelector('.subcategories');
    if (subcategories) {
      subcategories.style.display = subcategories.children.length > 0 && isMatch ? 'block' : 'none';
    }
  });
}

// AUTOCOMPLETADO DE BÚSQUEDA
searchBar.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    autocompleteSearch();
  }
});

function autocompleteSearch() {
  const searchTerm = searchBar.value.toLowerCase();
  const allItems = rootCategory.querySelectorAll('.name');
  const matches = Array.from(allItems).filter((item) =>
    item.textContent.toLowerCase().startsWith(searchTerm)
  );
  if (matches.length === 1) searchBar.value = matches[0].textContent;
}
