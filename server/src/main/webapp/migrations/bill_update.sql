UPDATE public.bill
	SET 
		date=?paramDate, 
		num_bill=?paramNumBill, 
	WHERE <billid = ?paramBillId>;