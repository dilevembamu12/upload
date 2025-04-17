// app/resources/views/pages/admin/masks/partials/scripts/postform.js
$(document).ready(function () {
    // Initialisation de Select2
    $('#available-fields').select2({
        placeholder: 'Sélectionner un champ',
        dropdownParent: $('#addFieldModal') // Important pour le modal
    });

    let availableFieldsHTML = '<div class="list-group">'; // Déplacer la déclaration ici
    fields.forEach(field => {
        availableFieldsHTML += `<a href="#" class="list-group-item list-group-item-action available-field" data-field-id="${field.id}" data-field-name="${field.name}" data-field-label="${field.label}" data-field-type="${field.type}">${field.label}</a>`;
    });
    availableFieldsHTML += '</div>';

    // Fonction pour générer l'accordéon d'un champ
    function generateFieldAccordion(fieldId, fieldName, fieldLabel, fieldType) {
        let accordionContent = `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${fieldId}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${fieldId}" aria-expanded="true" aria-controls="collapse${fieldId}">
                    Champ : <span id="selectedFieldName${fieldId}">${fieldLabel} (${fieldName})</span>
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
                                <hr class="text-muted">

                                <h5>Règles d'application</h5>
                                 <div id="simple-rules-container-${fieldId}">
                                    <!-- Les règles simples seront ajoutées ici -->
                                  </div>
                                   <button type="button" class="btn btn-sm btn-primary add-simple-rule-button" data-field-id="${fieldId}">Ajouter une règle simple</button>

                                <div id="rule-groups-container-${fieldId}">
                                  <!-- Les groupes de règles seront ajoutés ici -->
                                </div>
                                   <button type="button" class="btn btn-sm btn-primary add-rule-group-button" data-field-id="${fieldId}">Ajouter un groupe de règles</button>
                            </div>
                        </div>
                    </div>`;

        // Ajouter le bouton "Ajouter un élément" si le champ est de type "group"
        if (fieldType === 'group') {
            accordionContent += `
                <button type="button" class="btn btn-sm btn-primary add-element-button" data-field-id="${fieldId}">Ajouter un élément</button>
                <div id="group-elements-${fieldId}">
                    <!-- Les éléments du groupe seront ajoutés ici -->
                </div>
            `;
        }

        accordionContent += `
                </div>
            </div>
        </div>`;

        return accordionContent;
    }
     // Fonction pour générer le code HTML pour une nouvelle ligne de règle simple
    function generateRuleRow(fieldId, ruleCounter, groupId) {
        return `
            <div class="row mb-2 rule-row" data-rule-id="${ruleCounter}">
                <div class="col-md-4">
                    <label for="rule-${fieldId}-${ruleCounter}" class="form-label">Règle</label>
                    <select class="form-control rule-select" id="rule-${fieldId}-${ruleCounter}" name="fields[${fieldId}][rules][${ruleCounter}][ruleId]" data-field-id="${fieldId}" data-rule-id="${ruleCounter}">
                        ${rules.map(rule => `<option value="${rule.id}">${rule.name}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="response-${fieldId}-${ruleCounter}" class="form-label">Réponse attendue</label>
                    <select class="form-control response-select" id="response-${fieldId}-${ruleCounter}" name="fields[${fieldId}][rules][${ruleCounter}][response]">
                        <option value="true">Vrai</option>
                        <option value="false">Faux</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="operator-${fieldId}-${ruleCounter}" class="form-label">Opérateur</label>
                    <select class="form-control operator-select" id="operator-${fieldId}-${ruleCounter}" name="fields[${fieldId}][rules][${ruleCounter}][operator]">
                        <option value="AND">ET</option>
                        <option value="OR">OU</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="order-${fieldId}-${ruleCounter}" class="form-label">Ordre</label>
                    <input type="number" class="form-control order-input" id="order-${fieldId}-${ruleCounter}" name="fields[${fieldId}][rules][${ruleCounter}][order]" value="1">
                </div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-sm btn-danger remove-rule-button" data-field-id="${fieldId}" data-rule-id="${ruleCounter}">Supprimer</button>
                </div>
            </div>
        `;
    }
    //Fonction pour générer un groupe de regles
     function generateRuleGroup(fieldId, ruleGroupCounter) {
        return `
            <div class="card mb-3 rule-group" data-rule-group-id="${ruleGroupCounter}">
                <div class="card-header">
                    Groupe de conditions ${ruleGroupCounter}
                     <select class="form-control operator-select" id="operator-${fieldId}-${ruleGroupCounter}" name="fields[${fieldId}][ruleGroups][${ruleGroupCounter}][operator]">
                        <option value="AND">ET</option>
                        <option value="OR">OU</option>
                    </select>
                </div>
                <div class="card-body">
                    <div class="rule-group-content" id="rule-group-content-${fieldId}-${ruleGroupCounter}">
                        <!-- Les règles du groupe seront ajoutées ici -->
                    </div>
                    <button type="button" class="btn btn-sm btn-primary add-rule-button" data-field-id="${fieldId}" data-group-id="${ruleGroupCounter}">Ajouter une sous-règle</button>
                </div>
            </div>
        `;
    }
    $('#add-field-button').on('click', function () {

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
                    const fieldType = $(this).data('field-type');
                    // Créer l'accordéon du champ
                    const accordionHTML = generateFieldAccordion(fieldId, fieldName, fieldLabel, fieldType);
                    $('#fields-container').append(accordionHTML);

                    // Mettre à jour le nom du champ sélectionné dans l'accordéon
                    $(`#selectedFieldName${fieldId}`).text(fieldLabel);

                    // Fermer le modal
                    Swal.close();
                });
            }
        });
    });

    let currentGroupId = null;
    let ruleCounter = 0;
      let ruleGroupCounter = 0;
 // Gestion du clic sur le bouton "Ajouter une règle simple"
    $(document).on('click', '.add-simple-rule-button', function () {
        const fieldId = $(this).data('field-id');
        ruleCounter++;

        // Générer le code HTML pour une nouvelle ligne de règle simple
        const ruleRowHTML = generateRuleRow(fieldId, ruleCounter);

        // Ajouter la ligne de règle au conteneur
        $(`#simple-rules-container-${fieldId}`).append(ruleRowHTML);
    });

    // Gestion du clic sur le bouton "Ajouter un groupe de règles"
    $(document).on('click', '.add-rule-group-button', function () {
        const fieldId = $(this).data('field-id');
        ruleGroupCounter++;

        // Générer le code HTML pour un nouveau groupe de règles
        const ruleGroupHTML = generateRuleGroup(fieldId, ruleGroupCounter);

        // Ajouter le groupe de règles au conteneur
        $(`#rule-groups-container-${fieldId}`).append(ruleGroupHTML);
    });

    // Gestion du clic sur le bouton "Supprimer"
    $(document).on('click', '.remove-rule-button', function () {
        $(this).closest('.rule-row').remove();
    });
  //Fonction pour créer la règle dans un group de règle
   $(document).on('click', '.add-rule-button', function () {
         const fieldId = $(this).data('field-id');
         const groupId = $(this).data('group-id');
        ruleCounter++;

        // Générer le code HTML pour une nouvelle ligne de règle simple
        const ruleRowHTML = generateRuleRow(fieldId, ruleCounter);

        // Ajouter la ligne de règle au conteneur
        $(`#rule-group-content-${fieldId}-${groupId}`).append(ruleRowHTML);
    });
   

    // Gestion du clic sur le bouton "Ajouter un élément"
    $(document).on('click', '.add-element-button', function () {
        const groupId = $(this).data('field-id');
        currentGroupId = groupId;
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
                    const fieldType = $(this).data('field-type');
                    // Créer l'accordéon du champ
                    const accordionHTML = generateFieldAccordion(fieldId, fieldName, fieldLabel, fieldType);
                    $(`#group-elements-${groupId}`).append(accordionHTML);

                    // Mettre à jour le nom du champ sélectionné dans l'accordéon
                    $(`#selectedFieldName${fieldId}`).text(fieldLabel);

                    // Fermer le modal
                    Swal.close();
                });
            }
        });
    });

    // Ajouter les champs sélectionnés
    $('#add-selected-fields').on('click', function () {
        const selectedFields = $('#available-fields').select2('data');
        selectedFields.forEach(selected => {
            const fieldId = selected.id;
            let fieldName = '';
            let fieldLabel = '';
            let fieldType = '';

            if (selected.element && selected.element[0] && selected.element[0].dataset) {
                fieldName = selected.element.dataset.name; // Utiliser selected.element.dataset
                fieldLabel = selected.element.dataset.label; // Utiliser selected.element.dataset
                fieldType = selected.element[0].dataset.type; // Récupérer le type du champ
            }

            let fieldHtml = '';

            if (fieldType === 'group') {
                // Si le champ est de type "group", afficher l'accordéon et le bouton "Ajouter un élément"
                fieldHtml = `
                  <div class="card mb-2">
                    <div class="card-body">
                      <h5 class="card-title">${fieldLabel} (Groupe)</h5>
                      <input type="hidden" name="fields[${fieldId}][fieldId]" value="${fieldId}">
                      <button type="button" class="btn btn-sm btn-primary add-element-button" data-field-id="${fieldId}">Ajouter un élément</button>
                      <div id="group-elements-${fieldId}">
                        <!-- Les éléments du groupe seront ajoutés ici -->
                      </div>
                    </div>
                  </div>
                `;
            } else {
                // Si le champ n'est pas de type "group", afficher simplement le champ
                fieldHtml = `
                  <div class="card mb-2">
                    <div class="card-body">
                      <h5 class="card-title">${fieldLabel}</h5>
                      <p class="card-text">Nom: ${fieldName}</p>
                      <input type="hidden" name="fields[${fieldId}][fieldId]" value="${fieldId}">
                    </div>
                  </div>
                `;
            }

            if (currentGroupId) {
                // Ajouter le champ au groupe
                $(`#group-elements-${currentGroupId}`).append(fieldHtml);
            } else {
                // Ajouter le champ à la racine
                $('#fields-container').append(fieldHtml);
            }

        });

        $('#addFieldModal').modal('hide'); // Fermer le modal
        currentGroupId = null;
    });

    // Gestion de la soumission du formulaire
    $('#create-mask-form').submit(function (e) {
        e.preventDefault();
        // TODO: Récupérer et envoyer les données du formulaire
        console.log("Données du formulaire:", $(this).serialize());
    });
});