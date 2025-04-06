/**
 * Form Enhancer - Name Utilities Module
 */
(function($) {
    'use strict';

    // Name handling utilities
    window.FormEnhancer.nameUtils = {
        // Split full name into first and last names
        splitFullName: function(formElements, fullName) {
            if (!fullName) return;
            
            window.FormEnhancer.utils.log('search', "Attempting to split name:", fullName);
            
            // Check if we have the necessary fields
            const hasFirstNameField = formElements.firstNameField && formElements.firstNameField.length > 0;
            const hasLastNameField = formElements.lastNameField && formElements.lastNameField.length > 0;
            
            // If either is missing, attempt to create/find hidden fields for them
            if (!hasFirstNameField || !hasLastNameField) {
                window.FormEnhancer.utils.log('info', "First or last name fields missing - using hidden fields as backup");
                
                // See if hidden fields exist already
                const hiddenFirstName = formElements.form.find('input[type="hidden"][name*="first"], input[type="hidden"][name*="fname"]');
                const hiddenLastName = formElements.form.find('input[type="hidden"][name*="last"], input[type="hidden"][name*="lname"]');
                
                // If we found hidden fields, use them
                if (hiddenFirstName.length) {
                    formElements.firstNameField = hiddenFirstName;
                    window.FormEnhancer.utils.log('success', "Using existing hidden field for first name:", hiddenFirstName.attr('name'));
                } else {
                    // Create hidden field for first name
                    const firstNameField = $('<input type="hidden" name="item_meta[first_name]" class="efe-generated-first-name">');
                    formElements.form.append(firstNameField);
                    formElements.firstNameField = firstNameField;
                    window.FormEnhancer.utils.log('success', "Created hidden field for first name");
                }
                
                if (hiddenLastName.length) {
                    formElements.lastNameField = hiddenLastName;
                    window.FormEnhancer.utils.log('success', "Using existing hidden field for last name:", hiddenLastName.attr('name'));
                } else {
                    // Create hidden field for last name
                    const lastNameField = $('<input type="hidden" name="item_meta[last_name]" class="efe-generated-last-name">');
                    formElements.form.append(lastNameField);
                    formElements.lastNameField = lastNameField;
                    window.FormEnhancer.utils.log('success', "Created hidden field for last name");
                }
            }
            
            // Handle common prefixes
            const prefixes = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof', 'Sir', 'Lord', 'Lady'];
            let nameParts = fullName.trim().split(/\s+/);
            let firstName = '';
            let lastName = '';
            
            // Check if the first part is a prefix
            if (prefixes.some(prefix => prefix.toLowerCase() === nameParts[0].toLowerCase().replace('.', ''))) {
                nameParts.shift(); // Remove the prefix
            }
            
            if (nameParts.length === 1) {
                // Only one name provided, assume it's the first name
                firstName = nameParts[0];
            } else if (nameParts.length === 2) {
                // Simple case: first name and last name
                firstName = nameParts[0];
                lastName = nameParts[1];
            } else if (nameParts.length > 2) {
                // Multiple name parts, assume the last part is the last name
                // and everything else is the first name
                lastName = nameParts.pop();
                firstName = nameParts.join(' ');
            }
            
            // Force Proper Case for names
            firstName = window.FormEnhancer.textUtils.toProperCase(firstName);
            lastName = window.FormEnhancer.textUtils.toProperCase(lastName);
            
            window.FormEnhancer.utils.log('info', `Name split: "${fullName}" → First: "${firstName}", Last: "${lastName}"`);
            
            // Force update the fields regardless of current values
            if (hasFirstNameField) {
                window.FormEnhancer.utils.log('success', "Setting first name field to:", firstName);
                formElements.firstNameField.val(firstName).trigger('change');
            }
            
            if (hasLastNameField) {
                window.FormEnhancer.utils.log('success', "Setting last name field to:", lastName);
                formElements.lastNameField.val(lastName).trigger('change');
            }
        }
    };

})(jQuery);