$(document).ready(function () {
    $('#create-rule-form').submit(function (e) {
        e.preventDefault();
        const formData = $(this).serialize();

        fetch('/admin/rules', {
            method: 'POST',
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
                'La règle a été créée avec succès.',
                'success'
            ).then(() => {
                window.location.href = '/admin/rules';
            });
        })
        .catch(error => {
            console.error("Fetch error:", error);
            Swal.fire(
                'Erreur!',
                error.message || 'Une erreur est survenue lors de la création de la règle.',
                'error'
            );
        });
    });
});

