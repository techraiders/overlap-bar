'use strict';

var root = {
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

var result = traverse(root);

function traverse (root) {
  var result;
  if (root.children != undefined && root.children.length) {
    for (var counter = 0; counter < root.children.length; counter++) {
      result = traverse(root.children[counter]);
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
        count: 0
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