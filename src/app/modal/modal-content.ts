import { Input, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-content.html'
})

export class NgbdModalContent  {
  @Input() name;
  configuration : any = {dimension: 'timewise', dataHierarchy: 'areawise'};

  constructor(public activeModal: NgbActiveModal) {}

  onDataHierarchyChange (event) {
    if (this.configuration.dataHierarchy !== 'dealerwise') {
      delete this.configuration.dealerName;
    }
  }
}