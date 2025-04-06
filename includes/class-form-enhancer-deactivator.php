<?php
/**
 * Fired during plugin deactivation
 *
 * @link       https://github.com/james-earley/form-enhancer
 * @since      2.1.8
 *
 * @package    FormEnhancer
 * @subpackage FormEnhancer/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      2.1.8
 * @package    FormEnhancer
 * @subpackage FormEnhancer/includes
 * @author     James & Dan
 */
class Form_Enhancer_Deactivator {

    /**
     * Deactivate the plugin.
     *
     * @since    2.1.8
     */
    public static function deactivate() {
        // Currently, we don't need to do anything on deactivation
        // We keep settings in the database in case the plugin is reactivated
        
        // If you want to clean up settings on deactivation, uncomment this line:
        // delete_option('form_enhancer_settings');
    }
}