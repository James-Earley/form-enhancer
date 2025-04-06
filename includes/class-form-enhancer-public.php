<?php
/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://github.com/james-earley/form-enhancer
 * @since      2.1.8
 *
 * @package    FormEnhancer
 * @subpackage FormEnhancer/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and hooks for the public-facing side of the site.
 *
 * @package    FormEnhancer
 * @subpackage FormEnhancer/public
 * @author     James & Dan
 */
class Form_Enhancer_Public {

    /**
     * The ID of this plugin.
     *
     * @since    2.1.8
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    2.1.8
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * The settings of this plugin.
     *
     * @since    2.1.8
     * @access   private
     * @var      array    $settings    The settings of this plugin.
     */
    private $settings;

    /**
     * Initialize the class and set its properties.
     *
     * @since    2.1.8
     * @param    string    $plugin_name       The name of the plugin.
     * @param    string    $version           The version of this plugin.
     * @param    array     $settings          The settings of this plugin.
     */
    public function __construct($plugin_name, $version, $settings) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->settings = $settings;
    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    2.1.8
     */
    public function enqueue_styles() {
        wp_enqueue_style(
            $this->plugin_name,
            FORM_ENHANCER_PLUGIN_URL . 'assets/css/postcode-validator.css',
            array(),
            $this->version
        );
    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    2.1.8
     */
    public function enqueue_scripts() {
        wp_enqueue_script(
            $this->plugin_name,
            FORM_ENHANCER_PLUGIN_URL . 'assets/js/postcode-validator.js',
            array('jquery'),
            $this->version,
            true
        );
        
        // Localize script with settings
        wp_localize_script(
            $this->plugin_name, 
            'EFE_CONFIG',
            $this->settings
        );
    }
}