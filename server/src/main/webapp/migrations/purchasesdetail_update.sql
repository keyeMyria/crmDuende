UPDATE public.purchasesdetail
	SET  
		cost=?paramCost, 
		sales_price=?paramSalesPrice, 
		count=?
	WHERE <purdetailid = ?paramId>;