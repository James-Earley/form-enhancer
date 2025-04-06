<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://github.com/YOUR_USERNAME/form-enhancer
 * @since      2.1.8
 *
 * @package    FormEnhancer
 * @subpackage FormEnhancer/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and hooks for the admin area.
 *
 * @package    FormEnhancer
 * @subpackage FormEnhancer/admin
 * @author     James & Dan
 */
class Form_Enhancer_Admin {

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
     * Plugin settings.
     *
     * @since    2.1.8
     * @access   private
     * @var      array    $settings    The plugin settings.
     */
    private $settings;

    /**
     * Initialize the class and set its properties.
     *
     * @since    2.1.8
     * @param    string    $plugin_name    The name of this plugin.
     * @param    string    $version        The version of this plugin.
     * @param    array     $settings       The plugin settings.
     */
    public function __construct($plugin_name, $version, $settings) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->settings = $settings;
    }

    /**
     * Add admin menu.
     *
     * @since    2.1.8
     */
    public function add_admin_menu() {
        add_options_page(
            'Form Enhancer',
            'Form Enhancer',
            'manage_options',
            'form-enhancer',
            array($this, 'display_settings_page')
        );
    }

    /**
     * Register settings.
     *
     * @since    2.1.8
     */
    public function register_settings() {
        register_setting(
            'form_enhancer_settings',
            'form_enhancer_settings',
            array($this, 'sanitize_settings')
        );
        
        add_settings_section(
            'form_enhancer_main',
            'Main Settings',
            array($this, 'settings_section_callback'),
            'form-enhancer'
        );
        
        add_settings_field(
            'target_constituency',
            'Target Constituency',
            array($this, 'target_constituency_callback'),
            'form-enhancer',
            'form_enhancer_main'
        );
        
        add_settings_field(
            'constituent_tag',
            'Constituent Tag',
            array($this, 'constituent_tag_callback'),
            'form-enhancer',
            'form_enhancer_main'
        );
        
        add_settings_field(
            'non_constituent_tag',
            'Non-Constituent Tag',
            array($this, 'non_constituent_tag_callback'),
            'form-enhancer',
            'form_enhancer_main'
        );
        
        add_settings_field(
            'debug',
            'Debug Mode',
            array($this, 'debug_callback'),
            'form-enhancer',
            'form_enhancer_main'
        );
    }

    /**
     * Sanitize settings.
     *
     * @since    2.1.8
     * @param    array    $input    The input array to sanitize.
     * @return   array    The sanitized input.
     */
    public function sanitize_settings($input) {
        $sanitized = array();
        
        $sanitized['target_constituency'] = sanitize_text_field($input['target_constituency']);
        $sanitized['constituent_tag'] = sanitize_text_field($input['constituent_tag']);
        $sanitized['non_constituent_tag'] = sanitize_text_field($input['non_constituent_tag']);
        $sanitized['debug'] = isset($input['debug']) ? '1' : '0';
        
        return $sanitized;
    }

    /**
     * Settings section callback.
     *
     * @since    2.1.8
     */
    public function settings_section_callback() {
        echo '<p>Configure the Form Enhancer settings below.</p>';
    }

    /**
     * Target constituency field callback.
     *
     * @since    2.1.8
     */
    public function target_constituency_callback() {
        $value = isset($this->settings['target_constituency']) ? $this->settings['target_constituency'] : '';
        echo '<input type="text" name="form_enhancer_settings[target_constituency]" value="' . esc_attr($value) . '" class="regular-text">';
        echo '<p class="description">Specify the target constituency for tagging constituents.</p>';
    }

    /**
     * Constituent tag field callback.
     *
     * @since    2.1.8
     */
    public function constituent_tag_callback() {
        $value = isset($this->settings['constituent_tag']) ? $this->settings['constituent_tag'] : '';
        echo '<input type="text" name="form_enhancer_settings[constituent_tag]" value="' . esc_attr($value) . '" class="regular-text">';
        echo '<p class="description">Tag applied to users in the target constituency.</p>';
    }

    /**
     * Non-constituent tag field callback.
     *
     * @since    2.1.8
     */
    public function non_constituent_tag_callback() {
        $value = isset($this->settings['non_constituent_tag']) ? $this->settings['non_constituent_tag'] : '';
        echo '<input type="text" name="form_enhancer_settings[non_constituent_tag]" value="' . esc_attr($value) . '" class="regular-text">';
        echo '<p class="description">Tag applied to users outside the target constituency.</p>';
    }

    /**
     * Debug mode field callback.
     *
     * @since    2.1.8
     */
    public function debug_callback() {
        $checked = isset($this->settings['debug']) && $this->settings['debug'] === '1' ? 'checked' : '';
        echo '<input type="checkbox" name="form_enhancer_settings[debug]" value="1" ' . $checked . '>';
        echo '<p class="description">Enable debug mode to show console logs for troubleshooting.</p>';
    }

    /**
     * Display settings page.
     *
     * @since    2.1.8
     */
    public function display_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }
        
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('form_enhancer_settings');
                do_settings_sections('form-enhancer');
                submit_button('Save Settings');
                ?>
            </form>
            <div class="card">
                <h2>How to Use</h2>
                <p>This plugin automatically enhances Formidable Forms on your site with the following features:</p>
                <ul>
                    <li>Real-time UK postcode validation and formatting</li>
                    <li>Postcode-based constituency lookup</li>
                    <li>Full name splitting into first and last name components</li>
                    <li>Automatic tagging of constituents</li>
                </ul>
                <h3>Field Classes</h3>
                <p>Add these classes to your form fields:</p>
                <ul>
                    <li><code>fe-postcode</code> - Add to your postcode field</li>
                    <li><code>fe-name</code> - Add to your full name field</li>
                    <li><code>fe-first</code> - Add to your first name field (if using hidden fields)</li>
                    <li><code>fe-last</code> - Add to your last name field (if using hidden fields)</li>
                    <li><code>fe-constituency</code> - Add to your constituency field (if using hidden fields)</li>
                    <li><code>fe-ward</code> - Add to your ward field (if using hidden fields)</li>
                    <li><code>fe-tag</code> - Add to your tag field (if using hidden fields)</li>
                </ul>
                <p>Alternatively, the plugin will try to automatically detect your fields based on their labels or names.</p>
            </div>
        </div>
        <?php
    }
}