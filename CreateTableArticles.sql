CREATE TABLE Articles (
    ID int IDENTITY(1,1),
    ArticleName nvarchar(max),
    Quantity int,
    Weight int,
	PRIMARY KEY (ID)
);