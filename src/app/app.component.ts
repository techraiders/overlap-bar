import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  BarChart : any;

  ngOnInit () {
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [
          {
            label: 'Number of Votes',
            data: [2, 4, 3, 3],
            //backgroundColor: 'rgba(255, 99, 132)',
            //borderColor: 'green',
            //Separate colors for each bars
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        title: {
          text: 'Bar Chart',
          display: true
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            stacked: true
          }]
        }
      }
    });
  }
}
