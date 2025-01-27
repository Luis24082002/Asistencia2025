const table = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
let editingRow = null;


window.onload = () => {
  const savedData = JSON.parse(localStorage.getItem('attendanceData')) || [];
  savedData.forEach(data => addRowToTable(data));
};

function showForm(isEditing = false, row = null) {
  document.getElementById('formContainer').style.display = 'block';
  if (isEditing && row) {
    editingRow = row;
    document.getElementById('formTitle').textContent = 'Actualizar Estudiante';
    document.getElementById('name').value = row.cells[0].textContent;
    document.getElementById('id').value = row.cells[1].textContent;
    document.getElementById('email').value = row.cells[2].textContent;
    document.getElementById('status').value = row.cells[3].textContent;
  } else {
    document.getElementById('formTitle').textContent = 'Agregar Estudiante';
    document.getElementById('studentForm').reset();
    editingRow = null;
  }
}

function hideForm() {
  document.getElementById('formContainer').style.display = 'none';
  document.getElementById('studentForm').reset();
  editingRow = null;
}

function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  const email = document.getElementById('email').value;
  const status = document.getElementById('status').value;
  const date = new Date().toLocaleDateString();

  const studentData = { name, id, email, status, date };

  if (editingRow) {
    
    editingRow.cells[0].textContent = name;
    editingRow.cells[1].textContent = id;
    editingRow.cells[2].textContent = email;
    editingRow.cells[3].textContent = status;

    
    saveToLocalStorage()
    showNotification(`Información de ${name} actualizada con éxito.`);
  } else {
    
    addRowToTable(studentData);
    showNotification(`Estudiante ${name} agregado con éxito.`);
  }

  saveToLocalStorage();
  hideForm();
}

function addRowToTable(data) {
  const newRow = table.insertRow();

  const nameCell = newRow.insertCell(0);
  const idCell = newRow.insertCell(1);
  const emailCell = newRow.insertCell(2);
  const statusCell = newRow.insertCell(3);
  const dateCell = newRow.insertCell(4);
  const actionCell = newRow.insertCell(5);

  nameCell.textContent = data.name;
  idCell.textContent = data.id;
  emailCell.textContent = data.email;
  statusCell.textContent = data.status;
  dateCell.textContent = data.date;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.onclick = () => {
    table.deleteRow(newRow.rowIndex - 1);
    saveToLocalStorage();
    showNotification(`${data.name} eliminado con éxito.`);
  };

  const updateButton = document.createElement('button');
  updateButton.textContent = 'Actualizar';
  updateButton.onclick = () => showForm(true, newRow);


  const detailsButton = document.createElement('button');
  detailsButton.textContent = 'Detalles';
  detailsButton.onclick = () => showDetails(data);

  actionCell.appendChild(deleteButton);
  actionCell.appendChild(updateButton);
  actionCell.appendChild(detailsButton);
}

function saveToLocalStorage() {
  const rows = Array.from(table.rows).map(row => ({
    name: row.cells[0].textContent,
    id: row.cells[1].textContent,
    email: row.cells[2].textContent,
    status: row.cells[3].textContent,
    date: row.cells[4].textContent,
  }));

  localStorage.setItem('attendanceData', JSON.stringify(rows));
}


function showNotification(message) {
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notificationMessage');

  notificationMessage.textContent = message;
  notification.style.display = 'block'; 

  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}


function showDetails(data) {
  document.getElementById('detailName').textContent = data.name;
  document.getElementById('detailId').textContent = data.id;
  document.getElementById('detailEmail').textContent = data.email;
  document.getElementById('detailStatus').textContent = data.status;
  document.getElementById('detailDate').textContent = data.date;

  document.getElementById('studentDetails').style.display = 'block';
}


function hideDetails() {
  document.getElementById('studentDetails').style.display = 'none';
}





        
  