// Array local de cachorros
let dogs = [];

// Seleciona elementos do DOM
const dogTableBody = document.getElementById('dog-list');
const addDogBtn = document.getElementById('add-dog-btn');
const addDogForm = document.getElementById('add-dog-form');
const dogForm = document.getElementById('dog-form');
const cancelAddDogBtn = document.getElementById('cancel-add-dog');

// URL da API para carregar os dados
const apiUrl = 'https://run.mocky.io/v3/dd58cf5e-0ac0-43a0-96e5-f5573e55d5eb';

// Função para carregar os dados da API e popular o array
async function loadDogsFromApi() {
    try {
        const response = await fetch(apiUrl);
        dogs = await response.json(); // Atualiza o array local com os dados da API
        renderDogTable(); // Atualiza a tabela com os dados
    } catch (error) {
        console.error('Erro ao carregar os dados da API:', error);
    }
}

// Função para renderizar a tabela
function renderDogTable() {
    dogTableBody.innerHTML = ''; // Limpa a tabela

    dogs.forEach(dog => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${dog.imagem}" alt="${dog.cachorro}" style="width:50px;"></td>
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
}

// Exibir o formulário para adicionar um cachorro
addDogBtn.addEventListener('click', () => {
    addDogForm.style.display = 'block';
    addDogBtn.style.display = 'none';
});

// Cancelar a adição de cachorro
cancelAddDogBtn.addEventListener('click', () => {
    addDogForm.style.display = 'none';
    addDogBtn.style.display = 'block';
    dogForm.reset();
});

// Função para adicionar um cachorro
dogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newDog = {
        cachorro: document.getElementById('dog-name').value,
        dono: document.getElementById('owner-name').value,
        telefone: document.getElementById('dog-phone').value,
        email: document.getElementById('dog-email').value,
        imagem: document.getElementById('dog-photo').value
    };

    // Adiciona o cachorro ao array local
    dogs.push(newDog);
    renderDogTable(); // Re-renderiza a tabela

    // Esconde o formulário e reseta os campos
    addDogForm.style.display = 'none';
    addDogBtn.style.display = 'block';
    dogForm.reset();
});

// Função para editar um cachorro
function editDog(cachorro) {
    const dog = dogs.find(d => d.cachorro === cachorro);
    
    if (dog) {
        // Preenche o formulário de edição com os dados do cachorro
        document.getElementById('dog-name').value = dog.cachorro;
        document.getElementById('owner-name').value = dog.dono;
        document.getElementById('dog-phone').value = dog.telefone;
        document.getElementById('dog-email').value = dog.email;
        document.getElementById('dog-photo').value = dog.imagem;

        // Esconde o botão de adicionar e exibe o botão de salvar
        addDogForm.style.display = 'block';
        addDogBtn.style.display = 'none';

        // Modifica o evento de submit do formulário para editar
        dogForm.onsubmit = (e) => {
            e.preventDefault();

            // Atualiza o cachorro no array
            dog.cachorro = document.getElementById('dog-name').value;
            dog.dono = document.getElementById('owner-name').value;
            dog.telefone = document.getElementById('dog-phone').value;
            dog.email = document.getElementById('dog-email').value;
            dog.imagem = document.getElementById('dog-photo').value;

            // Atualiza a tabela sem duplicação, encontrando e atualizando a linha específica
            updateDogRow(dog);

            // Esconde o formulário e exibe o botão de adicionar novamente
            addDogForm.style.display = 'none';
            addDogBtn.style.display = 'block';
            dogForm.reset();

            // Reseta o evento do formulário para a função de adicionar
            dogForm.onsubmit = (e) => {
                e.preventDefault();
                addDog(); // Adiciona um cachorro
            };
        };
    }
}

// Atualiza a linha específica da tabela com os dados modificados
function updateDogRow(dog) {
    // Encontra a linha correspondente ao cachorro que foi editado
    const row = Array.from(dogTableBody.rows).find(r => r.cells[1].textContent === dog.cachorro);
    
    // Atualiza os dados da linha
    if (row) {
        row.innerHTML = `
            <td><img src="${dog.imagem}" alt="${dog.cachorro}" style="width:50px;"></td>
            <td>${dog.cachorro}</td>
            <td>${dog.dono}</td>
            <td>${dog.telefone}</td>
            <td>${dog.email}</td>
            <td>
                <button onclick="editDog('${dog.cachorro}')">Editar</button>
                <button onclick="deleteDog('${dog.cachorro}')">Excluir</button>
            </td>
        `;
    }
}

// Função para excluir um cachorro
function deleteDog(cachorro) {
    if (confirm(`Tem certeza que deseja excluir o cachorro ${cachorro}?`)) {
        // Remove o cachorro do array
        dogs = dogs.filter(dog => dog.cachorro !== cachorro);

        // Atualiza a tabela
        renderDogTable();
    }
}

// Inicializa a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadDogsFromApi(); // Carrega os dados da API ao iniciar
});
