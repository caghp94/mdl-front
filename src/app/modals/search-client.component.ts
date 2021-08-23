import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-client',
  templateUrl: 'search-client.component.html',
  styleUrls: ['./search-client.component.scss']
})
export class ExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService) { }

  clients!: [];

  ngOnInit() {
    this.apiService.getClients().subscribe(data => {
      this.clients = data
    })
  }
  onCancel(): void {
    this.dialogRef.close();
  }

}