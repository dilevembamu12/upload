function showLoading(disable_submit_btn = null, title = "Paientez...", message = "Opération encours de traitement") {
    if (disable_submit_btn) $(disable_submit_btn).find(":submit").attr('disabled', 'disabled');
    Swal.fire({
        title: title,
        html: message,
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });
}
function hideLoading(disable_submit_btn = null) {

    Swal.close();

    setTimeout(() => {
        if (disable_submit_btn) $(disable_submit_btn).find(":submit").first().removeAttr('disabled');
    }, 500);


}

function showSwal(success = false, message, url = null, title) {//succed
    const state = (success) ? "success" : "error";
    var title = (!title) ? (success) ? " Reussi" : "Oops!" : title;


    Swal.fire(title, message || "...", state, true).then(
        okay => {
            if (okay) {
                //console.log("aaaaaaaaaaaaa")
                if (url) setTimeout(function () { window.location = url; }, 100);
            }
        }

    );
}



//les boutons d'actions
var table = $('#myTable').DataTable();
$('.datatable').on('click', 'li a', function (e) {
    /*
    const url = $(e.target).attr('href');
    const target = $(e.target).attr('target');

    //alert(url);
    if (target != "ext") {
        deleteRow(url, $(this).closest('tr'), $('#myTable').DataTable());
        return false;
    }
    */



    //table.row(1).remove().draw();
    //$('#myTable').DataTable().clear().draw();

    //$("tr").eq(1).remove();
    /*
    var row = table.find('tr').eq(3);
    table.fnDeleteRow(row[0]);
    */

    /*
    var removingRow = $(this).closest('tr');
    table.row(removingRow).remove().draw();
    //$('#myTable').DataTable().row(this).remove().draw();
    //alert($(this).html())
    console.log('clicked: ' + table.row($(e.target)))
    //table.row.add(dialogTable.rows({ selected: true}).data() ).draw();
    */
});

function deleteRow(url, row, databale, message = "**Cette opération est irreversible!", title = "**Etes vous sûr?") {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };
    Swal.fire({
        title: title,
        text: message,
        type: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprime ca!",
        confirmButtonClass: "btn btn-primary",
        cancelButtonClass: "btn btn-danger ml-1",
        buttonsStyling: !1,
    }).then(function (response) {
        if (response.value) {
            var status=response.ok;
            return fetch(url, requestOptions)
                .then(response => {
                    status = response.status
                    return response.json()
                })
                .then(function (response) {
                    if (!status) throw (showSwal(false, response.error.details));

                    row.remove();
                    databale.clear().draw();
                    console.log("aaaa", response)
                    showSwal(true, response.message)
                    //return response.json();
                })
                .catch(function (error) {
                    showSwal(false, error.message);
                });
        }

    });


    /*
    Swal.fire({
        title: "LANG.sure",
        text: "LANG.confirm_delete_brand",
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    }).then(willDelete => {
        if (willDelete) {
            var href = $(this).data('href');
            var data = $(this).serialize();

            $.ajax({
                method: 'DELETE',
                url: href,
                dataType: 'json',
                data: data,
                success: function(result) {
                    if (result.success == true) {
                        toastr.success(result.msg);
                        brands_table.ajax.reload();
                    } else {
                        toastr.error(result.msg);
                    }
                },
            });
        }
    });
    */
}










//intercept action buttons
/*
$(document).on('click', '.btn-actions li a', function(e) {
    const url=$(e.target).attr('href');
    const target=$(e.target).attr('target');

    if(target!="ext"){
        deleteForm(url)
        return false;
    }
    //alert(url+"  <==>  "+ target);

    //$(e.target).attr('href', $(e.target).attr('href')+seed);
});
*/
//btn-actions

/*

*/

/*
$('#myTable').on('click', 'tr', function () {
    //var id = table.row(this).id();
    //table.row(this).remove().draw();

    var rowData = contactsTable.rows({selected : true}).data();
    alert(rowData);
 
    //alert('Clicked row id ' + id);
});
*/
/*
$('#example').DataTable( {
    "oLanguage":
    {
      "oPaginate":
      {
        "sPrevious": "Page précédente",
        "sNext": "Page suivante",
      }
    }
  } );
   */