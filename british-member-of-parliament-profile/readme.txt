=== British Member of Parliament Profile ===
Contributors: torres126
Tags: house of commons, parliament, politics, uk, united kingdom, mps, labour, conservative, petitions, campaigns
Requires at least: 5.0
Tested up to: 5.3
Stable tag: 1.0
Requires PHP: 5.6.20
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Provides a way to query Parliament's database and return a profile of a British MP in the House of Commons based on their constituency.

== Description ==

This plugin provides a way to query Parliament's database and return a profile of an MP in the House of Commons, using a shortcode. All you need is their constituency name, and the magic is done for you! Possible usage for this includes:

* Campaigning for an issue and offering a way for readers to contact your local MP
* Providing basic information on an MP relevant to your content or news story
* Raising awareness about who to consult with regarding local issues 

= Instructions =

In order to render a profile, use the following shortcode structure: <strong>[profilemp constituency="Leeds Central"]</strong>

Ensure that you replace the constituency with the one of the MP with the profile that you wish to render. You'll need to use the exact name of your constituency, and this can be inserted directly into the shortcode, even if there are characters such as brackets. For example, <strong>[profilemp constituency="Richmond (Yorks)"]</strong> would work.

Using a shortcode can be done through the Shortcode Gutenberg block, or in the Classic Editor. It can also be included in Widgets, though it should be noted that only one profile per page will render (since presumably it will be the same MP).

== Frequently Asked Questions ==

= Does this work for members in the House of Lords? =

No, it only works for constituency MPs in the House of Commons.

= How often is this updated? =

After every by-election or election! The information is provided directly from Parliament's database, which is constantly kept up to date.

= Do you provide support for this plugin? =

This was just a fun project to create during the coronavirus lockdown, but if there's any issues, I'm happy to help - feel free to contact me. 

== Changelog ==

= 1.0 =
* Initial release.