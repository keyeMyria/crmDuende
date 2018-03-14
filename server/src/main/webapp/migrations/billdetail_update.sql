UPDATE public.billdetail
	SET 
		sale_price=?paramSalesPrice,  
		cost=?paramCost, 
		count=?paramCount
	WHERE <billdetailid=?paramBillDetailId >;