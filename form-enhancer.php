<?php
/**
 * Form Enhancer – Postcode & Constituency Lookup
 *
 * @package           FormEnhancer
 * @author            James & Dan
 * @copyright         2023
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Form Enhancer – Postcode & Constituency Lookup
 * Plugin URI:        https://github.com/James-Earley/form-enhancer
 * Description:       Enhances Formidable Forms with advanced postcode validation, constituency tagging, name splitting, and more.
 * Version:           2.1.8
 * Author:            James & Dan - The Space Room
 * Text Domain:       form-enhancer
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('FORM_ENHANCER_VERSION', '2.1.8');
define('FORM_ENHANCER_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FORM_ENHANCER_PLUGIN_URL', plugin_dir_url(__FILE__));
define('FORM_ENHANCER_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * Load required files and class autoloading
 */
require_once FORM_ENHANCER_PLUGIN_DIR . 'includes/class-form-enhancer.php';

/**
 * Begin execution of the plugin
 */
function run_form_enhancer() {
    $plugin = new Form_Enhancer();
    $plugin->run();
}

// Activate the plugin
register_activation_hook(__FILE__, 'form_enhancer_activate');
function form_enhancer_activate() {
    // Create necessary directories and files on activation
    require_once FORM_ENHANCER_PLUGIN_DIR . 'includes/class-form-enhancer-activator.php';
    Form_Enhancer_Activator::activate();
}

// Deactivation hook
register_deactivation_hook(__FILE__, 'form_enhancer_deactivate');
function form_enhancer_deactivate() {
    // Clean up if needed on deactivation
    require_once FORM_ENHANCER_PLUGIN_DIR . 'includes/class-form-enhancer-deactivator.php';
    Form_Enhancer_Deactivator::deactivate();
}

// Start the plugin
run_form_enhancer();