import React from "react";

function WeatherCard({ weather }) {
  const getRecommendations = (weather) => {
    if (!weather || !weather.main) return "No recommendations available.";

    const temp = weather.main.temp;
    const wind = weather.wind.speed;

    if (temp < 5) return "🧥 Wear warm clothes, it's freezing!";
    if (temp >= 5 && temp <= 15) return "🧣 A light jacket is recommended.";
    if (temp > 15 && temp <= 30) return "😎 Enjoy the weather!";
    if (temp > 30) return "🥵 Stay hydrated, it's hot!";
    if (wind > 10) return "💨 Strong winds! Secure loose items.";

    return "🌤️ Enjoy your day!";
  };

  return (
    <div
      className="h-full w-full bg-gradient-to-br from-base-200 to-base-100 text-base-content border border-base-300 
        flex flex-col p-6 gap-4 rounded-xl shadow-lg 
        animate-[fadeIn_0.5s_ease-in-out] hover:shadow-xl hover:scale-[1.02] transition-all duration-300
        hover:from-base-300 hover:to-base-200 font-['Poppins']"
    >
      <div className="text-xl md:text-2xl font-bold capitalize rounded-md animate-[slideDown_0.5s_ease-in-out] text-primary">
        {weather.name || weather.city}
      </div>

      {weather.error ? (
        <div className="text-error animate-[fadeIn_0.3s_ease-in-out] font-medium">
          {weather.error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm lg:text-base animate-[slideUp_0.5s_ease-in-out]">
            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 bg-base-200/50 p-3 rounded-lg">
              <span className="text-xl">🌡️</span>
              <div className="flex flex-col">
                <span className="text-base-content/70 whitespace-nowrap">
                  Temperature
                </span>
                <span className="font-semibold text-lg">
                  {weather.main.temp}°C
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 bg-base-200/50 p-3 rounded-lg">
              <span className="text-xl">💧</span>
              <div className="flex flex-col">
                <span className="text-base-content/70 whitespace-nowrap">
                  Humidity
                </span>
                <span className="font-semibold text-lg">
                  {weather.main.humidity}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 bg-base-200/50 p-3 rounded-lg">
              <span className="text-xl">☁️</span>
              <div className="flex flex-col">
                <span className="text-base-content/70 whitespace-nowrap">
                  Conditions
                </span>
                <span className="font-semibold text-lg capitalize">
                  {weather.weather[0].description}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 bg-base-200/50 p-3 rounded-lg">
              <span className="text-xl wind-animation">💨</span>
              <div className="flex flex-col">
                <span className="text-base-content/70 whitespace-nowrap">
                  Wind
                </span>
                <span className="font-semibold text-lg">
                  {weather.wind.speed} m/s
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 bg-base-200/50 p-3 rounded-lg">
              <span className="text-xl">🧭</span>
              <div className="flex flex-col">
                <span className="text-base-content/70 whitespace-nowrap">
                  Pressure
                </span>
                <span className="font-semibold text-lg">
                  {weather.main.pressure} hPa
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 bg-base-200/50 p-3 rounded-lg">
              <span className="text-xl">👁️</span>
              <div className="flex flex-col">
                <span className="text-base-content/70 whitespace-nowrap">
                  Visibility
                </span>
                <span className="font-semibold text-lg">
                  {weather.visibility / 1000} km
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm lg:text-base animate-[slideUp_0.5s_ease-in-out]">
            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 bg-base-200/50 p-3 rounded-lg">
              <span className="text-xl">🌅</span>
              <div className="flex flex-col">
                <span className="text-base-content/70 whitespace-nowrap">
                  Sunrise
                </span>
                <span className="font-semibold text-lg">
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 bg-base-200/50 p-3 rounded-lg">
              <span className="text-xl">🌇</span>
              <div className="flex flex-col">
                <span className="text-base-content/70 whitespace-nowrap">
                  Sunset
                </span>
                <span className="font-semibold text-lg">
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          <div
            className="mt-auto bg-primary/10 text-primary-content p-4 rounded-lg text-xs md:text-sm lg:text-base 
            animate-[slideUp_0.5s_ease-in-out] hover:bg-primary/20 transition-colors duration-200 font-medium"
          >
            {getRecommendations(weather)}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherCard;
