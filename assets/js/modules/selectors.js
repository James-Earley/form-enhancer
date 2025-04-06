/**
 * Form Enhancer - Selectors Module
 */
(function($) {
    'use strict';

    // Element selectors - all in one place for easy maintenance
    window.FormEnhancer.selectors = {
        postcodeInput: '.fe-postcode, #field_as56hy, input[name="item_meta[postcode]"], input[placeholder*="postcode"], input[placeholder*="Postcode"], input[name*="postcode"], input[id*="postcode"]',
        nameField: '.fe-name, #field_fe-name2, input[name="item_meta[name]"], input[placeholder*="name"], input[placeholder*="Name"], input[name*="name"], input[id*="name"]',
        firstNameField: '.fe-first, #field_fe-name, input[name*="first"], input[id*="first"]',
        lastNameField: '.fe-last, #field_fe-last, input[name*="last"], input[id*="last"]',
        wardField: '.fe-ward, input[id*="frm_field_341"], #frm_field_341_container input, input[name*="ward"], input[id*="ward"]',
        constituencyField: '.fe-constituency, input[id*="frm_field_340"], #frm_field_340_container input, input[name*="constituency"], input[id*="constituency"]',
        tagsField: '.fe-tag, input[name="item_meta[tags]"], #field_tags, input[name$="[tags]"], input[id*="tags"]',
        emailField: 'input[type="email"], #field_lqwq3',
        form: '#form_casework, .frm_forms form, form.frm-show-form, form[id*="signup-form"], form[id*="signup-form5"]'
    };

})(jQuery);