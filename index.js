//file to convert json file.
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const rows = document.getElementsByClassName('row');
    const data = [];
    
    for (let i = 0; i < rows.length; i++) {
      const inputs = rows[i].getElementsByClassName('edit-field');
      const rowValues = {};
      
      for (let j = 0; j < inputs.length; j++) {
        const inputName = `Value ${j+1}`;
        const inputValue = inputs[j].value;
        
        rowValues[inputName] = inputValue;
      }
      
      data.push(rowValues);
    }
    console.log(data);
    
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
  });
  // edit, delete, add, and submit
  let myArray = [];
  const container = document.getElementById('container');
  const addBtn = document.getElementById('addBtn');
  const submitBtn = document.getElementById('submitBtn');
  let rowCount = 1;
//to create new row
  function createRow(rowId) {
    const row = document.createElement('div');
    row.classList.add('row');
     row.id = `row-${rowId}`
    const idParagraph = document.createElement('p');
    idParagraph.textContent = `${rowId}`;
    idParagraph.style.display = "inline-block";
    row.appendChild(idParagraph);
    for (let i = 0; i < 4; i++) {
      
      const inputField = document.createElement('input');
      inputField.classList.add('edit-field');
      inputField.type = 'text';
      inputField.value = 'Sample Text';
      inputField.readOnly = true;
      row.appendChild(inputField);
    }
   

    const editBtn = document.createElement('button');
    editBtn.classList.add('button', 'edit-btn');
    editBtn.textContent = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('button', 'delete-btn');
    deleteBtn.textContent = 'Delete';
    
    row.appendChild(editBtn);
    row.appendChild(deleteBtn);
   

    return row;
  }
  //edit
//   function enableEdit(row) {
//     const inputFields = row.querySelectorAll('.edit-field');
//     inputFields.forEach(inputField => {
//       inputField.readOnly = false;
//     });
//     inputFields[0].focus();
//   }
function enableEdit(row) {
    const inputFields = row.getElementsByClassName('edit-field');
    const editBtn = row.getElementsByClassName('edit-btn')[0];
    const deleteBtn = row.getElementsByClassName('delete-btn')[0];
  
    // Change button text to "Save"
    editBtn.textContent = 'Save';
  
    // Change delete button text to "Cancel"
    deleteBtn.textContent = 'Cancel';
  
    // Enable editing of input fields
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].readOnly = false;
      myArray.push(inputFields[i].value);
    }
  
    // Change button functionality to saveEdit
    editBtn.removeEventListener('click', enableEdit);
    editBtn.addEventListener('click', () => {
      saveEdit(row);
    });
  
    // Change delete button functionality to cancelEdit
    deleteBtn.removeEventListener('click', deleteRow);
    deleteBtn.addEventListener('click', () => {
      cancelEdit(row);
    });
  }
  
  function cancelEdit(row) {
    const inputFields = row.getElementsByClassName('edit-field');
    const editBtn = row.getElementsByClassName('edit-btn')[0];
    const deleteBtn = row.getElementsByClassName('delete-btn')[0];
  
    // Disable editing of input fields and revert to previous values
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].readOnly = true;
      inputFields[i].value = myArray[i];
    }
  
    // Change button text back to "Edit"
    editBtn.textContent = 'Edit';
  
    // Change delete button text back to "Delete"
    deleteBtn.textContent = 'Delete';
  
    // Change button functionality back to enableEdit
    editBtn.removeEventListener('click', saveEdit);
    editBtn.addEventListener('click', () => {
      enableEdit(row);
    });
  
    // Change delete button functionality back to deleteRow
    deleteBtn.removeEventListener('click', cancelEdit);
    deleteBtn.addEventListener('click', () => {
      deleteRow(row);
      rowCount ++;
      updateRowIDs();
    });
  }
  
  function saveEdit(row) {
    const inputFields = row.getElementsByClassName('edit-field');
    const editBtn = row.getElementsByClassName('edit-btn')[0];
    const deleteBtn = row.getElementsByClassName('delete-btn')[0];
  
    // Disable editing of input fields and make them readonly
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].readOnly = true;
    }
  
    // Change button text back to "Edit"
    editBtn.textContent = 'Edit';
  
    // Change delete button text back to "Delete"
    deleteBtn.textContent = 'Delete';
  
    // Change button functionality back to enableEdit
    editBtn.removeEventListener('click', saveEdit);
    editBtn.addEventListener('click', () => {
      enableEdit(row);
    });
  
    // Change delete button functionality back to deleteRow
    deleteBtn.removeEventListener('click', cancelEdit);
    deleteBtn.addEventListener('click', () => {
      deleteRow(row);
      rowCount ++;
    });
  }
//delete
  function deleteRow(row) {
    const deleteBtn = row.getElementsByClassName('delete-btn')[0];
    
    if(deleteBtn.textContent == "Delete"){
        row.remove();
    rowCount --;
      console.log(rowCount);
      updateRowIDs();
    }else{
        cancelEdit(row)
    }
    
    }
      
  
  //ROW ID UPDATE FUNCTION
  function updateRowIDs() {
    const rows = container.getElementsByClassName('row');
    for (let i = 0; i < rows.length; i++) {
      rows[i].id = `row-${i}`;
      const idParagraph = rows[i].querySelector('p');
      idParagraph.textContent = `${i}`;
    }
  }
//add new row
  function addRow() {
    const newRow = createRow(rowCount);
    container.appendChild(newRow);
    enableRowFunctionality(newRow, rowCount);
    rowCount++;
    console.log(rowCount);
  }
 //adding this functianality
 
  function enableRowFunctionality(row, rowId) {
    const editBtn = row.querySelector('.edit-btn');
    const deleteBtn = row.querySelector('.delete-btn');
    const idParagraph = row.querySelector('p');

    editBtn.addEventListener('click', () => {
      enableEdit(row);
    });
    
    
        deleteBtn.addEventListener('click', () => {
            deleteRow(row);
            
          });

    
    idParagraph.textContent = `${rowId}`;
  }
//to add button
  addBtn.addEventListener('click', () => {
    addRow();
  });
  //submit to need


//   submitBtn.addEventListener('click', () => {
//     const inputFields = document.querySelectorAll('.edit-field');
//     const values = Array.from(inputFields).map(field => field.value);
//     console.log(values);
//   });

// //   enableRowFunctionality(container.firstElementChild);
 enableRowFunctionality(document.getElementById('row-0'), 0);