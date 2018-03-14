UPDATE public.purchases
	SET 
		date=?paramDate, 
		document_number=?paramDocumentNumber, 
		description=?paramDescription
	WHERE <purid=?paramPurId>;