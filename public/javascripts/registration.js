async function registration() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const checkPassword = document.getElementById('check-password').value;

    if (password !== checkPassword) {
        document.getElementById('reg-button').innerText = 'Пароли не совпадают';
        return;
    }

    if (email === '' || password === '' || checkPassword === '') {
        document.getElementById('reg-button').innerText = 'Заполните все поля';
        return;
    }

    const data = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('/users/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.ok) {
            document.getElementById('reg-button').innerText = responseData.message;
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        } else {
            document.getElementById('reg-button').innerText = responseData.message;
        }
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('reg-button').innerText = 'Произошла ошибка';
    }
}