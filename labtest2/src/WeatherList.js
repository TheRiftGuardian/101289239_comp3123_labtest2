import axios from 'axios';
import React, { Component } from 'react';

export default class WeatherList extends Component {
	getWeatherData = () => {
		axios
			.get('https://api.openweathermap.org/data/2.5/weather?q=Toronto&APPID=7674b666b838ad00794142c2eb0231af')
			.then((res) => console.log(res.data));
	};

	render() {
		return (
			<div>
				<button onClick={this.getWeatherData}>Get Weather Data</button>
			</div>
		);
	}
}
