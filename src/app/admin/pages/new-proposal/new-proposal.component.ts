import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { SearchClientComponent } from "../search-client/search-client.component";

@Component({
    selector: 'app-new-proposal',
    templateUrl: './new-proposal.component.html',
    // styleUrls: ['./error-page.component.scss']
})

export class NewProposalComponent implements OnInit {
    constructor(public dialog: MatDialog, private fb: FormBuilder) { }
    ngOnInit(): void {
      localStorage.clear()
    };
    dataClientForm: FormGroup = this.fb.group({
      razonsocial: [localStorage.getItem('razonsocial')],
      codigounico: [localStorage.getItem('codigounico')],
      numerodocumento: [localStorage.getItem('numerodocumento')]
    })
    openDialog() {
        let dialogRef = this.dialog.open(SearchClientComponent, {
            width: '1000px',
            height: '90vh',
            panelClass: 'custom-modalbox'
        });

    }
    calculate(){

    };
}
