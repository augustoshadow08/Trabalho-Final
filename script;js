// URL da API para carregar os dados
const apiUrl = 'https://run.mocky.io/v3/dd58cf5e-0ac0-43a0-96e5-f5573e55d5eb';

// Seleciona elementos do DOM
const dogTableBody = document.getElementById('dog-list'); // Seleciona o corpo da tabela
const addDogBtn = document.getElementById('add-dog-btn'); // Seleciona o botão para adicionar cachorro
const addDogForm = document.getElementById('add-dog-form'); // Seleciona o formulário para adicionar cachorro
const dogForm = document.getElementById('dog-form'); // Seleciona o formulário de cadastro
const cancelAddDogBtn = document.getElementById('cancel-add-dog'); // Seleciona o botão para cancelar adição

// Função para carregar os dados da API
async function loadDogs() {
    try {
        // Faz uma requisição assíncrona para a API
        const response = await fetch(apiUrl);
        const dogs = await response.json();
        
        // Limpa o corpo da tabela antes de carregar os novos dados
        dogTableBody.innerHTML = '';

        // Itera sobre cada cachorro e cria uma nova linha na tabela
        dogs.forEach(dog => {
            const row = document.createElement('tr');
            row.innerHTML = `
                 
                <td><img src="${dog.imagem}" alt="${dog.cachorro}"></td>
                <td>${dog.cachorro}</td>
                <td>${dog.dono}</td>
                <td>${dog.telefone}</td>
                <td>${dog.email}</td>
                <td>
                    <button onclick="editDog('${dog.cachorro}')">Editar</button>
                    <button onclick="deleteDog('${dog.cachorro}')">Excluir</button>
                </td>
            `;
            dogTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
}

// Exibir o formulário para adicionar cachorro
addDogBtn.addEventListener('click', () => {
    addDogForm.style.display = 'block';
    addDogBtn.style.display = 'none';  // Esconde o botão "Adicionar Cachorro"
});

// Cancelar o formulário de adição
cancelAddDogBtn.addEventListener('click', () => {
    addDogForm.style.display = 'none';
    addDogBtn.style.display = 'block';  // Exibe o botão novamente
});

// Função para adicionar um cachorro
dogForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // Evita o envio do formulário

    const newDog = {
        id: dogs.length ? dogs[dogs.length - 1].id + 1 : 1,
        cachorro: document.getElementById('dog-name').value,
        dono: document.getElementById('owner-name').value,
        telefone: document.getElementById('dog-phone').value,
        email: document.getElementById('dog-email').value,
        imagem: document.getElementById('dog-photo').value
    };

    // Aqui você pode adicionar o novo cachorro à lista localmente
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><img src="${newDog.imagem}" alt="${newDog.cachorro}"></td>
        <td>${newDog.cachorro}</td>
        <td>${newDog.dono}</td>
        <td>${newDog.telefone}</td>
        <td>${newDog.email}</td>
        <td>
            <button onclick="editDog(${newDog.cachorro})">Editar</button>
            <button onclick="deleteDog(${newDog.cachorro})">Excluir</button>
        </td>
    `;

    dogTableBody.appendChild(newRow);

    // Esconde o formulário e reseta os campos
    addDogForm.style.display = 'none';
    addDogBtn.style.display = 'block';  // Exibe o botão novamente
    dogForm.reset();
});

// Função para editar um cachorro
function editDog(dog) {
    alert(`Editar cachorro com ID: ${dog.cachorro}`);
    
    // Get the row containing the dog information
    const row = dogTableBody.querySelector(`tr[data-cachorro="${dog.cachorro}"]`);
    
    if (row) {
        // Create a form for editing
        const editForm = document.createElement('form');
        editForm.innerHTML = `
            <input type="text" name="cachorro" value="${dog.cachorro}">
            <input type="text" name="dono" value="${dog.dono}">
            <input type="tel" name="telefone" value="${dog.telefone}">
            <input type="email" name="email" value="${dog.email}">
            <img src="${dog.imagem}" alt="${dog.cachorro}">
        `;
        
        // Replace the existing row content with the edit form
        row.innerHTML = '';
        row.appendChild(editForm);
        
        // Add submit button to save changes
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Salvar';
        submitBtn.type = 'submit';
        editForm.appendChild(submitBtn);
        
        // Add cancel button to revert changes
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancelar';
        cancelButton.onclick = function() {
            loadDogs(); // Reload the data from the server
        };
        editForm.appendChild(cancelButton);
        
        // Add submit event listener
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(editForm);
            await updateDog(formData);
            loadDogs(); // Reload the data from the server
        });
    }
}

async function updateDog(formData) {
    try {
        const response = await fetch(`${apiUrl}/${dog.cachorro}`, {
            method: 'PUT',
            body: formData,
        });
        if (!response.ok) throw new Error('Erro ao atualizar o cachorro');
        return true;
    } catch (error) {
        console.error('Erro ao atualizar o cachorro:', error);
        alert('Falha ao atualizar o cachorro. Por favor, tente novamente.');
        return false;
    }
}

function deleteDog(dog) {
    if (confirm(`Tem certeza que deseja excluir o cachorro ${dog.cachorro}?`)) {
        fetch(`${apiUrl}/${dog.cachorro}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Cachorro excluído com sucesso!');
                loadDogs(); // Reload the data from the server
            } else {
                throw new Error('Falha ao excluir o cachorro');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir o cachorro:', error);
            alert('Falha ao excluir o cachorro. Por favor, tente novamente.');
        });
    }
}

// Inicializa a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadDogs();
});
