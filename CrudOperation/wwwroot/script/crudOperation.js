var crudOperation = function () {

    var self = this;
    //Mandatory function to be implemented here 
    var initilization = function () {
        GetEmployee();
        alert("post employee");


    }
    var registration = function () {
        $(document).on("click", "#btnSave", PostEmployee);
        $(document).on("click", "#btnEdit", EditEmployee);
        $(document).on("click", "#btnDelete", DeleteEmployee);
    }

    // All user defined function will be implemented here
    var PostEmployee = function () {
        var objValue = {
            Name: $("#name").val(),
            Email: $("#email").val(),
            Phone: $("#phone").val(),
            Status: 'Active'
        }
        $.ajax({
            url: CrudUrls.EmployeeAdd,
            type: 'Post',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: objValue,
            success: function (result) {
                debugger
                console.log(result);
                var a = GetEmployee();
                console.log(a);
                //window.location.href = "/Employees/GetEmployee";
            },
            error: function () {
                alert("Could not created new record.");
            }
        });
    }

    var GetEmployee = function () {

        $.ajax({
            url: CrudUrls.GetEmployeeList,
            type: 'Get',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (result, status, xhr) {
                console.log(result);
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
                    obj += '<a href="#" data-bs-toggle="modal" data-bs-target="#employeeModal" class="btn btn-warning" id="btnEdit"> Edit </a> &nbsp';
                    obj += '<a href="#" class="btn btn-danger" id="btnDelete"> Delete </a></td > ';
                    obj += '</tr>';
                });

                $("#EmployeeData").html(obj);
                //$('#EmployeeData').DataTable({
                //    responsive: true
                //});
            },
            error: function () {
                alert("No record found");
            },
            complete: function () {
                console.log("Request completed");
                //window.location.href = "/Employees/GetEmployee";
            }
        })
    }

    var EditEmployee = function () {
        console.log("Hello Edit...");
    }

    var DeleteEmployee = function () {
        console.log("Hello Delete");
    }

    self.init = function () {
        initilization();
        registration();
    }

}