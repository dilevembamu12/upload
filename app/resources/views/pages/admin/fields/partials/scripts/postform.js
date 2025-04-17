$(document).ready(function () {
    $('#create-field-form').submit(function (e) {
        e.preventDefault();
        const formData = $(this).serialize(); // Sérialisation des données du formulaire
        const form = $(this); // Stockage de l'objet formulaire pour une utilisation ultérieure

        fetch('/admin/fields', { // URL de la route pour créer un champ
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // En-tête pour les données de formulaire
            },
            body: formData // Corps de la requête avec les données sérialisées
        })
            .then(response => {
                if (!response.ok) { // Vérification si la réponse est OK
                    return response.json().then(err => { throw err; }); // Extraction de l'erreur JSON
                }
                return response.json(); // Conversion de la réponse en JSON
            })
            .then(data => {
                Swal.fire({ // Affichage d'une alerte SweetAlert
                    title: 'Succès!',
                    text: data.message, // Message de succès du serveur
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = '/admin/fields'; // Redirection vers la liste des champs
                });
            })
            .catch(error => {
                console.error("Fetch error:", error); // Log de l'erreur dans la console
                Swal.fire({ // Affichage d'une alerte SweetAlert pour l'erreur
                    title: 'Erreur!',
                    text: error.error.message || "Une erreur s'est produite lors de la création du champ.", // Message d'erreur
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    });


    $('#edit-field-form').submit(function (e) {
        e.preventDefault();
        const fieldId = $(this).data('id');
        const formData = $(this).serialize();

        fetch(`/admin/fields/${fieldId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) { // Vérification si la réponse est OK
                    return response.json().then(err => { throw err; }); // Extraction de l'erreur JSON
                }
                return response.json(); // Conversion de la réponse en JSON
            })
            .then(data => {
                Swal.fire({ // Affichage d'une alerte SweetAlert
                    title: 'Succès!',
                    text: data.message, // Message de succès du serveur
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = '/admin/fields'; // Redirection vers la liste des champs
                });
            })
            .catch(error => {
                console.error("Fetch error:", error); // Log de l'erreur dans la console
                Swal.fire({ // Affichage d'une alerte SweetAlert pour l'erreur
                    title: 'Erreur!',
                    text: error.error.message || "Une erreur s'est produite lors de la création du champ.", // Message d'erreur
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    });
});