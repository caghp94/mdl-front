import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { ClientPresenter } from "../presenter/client.presenter";
import { SearchClientComponent } from "../search-client/search-client.component";

@Component({
    selector: 'app-new-proposal',
    templateUrl: './new-proposal.component.html',
    // styleUrls: ['./error-page.component.scss']
})

export class NewProposalComponent implements OnInit {
  userData$: Subject<any> = new Subject<any>();
    constructor(public dialog: MatDialog, private fb: FormBuilder, public clientPresenter: ClientPresenter) { }
    ngOnInit(): void {
      localStorage.clear();
    };
    dataClientForm: FormGroup = this.fb.group({
      requestNumber: [''],
      razonsocial: [''],
      codigounico: [''],
      numerodocumento: [''],
      sei: [''],
      rating: [''],
      dateUpdateRating: [''],
      dateTestRating: ['']

    })
    openDialog() {
        let dialogRef = this.dialog.open(SearchClientComponent, {
            width: '1000px',
            height: '90vh',
            panelClass: 'custom-modalbox'
        });
        dialogRef.afterClosed().subscribe(result => {
          this.dataClientForm.setValue({
            requestNumber: result.requestNumber,
            razonsocial: result.razonsocial,
            codigounico: result.codeID,
            numerodocumento: result.documentIdNumber,
            sei: result.sei,
            rating: result.scaleWithException,
            dateUpdateRating: result.financialStatusPeriod,
            dateTestRating: result.updateDate
          })
          console.log(result);//returns undefined
        });

    }
    calculate(){

    };

    get getClientData() {
      return this.userData$;
    }
}
