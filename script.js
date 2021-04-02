
let btnGet = document.querySelector('.btn');
let loader = document.querySelector('#loader');

const getWeather = (cityName) => {
    if (cityName) {
        loader.style.color = 'black';
        loader.innerText = 'loading...';
        loader.style.opacity = '1';
        btnGet.disabled = true;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=655fdcf1aed1280abf8e870e95b28149`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                loader.style.opacity = '0';
                btnGet.disabled = false;


                document.querySelector('.city').textContent = data.name;
                document.querySelector('.now').textContent = 'now';
                document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&deg';
                document.querySelector('.weather').textContent = data.weather[0]['description'];
                let val = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
                $('#icon').attr('src', val);
            })
            .catch(function () {
                document.querySelector('.city').textContent = '________';
                document.querySelector('.temp').textContent = '';
                document.querySelector('.weather').textContent = '';
                document.querySelector('.now').textContent = '';
                $('#icon').attr('src', '');
                document.querySelector('#loader').textContent = 'City name error';
                loader.style.opacity = '1';
                loader.style.color = 'red';
                loader.style.fontSize = '30px';

            })
    }
    else {
        loader.style.color = 'red';
        loader.style.fontSize = '30px';
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











