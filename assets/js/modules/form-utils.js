/**
 * Form Enhancer - Form Utilities Module
 */
(function($) {
    'use strict';

    // Form Validation Utilities
    window.FormEnhancer.formUtils = {
        // Add form error message and styling
        addFormError: function(field, message) {
            // Find the form field container
            const container = field.closest('.frm_form_field, .form-field, .form-group');
            
            // If can't find container, create a simple wrapper
            if (!container.length) {
                if (!field.next('.efe-validation-message').length) {
                    field.wrap('<div class="efe-field-container"></div>');
                }
            }
            
            // Remove existing errors
            this.clearFormError(field);
            
            // Create error message container if it doesn't exist
            if (!field.next('.efe-validation-message').length) {
                $('<div class="efe-validation-message"></div>').insertAfter(field);
            }
            
            // Add error message and styling
            field.next('.efe-validation-message')
                .text(message)
                .addClass('error')
                .show();
                
            // Visual indication
            field.addClass('efe-error');
            
            return false; // For chaining
        },
        
        // Clear form errors
        clearFormError: function(field) {
            field.removeClass('efe-error efe-validated efe-loading');
            
            // Remove error message
            const errorMsg = field.next('.efe-validation-message');
            if (errorMsg.length) {
                errorMsg.removeClass('error success loading').hide();
            }
            
            return true; // For chaining
        },
        
        // Set loading state
        setLoading: function(field, isLoading) {
            if (isLoading) {
                field.addClass('efe-loading');
                
                // Show loading message if it exists
                const msgElement = field.next('.efe-validation-message');
                if (msgElement.length) {
                    msgElement.removeClass('error success')
                        .addClass('loading')
                        .text('Validating...')
                        .show();
                }
            } else {
                field.removeClass('efe-loading');
            }
        },
        
        // Set success state
        setSuccess: function(field, message) {
            field.removeClass('efe-error efe-loading').addClass('efe-validated');
            
            // Show success message if it exists
            const msgElement = field.next('.efe-validation-message');
            if (msgElement.length && message) {
                msgElement.removeClass('error loading')
                    .addClass('success')
                    .text(message)
                    .show();
                    
                // Auto-hide success message after 3 seconds
                setTimeout(() => {
                    msgElement.fadeOut(300);
                }, 3000);
            }
        }
    };

})(jQuery);