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

  currentSeries = this.bcs.currentSeries;
  previousSeries = this.bcs.previousSeries;
  xAxislabels = this.bcs.xAxislabels;
  backup = [];

  constructor (private bcs : BarchartService) {

  }  

  computeSeries (clickedEl) {
    this.backup.push({
      xAxislabels: JSON.parse(JSON.stringify(this.xAxislabels)),
      currentSeries: JSON.parse(JSON.stringify(this.currentSeries)),
      previousSeries: JSON.parse(JSON.stringify(this.previousSeries))
    });
    let config = this.bcs.computeSeries(clickedEl);
    if (config) {
      this.updateChart(config);
    }
  }

  goBack () {    
    if (this.backup && this.backup.length) {
      let last = this.backup.pop();

      last.xAxislabels.forEach((label, index) => {
        this.xAxislabels[index] = label;
      });
      
      last.currentSeries.forEach((val, index) => {
        this.currentSeries[index] = val;
      });

      last.previousSeries.forEach((val, index) => {
        this.previousSeries[index] = val;
      });

      this.BarChart.update();
    }
  }

  goTop () {
    if (this.backup && this.backup.length) {
      let first = this.backup[0];
      this.backup.length = 0;

      first.xAxislabels.forEach((label, index) => {
        this.xAxislabels[index] = label;
      });

      first.currentSeries.forEach((val, index) => {
        this.currentSeries[index] = val;
      });

      first.previousSeries.forEach((val, index) => {
        this.previousSeries[index] = val;
      });
      this.BarChart.update();
    }
  }

  updateChart (config) {
    if (config.xAxislabels && config.xAxislabels.length) {
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
    },
    events: ['hover', 'click'],
    /* onHover: (event) => {
      Chart.helpers.each(this.BarChart.getDatasetMeta(1).data, function (rectangle) {
        rectangle._view.width = rectangle._model.width = 40;
      });
      this.BarChart.draw();
      // this.renderChart();
    } */
  };

  ngOnInit () {
    Chart.plugins.register({
      afterDatasetsUpdate: function(chart) {
        Chart.helpers.each(chart.getDatasetMeta(1).data, function(rectangle, index) {
          rectangle._view.width = rectangle._model.width = 30;
        });
      }
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
    
    this.BarChart.config.data.datasets[1].data.forEach((bar, index) => {
      dashedBorder(this.BarChart, 1, index, [10, 15]);
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