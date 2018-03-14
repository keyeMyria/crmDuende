UPDATE public.purchasesdetail
	SET  
		productid=?paramproductid, 
		cost=?paramcost, 
		sales_price=?paramsales_price, 
		count=?
	WHERE <purdetailid = ?paramid>;