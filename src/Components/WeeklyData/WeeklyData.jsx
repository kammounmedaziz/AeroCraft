import React from "react";
import "./WeeklyData.css";
import weatherApi from "../../utils/weatherApi";

// Get the weekly data, it creates a timeline per:
//    - week day, icon, max and min temp
class WeeklyData extends React.Component {
  constructor(props) {
    super(props);
    this.getWeeklyData = this.getWeeklyData.bind(this);
  }

  getWeeklyData(forecastWeekly) {
    return weatherApi.getWeeklyData(forecastWeekly);
  }

   render() {
    const weeklyData = this.getWeeklyData(this.props.forecastWeekly);
    return (
      <div className="overflow-x-auto">
        <div className="flex space-x-6 min-w-max">
          {weeklyData.map(forecast => (
            <div key={forecast.weekday} className="flex flex-col items-center">
              <p className="text-gray-300">{forecast.weekday}</p>
              <img 
                src={forecast.weather_icon} 
                alt="" 
                className="w-12 h-12 my-2"
              />
              <p className="text-white">
                {forecast.max}° | {forecast.min}°
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default WeeklyData;
