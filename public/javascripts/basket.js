document.addEventListener('DOMContentLoaded', function() {
    const quantityDisplays = document.querySelectorAll('.basket-card-button p:nth-child(2)');
    const priceDisplays = document.querySelectorAll('.card-price');
  
    function updateTotal() {
      let total = 0;
      priceDisplays.forEach((priceDisplay, index) => {
        total += parseInt(priceDisplay.textContent) * parseInt(quantityDisplays[index].textContent);
      });
      document.getElementById('total').textContent = `Сумма: ${total}€`;
    }
  
    function decreaseQuantity(index) {
      const currentQuantity = parseInt(quantityDisplays[index].textContent);
      if (currentQuantity > 1) {
        quantityDisplays[index].textContent = currentQuantity - 1;
        updateTotal();
      }
    }
  
    function increaseQuantity(index) {
      const currentQuantity = parseInt(quantityDisplays[index].textContent);
      quantityDisplays[index].textContent = currentQuantity + 1;
      updateTotal();
    }
  
    for (let i = 0; i < quantityDisplays.length; i++) {
      document.getElementById('minusButton' + i).addEventListener('click', function() {
        decreaseQuantity(i);
      });
    }
  
    for (let i = 0; i < quantityDisplays.length; i++) {
      document.getElementById('plusButton' + i).addEventListener('click', function() {
        increaseQuantity(i);
      });
    }
  
    updateTotal();

    const checkoutButton = document.querySelector('#checkoutButton');

    checkoutButton.addEventListener('click', function() {
        const address = document.querySelector('#addressInput').value;
        const contact = document.querySelector('#contactInput').value;
        const total = document.querySelector('#total').innerText;
        const furniture = [];
      
        const furnitureCards = document.querySelectorAll('.card-container');
        
        if (!address || !contact) {
          checkoutButton.innerText = 'Введите все данные';
          return;
        }
      
        if (furnitureCards.length === 0) {
          checkoutButton.innerText = 'Список товаров пуст';
          return;
        }
      
        furnitureCards.forEach(function(card) {
          const furnitureTitle = card.querySelector('.card-title').innerText;
          const quantity = card.querySelector('.quantityDisplay').innerText;
          furniture.push({ furnitureTitle: furnitureTitle, quantity: quantity });
        });
      
        const orderData = {
          address: address,
          contact: contact,
          total: total,
          furniture: furniture
        };
      
        fetch('users/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        })
        .then(response => {
          if (response.ok) {
            console.log('Заказ успешно оформлен!');
            window.location.href = '/profile';
          } else {
            console.error('Ошибка при оформлении заказа');
            window.location.href = '/basket';
          }
        })
        .catch(error => {
          console.error('Произошла ошибка при выполнении fetch запроса:', error);
        });
      });
  });