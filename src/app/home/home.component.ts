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
  currentStep: number = 0;
  currentTab:number = 0;
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
    (document.getElementById('search') as HTMLElement).style.display = 'none';
    (document.getElementById('pending') as HTMLElement).style.display = 'none'
  }
  // onSubmit(){
  //   console.log('submit')
  // }
  searchProposal() {
    (document.getElementById('proposal') as HTMLElement).style.display = 'none';
    (document.getElementById('search') as HTMLElement).style.display = 'block';
    (document.getElementById('pending') as HTMLElement).style.display = 'none'
  }
  newProposal() {
    (document.getElementById('proposal') as HTMLElement).style.display = 'block';
    (document.getElementById('search') as HTMLElement).style.display = 'none';
    (document.getElementById('pending') as HTMLElement).style.display = 'none'
  }
  pendingProposals(){
    (document.getElementById('proposal') as HTMLElement).style.display = 'none';
    (document.getElementById('search') as HTMLElement).style.display = 'none';
    (document.getElementById('pending') as HTMLElement).style.display = 'block'
  }
  openDialog() {
    let dialogRef = this.dialog.open(ExampleDialogComponent, {
      width: '1000px',
      data: { name: this.name, animal: this.animal },
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  };
  nextTab(step: any){
    this.currentTab = step
  };
  previousTab(step: any){
    this.currentTab= step-2
  }
}
