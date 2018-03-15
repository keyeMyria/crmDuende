INSERT INTO public.provider(
	providerid, phone, mobile, address, country_code, contact_name, location, name, email)
	VALUES (
		?phone, 
		?mobile, 
		?address, 
		?country_code, 
		?contact_name, 
		?location, 
		?name, 
		?email
	);