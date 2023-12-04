var crudOperation = function () {
    var self = this;
    //Mandatory function to be implemented here 
    var initilization = function () {
        employeeList();
    }
    var registration = function () {
        $(document).on("click", "#btnSave", addOperation);
    }

    // All user defined function will be implemented here
    var addOperation = function () {
        var objValue = {
            Name: $("#name").val(),
            Email: $("#email").val(),
            Phone: $("#phone").val(),
            Status: 'Active',

        }
        $.ajax({
            //url: '/Employees/EmployeeAdd',
            url: CrudUrls.SaveEmployee,
            type: 'Post',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: objValue,
            success: function (result) {
                console.log(result);
                window.location.href = CrudUrls.GetEmployeeList;
            },
            error: function () {
                alert("Could not created new record.");
            }
        });
    }

    // Get employee list here
    var employeeList = function employeeList() {

        $.ajax({

            url: '/Employees/EmployeeList',
            type: 'Get',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (result, status, xhr) {
                var obj = "";
                $.each(result, function (index, item) {

                    obj += '<tr>';
                    obj += '<td>' + item.id + '</td>';
                    obj += '<td>' + item.name + '</td>';
                    obj += '<td>' + item.email + '</td>';
                    obj += '<td>' + item.phone + '</td>';
                    obj += '<td>' + item.status + '</td>';
                    obj += '<td>' + item.createdOn + '</td>';
                    obj += '<td>';
                    obj += '<a href="#" data-bs-toggle="modal" data-bs-target="#employeeModal" onclick="edit(`' + item.id + '`);" class="btn btn-warning"> Edit </a> &nbsp';
                    obj += '<a href="#" onclick="emp_delete(`' + item.id + '`);" class="btn btn-danger"> Delete </a></td > ';

                    obj += '</tr>';
                });
                $(".employee_table").html(obj);
            },
            error: function () {
                alert("No record found");
            }
        })
    }


   self.init = function () {
        initilization();
        registration();
    }

}