// VARIABLES GLOBALES
const addForm = document.getElementById('add-form');
const itemNameInput = document.getElementById('item-name');
const searchForm = document.getElementById('search-form');
const searchBar = document.getElementById('search-bar');
const rootCategory = document.getElementById('root-category');

// EVENTO PARA AÑADIR SUBCATEGORÍA O PRODUCTO DESDE EL FORMULARIO
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const itemName = itemNameInput.value.trim();
  if (itemName) {
    addItem(itemName, rootCategory);
    itemNameInput.value = ''; // Limpiar campo
  }
});

// FUNCIÓN PARA AÑADIR NUEVO ELEMENTO
function addItem(name, parent) {
  const selectedParent = parent.querySelector('ul.subcategories') || parent;
  if (!itemExistsInHierarchy(parent, name)) {
    createListItem(selectedParent, name);
  } else {
    alert('Elemento ya existe en este nivel o en un nivel superior.');
  }
}

// COMPROBAR SI EL ELEMENTO YA EXISTE EN EL MISMO NIVEL O EN NIVELES SUPERIORES
function itemExistsInHierarchy(parent, name) {
  // Recorrer hacia arriba en el árbol para buscar duplicados
  while (parent) {
    if (itemExists(parent, name)) {
      return true;
    }
    parent = parent.parentElement.closest('li'); // Ir al nivel superior
  }
  return false;
}

// COMPROBAR SI EL ELEMENTO YA EXISTE EN EL MISMO NIVEL
function itemExists(parent, name) {
  return Array.from(parent.querySelectorAll(':scope > ul > li')).some(child =>
    child.querySelector('.name')?.textContent === name
  );
}

// CREAR NUEVO ELEMENTO (CATEGORÍA O PRODUCTO)
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

  // Botón para añadir subcategoría o producto
  const addButton = document.createElement('button');
  addButton.textContent = '+';
  addButton.classList.add('add-btn');
  addButton.addEventListener('click', () => {
    const itemName = itemNameInput.value.trim();
    if (itemName) {
      addItem(itemName, li);
      itemNameInput.value = ''; // Limpiar campo después de añadir
    }
  });

  // Botón para eliminar elemento si es subcategoría o producto
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

// FUNCIÓN PARA FILTRAR ELEMENTOS
function filterItems(parent, searchTerm) {
  Array.from(parent.querySelectorAll('li')).forEach(li => {
    const name = li.querySelector('.name').textContent.toLowerCase();
    const isMatch = name.includes(searchTerm);

    li.style.display = isMatch ? 'block' : 'none';

    const subcategories = li.querySelector('.subcategories');
    if (subcategories) {
      subcategories.style.display = subcategories.children.length > 0 && isMatch ? 'block' : 'none';
    }
  });
}

// AUTOCOMPLETADO DE BÚSQUEDA CON TAB
searchBar.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    autocompleteSearch();
  }
});

function autocompleteSearch() {
  const searchTerm = searchBar.value.toLowerCase();
  const allItems = rootCategory.querySelectorAll('.name');
  const matches = Array.from(allItems).filter(item =>
    item.textContent.toLowerCase().startsWith(searchTerm)
  );
  if (matches.length === 1) searchBar.value = matches[0].textContent;
}
