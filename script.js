
let btnGet = document.querySelector('.btn');
let loader = document.querySelector('#loader');
let btnFahr = document.querySelector('.fahr');
let btnCels = document.querySelector('.celsius');
let temperature = document.querySelector('.temperature');







const getWeather = (cityName) => {
    if (cityName) {
        loader.style.color = '#5f5e5e';
        loader.innerText = 'loading...';
        loader.style.opacity = '1';
        btnGet.disabled = true;


        document.querySelector('.btn').style.display = 'none';
        document.querySelector('.inp').style.display = 'none';
        temperature.style.display = 'none';
        document.querySelector('.city').textContent = '________';
        document.querySelector('.temp').textContent = '';
        document.querySelector('.weather').textContent = '';
        document.querySelector('.now').textContent = '';
        $('#icon').attr('src', '');
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=655fdcf1aed1280abf8e870e95b28149`)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data);
                loader.style.opacity = '0';
                btnGet.disabled = false;



                // Inp

                document.querySelector('.btn').style.display = 'inline-block';
                document.querySelector('.inp').style.display = 'inline-block';

                // btns temp
                btnCels.disabled = true;
                btnFahr.disabled = false;
                btnCels.style.backgroundColor = 'rgb(145, 145, 145)';
                btnFahr.style.backgroundColor = 'rgb(220, 219, 219)';
                btnFahr.style.boxShadow = '0 0 10px 0px rgb(109, 108, 108)';




                // basic weather data
                temperature.style.display = 'flex';
                document.querySelector('.city').textContent = data.name;
                document.querySelector('.now').textContent = 'now';
                document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&#8451;';
                document.querySelector('.weather').textContent = data.weather[0]['description'];
                let val = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
                $('#icon').attr('src', val);



                // btns temp funcns
                btnFahr.addEventListener('click', function () {
                    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&#8457;';
                    btnFahr.disabled = true;
                    btnCels.disabled = false;
                    btnFahr.style.backgroundColor = 'rgb(145, 145, 145)';
                    btnCels.style.backgroundColor = 'rgb(220, 219, 219)';
                    btnCels.style.boxShadow = '0 0 10px 0px rgb(109, 108, 108)';
                    btnFahr.style.boxShadow = 'none';


                });
                btnCels.addEventListener('click', function () {
                    document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&#8451;';
                    btnCels.disabled = true;
                    btnFahr.disabled = false;
                    btnCels.style.backgroundColor = 'rgb(145, 145, 145)';
                    btnFahr.style.backgroundColor = 'rgb(220, 219, 219)';
                    btnFahr.style.boxShadow = '0 0 10px 0px rgb(109, 108, 108)';
                    btnCels.style.boxShadow = 'none';

                });


            })
            // on error
            .catch(function () {


                temperature.style.display = 'none';
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

    // if city is not entered
    else {
        loader.style.color = 'red';
        loader.style.fontSize = '30px';
        loader.style.opacity = '1';
        loader.innerText = 'Please enter city';
    }
}





// default city
getWeather('Moscow');






// On btnGet
let userInput = document.querySelector('.inp');
btnGet.addEventListener('click', function () {
    const cityName = userInput.value;
    getWeather(cityName)

})


// on key Press (Enter)
userInput.onkeypress = function (event) {

    if (event.key == 'Enter') {
        const cityName = userInput.value;
        getWeather(cityName)
    }
}










