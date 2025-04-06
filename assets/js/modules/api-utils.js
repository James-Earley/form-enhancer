/**
 * Form Enhancer - API Utilities Module
 */
(function($) {
    'use strict';

    // API Utilities
    window.FormEnhancer.apiUtils = {
        // Validate postcode
        validatePostcode: function(formElements) {
            const postcodeField = formElements.postcodeInput;
            const postcode = postcodeField.val().trim();
            
            if (!postcode) return;
            
            window.FormEnhancer.utils.log('search', "Validating postcode:", postcode);
            
            // Clear any existing errors or styling
            window.FormEnhancer.formUtils.clearFormError(postcodeField);
            
            // Format the postcode properly
            const formattedPostcode = window.FormEnhancer.textUtils.formatPostcode(postcode);
            postcodeField.val(formattedPostcode);
            
            // Check basic format first
            if (!window.FormEnhancer.utils.constants.validPostcodePattern.test(formattedPostcode)) {
                window.FormEnhancer.utils.log('error', "Invalid postcode format:", formattedPostcode);
                window.FormEnhancer.formUtils.addFormError(postcodeField, "Please enter a valid UK postcode");
                return false;
            }
            
            // Show loading state
            window.FormEnhancer.formUtils.setLoading(postcodeField, true);
            
            // Fetch from API
            return $.ajax({
                url: `${window.FormEnhancer.config.API_BASE_URL}/${encodeURIComponent(formattedPostcode)}`,
                type: "GET",
                success: function(response) {
                    window.FormEnhancer.formUtils.setLoading(postcodeField, false);
                    
                    if (response.status === 200 && response.result) {
                        const ward = response.result.admin_ward || '';
                        const constituency = response.result.parliamentary_constituency || '';
                        window.FormEnhancer.utils.log('info', "Ward:", ward, "| Constituency:", constituency);
    
                        // Update hidden fields
                        if (formElements.wardField && formElements.wardField.length) {
                            formElements.wardField.val(ward).trigger('change');
                        } else {
                            // Create hidden ward field if it doesn't exist
                            window.FormEnhancer.utils.log('error', "Ward field not found or not accessible");
                            const wardField = $('<input type="hidden" name="item_meta[ward]" class="efe-generated-ward">');
                            formElements.form.append(wardField);
                            wardField.val(ward);
                            formElements.wardField = wardField;
                            window.FormEnhancer.utils.log('success', "Created hidden ward field with value:", ward);
                        }
                        
                        if (formElements.constituencyField && formElements.constituencyField.length) {
                            formElements.constituencyField.val(constituency).trigger('change');
                        } else {
                            // Create hidden constituency field if it doesn't exist
                            window.FormEnhancer.utils.log('error', "Constituency field not found or not accessible");
                            const constituencyField = $('<input type="hidden" name="item_meta[constituency]" class="efe-generated-constituency">');
                            formElements.form.append(constituencyField);
                            constituencyField.val(constituency);
                            formElements.constituencyField = constituencyField;
                            window.FormEnhancer.utils.log('success', "Created hidden constituency field with value:", constituency);
                        }
    
                        // Set tag based on constituency
                        const newTag = (constituency === window.FormEnhancer.config.TARGET_CONSTITUENCY) ? 
                            window.FormEnhancer.config.CONSTITUENT_TAG : window.FormEnhancer.config.NON_CONSTITUENT_TAG;
                        
                        // Try multiple approaches to set the tag
                        if (formElements.tagsField && formElements.tagsField.length > 0) {
                            formElements.tagsField.val(newTag).trigger('change');
                            window.FormEnhancer.utils.log('info', "Tag Applied:", newTag);
                        } 
                        
                        // Visual confirmation
                        window.FormEnhancer.formUtils.setSuccess(postcodeField, "Postcode validated");
                        
                        // Set global properties that Formidable Forms might use
                        window.postcodeWasVerified = true;
                        
                        return true;
                    } else {
                        window.FormEnhancer.utils.log('error', "No constituency returned for postcode.");
                        window.FormEnhancer.formUtils.addFormError(postcodeField, "No data found for this postcode");
                        return false;
                    }
                },
                error: function(xhr, status, error) {
                    window.FormEnhancer.formUtils.setLoading(postcodeField, false);
                    
                    // Handle specific error codes
                    if (xhr.status === 404) {
                        window.FormEnhancer.utils.log('error', "Postcode not found:", formattedPostcode);
                        window.FormEnhancer.formUtils.addFormError(postcodeField, "This postcode was not found");
                    } else {
                        window.FormEnhancer.utils.log('error', "API Error:", error);
                        window.FormEnhancer.formUtils.addFormError(postcodeField, "Error validating postcode");
                    }
                    
                    return false;
                }
            });
        }
    };

})(jQuery);