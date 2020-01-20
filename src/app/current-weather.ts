export class CurrentWeather {
  city: string;
  countryCode: string;
  unixTime: number;

  temperatureInKelvin: number;
  pressureInHectoPascal: number;
  humidityPercent: number;
  windSpeedInMeterPerSecond: number;
  windDirectionInDegrees: number;
  cloudinessPercent: number;
}
