$(document).ready(function () {
    $('#fields-table').DataTable({
        destroy: true,
        processing: true,
        //serverSide: true,
        order: [[0, "desc"]],
        ajax: '/admin/fields',
        columns: [
            { data: 'id', name: 'id' },
            { data: 'name', name: 'name' },
            { data: 'type', name: 'type' },
            { data: 'label', name: 'label' },
            { data: 'description', name: 'description' },
            { data: 'actions', name: 'actions', orderable: false, searchable: false }
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/fr-FR.json' // Traduction en français
        }
    });

    // Gestion de la suppression (exemple)
    $('#fields-table').on('click', 'a[data-method="delete"]', function (e) {
        e.preventDefault();
        const url = $(this).attr('href');

        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer !'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(url, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(data => {
                        Swal.fire({ // Affichage d'une alerte SweetAlert
                            title: 'Succès!',
                            text: data.message, // Message de succès du serveur
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            $('#fields-table').DataTable().ajax.reload(); // Recharge DataTables
                        });
                    })
                    .catch(error => {
                        console.error("Fetch error:", error); // Log de l'erreur dans la console
                        Swal.fire({ // Affichage d'une alerte SweetAlert pour l'erreur
                            title: 'Erreur!',
                            text: error.error.message || "Une erreur s'est produite lors de la suppression du champ.", // Message d'erreur
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    });
            }
        });
    });
});


/********************************SHOW.EJS************************************ */
$(document).ready(function () {
    $('.delete-field').on('click', function () {
        const fieldId = $(this).data('id');
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer !'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/admin/fields/${fieldId}`, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(data => {
                        Swal.fire({ // Affichage d'une alerte SweetAlert
                            title: 'Succès!',
                            text: data.message, // Message de succès du serveur
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            $('#fields-table').DataTable().ajax.reload(); // Recharge DataTables
                        });
                    })
                    .catch(error => {
                        console.error("Fetch error:", error); // Log de l'erreur dans la console
                        Swal.fire({ // Affichage d'une alerte SweetAlert pour l'erreur
                            title: 'Erreur!',
                            text: error.error.message || "Une erreur s'est produite lors de la suppression du champ.", // Message d'erreur
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    });
            }
        })
    });
});