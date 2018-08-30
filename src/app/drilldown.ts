import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  barChart = [];
  labeldata: any = [];
  rideCount: any = [];
  public selectedItem: number = 1;
  ngOnInit() {
    this.filterData(1,1);
    
  }

  public alldadat: any = [
    {
      region: 'N',
      city: 'pune',
      hub: 'waked',
      rideCount: 8,
      date: "21/7/2018"
    },
    {
      region: 'N',
      city: 'abc',
      hub: 'Baner',
      rideCount: 8,
      date: "20/7/2018"
    },
    {
      region: 'N',
      city: 'pune',
      hub: 'Moshi',
      rideCount: 3,
      date: "19/7/2018"
    },
    {
      region: 'N',
      city: 'abc',
      hub: 'Vitthalwadi',
      rideCount: 7,
      date: "15/7/2018"
    },
    {
      region: 'N',
      city: 'pune',
      hub: 'abc',
      rideCount: 5,
      date: "10/7/2018"
    },
    {
      region: 'N',
      city: 'abc',
      hub: 'Pashan',
      rideCount: 8,
      date: "21/3/2018"
    },
    {
      region: 'E',
      city: 'Jaipur',
      hub: 'Kukas',
      rideCount: 5,
      date: "21/7/2018"
    },
    {
      region: 'E',
      city: 'Jaipur',
      hub: 'Patrakar Colony',
      rideCount: 8,
      date: "10/7/2018"
    },
    {
      region: 'E',
      city: 'Jaipur',
      hub: 'Mansarovar',
      rideCount: 2,
      date: "21/5/2018"
    },
    {
      region: 'E',
      city: 'Jaipur',
      hub: 'Ajmer Road',
      rideCount: 3,
      date: "21/3/2018"
    },
    {
      region: 'E',
      city: 'Jaipur',
      hub: 'Ashok Nagar',
      rideCount: 7,
      date: "21/7/2017"
    },
    {
      region: 'E',
      city: 'pune',
      hub: 'waked',
      rideCount: 5,
      date: "21/7/2018"
    },
    {
      region: 'w',
      city: 'Ajmer',
      hub: 'waked',
      rideCount: 3,
      date: "21/7/2018"
    },
    {
      region: 'S',
      city: 'Kota',
      hub: 'Mansarovar',
      rideCount: 8,
      date: "21/5/2018"
    },
    {
      region: 'S',
      city: 'Kota',
      hub: 'abc',
      rideCount: 9,
      date: "21/7/2017"
    },
  ];

  public barChartOptions: any = {
    scales: {
      xAxes: [{
        // stacked: true,
        id: "bar-x-axis1",
        barThickness: 50,
      }, {
        display: false,
        // stacked: true,
        id: "bar-x-axis2",
        barThickness: 70,
        // these are needed because the bar controller defaults set only the first x axis properties
        type: 'category',
        // categoryPercentage: 0.8,
        // barPercentage: 0.9,
        // gridLines: {
        //   offsetGridLines: true
        // }
      }],
      yAxes: [{
        stacked: false,
        ticks: {
          beginAtZero: true
        },
      }]

    }
  };

  barChartLabels: string[] = this.labeldata;
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {
      label: "First",
      backgroundColor: 'black',
      borderWidth: 1,
      data: this.rideCount,
      xAxisID: "bar-x-axis1",
    }
    // , {
    //   label: "Second",
    //   backgroundColor: 'red',
    //   borderWidth: 1,
    //   data: [5, 30, 35,45],
    //   xAxisID: "bar-x-axis1", // will not work if set to 'bar-x-axis2'
    // }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e.active["0"]._index);
    var currentElement = this.labeldata[e.active["0"]._index];
    console.log("currentElement ", currentElement);

    this.barChartLabels = [];
    this.rideCount = [];
    this.alldadat.forEach(element => {
      if (element.region == currentElement) {
        console.log(element.region);
        var a = this.barChartLabels.indexOf(element.city);
        if (a == -1) {
          this.barChartLabels.push(element.city);
        }
        var a = this.barChartLabels.indexOf(element.city);
        console.log(this.rideCount[a]);
        if (this.rideCount[a] == undefined) {
          this.rideCount[a] = 0 + element.rideCount;
        } else {
          this.rideCount[a] = this.rideCount[a] + element.rideCount;
        }
      }

    });


    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = this.rideCount;
    this.barChartData = clone;
    this.barChartLabels.length = 0;
    this.barChartLabels = this.labeldata;
    // this.barChartData = clone;


    // this.labeldata = labeldata;
    // this.rideCount = []; 
    console.log("labeldata", this.barChartLabels);
    console.log("rideCount", this.rideCount);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    console.log("clone ", clone);
    clone[0].data = data;
    this.barChartData = clone;
    let label = JSON.parse(JSON.stringify(this.barChartLabels));
    console.log("label ", label);
    this.barChartLabels = ['a', 'b', 'c', 'd'];

    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
  public updateData() {
    console.log("call received");
  }
  public onChange(e) {
    console.log(e,"dfffv");
  }
  public filterData(filterType,callfrom) {
    console.log(filterType,"filterType");
    var currentDate = new Date();
    var lastDate = new Date();

    if(filterType == 1){
      lastDate.setDate(currentDate.getDate() - 7);
    }else if(filterType == 2){
      lastDate.setMonth(currentDate.getMonth() - 2);
    }else if(filterType == 3){
      lastDate.setFullYear(currentDate.getFullYear() - 1);
    }else{
      lastDate.setFullYear(currentDate.getFullYear() - 5);
    }
    console.log(" last date ", lastDate);
    this.alldadat.forEach(element => {

      var elementDate = new Date();
      elementDate.setDate(element.date.split('/')[0]);
      elementDate.setMonth(element.date.split('/')[1]);
      elementDate.setFullYear(element.date.split('/')[2]);

      if (lastDate < elementDate) {


        var a = this.labeldata.indexOf(element.region);
        if (a == -1) {
          this.labeldata.push(element.region);
        }
        var a = this.labeldata.indexOf(element.region);

        if (this.rideCount[a] == undefined) {
          this.rideCount[a] = 0 + element.rideCount;
        } else {
          this.rideCount[a] = this.rideCount[a] + element.rideCount;
        }
      }
    });
    if(callfrom==2){
      let clone = JSON.parse(JSON.stringify(this.barChartData));

    clone[0].data = this.rideCount;
    this.barChartData = clone;
    console.log("rideCount" , this.rideCount);

    }
    
    
   

  }
}
