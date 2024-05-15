async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const button = document.getElementById('button');

    if (email === '' || password === '') {
        button.innerText = 'Заполните все поля';
        return;
    }

    const data = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log(responseData.message);
            if (responseData.type === 'Client') {
                window.location.href = '/catalog';
            } else if (responseData.type === 'Admin') {
                window.location.href = '/admin';
            } 
        } else {
            console.error(responseData.message);
            button.innerText = responseData.message;
        }
    } catch (error) {
        console.error('Ошибка:', error);
        button.innerText = 'Произошла ошибка при авторизации';
    }
}