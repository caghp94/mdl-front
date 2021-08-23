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
        documentIdType: [],
        documentIdNumber: []
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
    

}