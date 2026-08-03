import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj = {
    email: '', contactNo: ''
  }

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.http.post('https://localhost:7038/api/EmployeeMaster/login', this.loginObj).subscribe({
      next: (result: any) => {
        console.log("Result -> ", result);
        this.router.navigateByUrl("/dashboard");
      },
      error: (error: any) => {
        console.log("Error -> ", error);
      }
    })
  }
}
