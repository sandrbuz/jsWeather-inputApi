
let btnGet = document.querySelector('.btn');
let loader = document.querySelector('#loader');

const getWeather = (cityName) => {
    if (cityName) {
        loader.innerText = 'loading...';
        loader.style.opacity = '1';
        btnGet.disabled = true;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=655fdcf1aed1280abf8e870e95b28149`)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data);
                // loader.innerText = '';
                loader.style.opacity = '0';
                btnGet.disabled = false;

                document.querySelector('.city').textContent = data.name;
                document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&deg';
                document.querySelector('.weather').textContent = data.weather[0]['description'];
                document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            })
            .catch(function () {
                // console.log('Ошибка 404')
                document.querySelector('.city').textContent = 'error';
            })
    }
    else {
        // console.log('Please enter city')
        loader.style.color = 'red';
        loader.style.opacity = '1';
        loader.innerText = 'Please enter city';

    }

}




getWeather('Moscow');





let userInput = document.querySelector('.inp');

btnGet.addEventListener('click', function () {


    const cityName = userInput.value;

    getWeather(cityName)

})


