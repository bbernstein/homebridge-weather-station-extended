"use strict";
var inherits = require('util').inherits, 
debug = require('debug')('homebridge-weather-station-extended'),
wunderground = require('wundergroundnode'),

Service,
Characteristic,

CustomUUID = {
	// Eve UUID
	AirPressure: 'E863F10F-079E-48FF-8F27-9C2605A29F52',
	// Eve recognized UUIDs
	WindSpeed: '49C8AE5A-A3A5-41AB-BF1F-12D5654F9F41',
	WindDirection: '46f1284c-1912-421b-82f5-eb75008b167e',
	Rain1h: '10c88f40-7ec4-478c-8d5a-bd0c3cce14b7',
	RainDay: 'ccc04890-565b-4376-b39a-3113341d9e0f',
	Condition: 'cd65a9ab-85ad-494a-b2bd-2f380084134d',
	Visibility: 'd24ecc1e-6fad-4fb5-8137-5af88bd5e857',
	UVIndex: '05ba0fe0-b848-4226-906d-5b64272e05ce',
	// Custom UUIDs
	ConditionCategory: 'cd65a9ab-85ad-494a-b2bd-2f380084134c',
	WindSpeedMax: '6b8861e5-d6f3-425c-83b6-069945ffd1f1',
	ObservationStation: 'd1b2787d-1fc4-4345-a20e-7b5a74d693ed',
	ObservationTime: '234fd9f1-1d33-4128-b622-d052f0c402af',
	ChanceRain: 'fc01b24f-cf7e-4a74-90db-1b427af1ffa3',
	ForecastDay: '57f1d4b2-0e7e-4307-95b5-808750e2c1c7',
	ForecastHour: '999ab0d6-a23c-4cc7-b5a2-2edb75447070',
	SolarRadiation: '1819a23e-ecab-4d39-b29a-7364d299310b',
	TemperatureMin: '707b78ca-51ab-4dc9-8630-80a58f07e419',
	SnowedRecently: '959b7a86-b98c-4199-a305-724d21206b46',
	SnowingSoon: 'd5910a60-4e85-4473-ab32-f2eeb9981772'
},
CustomCharacteristic = {};

