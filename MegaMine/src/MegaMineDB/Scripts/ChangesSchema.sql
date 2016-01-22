exec sp_rename 'dbo.VehicleFuel.Fuel', 'Quantity', 'COLUMN'
go

alter table IdentityRole add IsAdmin bit null
go

--- Updated in all environments

alter table Material Add BlockNumber nvarchar(100)
