/**
 * Form Enhancer - Main JavaScript
 */
(function($) {
    'use strict';

    // Main FormEnhancer object
    const FormEnhancer = {
        // Configuration loaded from WordPress
        config: {
            API_BASE_URL: 'https://api.postcodes.io/postcodes',
            TARGET_CONSTITUENCY: '',
            CONSTITUENT_TAG: '',
            NON_CONSTITUENT_TAG: '',
            DEBUG: false
        },
        
        // Initialize the plugin
        init: function() {
            // Load settings from the global variable set by wp_localize_script
            if (typeof EFE_CONFIG !== 'undefined') {
                this.config.TARGET_CONSTITUENCY = EFE_CONFIG.target_constituency || "Finchley and Golders Green";
                this.config.CONSTITUENT_TAG = EFE_CONFIG.constituent_tag || 'Constituent';
                this.config.NON_CONSTITUENT_TAG = EFE_CONFIG.non_constituent_tag || 'Not Constituent';
                this.config.DEBUG = EFE_CONFIG.debug === "1";
            }
            
            this.utils.log('info', "Form Enhancer initializing with config:", this.config);
            
            // Find all Formidable Forms on the page
            $('.frm_forms, .frm-show-form, form.frm_pro_form').each(function() {
                FormEnhancer.formHandler.initializeForm($(this));
            });
            
            // Handle dynamically loaded forms
            $(document).on('frmFormComplete frm_ajax_complete', function(event, form) {
                FormEnhancer.utils.log('info', "New form loaded via AJAX, initializing...");
                FormEnhancer.formHandler.initializeForm($(form));
            });
            
            this.utils.log('success', "Form Enhancer initialized successfully!");
        }
    };

    // Load utility modules
    $.getScript(form_enhancer_urls.modules + '/utils.js', function() {
        FormEnhancer.utils = FormEnhancerUtils;
        
        // Load other modules after utilities are loaded
        $.when(
            $.getScript(form_enhancer_urls.modules + '/selectors.js'),
            $.getScript(form_enhancer_urls.modules + '/text-utils.js'),
            $.getScript(form_enhancer_urls.modules + '/form-utils.js'),
            $.getScript(form_enhancer_urls.modules + '/name-utils.js'),
            $.getScript(form_enhancer_urls.modules + '/api-utils.js')
        ).done(function() {
            // Load form-related modules that depend on the base modules
            $.when(
                $.getScript(form_enhancer_urls.modules + '/element-finder.js'),
                $.getScript(form_enhancer_urls.modules + '/form-validator.js'),
                $.getScript(form_enhancer_urls.modules + '/event-handlers.js')
            ).done(function() {
                // Finally, load the form handler orchestration module
                $.getScript(form_enhancer_urls.modules + '/form-handler.js', function() {
                    // Initialize the plugin when all modules are loaded
                    FormEnhancer.init();
                });
            });
        });
    });

    // Make FormEnhancer globally accessible
    window.FormEnhancer = FormEnhancer;

})(jQuery);