SELECT 
	users.userId AS userid, 
	users.user_name AS username, 
	clients.name AS clientsname,
    bill.date AS date
	FROM bill
		INNER JOIN users ON bill.userId = users.userId
		INNER JOIN clients ON bill.clientId = clients.clientId