UPDATE public.clients
	SET  
		phone=?paramPhone, 
		birthday_date=?paramBirthdayDate, 
		place_name=?paramPlaceName, 
		location=?paramLocation, 
		user_name=?paramUserName, 
		last_buy=?paramLastBuy, 
		mobile=?paramMobile,
		address=?paramAddress, 
		country_code=?paramCountryCode, 
		first_buy=?paramFirstBuy, 
		name=?paramName, 
		picture=?paramPicture, 
		last_name=?paramLastName, 
		email=?paramEmail
	WHERE <clientid=?paramClientId>;