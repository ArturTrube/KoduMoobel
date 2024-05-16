var modal = document.getElementById("myModal");
var btn = document.getElementById("openModal");


function cardModal(title, description) {
  modal.style.display = "block";

  document.getElementById('modal-title').innerText = title
  document.getElementById('modal-description').innerText = description
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function filterByCategory(category) {
  var cards = document.querySelectorAll('.card-container');

  if (category === 'all') {
    document.getElementById('category-name').innerText = 'Все категории'
  }else{
    document.getElementById('category-name').innerText = category
  }

  cards.forEach(function(card) {
      var cardCategory = card.dataset.category; 
      if (cardCategory !== category && category !== 'all') {
          card.style.display = 'none'; 
      } else {
          card.style.display = 'block';
      }
  });
}

function toBasket(itemId) {
  fetch('/users/add-to-basket', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ itemId: itemId })
  })
  .then(response => {
    if (response.ok) {
      console.log('Товар успешно добавлен в корзину!');
      const button = document.getElementById(itemId);
      button.innerText = 'В корзине';
      button.onclick = function() {
        removeFromBasket(itemId);
  };
    } else if (response.status === 403) {
      console.error('Пользователь не авторизован');
      window.location.href = '/login';
    } else {
      console.error('Произошла ошибка при добавлении товара в корзину');
      document.getElementById(itemId).innerText = 'Ошибка';
    }
  })
  .catch(error => {
      console.error('Произошла ошибка при отправке запроса на сервер:', error);
  });
}

function removeFromBasket(itemId) {
  fetch('/users/remove-from-basket', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ itemId: itemId })
  })
  .then(response => {
    if (response.ok) {
      console.log('Товар успешно убран из корзины!');
      const button = document.getElementById(itemId);
      button.innerText = 'Добавить в корзину';
      button.onclick = function() {
        toBasket(itemId);
      }
    } else if (response.status === 403) {
      console.error('Пользователь не авторизован');
      window.location.href = '/login';
    } else {
      console.error('Произошла ошибка при удалении товара в корзину');
      document.getElementById(itemId).innerText = 'Ошибка';
    }
  })
  .catch(error => {
      console.error('Произошла ошибка при отправке запроса на сервер:', error);
  });
}