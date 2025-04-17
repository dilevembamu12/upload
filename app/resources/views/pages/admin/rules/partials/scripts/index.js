$(document).ready(function () {
  $('#rules-table').DataTable({
      processing: true,
      serverSide: true,
      order: [[0, "desc"]],
      ajax: '/admin/rules',
      columns: [
          { data: 'id', name: 'id' },
          { data: 'name', name: 'name' },
          { data: 'type', name: 'type' },
          { data: 'description', name: 'description' },
          { data: 'is_active', name: 'is_active',
            render: function(data, type, row) {
              return data ? 'Oui' : 'Non';
            }
          },
          { data: 'actions', name: 'actions', orderable: false, searchable: false }
      ],
      language: {
          url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/fr-FR.json'
      }
  });

  $('#rules-table').on('click', 'a[data-method="delete"]', function (e) {
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
                  Swal.fire(
                      'Supprimé !',
                      'La règle a été supprimée.',
                      'success'
                  ).then(() => {
                      $('#rules-table').DataTable().ajax.reload();
                  });
              })
              .catch(error => {
                  Swal.fire(
                      'Erreur !',
                      'Une erreur est survenue lors de la suppression de la règle.',
                      'error'
                  );
              });
          }
      });
  });
});



$(document).ready(function () {
  $('#edit-rule-form').submit(function (e) {
      e.preventDefault();
      const ruleId = $(this).data('id');
      const formData = $(this).serialize();

      fetch(`/admin/rules/${ruleId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData
      })
      .then(response => {
          if (!response.ok) {
              return response.json().then(err => { throw err; });
          }
          return response.json();
      })
      .then(data => {
          Swal.fire(
              'Succès!',
              'La règle a été modifiée avec succès.',
              'success'
          ).then(() => {
              window.location.href = '/admin/rules';
          });
      })
      .catch(error => {
          console.error("Fetch error:", error);
          Swal.fire(
              'Erreur!',
              error.message || 'Une erreur est survenue lors de la modification de la règle.',
              'error'
          );
      });
  });
});


$('.delete-rule').on('click', function() {
  const ruleId = $(this).data('id');
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
      fetch(`/admin/rules/${ruleId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          Swal.fire(
            'Supprimé !',
            'Le champ a été supprimé.',
            'success'
          ).then(() => {
            window.location.href = '/admin/rules';
          });
        } else {
          Swal.fire(
            'Erreur !',
            'Une erreur est survenue lors de la suppression du champ.',
            'error'
          );
        }
      });
    }
  })
});