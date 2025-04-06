/**
 * Form Enhancer - Form Validator Module
 */
(function($) {
    'use strict';

    // Form Validation Utilities
    window.FormEnhancer.formValidator = {
        // Validate form submission
        validateFormSubmission: function(e, formElements) {
            window.FormEnhancer.utils.log('search', "Form submission attempt - validating...");
            let hasError = false;
            
            // First clear all previous errors and reset validation state
            this.clearAllErrors(formElements);
            
            // Validate each field independently
            hasError = this.validateNameField(formElements) || hasError;
            hasError = this.validateEmailField(formElements) || hasError;
            hasError = this.validateGDPRCheckbox(formElements) || hasError;
            
            // Validate postcode field - this may prevent form submission for API validation
            const postcodeValidationResult = this.validatePostcodeField(e, formElements);
            if (postcodeValidationResult === null) {
                // API validation in progress, submission already prevented
                return false;
            } else {
                hasError = postcodeValidationResult || hasError;
            }
            
            // If any validation failed, prevent submission
            if (hasError) {
                e.preventDefault();
                
                // Focus the first field with an error
                formElements.form.find('.efe-error').first().focus();
                
                return false;
            }
            
            window.FormEnhancer.utils.log('success', "Form validation passed");
            return true;
        },
        
        // Clear all form errors
        clearAllErrors: function(formElements) {
            if (formElements.nameField && formElements.nameField.length) {
                window.FormEnhancer.formUtils.clearFormError(formElements.nameField);
            }
            if (formElements.emailField && formElements.emailField.length) {
                window.FormEnhancer.formUtils.clearFormError(formElements.emailField);
            }
            if (formElements.postcodeInput && formElements.postcodeInput.length) {
                window.FormEnhancer.formUtils.clearFormError(formElements.postcodeInput);
            }
        },
        
        // Validate name field
        validateNameField: function(formElements) {
            if (formElements.nameField && formElements.nameField.length) {
                const nameValue = formElements.nameField.val().trim();
                if (!nameValue) {
                    window.FormEnhancer.formUtils.addFormError(formElements.nameField, "Please enter your name");
                    return true; // Has error
                } else {
                    // Split name on final submission
                    window.FormEnhancer.nameUtils.splitFullName(formElements, nameValue);
                    return false; // No error
                }
            }
            return false; // No error (field not present)
        },
        
        // Validate email field
        validateEmailField: function(formElements) {
            if (formElements.emailField && formElements.emailField.length) {
                const emailValue = formElements.emailField.val().trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!emailValue || !emailRegex.test(emailValue)) {
                    window.FormEnhancer.formUtils.addFormError(formElements.emailField, "Please enter a valid email address");
                    return true; // Has error
                }
            }
            return false; // No error
        },
        
        // Validate GDPR checkbox
        validateGDPRCheckbox: function(formElements) {
            const gdprCheckbox = formElements.form.find('input[type="checkbox"][name*="consent"], input[type="checkbox"][name*="gdpr"], input.gdpr-checkbox, input[name*="privacy"]');
            if (gdprCheckbox.length && !gdprCheckbox.is(':checked')) {
                // Add custom error for GDPR
                const checkboxContainer = gdprCheckbox.closest('.frm_form_field, .form-field, .form-group, .field-group');
                if (checkboxContainer.length) {
                    // Create error message if it doesn't exist
                    if (checkboxContainer.find('.efe-validation-message').length === 0) {
                        $('<div class="efe-validation-message error">Please accept the privacy policy</div>').appendTo(checkboxContainer);
                    } else {
                        checkboxContainer.find('.efe-validation-message').text('Please accept the privacy policy').addClass('error').show();
                    }
                } else {
                    // If can't find container, add after the checkbox
                    if (gdprCheckbox.next('.efe-validation-message').length === 0) {
                        $('<div class="efe-validation-message error">Please accept the privacy policy</div>').insertAfter(gdprCheckbox);
                    } else {
                        gdprCheckbox.next('.efe-validation-message').text('Please accept the privacy policy').addClass('error').show();
                    }
                }
                return true; // Has error
            } else if (gdprCheckbox.length) {
                // Clear any GDPR errors
                const checkboxContainer = gdprCheckbox.closest('.frm_form_field, .form-field, .form-group, .field-group');
                if (checkboxContainer.length && checkboxContainer.find('.efe-validation-message').length) {
                    checkboxContainer.find('.efe-validation-message').hide();
                } else if (gdprCheckbox.next('.efe-validation-message').length) {
                    gdprCheckbox.next('.efe-validation-message').hide();
                }
            }
            return false; // No error
        },
        
        // Validate postcode field - returns: true=has error, false=no error, null=async validation in progress
        validatePostcodeField: function(e, formElements) {
            if (formElements.postcodeInput && formElements.postcodeInput.length) {
                const postcodeValue = formElements.postcodeInput.val().trim();
                const formattedPostcode = window.FormEnhancer.textUtils.formatPostcode(postcodeValue);
                
                // Quick format check first
                if (!postcodeValue || !window.FormEnhancer.utils.constants.validPostcodePattern.test(formattedPostcode)) {
                    window.FormEnhancer.formUtils.addFormError(formElements.postcodeInput, "Please enter a valid UK postcode");
                    return true; // Has error
                } 
                // Check if we need validation with API
                else if (!window.postcodeWasVerified) {
                    // Prevent form submission until API validation finishes
                    e.preventDefault();
                    
                    // Validate with API
                    const validation = window.FormEnhancer.apiUtils.validatePostcode(formElements);
                    
                    // Handle completion of API validation
                    if (validation) {
                        validation.done(function(response) {
                            if (response.status === 200 && response.result) {
                                window.FormEnhancer.utils.log('success', "Validation succeeded, submitting form");
                                window.postcodeWasVerified = true;
                                formElements.form.off('submit').submit();
                            } else {
                                window.FormEnhancer.utils.log('error', "Postcode not valid");
                            }
                        }).fail(function() {
                            window.FormEnhancer.utils.log('error', "Postcode validation failed");
                        });
                    }
                    
                    return null; // Async validation in progress
                }
            }
            return false; // No error
        }
    };

})(jQuery);