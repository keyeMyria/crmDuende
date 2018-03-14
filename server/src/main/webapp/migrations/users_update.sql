UPDATE public.users
	SET 
		phone=?paramPhone, 
		user_name=?paramUserName, 
		mobile=?paramMobile, 
		name=?paramName, 
		picture=?paramPicture, 
		last_name=?paramLastName, 
		email=?paramEmail
	WHERE <userid=?paramUserId>;