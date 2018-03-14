UPDATE public.stores
	SET 
		phone=?paramPhone, 
		address=?paramAddress, 
		place_name=?paramPlaceName, 
		name=?paramName
	WHERE <storeid=?paramStoreId >;