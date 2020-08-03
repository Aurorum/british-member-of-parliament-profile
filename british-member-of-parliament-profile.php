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
    $a = shortcode_atts(array(
        'constituency' => '',
        'postcode' => '',
    ) , $atts);

    wp_enqueue_script('member-of-parliament-profile_data', plugin_dir_url(__FILE__) . '/assets/query-mp.js');

    $constituency = $a['constituency'];

    if ($a['constituency'] === '' && $a['postcode'] !== '')
    {

        $request = wp_remote_get("https://api.postcodes.io/postcodes/" . $a['postcode'] . '/');

        if (is_wp_error($request))
        {
            return false;
        }

        $body = wp_remote_retrieve_body($request);

        $data = json_decode($body);

        if ($data->status === 200)
        {
            $constituency = $data
                ->result->parliamentary_constituency;
        }
        else
        {
            $constituency = false;
        }
    }

    if ($a['constituency'] === '' && $a['postcode'] === '')
    {
        $constituency = false;
    }

    $loadingmessage = __('Loading...', 'member-of-parliament-profile');
    $noconsfound = __('No constituency found for: ', 'member-of-parliament-profile');
    $noconsfoundmessage = '<p class="member-of-parliament__not-found">' . $noconsfound . '<strong>' . esc_attr($a['constituency']) . '</strong>. <a href="https://www.bbc.co.uk/news/politics/constituencies">' . __('View a list of active constituencies.', 'member-of-parliament-profile') . '</a></p>';

    if ($constituency)
    {
        return '<div id="member-of-parliament-profile" data-constituency="' . $constituency . '" class="member-of-parliament-profile__wrapper is-loading">
	' . $noconsfoundmessage . '
   <img class="member-of-parliament-profile__portrait">
   <div class="member-of-parliament-profile__container">
      <div id="member-of-parliament-profile-data" classname="member-of-parliament-profile__data">
         <p class="member-of-parliament-profile__date-elected">' . $loadingmessage . '</p>
         <p class="member-of-parliament-profile__name">' . $loadingmessage . '</p>
		 <p class="member-of-parliament-profile__role"></p>
         <p class="member-of-parliament-profile__details">' . $loadingmessage . '</p>
      </div>
      <div class="member-of-parliament-profile__contact-information">
	  	<p><a class="member-of-parliament-profile__email"></a></p>
	  	<p><a class="member-of-parliament-profile__phone" href=""></a></p></div>
   	</div>
</div>';
    }
    else
    {
        if (current_user_can('edit_posts'))
        {
            return '<div><strong><p>' . __('Please enter a valid postcode or constituency. ', 'member-of-parliament-profile') . '<a href="https://www.bbc.co.uk/news/politics/constituencies">' . __('View a list of constituencies.', 'member-of-parliament-profile') . '</a></p></strong></div>';
        }
    }
}
add_shortcode('profilemp', 'memberOfParliamentProfile');

function memberOfParliamentEnqueueScripts()
{
    wp_enqueue_style('member-of-parliament-profile_styles', plugin_dir_url(__FILE__) . '/assets/style.css');
}
add_action('wp_enqueue_scripts', 'memberOfParliamentEnqueueScripts');
