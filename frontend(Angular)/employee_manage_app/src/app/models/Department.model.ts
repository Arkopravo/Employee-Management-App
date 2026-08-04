// need initialization = class
// no initialization = interface

export class DepartmentModel {
    departmentId: number;
    departmentName: string;
    isActive: boolean;

    constructor() {
        this.departmentId = 0;
        this.departmentName = '';
        this.isActive = false;
    }
}