/**
 * Form Enhancer - Utilities Module
 */
var FormEnhancerUtils = (function($) {
    'use strict';

    return {
        // Constants
        constants: {
            validPostcodePattern: /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i
        },
        
        // Utility function for logging
        log: function(type, ...args) {
            if (!window.FormEnhancer.config.DEBUG) return;
            
            const icons = {
                info: "ℹ️",
                success: "✅",
                warning: "⚠️",
                error: "❌",
                search: "🔎"
            };
            
            const icon = icons[type] || "📝";
            console.log(icon, ...args);
        }
    };

})(jQuery);