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

function deleteFurniture(id){
  fetch('/admin/delete-furniture', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
})
.then(response => {
  if (response.ok) {
    console.log('Товар успешно удален!');
    document.getElementById(id).style.display = 'none';
  } else {
    console.error('Произошла ошибка при удалении товара в корзину');
  }
})
.catch(error => {
    console.error('Произошла ошибка при отправке запроса на сервер:', error);
});
}