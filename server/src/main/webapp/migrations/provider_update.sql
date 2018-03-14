UPDATE public.provider
	SET 
		phone=?paramPhone, 
		mobile=?paramMobile, 
		address=?paramAddress, 
		country_code=?paramCountryCode, 
		contact_name=?paramContactName, 
		location=?paramLocation, 
		name=?paramName, 
		email=?paramEmail
	WHERE <providerid=?paramProviderId >;