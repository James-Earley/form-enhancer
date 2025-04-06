<?php
/**
 * The core plugin class
 *
 * This is the main class that coordinates all plugin functionality.
 *
 * @since      2.1.8
 * @package    FormEnhancer
 * @subpackage FormEnhancer/includes
 */

class Form_Enhancer {

    /**
     * Plugin version
     *
     * @since    2.1.8
     * @access   protected
     * @var      string    $version    The current version of the plugin.
     */
    protected $version;

    /**
     * Plugin name
     *
     * @since    2.1.8
     * @access   protected
     * @var      string    $plugin_name    The name of this plugin.
     */
    protected $plugin_name;

    /**
     * Plugin settings
     *
     * @since    2.1.8
     * @access   protected
     * @var      array    $settings    The settings of this plugin.
     */
    protected $settings;

    /**
     * Default settings
     *
     * @since    2.1.8
     * @access   protected
     * @var      array    $defaults    The default settings for this plugin.
     */
    protected $defaults = array(
        'target_constituency' => 'Finchley and Golders Green',
        'constituent_tag' => 'Constituent',
        'non_constituent_tag' => 'Not Constituent',
        'debug' => '1'
    );

    /**
     * Define the core functionality of the plugin.
     *
     * Set the plugin name and the plugin version that can be used throughout the plugin.
     * Load the dependencies, define the locale, and set the hooks for the admin area and
     * the public-facing side of the site.
     *
     * @since    2.1.8
     */
    public function __construct() {
        $this->version = FORM_ENHANCER_VERSION;
        $this->plugin_name = 'form-enhancer';
        $this->load_settings();
        $this->load_dependencies();
        $this->define_admin_hooks();
        $this->define_public_hooks();
    }

    /**
     * Load plugin settings from database
     *
     * @since    2.1.8
     * @access   private
     */
    private function load_settings() {
        $saved_settings = get_option('form_enhancer_settings', array());
        $this->settings = wp_parse_args($saved_settings, $this->defaults);
    }

    /**
     * Load the required dependencies for this plugin.
     *
     * Include the following files that make up the plugin:
     *
     * - Form_Enhancer_Admin. Defines all hooks for the admin area.
     * - Form_Enhancer_Public. Defines all hooks for the public side of the site.
     *
     * @since    2.1.8
     * @access   private
     */
    private function load_dependencies() {
        /**
         * The class responsible for defining all actions that occur in the admin area.
         */
        require_once FORM_ENHANCER_PLUGIN_DIR . 'includes/class-form-enhancer-admin.php';

        /**
         * The class responsible for defining all actions that occur in the public-facing
         * side of the site.
         */
        require_once FORM_ENHANCER_PLUGIN_DIR . 'includes/class-form-enhancer-public.php';
    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     *
     * @since    2.1.8
     * @access   private
     */
    private function define_admin_hooks() {
        $plugin_admin = new Form_Enhancer_Admin($this->get_plugin_name(), $this->get_version(), $this->get_settings());

        // Admin menu and settings
        add_action('admin_menu', array($plugin_admin, 'add_admin_menu'));
        add_action('admin_init', array($plugin_admin, 'register_settings'));
    }

    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.
     *
     * @since    2.1.8
     * @access   private
     */
    private function define_public_hooks() {
        $plugin_public = new Form_Enhancer_Public($this->get_plugin_name(), $this->get_version(), $this->get_settings());

        // Enqueue scripts and styles
        add_action('wp_enqueue_scripts', array($plugin_public, 'enqueue_styles'));
        add_action('wp_enqueue_scripts', array($plugin_public, 'enqueue_scripts'));
    }

    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.
     *
     * @since     2.1.8
     * @return    string    The name of the plugin.
     */
    public function get_plugin_name() {
        return $this->plugin_name;
    }

    /**
     * Retrieve the version number of the plugin.
     *
     * @since     2.1.8
     * @return    string    The version number of the plugin.
     */
    public function get_version() {
        return $this->version;
    }

    /**
     * Retrieve the settings of the plugin.
     *
     * @since     2.1.8
     * @return    array    The settings of the plugin.
     */
    public function get_settings() {
        return $this->settings;
    }

    /**
     * Run the plugin.
     *
     * @since    2.1.8
     */
    public function run() {
        // This method is intentionally empty for now
        // We've already set up all necessary hooks in the constructor
    }
}