module.exports = function (homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerPlatform("homebridge-wunderground-extended", "WeatherStation", WeatherStationPlatform);

	CustomCharacteristic.Condition = function() {
		Characteristic.call(this, 'Weather Condition', CustomUUID.Condition);
		this.setProps({
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.Condition, Characteristic);

	CustomCharacteristic.ConditionCategory = function() {
		Characteristic.call(this, 'Weather Condition Category', CustomUUID.ConditionCategory);
		this.setProps({
			format: Characteristic.Formats.UINT8,
			maxValue: 3,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.ConditionCategory, Characteristic);

	CustomCharacteristic.Rain1h = function() {
		Characteristic.call(this, 'Rain Last Hour', CustomUUID.Rain1h);
		this.setProps({
			format: Characteristic.Formats.UINT16,
			unit: "mm",
			maxValue: 50,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.Rain1h, Characteristic);

	CustomCharacteristic.RainDay = function() {
		Characteristic.call(this, 'Rain All Day', CustomUUID.RainDay);
		this.setProps({
			format: Characteristic.Formats.UINT16,
			unit: "mm",
			maxValue: 100,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.RainDay, Characteristic);

	CustomCharacteristic.WindDirection = function() {
		Characteristic.call(this, 'Wind Direction', CustomUUID.WindDirection);
		this.setProps({
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.WindDirection, Characteristic);

	CustomCharacteristic.WindSpeed = function() {
		Characteristic.call(this, 'Wind Speed', CustomUUID.WindSpeed);
		this.setProps({
			format: Characteristic.Formats.FLOAT,
			unit: "km/h",
			maxValue: 100,
			minValue: 0,
			minStep: 0.1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.WindSpeed, Characteristic);

	CustomCharacteristic.WindSpeedMax = function() {
		Characteristic.call(this, 'Wind Speed Max', CustomUUID.WindSpeedMax);
		this.setProps({
			format: Characteristic.Formats.FLOAT,
			unit: "km/h",
			maxValue: 100,
			minValue: 0,
			minStep: 0.1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.WindSpeedMax, Characteristic);

	CustomCharacteristic.AirPressure = function() {
		Characteristic.call(this, 'Air Pressure', CustomUUID.AirPressure);
		this.setProps({
			format: Characteristic.Formats.UINT16,
			unit: "hPa",
			maxValue: 1100,
			minValue: 700,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.AirPressure, Characteristic);

	CustomCharacteristic.Visibility = function() {
		Characteristic.call(this, 'Visibility', CustomUUID.Visibility);
		this.setProps({
			format: Characteristic.Formats.UINT8,
			unit: "km",
			maxValue: 100,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.Visibility, Characteristic);

	CustomCharacteristic.UVIndex = function() {
		Characteristic.call(this, 'UV Index', CustomUUID.UVIndex);
		this.setProps({
			format: Characteristic.Formats.UINT8,
			maxValue: 10,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.UVIndex, Characteristic);

	CustomCharacteristic.SolarRadiation = function() {
		Characteristic.call(this, 'Solar Radiation', CustomUUID.SolarRadiation);
		this.setProps({
			format: Characteristic.Formats.UINT8,
			unit: "W/m²",
			maxValue: 2000,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.SolarRadiation, Characteristic);

	CustomCharacteristic.ChanceRain = function() {
		Characteristic.call(this, 'Chance Rain', CustomUUID.ChanceRain);
		this.setProps({
			format: Characteristic.Formats.UINT8,
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.ChanceRain, Characteristic);

	CustomCharacteristic.TemperatureMin = function() {
		Characteristic.call(this, 'Temperature Min', CustomUUID.TemperatureMin);
		this.setProps({
			format: Characteristic.Formats.FLOAT,
			unit: Characteristic.Units.CELSIUS,
			maxValue: 50,
			minValue: -50,
			minStep: 0.1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.TemperatureMin, Characteristic);

	CustomCharacteristic.ObservationStation = function() {
		Characteristic.call(this, 'Station', CustomUUID.ObservationStation);
		this.setProps({
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.ObservationStation, Characteristic);

	CustomCharacteristic.ObservationTime = function() {
		Characteristic.call(this, 'Observation Time', CustomUUID.ObservationTime);
		this.setProps({
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.ObservationTime, Characteristic);

	CustomCharacteristic.SnowedRecently = function() {
		Characteristic.call(this, 'Snowed Recently', CustomUUID.SnowedRecently);
		this.setProps({
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.SnowedRecently, Characteristic);

	CustomCharacteristic.SnowingSoon = function() {
		Characteristic.call(this, 'Snowing Soon', CustomUUID.SnowingSoon);
		this.setProps({
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.SnowingSoon, Characteristic);

	CustomCharacteristic.ForecastDay = function() {
		Characteristic.call(this, 'Day', CustomUUID.ForecastDay);
		this.setProps({
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.ForecastDay, Characteristic);

	CustomCharacteristic.ForecastHour = function() {
		Characteristic.call(this, 'Hour', CustomUUID.ForecastHour);
		this.setProps({
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
		this.value = this.getDefaultValue();
	};
	inherits(CustomCharacteristic.ForecastHour, Characteristic);
}

function WeatherStationPlatform(log, config) {
	this.log = log;
	this.config = config;
	this.location = config['location'];
	this.forecastDays = ('forecast' in config ? config['forecast'] : '');
	this.station = new wunderground(config['key']);
	this.interval = ('interval' in config ? parseInt(config['interval']) : 4);
	this.interval = (typeof this.interval !=='number' || (this.interval%1)!==0 || this.interval < 0) ? 4 : this.interval;

	// number of hours to consider "snowing soon" or "snowed recently"
	this.snowHoursWindow = ('snowhours' in config ? parseInt(config['snowhours']) : 3);
	this.snowHoursWindow = (typeof this.snowHoursWindow !=='number' || (this.snowHoursWindow%1)!==0 || this.snowHoursWindow < 0) ? 3 : this.snowHoursWindow;

	// assume it hasn't snowed recently by default
	this.lastSnowTime = new Date(0);

	this.updateWeather();
}

WeatherStationPlatform.prototype = {
	accessories: function(callback) {
		this.accessories = [];

		let currentConditions = new CurrentConditionsWeatherAccessory(this);
		let forecast0Day = new ForecastWeatherAccessory(this, 0);
		let forecast1Day = new ForecastWeatherAccessory(this, 1);
		let forecast2Day = new ForecastWeatherAccessory(this, 2);
		let forecast3Day = new ForecastWeatherAccessory(this, 3);
		let forecast0Hour = new HourlyWeatherAccessory(this, 0);
		let forecast1Hour = new HourlyWeatherAccessory(this, 1);
		let forecast2Hour = new HourlyWeatherAccessory(this, 2);

		this.accessories.push(currentConditions);

		if (this.forecastDays.indexOf('none') !== -1) {
			// skip
		}
		else if (this.forecastDays.indexOf('today') !== -1)
		{
			this.accessories.push(forecast0Day);
		}
		else if (this.forecastDays.indexOf('hours') !== -1)
		{
			this.accessories.push(forecast0Hour);
			this.accessories.push(forecast1Hour);
			this.accessories.push(forecast2Hour);
		}
		else
		{
			this.accessories.push(forecast0Day);
			this.accessories.push(forecast1Day);
			this.accessories.push(forecast2Day);
			this.accessories.push(forecast3Day);
		}

		callback(this.accessories);
	},

	updateWeather: function() {
		let that = this;

		debug("Update weather online");
		this.station.conditions().forecast().hourlyForecast().request(this.location, function(err, response) {
			if (!err) {
				let futureHours = response['hourly_forecast'];
				let conditions = response['current_observation'];
				
				// check if snowing now or in the next few hours
				let snowSoon = getConditionCategory(conditions['icon']) == 3;
				for (let hr=0; hr < that.snowHoursWindow; hr++) {
					snowSoon = snowSoon || (getConditionCategory(futureHours[hr]['icon']) == 3);
				}
				let snowedRecently = snowSoon;

				let now = new Date();
				if (snowSoon){
					that.lastSnowTime = now;
				}
				else {
					let recentMillis = 1000 * 60 * 60 * that.snowHoursWindow;	// hours to millis
					snowedRecently = (now.getTime() - that.lastSnowTime.getTime() < recentMillis)
				}

				for (var i = 0; i < that.accessories.length; i++) {
					if (that.accessories[i].currentConditionsService !== undefined && response['current_observation'] )
					{
						debug("Update values for " + that.accessories[i].currentConditionsService.displayName);
						let service = that.accessories[i].currentConditionsService;

						service.setCharacteristic(Characteristic.CurrentTemperature, conditions['temp_c']);
						service.setCharacteristic(Characteristic.CurrentRelativeHumidity, parseInt(conditions['relative_humidity'].substr(0, conditions['relative_humidity'].length-1)));
						service.setCharacteristic(CustomCharacteristic.Condition,conditions['weather']);
						let rain1h = parseInt(conditions['precip_1hr_metric']);
						service.setCharacteristic(CustomCharacteristic.Rain1h,isNaN(rain1h) ? 0 : rain1h);
						let rainDay = parseInt(conditions['precip_today_metric']);
						service.setCharacteristic(CustomCharacteristic.RainDay,isNaN(rainDay) ? 0 : rainDay);
						service.setCharacteristic(CustomCharacteristic.WindDirection,conditions['wind_dir']);
						service.setCharacteristic(CustomCharacteristic.WindSpeed,parseFloat(conditions['wind_kph']));
						service.setCharacteristic(CustomCharacteristic.WindSpeedMax,parseFloat(conditions['wind_gust_kph']));
						service.setCharacteristic(CustomCharacteristic.AirPressure,parseInt(conditions['pressure_mb']));
						let visibility = parseInt(conditions['visibility_km']);
						service.setCharacteristic(CustomCharacteristic.Visibility,isNaN(visibility) ? 0 : visibility);
						let uvIndex = parseInt(conditions['UV']);
						service.setCharacteristic(CustomCharacteristic.UVIndex,isNaN(uvIndex) ? 0 : uvIndex);
						let solarradiation = parseInt(conditions['solarradiation']);
						service.setCharacteristic(CustomCharacteristic.SolarRadiation,isNaN(solarradiation) ? 0 : solarradiation);
						service.setCharacteristic(CustomCharacteristic.ObservationStation, conditions['observation_location']['full']);
						service.setCharacteristic(CustomCharacteristic.ObservationTime, conditions['observation_time_rfc822'].split(' ')[4]);
						service.setCharacteristic(CustomCharacteristic.ConditionCategory, getConditionCategory(conditions['icon']));
						service.setCharacteristic(CustomCharacteristic.SnowingSoon, snowSoon);
						service.setCharacteristic(CustomCharacteristic.SnowedRecently, snowedRecently);
					}
					else if (that.accessories[i].forecastService !== undefined && response['forecast'])
					{
						debug("Update values for " + that.accessories[i].forecastService.displayName);
						let forecast = response['forecast']['simpleforecast']['forecastday'];
						let service = that.accessories[i].forecastService;
						let day = that.accessories[i].day;

						service.setCharacteristic(CustomCharacteristic.ForecastDay, forecast[day]['date']['weekday']);
						service.setCharacteristic(Characteristic.CurrentTemperature, forecast[day]['high']['celsius']);
						service.setCharacteristic(CustomCharacteristic.TemperatureMin, forecast[day]['low']['celsius']);
						service.setCharacteristic(Characteristic.CurrentRelativeHumidity, parseInt(forecast[day]['avehumidity']));
						service.setCharacteristic(CustomCharacteristic.Condition, forecast[day]['conditions']);
						service.setCharacteristic(CustomCharacteristic.ChanceRain, forecast[day]['pop']);
						let rainDay = parseInt(forecast[day]['qpf_allday']['mm']);
						service.setCharacteristic(CustomCharacteristic.RainDay,isNaN(rainDay) ? 0 : rainDay);
						service.setCharacteristic(CustomCharacteristic.WindDirection,forecast[day]['avewind']['dir']);
						service.setCharacteristic(CustomCharacteristic.WindSpeed,parseFloat(forecast[day]['avewind']['kph']));
						service.setCharacteristic(CustomCharacteristic.WindSpeedMax,parseFloat(forecast[day]['maxwind']['kph']));
						service.setCharacteristic(CustomCharacteristic.ConditionCategory, getConditionCategory(forecast[day]['icon']));
					}
					else if (that.accessories[i].hourlyService !== undefined && response['hourly_forecast'])
					{
						debug("Update values for " + that.accessories[i].hourlyService.displayName);
						let service = that.accessories[i].hourlyService;
						let hour = that.accessories[i].hour

						service.setCharacteristic(CustomCharacteristic.ForecastDay, futureHours[hour]['FCTTIME']['weekday_name']);
						service.setCharacteristic(CustomCharacteristic.ForecastHour, futureHours[hour]['FCTTIME']['civil']);
						service.setCharacteristic(Characteristic.CurrentTemperature, futureHours[hour]['temp']['metric']);
						service.setCharacteristic(Characteristic.CurrentRelativeHumidity, parseInt(futureHours[hour]['avehumidity']));
						service.setCharacteristic(CustomCharacteristic.Condition, futureHours[hour]['condition']);
						service.setCharacteristic(CustomCharacteristic.ChanceRain, futureHours[hour]['pop']);
						service.setCharacteristic(CustomCharacteristic.WindDirection,futureHours[hour]['wdir']['dir']);
						service.setCharacteristic(CustomCharacteristic.WindSpeed,parseFloat(futureHours[hour]['wspd']['metric']));
						service.setCharacteristic(CustomCharacteristic.ConditionCategory, getConditionCategory(futureHours[hour]['icon']));
					}
				}

				if (!response['current_observation'])
				{
					that.log.error("Found no current observations");
					that.log.error(response);
				}
				if (!response['forecast'])
				{
					that.log.error("Found no forecast");
					that.log.error(response);
				}
			}
			else {
				that.log.error("Error retrieving weather");
				that.log.error(response);
			}
		});
		setTimeout(this.updateWeather.bind(this), (this.interval) * 60 * 1000);
	}
}

function HourlyWeatherAccessory(platform, hourNum) {
	this.platform = platform;
	this.log = platform.log;
	switch(hourNum) {
		case 0:
			this.name = "Next Hour";
			break;
		case 1:
			this.name = "In 2 Hours";
			break;
		case 2:
			this.name = "In 3 Hours";
			break;
		case 3:
			this.name = "In 4 Hours";
			break;
	}
	this.hour = hourNum;

	this.hourlyService = new Service.TemperatureSensor(this.name);
	this.hourlyService.addCharacteristic(CustomCharacteristic.ForecastDay);
	this.hourlyService.addCharacteristic(CustomCharacteristic.ForecastHour);
	this.hourlyService.addCharacteristic(Characteristic.CurrentRelativeHumidity);
	this.hourlyService.addCharacteristic(CustomCharacteristic.Condition);
	this.hourlyService.addCharacteristic(CustomCharacteristic.ConditionCategory);
	this.hourlyService.addCharacteristic(CustomCharacteristic.ChanceRain);
	this.hourlyService.addCharacteristic(CustomCharacteristic.WindDirection);
	this.hourlyService.addCharacteristic(CustomCharacteristic.WindSpeed);

	// fix negative temperatures not supported by homekit
	this.hourlyService.getCharacteristic(Characteristic.CurrentTemperature).props.minValue = -50;

	this.informationService = new Service.AccessoryInformation();
	this.informationService
	.setCharacteristic(Characteristic.Name, this.name)
	.setCharacteristic(Characteristic.Manufacturer, "github.com/naofireblade")
	.setCharacteristic(Characteristic.Model, "Weather Station Extended")

}

HourlyWeatherAccessory.prototype = {
	identify: function (callback) {
		let that = this;
		this.platform.station.hourlyForecast().request(this.platform.location, function(err, response) {
			if (err) {
				that.log.error(err);
			}
			else {
				that.log(response['hourly_forecast']);
			}
		});
		callback();
	},

	getServices: function () {
		return [this.informationService, this.hourlyService];
	},
}

function CurrentConditionsWeatherAccessory(platform) {
	this.platform = platform;
	this.log = platform.log;
	this.name = "Now";

	this.currentConditionsService = new Service.TemperatureSensor(this.name);
	this.currentConditionsService.addCharacteristic(Characteristic.CurrentRelativeHumidity);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.Condition);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.ConditionCategory);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.Rain1h);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.RainDay);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.WindDirection);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.WindSpeed);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.WindSpeedMax);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.AirPressure);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.Visibility);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.UVIndex);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.SolarRadiation);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.ObservationStation);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.ObservationTime);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.SnowedRecently);
	this.currentConditionsService.addCharacteristic(CustomCharacteristic.SnowingSoon);

	// fix negative temperatures not supported by homekit
	this.currentConditionsService.getCharacteristic(Characteristic.CurrentTemperature).props.minValue = -50;

	this.informationService = new Service.AccessoryInformation();
	this.informationService
	.setCharacteristic(Characteristic.Name, this.name)
	.setCharacteristic(Characteristic.Manufacturer, "github.com/naofireblade")
	.setCharacteristic(Characteristic.Model, "Weather Station Extended")
}

CurrentConditionsWeatherAccessory.prototype = {
	identify: function (callback) {
		let that = this;
		this.platform.station.conditions().request(this.platform.location, function(err, response) {
			if (err) {
				that.log.error(err);
			}
			else {
				that.log(response);
			}
		});
		callback();
	},

	getServices: function () {
		return [this.informationService, this.currentConditionsService];
	},
}

function ForecastWeatherAccessory(platform, day) {
	this.platform = platform;
	this.log = platform.log;
	switch(day) {
		case 0:
			this.name = "Today";
			break;
		case 1:
			this.name = "In 1 Day";
			break;
		case 2:
			this.name = "In 2 Days";
			break;
		case 3:
			this.name = "In 3 Days";
			break;
	}
	this.day = day;

	this.forecastService = new Service.TemperatureSensor(this.name);
	this.forecastService.addCharacteristic(CustomCharacteristic.ForecastDay);
	this.forecastService.addCharacteristic(CustomCharacteristic.TemperatureMin);
	this.forecastService.addCharacteristic(Characteristic.CurrentRelativeHumidity);
	this.forecastService.addCharacteristic(CustomCharacteristic.Condition);
	this.forecastService.addCharacteristic(CustomCharacteristic.ConditionCategory);
	this.forecastService.addCharacteristic(CustomCharacteristic.ChanceRain);
	this.forecastService.addCharacteristic(CustomCharacteristic.RainDay);
	this.forecastService.addCharacteristic(CustomCharacteristic.WindDirection);
	this.forecastService.addCharacteristic(CustomCharacteristic.WindSpeed);	
	this.forecastService.addCharacteristic(CustomCharacteristic.WindSpeedMax);

	// fix negative temperatures not supported by homekit
	this.forecastService.getCharacteristic(Characteristic.CurrentTemperature).props.minValue = -50;

	this.informationService = new Service.AccessoryInformation();
	this.informationService
	.setCharacteristic(Characteristic.Name, this.name)
	.setCharacteristic(Characteristic.Manufacturer, "github.com/naofireblade")
	.setCharacteristic(Characteristic.Model, "Weather Station Extended")
}

ForecastWeatherAccessory.prototype = {
	identify: function (callback) {
		let that = this;
		this.platform.station.forecast().request(this.platform.location, function(err, response) {
			if (err) {
				that.log.error(err);
			}
			else {
				that.log(response['forecast']['simpleforecast']['forecastday']);
			}
		});
		callback();
	},

	getServices: function () {
		return [this.informationService, this.forecastService];
	},
}

function getConditionCategory(icon) {
	switch (icon) {
		case "snow":
		case "sleet":
		case "flurries":
		case "chancesnow":
		case "chancesleet":
		case "chanceflurries":
			return 3;
		case "rain":
		case "tstorms":
		case "chancerain":
		case "chancetstorms":
			return 2;
		case "cloudy":
		case "mostlycloudy":
		case "partlysunny":
		case "fog":
		case "hazy":
			return 1;
		case "partlycloudy":
		case "mostlysunny":
		case "sunny":
		case "clear":
		default:
			return 0;
	}
}