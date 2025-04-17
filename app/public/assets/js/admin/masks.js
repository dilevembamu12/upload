// app/public/assets/js/admin/masks.js
$(document).ready(function () {
    // Initialisation de Select2
    $('#available-fields').select2({
        placeholder: 'Sélectionner un champ',
        dropdownParent: $('#addFieldModal') // Important pour le modal
    });

    // Fonction pour générer l'accordéon d'un champ
    function generateFieldAccordion(fieldId) {
        return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${fieldId}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${fieldId}" aria-expanded="true" aria-controls="collapse${fieldId}">
                    Champ : <span id="selectedFieldName${fieldId}"></span>
                </button>
            </h2>
            <div id="collapse${fieldId}" class="accordion-collapse collapse show" aria-labelledby="heading${fieldId}" data-bs-parent="#fields-container">
                <div class="accordion-body">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab-${fieldId}" role="tablist">
                            <button class="nav-link active" id="nav-general-tab-${fieldId}" data-bs-toggle="tab" data-bs-target="#nav-general-${fieldId}" type="button" role="tab" aria-controls="nav-general" aria-selected="true">Général</button>
                            <button class="nav-link" id="nav-validation-tab-${fieldId}" data-bs-toggle="tab" data-bs-target="#nav-validation-${fieldId}" type="button" role="tab" aria-controls="nav-validation" aria-selected="false">Validation</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent-${fieldId}">
                        <div class="tab-pane fade show active" id="nav-general-${fieldId}" role="tabpanel" aria-labelledby="nav-general-tab-${fieldId}">
                            <div class="mt-3">
                                <div class="mb-3">
                                    <label for="default-value-${fieldId}" class="form-label">Valeur par défaut</label>
                                    <input type="text" class="form-control" id="default-value-${fieldId}" name="fields[${fieldId}][defaultValue]">
                                </div>
                                <div class="mb-3">
                                    <label for="instructions-${fieldId}" class="form-label">Instructions</label>
                                    <textarea class="form-control" id="instructions-${fieldId}" name="fields[${fieldId}][instructions]"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="placeholder-${fieldId}" class="form-label">Placeholder</label>
                                    <input type="text" class="form-control" id="placeholder-${fieldId}" name="fields[${fieldId}][placeholder]">
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="nav-validation-${fieldId}" role="tabpanel" aria-labelledby="nav-validation-tab-${fieldId}">
                            <div class="mt-3">
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="required-${fieldId}" name="fields[${fieldId}][required]">
                                    <label class="form-check-label" for="required-${fieldId}">Champ obligatoire</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }

    // Ajouter un champ
    $('#add-field-button').on('click', function () {
        // Remplir la liste des champs disponibles
        let availableFieldsHTML = '<div class="list-group">';
        fields.forEach(field => {
            availableFieldsHTML += `<a href="#" class="list-group-item list-group-item-action available-field" data-field-id="${field.id}" data-field-name="${field.name}" data-field-label="${field.label}">${field.label}</a>`;
        });
        availableFieldsHTML += '</div>';

        // Afficher le modal avec la liste des champs
        Swal.fire({
            title: 'Sélectionner un champ',
            html: availableFieldsHTML,
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Ajouter',
            showConfirmButton: false, // On gérera le bouton nous-même
            didOpen: () => {
                // Gestionnaire de clic sur un champ
                $('.available-field').on('click', function (e) {
                    e.preventDefault();
                    const fieldId = $(this).data('field-id');
                    const fieldName = $(this).data('field-name');
                    const fieldLabel = $(this).data('field-label');

                    // Créer l'accordéon du champ
                    const accordionHTML = generateFieldAccordion(fieldId);
                    $('#fields-container').append(accordionHTML);

                    // Mettre à jour le nom du champ sélectionné dans l'accordéon
                    $(`#selectedFieldName${fieldId}`).text(fieldLabel);

                    // Fermer le modal
                    Swal.close();
                });
            }
        });
    });

    // Gestion de la soumission du formulaire
    $('#create-mask-form').submit(function (e) {
        e.preventDefault();
        // TODO: Récupérer et envoyer les données du formulaire
    });
});