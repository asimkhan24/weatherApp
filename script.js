const container = document.querySelector('.container');
const search = document.querySelector('.search-box #search');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');



search.addEventListener('click', ()=>{
    const APIKey = '2f5bf16813e76819a0c327407a51cfef';
    const city = document.querySelector('.search-box input').value;
    if(city == ''){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json=>{

if (json.cod == '404' ) {
    container.style.height = '450px';
    weatherBox.classList.remove('active');
    weatherDetails.classList.remove('active');
    error404.classList.add('active');
    return;
    
}

container.style.height = '550px';
weatherBox.classList.add('active');
weatherDetails.classList.add('active');
error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity #unit');
        const wind = document.querySelector('.weather-details .wind #unit');


        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'assets/Clear.png';
                break;
                case 'Rain':
                    image.src = 'assets/Rain.png';
                    break;
                    case 'Snow':
                        image.src = 'assets/snow.png';
                        break;
                        case 'Clouds':
                            image.src = 'assets/cloud.png';
                            break;
                        case 'Mist':
                            image.src = 'assets/mist.png';
                            break;
                            case 'Haze':
                                image.src = 'assets/mist.png';
                                break;
        
            default:
                image.src = 'assets/cloud.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
})