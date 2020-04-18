if ( document.getElementById( 'member-of-parliament-profile__portrait' ) ) {
	document.getElementById(
		'member-of-parliament-profile__portrait'
	).onload = memberOfParliamentProfileQueryData();
}

function memberOfParliamentProfileQueryData() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if ( this.readyState == 4 && this.status == 200 ) {
			memberOfParliamentProfileBuildData( this );
		}
	};
	xmlhttp.open(
		'GET',
		'https://data.parliament.uk/membersdataplatform/services/mnis/members/query/constituency=' +
			memberofparliamentprofileconstituency +
			'/Addresses/',
		true
	);
	xmlhttp.send();
}

function memberOfParliamentProfileBuildData( xml ) {
	var x, i, mpProfileAddress, xmlDoc, address;
	xmlDoc = xml.responseXML;
	memberofparliamentbuildprofile =
		"<div id='member-of-parliament-profile-data' className='member-of-parliament-profile__data'>";
	x = xmlDoc.getElementsByTagName( 'Member' );
	mpProfileAddress = xmlDoc.getElementsByTagName( 'Addresses' );
	address = xmlDoc.getElementsByTagName( 'Address' );
	for ( i = 0; i < x.length; i++ ) {
		let container = document.getElementById( 'member-of-parliament-profile' );
		container.classList.add(
			x[ i ]
				.getElementsByTagName( 'Party' )[ 0 ]
				.childNodes[ 0 ].nodeValue.replace( /\s+/g, '-' )
				.toLowerCase() + '-party'
		);
		var ref = document.querySelector( 'script' );

		// Leave if the MP is a backbencher or is awaiting a role
		let mpProfileMinisterialRole = '';
		if (
			x[ i ].getElementsByTagName( 'LayingMinisterName' )[ 0 ].childNodes[ 0 ] !== undefined &&
			x[ i ].getElementsByTagName( 'LayingMinisterName' )[ 0 ].childNodes[ 0 ] !=
				x[ i ].getElementsByTagName( 'DisplayAs' )[ 0 ].childNodes[ 0 ].nodeValue
		) {
			mpProfileMinisterialRole =
				"</div><div class='member-of-parliament-profile__role'>" +
				x[ i ].getElementsByTagName( 'LayingMinisterName' )[ 0 ].childNodes[ 0 ].nodeValue;
		}

		// Get the MP's constituency phone number (some don't have one)
		let mpProfilePhoneNumber = '';
		if (
			mpProfileAddress[ i ].getElementsByTagName( 'Phone' )[ 0 ].childNodes[ 0 ] !== undefined
		) {
			mpProfilePhoneNumber =
				"<a class='member-of-parliament-profile__phone' href=tel:" +
				mpProfileAddress[ i ]
					.getElementsByTagName( 'Phone' )[ 0 ]
					.childNodes[ 0 ].nodeValue.replace( /\s+/g, '' ) +
				"'>" +
				mpProfileAddress[ i ].getElementsByTagName( 'Phone' )[ 0 ].childNodes[ 0 ].nodeValue +
				'</a>';
		}

		// Get the MP's constituency email (some don't have one)
		let mpProfileEmail = '';
		if (
			xmlDoc.querySelectorAll( 'Address[Type_Id="1"]' )[ i ].getElementsByTagName( 'Email' )[ 0 ]
				.childNodes[ 0 ] !== undefined
		) {
			var elements = xmlDoc.querySelectorAll( 'Address[Type_Id="1"]' );
			mpProfileEmail =
				"<a class='member-of-parliament-profile__email' href='mailto:" +
				xmlDoc.querySelectorAll( 'Address[Type_Id="1"]' )[ i ].getElementsByTagName( 'Email' )[ 0 ]
					.childNodes[ 0 ].nodeValue +
				"'>" +
				xmlDoc.querySelectorAll( 'Address[Type_Id="1"]' )[ i ].getElementsByTagName( 'Email' )[ 0 ]
					.childNodes[ 0 ].nodeValue +
				'</a>';
		}

		// Create their profile
		memberofparliamentbuildprofile +=
			"<div class='member-of-parliament-profile__date-elected'>" +
			new Date(
				x[ i ].getElementsByTagName( 'HouseStartDate' )[ 0 ].childNodes[ 0 ].nodeValue
			).toLocaleDateString() +
			'</div>' +
			"<div class='member-of-parliament-profile__name'>" +
			x[ i ].getElementsByTagName( 'DisplayAs' )[ 0 ].childNodes[ 0 ].nodeValue +
			mpProfileMinisterialRole +
			"</div><div class='member-of-parliament-profile-party-wrapper'><div class='member-of-parliament-profile__party'>" +
			// Do not translate: official title.
			x[ i ].getElementsByTagName( 'Party' )[ 0 ].childNodes[ 0 ].nodeValue + ' MP -' +
			"</div><div class='member-of-parliament-profile__constituency'>" +
			x[ i ].getElementsByTagName( 'MemberFrom' )[ 0 ].childNodes[ 0 ].nodeValue +
			'</div></div></div><div class="member-of-parliament-profile__contact-information">' +
			mpProfileEmail +
			mpProfilePhoneNumber +
			'</div>';
		document.getElementById( 'member-of-parliament-profile__portrait' ).src =
			'https://data.parliament.uk/membersdataplatform/services/images/memberphoto/' +
			x[ i ].getAttribute( 'Member_Id' ) +
			'/';
	}
	document.getElementById(
		'member-of-parliament-profile__container'
	).innerHTML = memberofparliamentbuildprofile;
	if ( document.getElementById( 'member-of-parliament-profile-data' ).innerHTML === '' ) {
		document
			.getElementById( 'member-of-parliament-profile' )
			.classList.add( 'no-constituency-found' );
	}
}
