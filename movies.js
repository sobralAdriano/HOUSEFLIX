// Primeiro definimos o moviesArray que vai ser o responsável por pegar os filme que vamos salvar no localStorage.
// Detalhe: esse || [] que coloquei é uma comparação.
// Ele checa se existe itens no localStorage. Se não existir, ele seta como um array vazio.
// Pq um array? Por que os nossos filme, como são mais de um, precisam ser do tipo array.
const moviesArray = JSON.parse(localStorage.getItem('movies')) || [];

function showMovies(clearMovies = false) {
  // Aqui definimos movieContent. Ele vai servir para conseguimos adicionar os filme no nosso HTML/DOM.
  const movieContent = document.querySelector('.content');

  // O clearMovies serve para limpar a listagem de filme e previnir que eles não se repitam por meio do nosso loop forEach.
  if (clearMovies) {
    movieContent.innerHTML = '';
  }
  // Se existir filme adicionados no nosso moviesArray(que é do localStorage), então vamos fazer o loop e adicionar os filme.
  if (moviesArray.length > 0) {
    moviesArray.forEach((movie) => {
      // Aqui estamos alterando o conteúdo do nosso movieContent a cada loop.
      // Se existir 5 filme, ele vai fazer o loop 5x e adicionar esses conteúdos.
      // Adicionamos ele alterando o innerHTML.
      // Não pode ser textContent por que estamos adicionando tags HTML na nossa manipulação.
      movieContent.innerHTML =
        movieContent.innerHTML + //Estamos usando template literal, que é o nome quando utilizamos a crase(esse pra esquerda).
        // Com ele nós conseguimos utilizar variaveis com mais facilidade.
        `<div class="movie-card"><div class="movie-details">Titulo: ${movie.movieTitle}<br />Descrição: ${movie.description}<br />Estrelando: ${movie.actors}<br /></div><img src="${movie.image}" alt="${movie.movieTitle}" /><br /></div>`;
    });
  } else {
    // se não houver filme, vamos manipular o DOM e dizer que não existem filmes disponiveis.
    movieContent.innerHTML = 'Sem filmes disponíveis.';
  }
}
// Aqui estamos pegando o nosso formulário para manipular
const movieForm = document.querySelector('#movieForm');

movieForm.addEventListener('submit', (event) => {
  // event.preventDefault para previnir que a página carregue.
  event.preventDefault();
  // Iniciamos o nosso objeto movie, que é quem vai guardar cada filme individualmente e mandar pro nosso array de filmes que vai pro localStorage.
  // usamos let por que é uma variável que vai ser alterada por nós.
  let movie = {};
  movie.movieTitle = document.getElementById('movieTitle').value;
  movie.description = document.getElementById('description').value;
  movie.actors = document.getElementById('actors').value;
  movie.image = document.getElementById('image').value;

  // aqui estamos pegando a mensagem de alerta para manipular ela caso aja erro ou sucesso.
  const alertMessage = document.querySelector('.alert');
  // nesse if checamos se algum dos campos está vazio, para não permitir que sejam cadastrados filmes sem informações.
  if (
    movie.movieTitle === '' ||
    movie.description === '' ||
    movie.actors === '' ||
    movie.image === ''
  ) {
    alertMessage.innerHTML = 'Por favor, preencha todos os campos.';
    // O nosso alerta é inicializado no HTML com display: none, ou seja, invisivel. Aqui a gente seta ele pra ser visivel com o display: block
    alertMessage.style = 'display: block; color: red';
  } else {
    // se tudo for preechido, prosseguimos com a adição do livro.
    //o método push serve para adicionar um novo item a um array.
    moviesArray.push(movie);
    //aqui atualizamos o nosso localStorage com o novo filme e utilizamos o stringify para transformar o objeto em string.
    localStorage.setItem('movies', JSON.stringify(moviesArray));
    //Abaixo nós utilizamos a função showMovies para mostrar os filmes conforme eles são adicionados.
    //Passamos true como parametro para sinalizar que queremos que ele limpe a lista de filmes anteriores para evitar duplicados.
    showMovies(true);
    alertMessage.innerHTML = 'Filme adicionado com sucesso!';
    alertMessage.style = 'display: block; color: green';
    setTimeout(() => {
      //utilizamos o timeout para resetar os dados do nosso formulario e para remover o modal de adicionar filmes
      alertMessage.innerHTML = '';
      movieForm.style = 'display: none';
      movieForm.reset();
    }, 2000);
  }
});

// função para mostrar o modal de filmes
function showAddMoviesModal() {
  movieForm.style = 'display: flex';
}

// mostrando os filmes ao carregar a página
window.onload = function () {
  showMovies();
};
