SELECT 
	purchases.purId AS purid, 
	purchases.date AS date, 
    purchases.document_number, 
    provider.name AS name, 
    purchases.description AS description
FROM purchases 
INNER JOIN provider ON purchases.providerId = provider.providerId

