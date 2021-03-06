import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientsService } from '../../services/clients.service';
import { ClientPresenter } from '../presenter/client.presenter';
import { SearchClientComponent } from '../search-client/search-client.component';

@Component({
  selector: 'app-new-proposal',
  templateUrl: './new-proposal.component.html',
  // styleUrls: ['./error-page.component.scss']
})
export class NewProposalComponent implements OnInit {
  userData$: Subject<any> = new Subject<any>();
  typeOfEEFFAudit: string = '';
  dateOfEEFFAudit: any = '';
  typeOfEEFFSituation: string = '';
  dateOfEEFFSituation: any = '';
  typeOfEEFFSunat: string = '';
  dateOfEEFFSunat: any = '';
  currencyEEFF: string = '';
  isData: boolean = false;
  codigounico: any = '-';
  requestDate: any = '-';
  numerodocumento: any = '-';
  razonsocial: any = '-';
  totalRealizationValue: number = 0;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    public clientPresenter: ClientPresenter,
    public clientService: ClientsService,
    public datepipe: DatePipe
  ) {}
  ngOnInit(): void {
    localStorage.clear();
  }
  dataClientForm: FormGroup = this.fb.group({
    requestNumber: [''],
    razonsocial: [''],
    codigounico: [''],
    numerodocumento: [''],
    sei: [''],
    rating: [''],
    dateUpdateRating: [''],
    dateTestRating: [''],
  });
  eeffAuditForm: FormGroup = this.fb.group({
    currentAssets: [''],
    heritage: [''],
    netProfit: [''],
    EBITDA: [''],
    workingCapital: [''],
    totalActive: [''],
  });
  eeffSunatForm: FormGroup = this.fb.group({
    currentAssets: [''],
    heritage: [''],
    netProfit: [''],
    EBITDA: [''],
    workingCapital: [''],
    totalActive: [''],
  });
  eeffSituationForm: FormGroup = this.fb.group({
    currentAssets: [''],
    heritage: [''],
    netProfit: [''],
    EBITDA: [''],
    workingCapital: [''],
    totalActive: [''],
  });
  warrantyForm: FormGroup = this.fb.group({
    realizationValue: [''],
    aditionalWarranty: [''],
    totalWarranty: [''],
  });
  openDialog() {
    this.dataClientForm.reset()
    this.eeffAuditForm.reset()
    this.eeffSituationForm.reset()
    this.eeffSunatForm.reset()
    this.warrantyForm.reset()
    let dialogRef = this.dialog.open(SearchClientComponent, {
      width: '1000px',
      height: '90vh',
      panelClass: 'custom-modalbox',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.clientService.getDataRating(result.data).subscribe((res) => {
        this.codigounico= result.data.codeID;
        this.requestDate= new Date();
        this.numerodocumento= result.data.documentIdNumber;
        this.razonsocial= result.data.razonsocial;
        let dateFinancialStatusPeriod = ((res.financialStatusPeriod).substring(0, 10)).split('-');
        let updateDate = ((res.updateDate).substring(0, 10)).split('-');
        this.dataClientForm.setValue({
          requestNumber: 'dummy',
          razonsocial: result.data.razonsocial,
          codigounico: result.data.codeID,
          numerodocumento: result.data.documentIdNumber,
          sei: res.SEI,
          rating: res.scaleWithException,
          dateUpdateRating: dateFinancialStatusPeriod[2]+'/'+dateFinancialStatusPeriod[1]+'/'+dateFinancialStatusPeriod[0],
          dateTestRating: updateDate[2]+'/'+updateDate[1]+'/'+updateDate[0],
        });
      });
      this.clientService.getDataEF(result.data).subscribe((resEF) => {
        this.isData = resEF.length > 0 ? true : false;
        resEF.map((item: any) => {
          this.currencyEEFF = item.currency;

          item.codeTypeEEFF == 1
            ? (this.eeffAuditForm.setValue({
              currentAssets: item.currentAssets.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              heritage: item.heritage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              netProfit: item.netProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              EBITDA: item.EBITDA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              workingCapital: item.workingCapital.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              totalActive: item.totalActive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }),
              this.dateOfEEFFAudit = item?.dateEEFF,
              this.typeOfEEFFAudit = item?.typeEEFF)
            : item.codeTypeEEFF == 2
            ? (this.eeffSunatForm.setValue({
              currentAssets: item.currentAssets.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              heritage: item.heritage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              netProfit: item.netProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              EBITDA: item.EBITDA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              workingCapital: item.workingCapital.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              totalActive: item.totalActive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }),
              this.dateOfEEFFSunat = item?.dateEEFF,
              this.typeOfEEFFSunat = item?.typeEEFF)
            : (this.eeffSituationForm.setValue({
              currentAssets: item.currentAssets.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              heritage: item.heritage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              netProfit: item.netProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              EBITDA: item.EBITDA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              workingCapital: item.workingCapital.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              totalActive: item.totalActive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }),
              this.dateOfEEFFSituation = item?.dateEEFF,
              this.typeOfEEFFSituation = item?.typeEEFF)
        });
      });
      this.clientService.getWarranty(result.data).subscribe((resW) => {
        this.totalRealizationValue = 0;
        resW.map((itemW: any) => {
          this.totalRealizationValue += parseFloat(itemW.realizationValue);
        })
        this.warrantyForm.setValue({
          realizationValue: (this.totalRealizationValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          aditionalWarranty: '',
          totalWarranty: (this.totalRealizationValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        })
      });
    });
    // const dataEF = {
    //   requestNumber: this.dataClientForm.get('razonsocial'),
    //   numerodocumento: this.dataClientForm.get('codeID'),
    //   razonsocial: this.dataClientForm.get('razonsocial'),
    //   codigounico: this.dataClientForm.get('codeID'),
    // };
  }
  calculate() {}
  calculateTotalWarranty(event: any){
    this.warrantyForm.setValue({
      realizationValue: this.totalRealizationValue,
      aditionalWarranty: parseFloat(event.target.value),
      totalWarranty: (this.totalRealizationValue + parseFloat(event.target.value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    })
  }
  get getClientData() {
    return this.userData$;
  }
}
