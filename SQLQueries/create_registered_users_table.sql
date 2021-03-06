CREATE TABLE registered_users (
    id_user int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	login nvarchar(50) NOT NULL UNIQUE,
    first_name varchar(255) NOT NULL,
	salt varbinary(50) NOT NULL,
	password varbinary(255) NOT NULL,
	email nvarchar(50),
	phone char(10),
	id_role int NOT NULL FOREIGN KEY REFERENCES [FridgeDB].[dbo].[user_roles](id_role)
);