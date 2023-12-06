var CrudUrls = {

    GetEmployeeList: '@Url.Action("GetEmployee","employees")',
    EmployeeAdd: '@Url.Action("PostEmployee","Employees")',
}
var x = new crudOperation();
x.init();