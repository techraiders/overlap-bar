import { Input, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { BarchartService } from '../barchart/barchart.service';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-content.html'
})

export class NgbdModalContent  {
  @Input() name;
  configuration : any = {dimension: 'timewise', dataHierarchy: 'areawise'};

  constructor(public activeModal: NgbActiveModal, private bcs : BarchartService) {}

  onDataHierarchyChange (event) {
    if (this.configuration.dataHierarchy !== 'dealerwise') {
      delete this.configuration.dealerName;
    }
  }
  onDealerChange () {
    this.bcs.dealerChanged.next(this.configuration.dealerName);
  }
}