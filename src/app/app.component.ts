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
  data = {
    labels: ['North', 'East', 'West', 'South'],
    datasets: [
      {
        label: 'Driver\'s pick up drop for selected date',
        data: [4, 10, 3, 9],
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
        borderWidth: 2,
        xAxisID: 'bar-x-axis1'
      }, {
        label: 'Driver\'s pick up drop for previous date',
        data: [10, 4, 5, 3],
        backgroundColor: ['blue', 'red', 'green', 'pink', 'grey', 'purple', 'tomato'],
        xAxisID: 'bar-x-axis1'
      }
    ]
  };

  options = {
    legend: {
      display: true
    },
    title: {
      text: 'Bar Chart',
      display: true
    },
    scales: {
      xAxes: [{
        // display: false,
        stacked: true,
        id: 'bar-x-axis1',
        gridLines: {
          display: false
        },
        barThickness: 70
      }],
      yAxes: [{
        // display: false,
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: true
        },
        stacked: false
      }]
    }
  };

  ngOnInit () {
    Chart.plugins.register({
      afterDatasetsUpdate: function(chart) {

        Chart.helpers.each(chart.getDatasetMeta(0).data, function(rectangle, index) {
          rectangle._view.width = rectangle._model.width = 30;

        });
      },
    })
    
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      // type: 'horizontalBar',
      data: this.data,
      options: this.options
    });
    
    console.log(this.BarChart.config.data.datasets[0].data.forEach((bar, index) => {
      dashedBorder(this.BarChart, 0, index, [10, 15]);
    }));
  }
}

// dashedBorder(chart, datasetIndex, barIndex, dash values)
function dashedBorder (chart, dataset, data, dash) {
chart.config.data.datasets[dataset]._meta[0].data[data].draw = function () {
  chart.chart.ctx.setLineDash(dash);
  Chart.elements.Rectangle.prototype.draw.apply(this, arguments);
  // put the line style back to the default value
  chart.chart.ctx.setLineDash([1, 0]);
}
}


/* Help Reference: 
Overlapping bar:
https://jsfiddle.net/17hvoa9t/1343/
https://github.com/chartjs/Chart.js/issues/3946

Border change:
https://stackoverflow.com/questions/39107172/how-to-customize-border-style-on-chart-js
https://jsfiddle.net/kewmh8w0/
*/