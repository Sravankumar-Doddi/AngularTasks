import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../model/Employee';


@Component({
  selector: 'app-employment-application',
  templateUrl: './employment-application.component.html',
  styleUrls: ['./employment-application.component.css']
})
export class EmploymentApplicationComponent implements OnInit {

  formValue!: FormGroup;
  empModel: Employee = new Employee();
  empData !: Employee[];
  email !: String;
  mobileNumber !: number;
  showAdd !: boolean;
  showUpdate !: boolean;


  constructor(private formbuilder: FormBuilder, private api: EmployeeService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]],
      middleName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^(0|91)?[6-9]{1}[0-9]{9}$")]],
      email: ['', [Validators.email, Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    })
    this.getEmployeeDetails();
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.empModel.firstName = this.formValue.value.firstName;
    this.empModel.middleName = this.formValue.value.middleName;
    this.empModel.lastName = this.formValue.value.lastName;
    this.empModel.mobileNumber = this.formValue.value.mobileNumber;
    this.empModel.email = this.formValue.value.email;
    this.empModel.dateOfBirth = this.formValue.value.dateOfBirth;
    this.empModel.gender = this.formValue.value.gender;

    this.api.postEmployee(this.empModel)
      .subscribe(res => {
        console.log(res);
        alert("Employee Added Successfully")

        this.formValue.reset();

        let ref = document.getElementById('cancel')
        ref?.click();

        this.getEmployeeDetails();
      }, err => {
        alert("Something Went Wrong")
      })
  }

  getEmployeeDetails() {
    this.api.getEmployee().subscribe(res => {
      this.empData = res;
    })
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe(res => {
      alert("Employee Deleted")
      this.getEmployeeDetails();
    })
  }

  edit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.empModel.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['middleName'].setValue(row.middleName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['mobileNumber'].setValue(row.mobileNumber);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['dateOfBirth'].setValue(row.dateOfBirth);
    this.formValue.controls['gender'].setValue(row.gender);
  }

  updateEmployeeDetails() {
    this.empModel.firstName = this.formValue.value.firstName;
    this.empModel.middleName = this.formValue.value.middleName;
    this.empModel.lastName = this.formValue.value.lastName;
    this.empModel.mobileNumber = this.formValue.value.mobileNumber;
    this.empModel.email = this.formValue.value.email;
    this.empModel.dateOfBirth = this.formValue.value.dateOfBirth;
    this.empModel.gender = this.formValue.value.gender;

    this.api.updateEmployee(this.empModel, this.empModel.id).subscribe(res => {
      alert("Updated Sucessfully")

      let ref = document.getElementById("cancel")
      ref?.click();

      this.formValue.reset();
      this.getEmployeeDetails();
    })

  }

  search() {
    if (this.email == '') {
      this.ngOnInit()
    }
    // || this.mobileNumber == 0
    // else if(this.mobileNumber != 0){
    //   this.empData = this.empData.filter(res=>{
    //     return res.mobileNumber.toString.name.match(this.mobileNumber.toString.name)
    //   })
    // }

    else {
      this.empData = this.empData.filter(res => {
        return res.email.toLocaleLowerCase().match(this.email.toLocaleLowerCase());
      })
    }
  }

}


