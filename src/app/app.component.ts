import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app';
  //#we could access the weatherServices with the method we created
  constructor(private _weather: WeatherService) {}

  ngOnInit() {
    this._weather.dailyForcast()          //#use the method in here
      .subscribe(res =>  {
        //console.log(res)
        let temp_max = res['list'].map(res => res.main.temp_max)    //"list", "main" is the property that we get from API
        let temp_min = res['list'].map(res => res.main.temp_min)    //max, min, dt are the properties of API
        let alldates = res['list'].map(res => res.dt)

        let weatherDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        })
        console.log(weatherDates)
      })
  }
}
