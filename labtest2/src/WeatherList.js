import axios from 'axios';
import React, { Component } from 'react';
import { Card, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiWind, BiCurrentLocation } from 'react-icons/bi';

export default class WeatherList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
			main: [ {} ],
			weathers: [ {} ],
			name: '',
			sys: [ {} ],
			wind: [ {} ]
		};
	}

	getWeatherData = (value) => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&APPID=7674b666b838ad00794142c2eb0231af`
			)
			.then((res) => {
				console.log(res.data);
				this.setState({ weathers: res.data.weather });
				this.setState({ main: res.data.main });
				this.setState({ name: res.data.name });
				this.setState({ sys: res.data.sys });
				this.setState({ wind: res.data.wind });
			})
			.catch((e) => {
				if (e.response.status === 404) {
					console.log('City not Found. Try Another!');
					alert('City not Found. Try Another!');
				}
			});
	};

	//Component Lifecycle Callback
	componentDidMount = () => {
		this.getWeatherData('Toronto');
	};

	getCity = (e) => {
		this.setState({ input: e.target.value });
	};

	getCityData = () => {
		console.log(this.state.input);
		this.getWeatherData(this.state.input);
	};

	render() {
		return (
			<div
				style={{
					textAlign: 'center',
					justifyContent: 'center'
				}}
			>
				<div style={{ paddingBottom: '30px', color: 'white' }}>
					<h3>Toronto Shown by Default</h3>
					<input type="text" onChange={this.getCity} style={{ height: '38px', verticalAlign: 'middle' }} />
					<Button onClick={this.getCityData}>Get Current Weather By City</Button>
				</div>
				<div>
					<Card style={{ paddingTop: '10px', background: '#FAF9F6' }}>
						<div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
							<Card.Img
								style={{ width: '200px' }}
								variant="top"
								src={`http://openweathermap.org/img/wn/${this.state.weathers[0].icon}@2x.png`}
							/>
							<Card.Text style={{ fontSize: '80px', lineHeight: '250px' }}>
								{this.state.main.temp} °C
							</Card.Text>
						</div>
						<Card.Body>
							<Card.Title style={{ fontSize: '50px' }}>
								<BiCurrentLocation /> {this.state.name}, {this.state.sys.country}
							</Card.Title>
							<Card.Text style={{ fontSize: '40px' }}>
								Feels like {this.state.main.feels_like} °C. {this.state.weathers[0].main},{' '}
								{this.state.weathers[0].description}
							</Card.Text>
							<Card.Text style={{ fontSize: '25px' }}>
								Minimum Temperature: {this.state.main.temp_min} °C | Maximum Temperature:{' '}
								{this.state.main.temp_max} °C
							</Card.Text>

							<Card.Text style={{ fontSize: '25px' }}>
								{' '}
								<BiWind />Wind Speed: {this.state.wind.speed} m/s
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			</div>
		);
	}
}
