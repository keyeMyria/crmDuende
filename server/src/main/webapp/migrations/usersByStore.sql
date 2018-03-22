SELECT 
	users.userId AS userid, 
	stores.name AS storename, 
	users.name as usersname
FROM users 
INNER JOIN stores ON users.storeId = stores.storeId