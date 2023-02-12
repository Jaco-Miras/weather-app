import React, { useEffect, useState } from "react";
// import axios
import axios from "axios";

// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

// api key
const APIkey = "7c3667673a6e28fcbfbadf6e279d7cad";

const Weather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Davao");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue !== "") {
      setLocation(inputValue);
    }

    // if input value is empty
    if (input.value === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    // select input
    const input = document.querySelector("input");

    // clear input
    input.value = "";
  };

  // fetch data
  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  // error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    // clear timer
    return () => clearTimeout(timer);
  }, [errorMsg]);

  //   console.log(data);

  // if data is false show the loader
  if (!data) {
    return (
      <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-white" />
        </div>
      </div>
    );
  }

  let icon;
  //   console.log(data.weather[0].main);
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy className="text-[#F3F2E7]" />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill className="text-[#EFE9DB]" />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#1d1f66]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#FFDE00]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#87A2FB]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#FAF7F0]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm className="text-[#0F044C]" />;
      break;
  }

  // date object
  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center overflow-auto">
      {errorMsg && (
        <div className="w-[90%] text-center max-w-[100vw] md:w-[450px] bg-[#25C3FF] text-white top-2 lg:top-10 rounded-full p-4 capitalize my-2">{`${errorMsg.response.data.message}`}</div>
      )}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/50 w-[90%] max-w-[400px] rounded-full backdrop-blur-[32px] mb-2 md:max-w-[460px]`}
      >
        <div className="h-full relative w-[90%] md:w-full flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
            type="text"
            placeholder="Search city or country"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#EEEEEE] hover:bg-[#B2B2B2] w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-[23px]" />
          </button>
        </div>
      </form>
      {/* card */}
      <div className="w-[90%] max-w-[440px] md:max-w-[480px] bg-black/40 max-h-[440px] md:max-h-[460px] text-white rounded-[30px] backdrop-blur-[32px] py-10 px-4 md:py-12 md:px-6">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/* card top */}
            <div className="flex items-center gap-x-5 md:px-2 px-6 ">
              {/* icon */}
              <div className="text-[70px] md:text-[90px]">{icon}</div>
              {/* country name */}
              <div>
                <div className="text-xl font-semibold md:text-2xl">
                  {data.name}, {data.sys.country}
                </div>
                {/* date */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getFullYear()}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className="my-3 md:my-4">
              <div className="flex justify-center items-center">
                {/* temp */}
                <div className="text-[125px] md:text-[150px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                {/* celsius */}
                <div className="text-5xl md:text-7xl ">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather description */}
              <div className="capitalize text-center md:text-xl">
                {data.weather[0].description}
              </div>
            </div>
            {/* card bottom */}
            <div className="max-w-[380px] md:max-w-[420px] mx-auto flex flex-col gap-y-6 my-2 md:my-5">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility{" "}
                    <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind<span className="ml-2">{data.wind.speed}m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
