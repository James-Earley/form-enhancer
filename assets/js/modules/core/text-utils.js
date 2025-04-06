/**
 * Form Enhancer - Text Utilities Module
 */
(function($) {
    'use strict';

    // Text formatting utilities
    window.FormEnhancer.textUtils = {
        // Convert text to Proper Case
        toProperCase: function(text) {
            if (!text) return '';
            
            // Handle hyphenated names and names with apostrophes
            return text.replace(/\w\S*/g, function(txt) {
                // Special case for McXxx and MacXxx names
                if (txt.match(/^(mc|mac)/i)) {
                    return txt.charAt(0).toUpperCase() + 
                           txt.substr(1, 2).toLowerCase() + 
                           txt.charAt(3).toUpperCase() + 
                           txt.substr(4).toLowerCase();
                }
                // Handle O'Name format
                if (txt.match(/\w'\w/i)) {
                    const parts = txt.split("'");
                    return parts[0].charAt(0).toUpperCase() + 
                           parts[0].substr(1).toLowerCase() + 
                           "'" + 
                           parts[1].charAt(0).toUpperCase() + 
                           parts[1].substr(1).toLowerCase();
                }
                // Standard case
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        },
        
        // Format UK postcode properly (AA9A 9AA format)
        formatPostcode: function(postcode) {
            // Remove all non-alphanumeric characters
            postcode = postcode.replace(/[^A-Z0-9]/gi, '').toUpperCase();
            
            // Handle different postcode formats
            if (postcode.length > 4) {
                // Insert space before the last 3 characters
                return postcode.slice(0, -3) + ' ' + postcode.slice(-3);
            }
            
            return postcode;
        }
    };

})(jQuery);