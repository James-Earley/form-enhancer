/**
 * Form Enhancer - Element Finder Module
 */
(function($) {
    'use strict';

    // Element finder utilities
    window.FormEnhancer.elementFinder = {
        // Initialize elements object for a form
        initializeElements: function(formContainer) {
            // Define critical and optional elements
            const criticalElements = ['postcodeInput', 'form'];
            const optionalElements = ['wardField', 'constituencyField', 'tagsField', 'nameField', 'firstNameField', 'lastNameField', 'emailField'];
            
            // Reset elements for this form
            const formElements = {};
            let missingCriticalElements = false;
            
            window.FormEnhancer.utils.log('info', "Examining form:", formContainer.attr('id') || 'unnamed form');
            
            // Add extra logging to debug
            if (window.FormEnhancer.config.DEBUG) {
                formContainer.find('input').each(function() {
                    const input = $(this);
                    window.FormEnhancer.utils.log('info', "Found input:", input.attr('id') || input.attr('name') || 'unnamed', 
                        "Type:", input.attr('type') || 'text');
                });
            }
            
            // Find all elements using selectors
            for (const [key, selector] of Object.entries(window.FormEnhancer.selectors)) {
                if (key === 'form') {
                    formElements[key] = formContainer.is('form') ? formContainer : formContainer.find('form');
                } else {
                    formElements[key] = formContainer.find(selector).first();
                }
                
                // Only log errors for missing critical elements
                if (formElements[key].length === 0 && criticalElements.includes(key)) {
                    window.FormEnhancer.utils.log('error', `Required element not found in form: ${key} (${selector})`);
                    missingCriticalElements = true;
                } else if (formElements[key].length === 0) {
                    window.FormEnhancer.utils.log('warning', `Optional element not found in form: ${key} (${selector})`);
                } else {
                    window.FormEnhancer.utils.log('success', `Found ${key}: ${formElements[key].attr('id') || formElements[key].attr('name') || 'unnamed'}`);
                }
            }
            
            // Advanced name field detection
            this.findNameFields(formElements, formContainer);
            
            return missingCriticalElements ? null : formElements;
        },

        // Advanced detection for name fields
        findNameFields: function(formElements, formContainer) {
            // Try harder to find postcode field first (since it's critical)
            if (!formElements.postcodeInput || !formElements.postcodeInput.length) {
                window.FormEnhancer.utils.log('search', "Trying harder to find postcode field...");
                formElements.postcodeInput = formContainer.find('input[name*="postcode"], input[id*="postcode"], input[placeholder*="postcode"], input[placeholder*="Postcode"], input[name*="post_code"], input[name*="post-code"]').first();
                
                if (formElements.postcodeInput.length) {
                    window.FormEnhancer.utils.log('success', "Found postcode field:", formElements.postcodeInput.attr('id') || formElements.postcodeInput.attr('name'));
                }
            }
            
            // Try harder to find first and last name fields
            if (!formElements.firstNameField || !formElements.firstNameField.length) {
                window.FormEnhancer.utils.log('search', "Trying harder to find first name field...");
                formElements.firstNameField = formContainer.find('input[name*="first"], input[id*="first"], input[name*="First"], input[id*="First"]').first();
                
                if (formElements.firstNameField.length) {
                    window.FormEnhancer.utils.log('success', "Found first name field:", formElements.firstNameField.attr('id') || formElements.firstNameField.attr('name'));
                }
            }
            
            if (!formElements.lastNameField || !formElements.lastNameField.length) {
                window.FormEnhancer.utils.log('search', "Trying harder to find last name field...");
                formElements.lastNameField = formContainer.find('input[name*="last"], input[id*="last"], input[name*="Last"], input[id*="Last"], input[name*="surname"], input[id*="surname"]').first();
                
                if (formElements.lastNameField.length) {
                    window.FormEnhancer.utils.log('success', "Found last name field:", formElements.lastNameField.attr('id') || formElements.lastNameField.attr('name'));
                }
            }
            
            // Try to find fields by label text
            formContainer.find('label').each(function() {
                const label = $(this);
                const labelText = label.text().trim().toLowerCase();
                const fieldId = label.attr('for');
                
                if (fieldId) {
                    // Check for postcode field
                    if ((!formElements.postcodeInput || !formElements.postcodeInput.length) && 
                        (labelText.includes('postcode') || labelText.includes('post code'))) {
                        formElements.postcodeInput = formContainer.find('#' + fieldId);
                        window.FormEnhancer.utils.log('success', "Found postcode field via label:", fieldId);
                    }
                    
                    // Check for first name field
                    if ((!formElements.firstNameField || !formElements.firstNameField.length) && (
                        labelText.includes('first name') || 
                        labelText === 'first' || 
                        labelText === 'given name')
                    ) {
                        formElements.firstNameField = formContainer.find('#' + fieldId);
                        window.FormEnhancer.utils.log('success', "Found first name field via label:", fieldId);
                    }
                    
                    // Check for last name field
                    if ((!formElements.lastNameField || !formElements.lastNameField.length) && (
                        labelText.includes('last name') || 
                        labelText === 'last' || 
                        labelText === 'surname') || 
                        labelText === 'family name'
                    ) {
                        formElements.lastNameField = formContainer.find('#' + fieldId);
                        window.FormEnhancer.utils.log('success', "Found last name field via label:", fieldId);
                    }
                }
            });
        }
    };

})(jQuery);