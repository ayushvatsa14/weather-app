let API_Key="6a81245b4430551438e06931ec2ac564";

let defaultTab=document.querySelector('[data-defTab]');
let userTab=document.querySelector('[data-userTab]');
let weatherDataContainer=document.querySelector('[data-weatherData]');
let weatherDescriptionContainer=document.querySelector('[data-weatherDescription]');
let cityName=document.querySelector('[data-cityName]');
let weatherForcast=document.querySelector('[data-weatherForcast]');
let forcastIcon=document.querySelector('[data-forcastIcon]');
let windSpeed=document.querySelector('[data-windSpeed]');
let humidity=document.querySelector('[data-humidity]');
let cloudPercent=document.querySelector('[data-cloudPercent]');
let tempData=document.querySelector('[data-tempData]');
let flagIcon=document.querySelector('[data-flagIcon]');
let userCity=document.querySelector('[data-inputCity]');
let searchIcon=document.querySelector('[data-searchIcon]');
let notfoundContainer=document.querySelector('[data-notfoundContainer]');
let city='Mohali';

async function fetchWeatherData(city)
{
    try
    {
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`);
        let data=await response.json();

        renderWeatherData(data);
    }
    catch(e)
    {
        console.log('e');
    }
}

function renderWeatherData(data)
{
    if(data?.cod==="400" || data?.cod==="404")
    {
        notfoundContainer.style.display='flex';
        weatherDataContainer.style.display='none';
        weatherDescriptionContainer.style.display='none';
        return;
    }

    notfoundContainer.style.display='none';

    cityName.innerText=data?.name;
    flagIcon.src=`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    weatherForcast.innerText=data?.weather?.[0]?.description.toUpperCase();
    forcastIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    tempData.innerText = `${data?.main?.temp} °C`;
    windSpeed.innerText = `${data?.wind?.speed} m/s`;
    humidity.innerText = `${data?.main?.humidity}%`;
    cloudPercent.innerText = `${data?.clouds?.all}%`;

    weatherDataContainer.style.display='flex';
    weatherDescriptionContainer.style.display='flex';
}

defaultTab.addEventListener('click',() => switchTab(defaultTab));
userTab.addEventListener('click',() => switchTab(userTab));

function switchTab(currentTab)
{
    currentTab.style.background='rgba(219, 226, 239, 0.5)';

    if(currentTab===defaultTab)
    {
        weatherDataContainer.style.display='block';
        weatherDescriptionContainer.style.display='block';
        userCity.style.display='none';
        searchIcon.style.display='none';
        userTab.style.background='transparent';
        city='Mohali';

        fetchWeatherData(city);
    }
    else
    {
        weatherDataContainer.style.display='none';
        weatherDescriptionContainer.style.display='none';
        userCity.style.display='block';
        searchIcon.style.display='block';
        defaultTab.style.background='transparent';
    }
}

async function userCityWeather()
{
    city=`${userCity.value}`;
    fetchWeatherData(city);
}

switchTab(defaultTab);

searchIcon.addEventListener('click',userCityWeather);