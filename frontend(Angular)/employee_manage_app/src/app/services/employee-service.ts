import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { EmployeeModel, IEmployeeListModel } from '../models/Employee.model';
import { Observable } from 'rxjs';

@Service()
export class EmployeeService {
  http = inject(HttpClient);
  apiUrl: string = 'https://localhost:7038/api/EmployeeMaster/';

  saveEmployee(data: EmployeeModel) {
    return this.http.post(this.apiUrl, data);
  }

  getAllEmployees(): Observable<IEmployeeListModel[]> {
    return this.http.get<IEmployeeListModel[]>(this.apiUrl);
  }

  getAllEmployeeById(id: number):Observable<EmployeeModel>{
    return this.http.get<EmployeeModel>(this.apiUrl + id);
  }

  onUpdateEmployee(id: number, obj: EmployeeModel): Observable<EmployeeModel> {
    return this.http.put<EmployeeModel>(this.apiUrl+id, obj)
  }
}
