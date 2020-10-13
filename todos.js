var listElement = document.querySelector('#app ul') // -> Referenciando a ul dentro da div com id app

var inputElement = document.querySelector('#app input') // -> Referenciando o input dentro da div com id app

var buttonElement = document.querySelector('#app button') // -> Referenciando o botao dentro da div com id app

var todos = JSON.parse(localStorage.getItem('list_todos')) || []

function renderTodos() {
  listElement.innerHTML = ''

  for(todo of todos) { // percorrer todos os todos do array "todos" e colocar na variavel "todo"
    var todoElement = document.createElement('li') // -> Criando um elemento li 
    var todoText = document.createTextNode(todo) // -> Criando um texto para colocar no todo

    var linkElement = document.createElement('a') // -> Criando o elemento a

    var pos = todos.indexOf(todo) // -> Pegando a posição do todo
    linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')') // -> Executando a função para deletar o todo

    var linkText = document.createTextNode('Excluir') // -> Criando um texto para o elemento a

    linkElement.setAttribute('href', '#') // -> Setando um atributo para o elemento a
    linkElement.appendChild(linkText) // -> Adicionando o texto do elemento em si

    todoElement.appendChild(todoText) // -> Colocando o texto em si na li(li)
    todoElement.appendChild(linkElement)
    listElement.appendChild(todoElement) // -> Colocando o todo na lista(ul)
  }
}

renderTodos();

function addTodo() {
  var todoText = inputElement.value; // -> Colocando o valor do input em uma variavel

  todos.push(todoText); // -> Adicionando o valor do input dentro do array
  inputElement.value = '' // -> Limpando o valor do input

  renderTodos(); // -> Chamando a função de renderizar, já com o novo todo
  saveToStorage() // -> Salvando no local storage
}

buttonElement.addEventListener('click', e => {
  addTodo()
}) // -> No clique do botão adicionar um todo

function deleteTodo(pos) {
  todos.splice(pos, 1); // -> Pegar a posição do todo

  renderTodos() // -> Chamando a função de renderizar, já sem o todo excluido
  saveToStorage() // -> Salvando no local storage
}

function saveToStorage() {
  localStorage.setItem('list_todos', JSON.stringify(todos)) // -> Salvando a lista no local storage
}