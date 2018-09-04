import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class BarchartService  {
  currentSeries:any = [20000, 10000, 20000, 10000];
  previousSeries: any = [10000, 20000, 10000, 20000];
  xAxislabels = ['North', 'East', 'West', 'South'];
  durations = [
    {id: 1, label: '7 days', value: 7},
    {id: 2, label: '30 days', value: 30},
    {id: 3, label: '90 days', value: 90},
    {id: 4, label: '1 year', value: 365},
    {id: 5, label: 'life time', value: Infinity}
  ];
  currentDate = Date.now();
  constructor (private datePipe: DatePipe) { }  
   
  root = {
    name: 'india',
    count: 0,
    rides: [],
    children: [
      {
        name: 'north',
        count: 0,
        rides: [],
        children: [
          {
            name: 'up',
            count: 0,
            rides: [],
            children: [
              {
                name: 'jhansi',
                count: 0,
                rides: [],
                children: [
                  {
                    name: 'dealer1',
                    count: 0,
                    rides: [],
                    children: [
                      {
                        name: 'driver1',
                        count: 0,
                        rides: [
                          {count: 1555, date: new Date()}
                        ]
                      },
                      {
                        name: 'driver2',
                        count: 0,
                        rides: [
                          {count: 2555, date: new Date()}
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

  /*computeSeries (params) {
    if (params) {

    } else {
        this.root.hubs.forEach(hub => {
        hub.count = 0;
        hub.drivers.forEach(driver => {
          driver.count = 0;
          driver.rides.forEach(ride => {
            driver.count += ride.count;
          });
          hub.count += driver.count;
        });
      });

      this.xAxislabels.length = 0;
      this.currentSeries.length = 0;
      this.root.hubs.forEach((hub, index) => {
        this.xAxislabels[index] = hub.name;
        this.currentSeries[index] = hub.count;
      });
      return {
        xAxislabels : this.xAxislabels,
        currentSeries: this.currentSeries
      };
    }    
  }

  splitByDate (barName) {
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
        let date = this.datePipe.transform(ride.date, 'dd/MM/yyyy');
        this.xAxislabels.push(date);
        this.currentSeries.push(ride.count);
      });
      return {
        xAxislabels: this.xAxislabels,
        currentSeries: this.currentSeries
      }
    }

    let hub = this.root.hubs.find(hub => hub.name === barName);
    hub.drivers.forEach(driver => {
      driver.rides.forEach((ride, index) => {
        this.xAxislabels[index] = ride.date;
        this.currentSeries[index] = ride.count;
      });
    });
    return {
      xAxislabels: this.xAxislabels,
      currentSeries: this.currentSeries;
    };
  }

  splitByDay (barName) {
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
       // var resultDates = [];

        if(root.rides.length == 0){
  //         root.rides.concat(result.rides);
          result.rides.forEach(ride => {
            root.rides.push({count: ride.count, date: ride.date});
          });
        } else {
          var newRides = [];
            result.rides.forEach(ride => {
                var resultDate = ride.date;
                var found = false;
                 root.rides.forEach(r => {
                  if(dateComparator(r.date, resultDate)){
                    r.count += ride.count;
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
      var driver = ridesCreator({duration: 15});
      root.rides = driver.rides;
      root.count =  driver.count;
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
  var totalCount = 0;
  if (config && config.duration) {
    for (var counter = 1; counter <= config.duration; counter++) {
      var ride = {
        date: new Date(new Date().setDate(new Date().getDate() - counter)),
        count: 0,
        day: ''
      };
      ride.day = days[ride.date.getDay()];
      ride.count = config.duration * 20 * counter;
      totalCount += ride.count;
      rides.push(ride);
    }
  }
  var driver = {
    rides: rides,
    count: totalCount
  }
  console.log(driver);
  return driver;
}
