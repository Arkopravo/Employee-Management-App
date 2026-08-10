export class EmployeeModel {
  employeeId: number;
  name: string;
  contactNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  altContactNo: string | null;
  address: string;
  designationId: number;
  createdDate: Date | null;
  modifiedDate: Date | null;
  role: string;

  constructor() {
    this.employeeId = 0;
    this.name = '';
    this.contactNo = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.altContactNo = null;
    this.address = '';
    this.designationId = 0;
    this.createdDate = null;
    this.modifiedDate = null;
    this.role = '';
  }
}


export interface IEmployeeListModel {
  employeeId: number;
  name: string;
  contactNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  altContactNo: string | null;
  address: string;
  designationId: number;
  createdDate: string | null;
  modifiedDate: string | null;
  role: string | null;
  designationName: string;
  departmentName: string;
}