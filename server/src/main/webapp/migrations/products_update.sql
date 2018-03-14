UPDATE public.products
	SET 
		place_name=?paramPlaceName, 
		bar_code=?paramBarCode, 
		serial_code=?paramSerialCode, 
		name=?paramName, 
	WHERE <id=?paramId>;