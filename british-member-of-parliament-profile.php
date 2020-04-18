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
 * Plugin URI:        https://github.com/Aurorum/british-member-of-parliament-profile
 * Description:       Provides a way to query Parliament's database and return a profile of a British MP in the House of Commons based on their constituency.
 * Version:           1.0.0
 * Author:            Aurorum
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       member-of-parliament-profile
 */

function memberOfParliamentProfile($atts, $content = null)
{
    $a                  = shortcode_atts(array(
        'constituency' => ''
    ), $atts);
    $noconsfound        = __('No constituency found for: ', 'member-of-parliament-profile');
    $noconsfoundmessage = '<p class="member-of-parliament__not-found">' . $noconsfound . '<strong>' . esc_attr($a['constituency']) . '</strong>.<a href="https://www.bbc.co.uk/news/politics/constituencies">' . __('View a list of active constituencies.', 'member-of-parliament-profile') . '</a></p>';
    if (('' !== $a['constituency'])) {
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
    } else {
        return '<strong><p>' . __('Please enter a valid constituency. ', 'member-of-parliament-profile') . '<a href="https://www.bbc.co.uk/news/politics/constituencies">' . __('View a list of them.', 'member-of-parliament-profile') . '</a></p></strong>';
    }
}
add_shortcode('profilemp', 'memberOfParliamentProfile');
function memberOfParliamentEnqueueScripts()
{
    wp_enqueue_script('member-of-parliament-profile_data', plugin_dir_url(__FILE__) . '/assets/query-mp.js');
    wp_enqueue_style('member-of-parliament-profile_styles', plugin_dir_url(__FILE__) . '/assets/style.css');
}
// Necessary to load first, so must use wp_head
add_action('wp_head', 'memberOfParliamentEnqueueScripts');