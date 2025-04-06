<?php
/**
 * Fired during plugin activation
 *
 * @link       https://github.com/james.earley/form-enhancer
 * @since      2.1.8
 *
 * @package    FormEnhancer
 * @subpackage FormEnhancer/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      2.1.8
 * @package    FormEnhancer
 * @subpackage FormEnhancer/includes
 * @author     James & Dan
 */
class Form_Enhancer_Activator {

    /**
     * Activate the plugin.
     *
     * Creates necessary directories and default files during activation.
     *
     * @since    2.1.8
     */
    public static function activate() {
        // Create assets directory if it doesn't exist
        $assets_dir = FORM_ENHANCER_PLUGIN_DIR . 'assets';
        if (!file_exists($assets_dir)) {
            wp_mkdir_p($assets_dir);
        }
        
        // Create CSS directory if it doesn't exist
        $css_dir = $assets_dir . '/css';
        if (!file_exists($css_dir)) {
            wp_mkdir_p($css_dir);
        }
        
        // Create JS directory if it doesn't exist
        $js_dir = $assets_dir . '/js';
        if (!file_exists($js_dir)) {
            wp_mkdir_p($js_dir);
        }
        
        // Create CSS file if it doesn't exist
        $css_file = $css_dir . '/postcode-validator.css';
        if (!file_exists($css_file)) {
            $css_content = self::get_default_css();
            file_put_contents($css_file, $css_content);
        }
        
        // Create JS file if it doesn't exist
        $js_file = $js_dir . '/postcode-validator.js';
        if (!file_exists($js_file)) {
            $js_content = self::get_default_js();
            file_put_contents($js_file, $js_content);
        }
        
        // Set default plugin options
        if (!get_option('form_enhancer_settings')) {
            $default_options = array(
                'target_constituency' => 'Finchley and Golders Green',
                'constituent_tag' => 'Constituent',
                'non_constituent_tag' => 'Not Constituent',
                'debug' => '1'
            );
            
            update_option('form_enhancer_settings', $default_options);
        }
    }
    
    /**
     * Get default CSS content.
     *
     * @return string Default CSS content for the plugin.
     */
    private static function get_default_css() {
        return <<<CSS
/**
 * Form Enhancer - Styles
 */

/* Validation message styles */
.efe-validation-message {
    margin-top: 5px;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 14px;
    display: none;
}

.efe-validation-message.error {
    background-color: #ffe6e6;
    color: #d32f2f;
    border-left: 3px solid #d32f2f;
    display: block;
}

.efe-validation-message.success {
    background-color: #e8f5e9;
    color: #2e7d32;
    border-left: 3px solid #2e7d32;
    display: block;
}

.efe-validation-message.loading {
    background-color: #e3f2fd;
    color: #1976d2;
    border-left: 3px solid #1976d2;
    display: block;
}

/* Ensure containers are positioned correctly */
.frm_form_field {
    position: relative !important;
}

.efe-field-container {
    position: relative !important;
}
CSS;
    }
    
    /**
     * Get default JS content.
     *
     * @return string Default JavaScript content for the plugin.
     */
    private static function get_default_js() {
        return <<<JS
/**
 * Form Enhancer - Main JavaScript
 * Basic initialization - will be replaced by full implementation
 */
jQuery(document).ready(function($) {
    console.log("✅ Form Enhancer Loaded");
});
JS;
    }
}