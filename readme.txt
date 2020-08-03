=== British Member of Parliament Profile ===
Contributors: torres126
Tags: house of commons, parliament, politics, uk, united kingdom, mps, labour, conservative, petitions, campaigns
Requires at least: 5.0
Tested up to: 5.5
Stable tag: 1.0
Requires PHP: 5.6.20
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Provides a way to query Parliament's database and return a profile of a British MP in the House of Commons based on their constituency.

== Description ==

This plugin provides a way to query Parliament's database and return a profile of an MP in the House of Commons, using a shortcode. All you need is their constituency name or postcode, and the magic is done for you! Possible usage for this includes:

* Campaigning for an issue and offering a way for readers to contact your local MP
* Providing basic information on an MP relevant to your content or news story
* Raising awareness about who to consult with regarding local issues 

This plugin relies on the data offered by the third party service of [UK Parliament Data](http://www.data.parliament.uk/) to return the information and portrait in the profile based on a constituency. This data is licensed under the [Open Parliament Licence](https://www.parliament.uk/site-information/copyright/open-parliament-licence/) - there are no additional Privacy Policies from UK Parliament Data relating to this plugin. In order to find your parliamentary constituency based on your postcode, the third party service of [Postcodes.io](https://github.com/ideal-postcodes/postcodes.io/) is used.

= Instructions =

In order to render a profile, use the following shortcode structure: <strong>[profilemp constituency="Leeds Central"]</strong>

Or with a postcode: <strong>[profilemp postcode="LS1 4DY"]</strong>

Ensure that you replace the constituency/postcode with the one of the MP with the profile that you wish to render!

If you're using a parliamentary constituency, you'll need to use the exact name of it, and this can be inserted directly into the shortcode, even if there are characters such as brackets. For example, <strong>[profilemp constituency="Richmond (Yorks)"]</strong> would work.

Using a shortcode can be done through the Shortcode Gutenberg block, or in the Classic Editor. You can render as many on a single page as you want, even with different MPs!

== Frequently Asked Questions ==

= Does this work for members in the House of Lords? =

No, it only works for constituency MPs in the House of Commons.

= How often is this updated? =

After every by-election or election! The information is provided directly from Parliament's database, which is constantly kept up to date. Postcodes are also regularly updated with data from the Office for National Statistics.

= Do you provide support for this plugin? =

This was just a fun project to create during the coronavirus lockdown, but if there's any issues, I'm happy to help - feel free to contact me. 

== Screenshots ==

1. An example usage of the profile in action - the specific design of the profile depends on the styles contained within your theme.
2. Add a profile through the Shortcode block in the Block Editor 

== Changelog ==

= 1.1 =
* Allow rendering a profile using a postcode rather than a constituency
* Complete refactor (I've really learnt a lot in the last few months!)
* Fix an issue where only one profile per page could be previously rendered
* Load more nicely

= 1.0 =
* Initial release.
