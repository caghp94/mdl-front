import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ExampleDialogComponent } from '../modals/search-client.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  animal: string | undefined;
  name: string | undefined;
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    (document.getElementById('search') as HTMLElement).style.display = 'none'
  }
  // onSubmit(){
  //   console.log('submit')
  // }
  searchProposal() {
    (document.getElementById('proposal') as HTMLElement).style.display = 'none';
    (document.getElementById('search') as HTMLElement).style.display = 'block'
  }
  newProposal() {
    (document.getElementById('proposal') as HTMLElement).style.display = 'block';
    (document.getElementById('search') as HTMLElement).style.display = 'none'
  }
  openDialog() {
    let dialogRef = this.dialog.open(ExampleDialogComponent, {
      width: '1000px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
}
