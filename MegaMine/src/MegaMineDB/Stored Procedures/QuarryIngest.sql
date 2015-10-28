if objectproperty(object_id('dbo.QuarryIngest'), N'IsProcedure') = 1
	drop procedure [dbo].[QuarryIngest]
go

create procedure [dbo].[QuarryIngest]
(
	@MaterialDate datetime,
	@QuarryName varchar(50),
	@Length decimal(10,5),
	@Width decimal(10,5),
	@Height decimal(10,5),
	@Weight decimal(10,5),
	@Colour varchar(100),
	@ProductType varchar(10)
)
as
begin

	declare @QuarryId int
	select @QuarryId = QuarryId from Quarry where QuarryName = @QuarryName

	declare @YardId int
	select @YardId = YardId from Yard where QuarryId = @QuarryId

	declare @ProductTypeId int
	select @ProductTypeId = ProductTypeId from ProductType Where ProductTypeName = @ProductType

	declare @MaterialColourId int
	select @MaterialColourId = MaterialColourId from MaterialColour where ColourName = @Colour
	if(@MaterialColourId is null)
		select @MaterialColourId = MaterialColourId from MaterialColour where ColourName = 'Other'

	declare @MaterialId int
	insert into Material(QuarryId, MaterialColourId, ProductTypeId, Dimensions, Length, Width, Height, Weight, MaterialDate, CreatedUserId, CreatedDate, LastModifiedUserId, LastModifiedDate, DeletedInd, CompanyId)
	values(@QuarryId, @MaterialColourId, @ProductTypeId, null, @Length, @Width, @Height, @Weight, @MaterialDate, 'prasanna@nootus.com', GETDATE(), 'prasanna@nootus.com', GETDATE(), 0, 1)
	select @MaterialId = @@IDENTITY

	insert into MaterialMovement(MaterialId, FromYardId, ToYardId, MovementDate, CurrentInd, CreatedUserId, CreatedDate, LastModifiedUserId, LastModifiedDate, DeletedInd, CompanyId)
	values(@MaterialId, @YardId, @YardId, @MaterialDate, 1, 'prasanna@nootus.com', GETDATE(), 'prasanna@nootus.com', GETDATE(), 0, 1)
end
go
