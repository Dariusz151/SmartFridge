INSERT INTO [dbo].[registered_users]
	(	
		[login]
		,[first_name]
		,[salt]
		,[password]
		,[email]
		,[phone]
		,[id_role]
	)
	VALUES 
		( 'Dariuszko3', 'Dariusz3',  CAST('sfweg43werdf2' AS varbinary(8)), CAST('sdfwecweswe123rfwerwer' AS varbinary(20)), NULL, NULL, 3)
		


