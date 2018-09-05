import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class BarchartService  {
  currentSeries:any = [2000, 1000, 2000, 1000];
  previousSeries: any = [1000, 2000, 1000, 2000];
  xAxislabels = ['North', 'East', 'West', 'South'];
  durations = [
    {id: 1, label: '7 days', value: 7},
    {id: 2, label: '30 days', value: 30},
    {id: 3, label: '90 days', value: 90},
    {id: 4, label: '1 year', value: 365},
    {id: 5, label: 'life time', value: Infinity}
  ];
  currentDate = new Date();
  constructor (private datePipe: DatePipe) { }
  currentRoot : any;

  data = {
    labels: this.xAxislabels,
    datasets: [ {
      label: 'Driver\'s pick up drop for previous date',
      data: this.previousSeries,
      backgroundColor: 'rgb(138, 100, 147)',
      xAxisID: 'bar-x-axis1'
    }, {
        label: 'Driver\'s pick up drop for selected date',
        data: this.currentSeries,  
        backgroundColor: 'rgb(161, 170, 218)',
        xAxisID: 'bar-x-axis1'
      }
    ]
  };

  root = {
    name: 'india',
    count: 0,
    previousCount: 0,
    rides: [],
    children: [
      {
        name: 'north',
        count: 0,
        previousCount: 0,
        rides: [],
        children: [
          {
            name: 'up',
            count: 0,
            previousCount: 0,
            rides: [],
            children: [
              {
                name: 'jhansi',
                count: 0,
                previousCount: 0,
                rides: [],
                children: [
                  {
                    name: 'dealer1',
                    count: 0,
                    previousCount: 0,
                    rides: [],
                    children: [
                      {
                        name: 'hub1',
                        count: 0,
                        previousCount: 0,
                        rides: [],
                        children: [
                          {
                            name: 'driver1',
                            count: 0,
                            previousCount: 0,
                            rides: [
                              {count: 0, date: new Date(), previousCount: 0}
                            ]
                          },
                          {
                            name: 'driver2',
                            count: 0,
                            previousCount: 0,
                            rides: [
                              {count: 0, date: new Date(), previousCount: 0}
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  computeSeries (params) {
    if (params && this.root.name !== params.searchTerm && this.root.children && this.root.children.length) {
      this.currentRoot= this.findBar({root: this.root, searchTerm: params.searchTerm});
      if (this.currentRoot.name === params.searchTerm) {
        this.updateChart(this.currentRoot);
      }
    } else if (this.root && this.root.children && this.root.children.length) {
        this.root.children.forEach((child, index)=> {
        this.xAxislabels[index] = child.name;
        this.currentSeries[index] = child.count;
        this.previousSeries[index] = child.previousCount;
      });
    }
  }

  updateChart (root) {
    if (root && root.children && root.children.length) {
      this.xAxislabels.length = 0;
      this.currentSeries.length = 0;
      this.previousSeries.length = 0;
      root.children.forEach((child, index) => {
        this.xAxislabels[index] = child.name;
        this.currentSeries[index] = child.count;
        this.previousSeries[index] = child.previousCount;
      });
    }
  }

  findBar (params) {
    if (params && params.root && params.searchTerm && params.root.name !== params.searchTerm &&
      params.root.children && params.root.children.length) {
      for (let index in params.root.children) {
        return this.findBar({root: params.root.children[index], searchTerm: params.searchTerm});
      }
    } else if (true) {
      return params.root;
    }
  }

  splitByDate (params) {
   if (this.currentRoot && this.currentRoot.rides && this.currentRoot.rides.length) {
     this.xAxislabels.length = 0;
     this.currentSeries.length = 0;
     this.previousSeries.length = 0;
     this.currentRoot.rides.forEach((ride,index) => {
       this.xAxislabels[index] = this.datePipe.transform(ride.date, 'dd/MM/yyyy');
       this.currentSeries[index] = ride.count;
       this.previousSeries[index] = ride.previousCount;
     });
   } else if (this.root && this.root.rides && this.root.rides.length) {
      this.xAxislabels.length = 0;
      this.currentSeries.length = 0;
      this.previousSeries.length = 0;
      
      this.root.rides.forEach((ride, index) => {
        this.xAxislabels[index] = this.datePipe.transform(ride.date, 'dd/MM/yyyy');
//         this.previousSeries[index] = 0;
      });

      let datasets = [
        {
          backgroundColor : "rgb(138, 100, 147)",
          label : 'North',
          xAxisID : 'bar-x-axis1',
          data: Array(7).fill(0)
        }, {
          backgroundColor : "rgb(161, 170, 218)",
          label : 'East',
          xAxisID : 'bar-x-axis1',
          data: Array(7).fill(0)
        }, {
          backgroundColor : "red",
          label : 'West',
          xAxisID : 'bar-x-axis1',
          data: Array(7).fill(0)
        }, {
          backgroundColor : "red",
          label : 'South',
          xAxisID : 'bar-x-axis1',
          data: Array(7).fill(0)
        }
      ];

      if (this.root.children && this.root.children.length) {
        for (let index in this.xAxislabels) {
          for (let zoneIndex in this.root.children) {
            for (let ride of this.root.children[zoneIndex].rides) {
              if (this.xAxislabels[index] === this.datePipe.transform(ride.date, 'dd/MM/yyyy')) {
                datasets[zoneIndex].data[index] += ride.count;
                break;
              }
            }
          }
        }
        return {xAxislabels: this.xAxislabels, datasets};
      }
    }
  }

  /*splitByDay (barName) {
    let driver;
    if (barName.startsWith('driver')) {
      for (let hub of this.root.hubs) {
        for (let drvr of hub.drivers) {
          if (drvr.name === barName) {
            driver = drvr;
            break;
          }
        }
      }
      this.xAxislabels.length = 0;      
      this.currentSeries.length = 0;
      
      driver.rides.forEach((ride, index) => {        
        this.xAxislabels.push(ride.day);
        this.currentSeries.push(ride.count);
      });
      return {
        xAxislabels: this.xAxislabels,
        currentSeries: this.currentSeries
      }
    }
  }*/

  traverse (root) {
    var result;
    if (root.children != undefined && root.children.length) {
      for (var counter = 0; counter < root.children.length; counter++) {
        result = this.traverse(root.children[counter]);
        root.count += result.count;
        root.previousCount += result.previousCount;
       // var resultDates = [];

        if(root.rides.length == 0){
  //         root.rides.concat(result.rides);
          result.rides.forEach(ride => {
            root.rides.push({count: ride.count, date: ride.date, previousCount: ride.previousCount});
          });
        } else {
          var newRides = [];
            result.rides.forEach(ride => {
                var resultDate = ride.date;
                var found = false;
                 root.rides.forEach(r => {
                  if(dateComparator(r.date, resultDate)){
                    r.count += ride.count;
                    r.previousCount += ride.previousCount;
                  } else {
                    newRides.push(ride);
                  }
                });
            });
          if (newRides && newRides.length) {
            root.rides.push.apply(newRides);
          } 
        }
       }
       return root;
    } else {
      //
      var driver = ridesCreator({duration: 7});
      root.rides = driver.rides;
      root.count =  driver.count;
      root.previousCount = driver.previousCount;
      return root;
    }  
  }
} // End of service class

function dateComparator (date1, date2) {
  date1.setHours(0,0,0,0);
  date2.setHours(0,0,0,0);
  return (date1.valueOf() === date2.valueOf());
}


function ridesCreator (config) {
  if (!config) config = {duration: 7};
  else if (!config.duration) config.duration = 7;
  
  var rides = [],
      days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var totalCount = 0, totalPreviousCount = 0;
  if (config && config.duration) {
    for (var counter = 1; counter <= config.duration; counter++) {
      var ride = {
        date: new Date(new Date().setDate(new Date().getDate() - counter)),
        count: 0, day: '', previousCount: 0
      };
      ride.day = days[ride.date.getDay()];
      if (counter % 2) {
        ride.count = config.duration * 40 * counter;
        ride.previousCount = config.duration * 20 * counter;
      } else {
        ride.count = config.duration * 20 * counter;
        ride.previousCount = config.duration * 40 * counter;
      }     
      totalCount += ride.count;
      totalPreviousCount += ride.previousCount;
      rides.push(ride);
    }
  }
  var driver = {
    rides: rides,
    count: totalCount,
    previousCount: totalPreviousCount
  }
  console.log(driver);
  return driver;
}
