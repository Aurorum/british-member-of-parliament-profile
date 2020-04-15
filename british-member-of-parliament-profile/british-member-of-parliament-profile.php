<?php
/**
 * British Member of Parliament Profile
 * 
 * @author            Aurorum
 * @package           British_Member_of_Parliament_Profile
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       British Member of Parliament Profile
 * Plugin URI:        https://github.com/Aurorum/member-of-parliament-profile
 * Description:       Provides a way to query Parliament's database and return a profile of a British MP in the House of Commons based on their constituency.
 * Version:           1.0.0
 * Author:            Aurorum
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       member-of-parliament-profile
 */

function member-of-parliament-profile($atts, $content = null)
{
    $a                  = shortcode_atts(array(
        'constituency' => 'notice'
    ), $atts);
    $noconsfound        = __('No constituency found for: ', 'member-of-parliament-profile');
    $noconsfoundmessage = '<p class="member-of-parliament__not-found">' . $noconsfound . '<strong>' . esc_attr($a['constituency']) . '</strong></p>';
    return '
<script>var memberofparliamentprofileconstituency = "' . esc_attr($a['constituency']) . '"</script>
<div id="member-of-parliament-profile" class="member-of-parliament-profile__wrapper">' . $noconsfoundmessage . '
<img id="member-of-parliament-profile__portrait" class="member-of-parliament-profile__image">
</img><div id="member-of-parliament-profile__container">
</div>
</div>


<style>
.member-of-parliament-profile__date-elected:before {
content: "' . __('Elected on ', 'member-of-parliament-profile') . '";
}
</style>';
}
add_shortcode('profilemp', 'member-of-parliament-profile');
function member-of-parliament-profile_enqueue_scripts()
{
    wp_enqueue_script('member-of-parliament-profile_data', plugin_dir_url(__FILE__) . '/assets/query-mp.js');
    wp_enqueue_style( 'member-of-parliament-profile_styles', plugin_dir_url(__FILE__) . '/assets/style.css');
}
// Necessary to load first, so must use wp_head
add_action('wp_head', 'member-of-parliament-profile_enqueue_scripts');