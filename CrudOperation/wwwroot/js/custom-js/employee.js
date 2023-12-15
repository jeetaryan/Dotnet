
var crudOperation = function () {

    var self = this;
    //Mandatory function to be implemented here 
    var initilization = function () {


    }
    var registration = function () {
        $(document).on("click", "#btnSave", PostEmployee);
        $(document).on("click", "#btnEdit", EditEmployee);
        $(document).on("click", "#btnUpdate", UpdateEmployee);
        $(document).on("click", "#btnDelete", DeleteEmployee);
    }


    // All user defined function will be implemented here

    //cretaing add employee function
    var PostEmployee = function () {
        try {
            var toast = document.querySelector(".toast");
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')
            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                        form.classList.add('was-validated')
                    }
                    else {
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
                                console.log(result);
                                $("#notification_msg").innerHTML = result;
                                document.getElementsByClassName(".toast").show();
                                //window.location.href = "/Employees/Index";
                            },
                            error: function () {
                                alert("Could not created new record.");
                            }
                        });
                    }
                });
        }
        catch (err) {
            console.log("Error: ",err);
        }
    }


    //creating get employee function
    var GetEmployee = function () {
        alert("get employee list");
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

    //creating edit employee function
    var EditEmployee = function () {

        //calling bootstrap modal
        $("#myModal").modal('show');

        try {
            //getting the id from data attribute of button prop
            var id = $(this).closest("tr").find("#btnEdit").attr("data");
            $.ajax({
                url: '/Employees/EditEmployee?id=' + id,
                type: 'Get',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    $("#emp_id").val(result.id);
                    $("#name").val(result.name);
                    $("#email").val(result.email);
                    $("#phone").val(result.phone);
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
        catch (err) {
            console.log("Error: ", err);
        }
    }

    //creating update employee function
    var UpdateEmployee = function () {
        try {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                        form.classList.add('was-validated')
                    }
                    else {
                        var objValue = {
                            Id: $("#emp_id").val(),
                            Name: $("#name").val(),
                            Email: $("#email").val(),
                            Phone: $("#phone").val(),
                            Status: 'Active'
                        }
                        $.ajax({
                            url: CrudUrls.UpdateEmployee,
                            type: 'Put',
                            dataType: 'json',
                            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                            data: objValue,
                            success: function (result) {
                                console.log(result);
                                window.location.href = "/Employees/Index";
                            },
                            error: function () {
                                alert("Could not updated record.");
                            }
                        });
                    }
                })
        }
        catch (err) {
            console.log("Error:", err);
        }
    }
    //creating delete employee function
    var DeleteEmployee = function () {

        //getting the id from data attribute of button prop
        var id = $(this).closest("tr").find("#btnDelete").attr("data");
        try {
            $.ajax({
                url: '/Employees/EmployeeDelete?id=' + id,
                type: 'Delete',
                dataType: 'Json',
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    console.log(result);
                    window.location.href = "/Employees/Index";

                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
        catch (err) {
            console.log("Error:", err);
        }
    }



    self.init = function () {
        initilization();
        registration();
    }
}

