import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarchartService {
  currentSeries:any;
  previousSeries: any;

  constructor() { } 

  data = {
    north: {
      id: 1,
      currentRideCount: 1000,
      previousRideCount: 500,
      children: [
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
      ]
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
          if (this.data && this.data.north && this.data.north.children &&
            this.data.north.children.length) {
            this.data.north.children.forEach((state, index) => {
              currentSeries[index] += state.currentRideCount;
              previousSeries[index] += state.previousRideCount;
              xAxislabels[index] = state.label;
            });
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
      }
    }
  }
}
