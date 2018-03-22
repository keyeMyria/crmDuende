SELECT 
	stores.storeId AS storeid, 
	stores.name AS storename,
    existenceline.quantity AS inventory,
    products.id AS productid,
    products.name AS productname,
    category.name AS categoryname
FROM existenceline 
INNER JOIN stores ON existenceline.storeId = stores.storeId
INNER JOIN products ON existenceline.productId = products.id
INNER JOIN category ON products.categoryId = category.categoryId