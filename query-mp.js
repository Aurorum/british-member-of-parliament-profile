document.getElementsByClassName(
	'member-of-parliament-profile__portrait'
)[ 0 ].onload = memberOfParliamentProfileQueryData();

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
	var x, i, mpProfileAddress, xmlDoc, dog, table;
	xmlDoc = xml.responseXML;
	memberofparliamentbuildprofile =
		"<div id='member-of-parliament-profile-data' className='member-of-parliament-profile__data'>";
	x = xmlDoc.getElementsByTagName( 'Member' );
	mpProfileAddress = xmlDoc.getElementsByTagName( 'Addresses' );
	dog = xmlDoc.getElementsByTagName( 'Address' );
	for ( i = 0; i < x.length; i++ ) {
		let style = document.createElement( 'style' );
		let container = document.getElementById( 'member-of-parliament-profile' );
		container.classList.add(
			x[ i ]
				.getElementsByTagName( 'Party' )[ 0 ]
				.childNodes[ 0 ].nodeValue.replace( /\s+/g, '-' )
				.toLowerCase() + '-party'
		);
		var ref = document.querySelector( 'script' );
		ref.parentNode.insertBefore( style, ref );

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
				"<div class='member-of-parliament-profile__phone'>" +
				mpProfileAddress[ i ].getElementsByTagName( 'Phone' )[ 0 ].childNodes[ 0 ].nodeValue +
				'</div>';
		}

		// Get the MP's constituency email (some don't have one)
		let mpProfileEmail = '';
		if (
			xmlDoc.querySelectorAll( 'Address[Type_Id="1"]' )[ i ].getElementsByTagName( 'Email' )[ 0 ]
				.childNodes[ 0 ] !== undefined
		) {
			var elements = xmlDoc.querySelectorAll( 'Address[Type_Id="1"]' );
			mpProfileEmail =
				"<div class='member-of-parliament-profile__email'>" +
				xmlDoc.querySelectorAll( 'Address[Type_Id="1"]' )[ i ].getElementsByTagName( 'Email' )[ 0 ]
					.childNodes[ 0 ].nodeValue +
				'</div>';
		}

		// Create their profile
		memberofparliamentbuildprofile +=
			"<div class='member-of-parliament-profile__name'>" +
			x[ i ].getElementsByTagName( 'DisplayAs' )[ 0 ].childNodes[ 0 ].nodeValue +
			mpProfileMinisterialRole +
			"</div><div class='member-of-parliament-profile__party'>" +
			x[ i ].getElementsByTagName( 'Party' )[ 0 ].childNodes[ 0 ].nodeValue +
			"</div><div class='member-of-parliament-profile__date-elected'>" +
			new Date(
				x[ i ].getElementsByTagName( 'HouseStartDate' )[ 0 ].childNodes[ 0 ].nodeValue
			).toLocaleDateString() +
			'</div></div><div>' +
			mpProfileEmail +
			mpProfilePhoneNumber +
			'</div>';

		style.innerHTML =
			'.member-of-parliament-profile__portrait {' +
			'background-image: url(https://data.parliament.uk/membersdataplatform/services/images/memberphoto/' +
			x[ i ].getAttribute( 'Member_Id' ) +
			'/);' +
			'}';
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
