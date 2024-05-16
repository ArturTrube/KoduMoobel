var modal = document.getElementById("myModal");
var btn = document.getElementById("openModal");


function paymentModal() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function deleteOrder(orderId) {
  fetch('/users/delete-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ orderId: orderId })
  })
  .then(response => {
    if (response.ok) {
      console.log('Заказ успешно отменен');
      window.location.href = '/profile';
    } else {
      console.error('Ошибка при отмене заказа');
    }
  })
  .catch(error => {
    console.error('Произошла ошибка при выполнении запроса:', error);
  });
}