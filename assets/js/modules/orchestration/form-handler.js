/**
 * Form Enhancer - Form Handler Module
 * This is the main orchestration module that coordinates the form enhancement process
 */
(function($) {
    'use strict';

    // Form Handler - main orchestration module
    window.FormEnhancer.formHandler = {
        // Initialize a form
        initializeForm: function(formContainer) {
            window.FormEnhancer.utils.log('info', "Initializing form:", formContainer.attr('id') || 'unnamed form');
            
            // If it's a div and not a form, try to find the form inside
            if (!formContainer.is('form') && formContainer.find('form').length) {
                formContainer = formContainer.find('form').first();
                window.FormEnhancer.utils.log('info', "Found form inside container:", formContainer.attr('id') || formContainer.attr('name') || 'unnamed form');
            }
            
            // Find form elements
            const formElements = window.FormEnhancer.elementFinder.initializeElements(formContainer);
            
            if (!formElements) {
                window.FormEnhancer.utils.log('error', "Failed to initialize form - missing critical elements");
                return;
            }
            
            // Log what elements we've detected
            this.logDetectedElements(formElements);
            
            // Bind all events
            window.FormEnhancer.eventHandlers.bindEvents(formElements);
            
            // Process any existing values (for forms with pre-filled values)
            this.processExistingValues(formElements);
            
            window.FormEnhancer.utils.log('success', "Form initialization complete");
        },
        
        // Log detected form elements for debugging
        logDetectedElements: function(formElements) {
            window.FormEnhancer.utils.log('info', "Form elements detected:");
            for (const key in formElements) {
                if (formElements[key] && formElements[key].length) {
                    window.FormEnhancer.utils.log('info', `- ${key}: ${formElements[key].attr('id') || formElements[key].attr('name') || 'unnamed'}`);
                }
            }
        },
        
        // Process any existing values in the form
        processExistingValues: function(formElements) {
            // Process existing name field value
            if (formElements.nameField && formElements.nameField.length && formElements.nameField.val().trim()) {
                window.FormEnhancer.nameUtils.splitFullName(formElements, formElements.nameField.val().trim());
            }
            
            // Process existing postcode field value
            if (formElements.postcodeInput && formElements.postcodeInput.length && formElements.postcodeInput.val().trim()) {
                const postcodeValue = formElements.postcodeInput.val().trim();
                const formattedPostcode = window.FormEnhancer.textUtils.formatPostcode(postcodeValue);
                formElements.postcodeInput.val(formattedPostcode);
                
                // Only validate with API if properly formatted
                if (window.FormEnhancer.utils.constants.validPostcodePattern.test(formattedPostcode)) {
                    window.FormEnhancer.apiUtils.validatePostcode(formElements);
                }
            }
        }
    };

})(jQuery);