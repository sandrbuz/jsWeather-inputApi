
let btnGet = document.querySelector('.btn');
let loader = document.querySelector('#loader');
let btnFahr = document.querySelector('.fahr');
let btnCels = document.querySelector('.celsius');
let temperature = document.querySelector('.temperature');


const getWeather = (cityName) => {
    if (cityName) {
        loader.style.color = 'black';
        loader.innerText = 'loading...';
        loader.style.opacity = '1';
        btnGet.disabled = true;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=655fdcf1aed1280abf8e870e95b28149`)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data);
                loader.style.opacity = '0';
                btnGet.disabled = false;

                // btns temp
                btnCels.disabled = true;
                btnFahr.disabled = false;


                temperature.style.display = 'flex';
                document.querySelector('.city').textContent = data.name;
                document.querySelector('.now').textContent = 'now';
                document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&#8451;';
                document.querySelector('.weather').textContent = data.weather[0]['description'];
                let val = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
                $('#icon').attr('src', val);



                // btns temp func
                btnFahr.addEventListener('click', function () {
                    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&#8457;';
                    btnFahr.disabled = true;
                    btnCels.disabled = false;

                });
                btnCels.addEventListener('click', function () {
                    document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&#8451;';
                    btnCels.disabled = true;
                    btnFahr.disabled = false;

                });


            })
            .catch(function () {


                temperature.style.display = 'none';
                // btnCels.disabled = true;
                // btnFahr.disabled = true;
                // document.querySelector('.wthr').innerHTML = '_________';
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











