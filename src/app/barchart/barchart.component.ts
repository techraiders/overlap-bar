import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Chart from 'chart.js';
import { BarchartService } from './barchart.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit, OnDestroy {

  BarChart : any;
  currentSeries = this.bcs.currentSeries;
  previousSeries = this.bcs.previousSeries;
  xAxislabels = this.bcs.xAxislabels;
  currentDate = this.bcs.currentDate;
  backup = this.bcs.backup;
  currentRoot = this.bcs.currentRoot;
  durations = this.bcs.durations;
  selectedDuration: any;
  //currentRootsBackup = this.bcs.currentRootsBackup;
  model = 1;

  onSelectedDurationChange (a) {
    //console.log(this.selectedDuration);
  }

  constructor (private bcs : BarchartService) { }  

  computeSeries (clickedEl) {
    if (clickedEl) {
      this.backup.push({
        xAxislabels: JSON.parse(JSON.stringify(this.xAxislabels)),
        currentSeries: JSON.parse(JSON.stringify(this.currentSeries)),
        previousSeries: JSON.parse(JSON.stringify(this.previousSeries))
      });
      /*if (this.currentRoot)
        this.currentRootsBackup.push(this.bcs.currentRoot);
      else
        this.currentRootsBackup.push(this.bcs.root); */
    }
    
    this.bcs.computeSeries(clickedEl);
  }

  goBack (config) {    
    if (this.backup && this.backup.length) {
      let last;
      if (config && config.top) {
        last = this.backup[0];
        this.backup.length = 0;
      } else last = this.backup.pop();
      
      if (last.splitBy) {
        this.BarChart.data.datasets.length = 0;
        last.dataSets.forEach(dataset => {
          this.BarChart.data.datasets.push(dataset);
        });
        this.xAxislabels.length = 0;
        last.xAxislabels.forEach((label, index) => {
          this.xAxislabels[index] = label;
        })
        this.BarChart.options.scales.xAxes.forEach(axis => {axis.stacked = true;});
        this.BarChart.update();
        return;
      }
      

      this.xAxislabels.length = 0;
      this.currentSeries.length = 0;
      this.previousSeries.length = 0;

      this.xAxislabels.forEach((label, index) => {
        this.BarChart.data.datasets[index]
      });

      last.xAxislabels.forEach((label, index) => {
        this.xAxislabels[index] = label;
      });
      
      last.currentSeries.forEach((val, index) => {
        this.currentSeries[index] = val;
        this.BarChart.data.datasets[0].data[index] = val;
      });

      last.previousSeries.forEach((val, index) => {
        this.previousSeries[index] = val;
        this.BarChart.data.datasets[1].data[index] = val;
      });

      this.BarChart.options.scales.xAxes.forEach(axis => {axis.stacked = true;});

      this.BarChart.update();
    }
  }

  goTop () {
    this.goBack({top: true});
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

  data = this.bcs.data;

  options = {
//     tooltips: {
//       enabled: false,
//       custom: function (tooltipModel) {
//         // Tooltip Element
//         let tooltipEl = document.getElementById('chartjs-tooltip');

//         // Create element on first render
//         if (!tooltipEl) {
//           tooltipEl = document.createElement('div');
//           tooltipEl.id = 'chartjs-tooltip';
//           tooltipEl.innerHTML = `<div>
//             <p> <strong> +10% </strong> </p>
//           </div>`;
//           document.body.appendChild(tooltipEl);
//         }

//         // Hide if no tooltip
//         /* if (tooltipModel.opacity === 0) {
//           tooltipEl.style.opacity = '0';
//           return;
//         } */

//         // Set caret position
//         /*tooltipEl.classList.remove('above', 'below', 'no-transform');
//         if (tooltipModel.yAlign) {
//           tooltipEl.classList.add(tooltipModel.yAlign);
//         } else {
//           tooltipEl.classList.add('no-transform');
//         }*/

//         function getBody (bodyItem) {
//           return bodyItem.lines;
//         }

//         let position = this._chart.canvas.getBoundingClientRect();

//         // Display, position, and set styles for font
//         tooltipEl.style.opacity = '1';
//         tooltipEl.style.position = 'absolute';
//         tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
//         /*tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
//          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
//         tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
//         tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
//         tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px'; */
//       }
//     },
    legend: {
      display: true
    },
    title: {
      text: 'Bar Chart',
      display: false
    },
    scales: {
      xAxes: [{
        display: true,
        stacked: true,
        id: 'bar-x-axis1',
        gridLines: {
          display: true
        },
        barThickness: 30
      }],
      yAxes: [{
        // display: false,
        gridLines: {
          display: true
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
        this.computeSeries({searchTerm: clickedEl});
        this.BarChart.update();
      }
    },
    events: ['mousemove', 'click']
  };

  ngOnInit () {
    this.selectedDuration = this.durations[0];

    let result = this.bcs.traverse(this.bcs.root);
    this.computeSeries(null);
    
    this.renderChart();
    this.bcs.onBarChartInitialize (this.BarChart);

    this.bcs.dealerChanged.subscribe(dealerName => {
      console.log(`dealerNameReceived: ${dealerName}`);
      let dealer = this.bcs.dealerWise.find(dealer => dealer.name === dealerName);
      this.bcs.computeSeries(dealer);
    });
  }

  ngOnDestroy () {
    this.bcs.dealerChanged.unsubscribe();
  }

  renderChart () {    
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      // type: 'horizontalBar',
      data: this.data,
      options: this.options,
      plugins: [{
        afterDatasetsUpdate: function(chart) {
          Chart.helpers.each(chart.getDatasetMeta(1).data, function(rectangle, index) {
            rectangle._view.width = rectangle._model.width = 70;
          });
        }
      }]
    });
    
    /*this.BarChart.config.data.datasets[0].data.forEach((bar, index) => {
      dashedBorder(this.BarChart, 0, index, [10, 15]);
    }); */
  }

   splitByDate () {
    // params = {barLabel: the bar you want to split 'hub1'};
    let result = this.bcs.splitByDate(null);
    if (result) {
      this.BarChart.data.datasets.length = 0;
      result.datasets.forEach((dataset, index) => {        
        this.BarChart.data.datasets.push(dataset);
      });
      this.BarChart.options.scales.xAxes.forEach(axis => axis.stacked = false);
      this.BarChart.update();
      //this.BarChart.draw();
    }
  }
  /* splitByDay () {
    let result = this.bcs.splitByDay('driver1');
    this.BarChart.update();
  } */
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