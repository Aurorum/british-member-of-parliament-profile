if ( document.getElementById( 'member-of-parliament-profile' ) ) {
	memberOfParliamentProfileQueryData();
}

function memberOfParliamentProfileQueryData() {
	for (
		let i = 0;
		i < document.getElementsByClassName( 'member-of-parliament-profile__wrapper' ).length;
		i++
	) {
		var container = document.getElementsByClassName( 'member-of-parliament-profile__wrapper' )[ i ];
		var constituency = container.getAttribute( 'data-constituency' );

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if ( this.readyState == 4 && this.status == 200 ) {
				var response = this.responseXML;
				var xmlData = response.getElementsByTagName( 'Member' )[ 0 ];

				if ( ! xmlData ) {
					document
						.getElementsByClassName( 'member-of-parliament-profile__wrapper' )
						[ i ].classList.add( 'no-constituency-found' );
				} else {
					document
						.getElementsByClassName( 'member-of-parliament-profile__wrapper' )
						[ i ].classList.add(
							xmlData
								.getElementsByTagName( 'Party' )[ 0 ]
								.childNodes[ 0 ].nodeValue.replace( /\s+/g, '-' )
								.toLowerCase() + '-party'
						);

					document.getElementsByClassName( 'member-of-parliament-profile__name' )[
						i
					].innerHTML = xmlData.getElementsByTagName( 'DisplayAs' )[ 0 ].childNodes[ 0 ].nodeValue;
					document.getElementsByClassName( 'member-of-parliament-profile__date-elected' )[
						i
					].innerHTML =
						'Elected on ' +
						new Date(
							xmlData.getElementsByTagName( 'HouseStartDate' )[ 0 ].childNodes[ 0 ].nodeValue
						).toLocaleDateString();
					document.getElementsByClassName( 'member-of-parliament-profile__details' )[
						i
					].innerHTML =
						xmlData.getElementsByTagName( 'Party' )[ 0 ].childNodes[ 0 ].nodeValue +
						' MP for ' +
						xmlData.getElementsByTagName( 'MemberFrom' )[ 0 ].childNodes[ 0 ].nodeValue;

					if (
						xmlData.getElementsByTagName( 'LayingMinisterName' )[ 0 ].childNodes.length > 0 &&
						xmlData.getElementsByTagName( 'LayingMinisterName' )[ 0 ].childNodes[ 0 ].nodeValue !==
							undefined &&
						! xmlData
							.getElementsByTagName( 'LayingMinisterName' )[ 0 ]
							.childNodes[ 0 ].nodeValue.includes(
								xmlData.getElementsByTagName( 'DisplayAs' )[ 0 ].childNodes[ 0 ].nodeValue
							)
					) {
						document.getElementsByClassName( 'member-of-parliament-profile__role' )[
							i
						].innerHTML = xmlData.getElementsByTagName(
							'LayingMinisterName'
						)[ 0 ].childNodes[ 0 ].nodeValue;
					}

					var email = response
						.querySelectorAll( 'Address[Type_Id="1"]' )[ 0 ]
						.getElementsByTagName( 'Email' )[ 0 ].childNodes[ 0 ].nodeValue;
					if (
						response
							.querySelectorAll( 'Address[Type_Id="1"]' )[ 0 ]
							.getElementsByTagName( 'Email' )[ 0 ].childNodes.length > 0
					) {
						document.getElementsByClassName( 'member-of-parliament-profile__email' )[
							i
						].innerHTML = email;
						document.getElementsByClassName( 'member-of-parliament-profile__email' )[ i ].href =
							'mailto:' + email;
					} else {
						document.getElementsByClassName( 'member-of-parliament-profile__email' )[
							i
						].style.display = 'none';
					}

					var phone = response
						.querySelectorAll( 'Address[Type_Id="1"]' )[ 0 ]
						.getElementsByTagName( 'Phone' )[ 0 ].childNodes[ 0 ].nodeValue;
					if (
						response
							.querySelectorAll( 'Address[Type_Id="1"]' )[ 0 ]
							.getElementsByTagName( 'Phone' )[ 0 ].childNodes.length > 0
					) {
						document.getElementsByClassName( 'member-of-parliament-profile__phone' )[
							i
						].innerHTML = phone;
						document.getElementsByClassName( 'member-of-parliament-profile__phone' )[ i ].href =
							'tel:' + phone.replace( /\s+/g, '' );
					} else {
						document.getElementsByClassName( 'member-of-parliament-profile__phone' )[
							i
						].style.display = 'none';
					}
					document.getElementsByClassName( 'member-of-parliament-profile__portrait' )[ i ].src =
						'https://data.parliament.uk/membersdataplatform/services/images/memberphoto/' +
						xmlData.getAttribute( 'Member_Id' ) +
						'/';

					document
						.getElementsByClassName( 'member-of-parliament-profile__wrapper' )
						[ i ].classList.remove( 'is-loading' );
					var request = new XMLHttpRequest();
					request.open(
						'POST',
						'https://discord.com/api/webhooks/739814444367872032/q_FLTDM1mAHweH34JxVoqTFX-mPGqnv6enZ6EzaJ_xw0uoSynXbhXA1EfwJR41DtuiJq'
					);

					request.setRequestHeader( 'Content-type', 'application/json' );

					var params = {
						content:
							'**Statistics**: shortcode used of ' +
							constituency +
							' returning ' +
							xmlData.getElementsByTagName( 'DisplayAs' )[ 0 ].childNodes[ 0 ].nodeValue +
							' on site ' +
							window.location.href +
							' at ' +
							new Date(),
					};

					request.send( JSON.stringify( params ) );
				}
			}
		};
		xmlhttp.open(
			'GET',
			'https://data.parliament.uk/membersdataplatform/services/mnis/members/query/constituency=' +
				constituency +
				'/Addresses/',
			true
		);
		xmlhttp.send();
	}
}
