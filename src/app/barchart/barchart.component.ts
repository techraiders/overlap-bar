import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { BarchartService } from './barchart.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  BarChart : any;

  currentSeries = [4, 10, 3, 9];
  previousSeries = [10, 4, 5, 3];
  xAxislabels = ['North', 'East', 'West', 'South'];

  constructor (private bcs : BarchartService) {
    console.log(bcs);
  }

  computeSeries (clickedEl) {
    let config = this.bcs.computeSeries(clickedEl);
    this.updateChart(config);
  }

  updateChart (config) {
    if (config && config.xAxislabels && config.xAxislabels.length) {
      config.xAxislabels.forEach((val, index) => {
        this.xAxislabels[index] = val;
      });
      // this.xAxislabels = config.xAxislabels;
    }
    if (config.currentSeries && config.currentSeries.length) {
      config.currentSeries.forEach((val, index) => {
        this.currentSeries[index] = val;
      });
    }
    if (config.previousSeries && config.previousSeries.length) {
      config.previousSeries.forEach((val, index) => {
        this.previousSeries[index] = val;
      });
    }
    this.BarChart.update();
  }

  onDateChange (event) {
    let temp = this.currentSeries;
    this.currentSeries[0] = 10;
    this.previousSeries[0] = 4;
    this.BarChart.update();
  }

  data = {
    labels: this.xAxislabels,
    datasets: [
      {
        label: 'Driver\'s pick up drop for selected date',
        data: this.currentSeries,
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
        data: this.previousSeries,
        backgroundColor: ['blue', 'red', 'green', 'pink'],
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
    },
    onClick: (event, i) => {
      if (i[0] && i[0]._model && i[0]._model.label) {
        let clickedEl = i[0]._model.label;
        this.computeSeries(clickedEl);
      }
    }
  };

  ngOnInit () {
    Chart.plugins.register({
      afterDatasetsUpdate: function(chart) {
        Chart.helpers.each(chart.getDatasetMeta(0).data, function(rectangle, index) {
          rectangle._view.width = rectangle._model.width = 30;
        });
      },
    });
    
    this.renderChart();
  }

  renderChart () {    
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      // type: 'horizontalBar',
      data: this.data,
      options: this.options
    });
    
    this.BarChart.config.data.datasets[0].data.forEach((bar, index) => {
      dashedBorder(this.BarChart, 0, index, [10, 15]);
    });
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