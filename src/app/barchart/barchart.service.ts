import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarchartService {
  currentSeries:any = [10000, 10000, 10000, 10000];
  previousSeries: any = [5000, 5000, 5000, 5000];
  xAxislabels = ['North', 'East', 'West', 'South'];

  constructor () { } 

  data = {
    north: {
      id: 1,
      currentRideCount: 10000,
      previousRideCount: 5000,
      children: {
        up: {
          id: 1.1,
          currentRideCount: 5000,
          previousRideCount: 2000,
          children: {
            lukhnow: {
              id: 2.1,
              currentRideCount: 3000,
              previousRideCount: 700     
            },
            jhansi: {
              id: 2.2,
              currentRideCount: 2000,
              previousRideCount: 1300
            }
          }
        },
        Haryana: {
          id: 1.2,
          currentRideCount: 5000,
          previousRideCount: 3000,
          children: {
            gurgaon: {
              id: 2.3
            },
            faridabad: {
              id: 2.4
            }
          }
        }
      } /*,
      child: [
        {
          id: 1.1,
          label: 'Delhi',
          currentRideCount: 500,
          previousRideCount: 200
        }, {
          id: 1.2,
          label: 'Hariyana',
          currentRideCount: 500,
          previousRideCount: 300
        }
      ] */
    },
    east: {}
  };

  computeSeries (clickedEl) {
    let currentSeries = [0,0,0,0],
        previousSeries = [0,0,0,0],
        xAxislabels = ['', '', '', ''];

    if (clickedEl && typeof clickedEl === 'string') {
      clickedEl = clickedEl.toLowerCase();
      switch (clickedEl) {
        case 'north' : {
          if (this.data && this.data.north && this.data.north.children) {
            let counter = 0;
            
            for (let key in this.data.north.children) {
              xAxislabels[counter] = key;
              currentSeries[counter] += this.data.north.children[key].currentRideCount;
              previousSeries[counter] += this.data.north.children[key].previousRideCount;
              counter++;
            } /*
            this.data.north.children.forEach((state, index) => {
              currentSeries[index] += state.currentRideCount;
              previousSeries[index] += state.previousRideCount;
              xAxislabels[index] = state.label;
            }); */
            console.log(currentSeries, previousSeries, xAxislabels);
            return {
              currentSeries,
              previousSeries,
              xAxislabels
            };
          } else {
            break;
          }
        }
        case 'up' : {
          if (this.data && this.data.north && this.data.north.children && this.data.north.children.up && this.data.north.children.up.children) {
            let counter = 0;
            for (let key in this.data.north.children.up.children) {
              xAxislabels[counter] = key;
              currentSeries[counter] += this.data.north.children.up.children[key].currentRideCount;
              previousSeries[counter] += this.data.north.children.up.children[key].previousRideCount;
              counter++;
            }
            return {xAxislabels, currentSeries, previousSeries};
          }
        }
      }
    }
  }
}
