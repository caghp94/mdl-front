import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ClientsService } from "../../services/clients.service";

@Component({
    selector: 'app-search-client',
    templateUrl: './search-client.component.html',
    styleUrls: ['./search-client.component.scss']
})

export class SearchClientComponent implements OnInit {
    dataSource: any;
    displayedColumns: string[] = [
        'sei',
        'financialStatusPeriod',
        'lastUpdate'
    ];
    isDisabled: boolean = true;
    constructor(
        public dialogRef: MatDialogRef<SearchClientComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private clientsService: ClientsService) { }
    ngOnInit(): void { }
    // form: FormGroup = new FormGroup({
    //     codeID: new FormControl(),
    //     documentIdType: new FormControl(),
    //     documentIdNumber: new FormControl()
    // })
    form: FormGroup = this.fb.group({
        codeID: [''],
        documentIdNumber: [],
        documentIdName: []
    })
    onCancel(): void {
        this.dialogRef.close();
    }
    search() {
        console.log(this.form.value)
    }
    listApplicationUsers() {
        this.clientsService.getClients(this.form.value).subscribe((clients) => this.dataSource = clients)
    }
    resetForm() {
        this.form.reset()
    }
    isValid(): any{
      if(this.form.get('codeID')?.value !== '' || this.form.get('documentIdNumber')?.value !== '' || this.form.get('documentIdName')?.value !== '' ){
        this.isDisabled = false
      } else{
        this.isDisabled =  true
      }

    }

}
