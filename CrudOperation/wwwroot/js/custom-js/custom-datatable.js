//creating custom dataTable
var dataTable = function () {


    var table = $('#example').DataTable({
        lengthChange: false,
        buttons: [
            //{
            //    extend: 'copyHtml5',
            //    exportOptions: {
            //        columns: [0, ':visible'],
            //        title: ' '
            //    }
            //},
            {
                extend: 'excelHtml5',
                title: '',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]

                }
            },
            {
                extend: 'pdfHtml5',
                title: '',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]

                }
            },
            'colvis'
        ]
    });

    table.buttons().container()
        .appendTo('#example_wrapper .col-md-6:eq(0)');


}