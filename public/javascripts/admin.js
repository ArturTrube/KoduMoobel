async function addFurniture(){
  const button = document.getElementById('button');
  const title = document.getElementById('title').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  const type = document.getElementById('type').value;
  const photo = document.getElementById('photo').files[0];

  if (!title || !price || !description || !type || !photo) {
    button.innerText = 'Заполните все поля';
    return;
  }
  
  const formData = new FormData();
  formData.append('title', title);
  formData.append('price', price);
  formData.append('description', description);
  formData.append('type', type);
  formData.append('photo', photo);
  
  try {
    const response = await fetch('/admin/add-furniture', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      var data = await response.json();
      button.innerText = data.message;
    } else {
        button.innerText = 'Произошла ошибка при добавлении мебели';
        throw new Error('Произошла ошибка при добавлении мебели');
    }
  } catch (error) {
    console.error(error);
  }
}