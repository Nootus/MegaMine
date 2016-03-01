delete from IdentityCompanyClaim where CompanyId = 5
and ClaimId in (select id from IdentityClaim where ClaimType = 'Plant')

insert into IdentityCompanyClaim(CompanyId, ClaimId)
select 5, Id from IdentityClaim where ClaimType = 'Plant'











-- Role IsAdmin
update IdentityRole set IsAdmin = 0
update IdentityRole set IsAdmin = 1 where Name in ('SuperAdmin', 'QuarryAdmin', 'GroupAdmin')
-- end

-- Not primary claim for Material Colour (being called from QuarryView)
if not exists(select 1 from IdentityPageClaim where id = 171)
begin
	set identity_insert IdentityPageClaim on
	insert into IdentityPageClaim(id, PageId, ClaimId, PrimaryClaimInd) values(171, 57, 47, 0)
	set identity_insert IdentityPageClaim off
end
-- end

-- Quarry Delete
if not exists(select 1 from IdentityClaim where id = 62)
begin
	insert into IdentityClaim(id, ClaimType, ClaimValue, Description) values(62, 'Quarry', 'QuarryDelete', 'Quarry Delete')
	insert into IdentityPage(PageId, [Text], Url, CssClass, SpriteCssClass, Disabled, ParentId, MenuInd, GroupMenuInd, DisplayOrder, Controller, ActionMethod) 
	values(74, 'Quarry Delete', null, null, null, null, 9, 0, 0, 0, 'QuarryController', 'QuarryDelete')
	Set IDENTITY_INSERT IdentityPageClaim ON
	insert into IdentityPageClaim(Id, PageId, ClaimId, PrimaryClaimInd) values(170, 74, 62, 1)
	Set IDENTITY_INSERT IdentityPageClaim Off
end
-- end Quarry Delete

-- Yard Delete
if not exists(select 1 from IdentityClaim where id = 63)
begin
	insert into IdentityClaim(id, ClaimType, ClaimValue, Description) values(63, 'Quarry', 'YardDelete', 'Yard Delete')
	insert into IdentityPage(PageId, [Text], Url, CssClass, SpriteCssClass, Disabled, ParentId, MenuInd, GroupMenuInd, DisplayOrder, Controller, ActionMethod) 
	values(75, 'Yard Delete', null, null, null, null, 9, 0, 0, 0, 'QuarryController', 'YardDelete')
	Set IDENTITY_INSERT IdentityPageClaim ON
	insert into IdentityPageClaim(Id, PageId, ClaimId, PrimaryClaimInd) values(172, 75, 63, 1)
	Set IDENTITY_INSERT IdentityPageClaim Off
end
-- End Delete

-- Product Type Delete
if not exists(select 1 from IdentityClaim where id = 64)
begin
	insert into IdentityClaim(id, ClaimType, ClaimValue, Description) values(64, 'Quarry', 'ProductTypeDelete', 'Product Type Delete')
	insert into IdentityPage(PageId, [Text], Url, CssClass, SpriteCssClass, Disabled, ParentId, MenuInd, GroupMenuInd, DisplayOrder, Controller, ActionMethod) 
	values(76, 'Product Type Delete', null, null, null, null, 9, 0, 0, 0, 'QuarryController', 'ProductTypeDelete')
	Set IDENTITY_INSERT IdentityPageClaim ON
	insert into IdentityPageClaim(Id, PageId, ClaimId, PrimaryClaimInd) values(173, 76, 64, 1)
	Set IDENTITY_INSERT IdentityPageClaim Off
end
-- End Delete

-- Colour Delete
if not exists(select 1 from IdentityClaim where id = 65)
begin
	insert into IdentityClaim(id, ClaimType, ClaimValue, Description) values(65, 'Quarry', 'MaterialColourDelete', 'Material Colour Delete')
	insert into IdentityPage(PageId, [Text], Url, CssClass, SpriteCssClass, Disabled, ParentId, MenuInd, GroupMenuInd, DisplayOrder, Controller, ActionMethod) 
	values(77, 'Material Colour Delete', null, null, null, null, 9, 0, 0, 0, 'QuarryController', 'MaterialColourDelete')
	Set IDENTITY_INSERT IdentityPageClaim ON
	insert into IdentityPageClaim(Id, PageId, ClaimId, PrimaryClaimInd) values(174, 77, 65, 1)
	Set IDENTITY_INSERT IdentityPageClaim Off
end
-- End Delete

-- Material Delete
if not exists(select 1 from IdentityClaim where id = 66)
begin
	insert into IdentityClaim(id, ClaimType, ClaimValue, Description) values(66, 'Quarry', 'MaterialDelete', 'Material Delete')
	insert into IdentityPage(PageId, [Text], Url, CssClass, SpriteCssClass, Disabled, ParentId, MenuInd, GroupMenuInd, DisplayOrder, Controller, ActionMethod) 
	values(78, 'Material Delete', null, null, null, null, 9, 0, 0, 0, 'QuarryController', 'MaterialDelete')
	Set IDENTITY_INSERT IdentityPageClaim ON
	insert into IdentityPageClaim(Id, PageId, ClaimId, PrimaryClaimInd) values(175, 78, 66, 1)
	insert into IdentityPageClaim(Id, PageId, ClaimId, PrimaryClaimInd) values(176, 66, 66, 1)
	Set IDENTITY_INSERT IdentityPageClaim Off
end
-- End Delete

--Default Company (Nootus)
	Set IDENTITY_INSERT Company ON
	insert into Company(CompanyId, CompanyName, CompanyEmailAddress, CompanyPhoneNumber, GroupInd, ParentCompanyId, CreatedUserId, CreatedDate, LastModifiedUserId, LastModifiedDate, DeletedInd)
			values(1, 'Nootus', null, null, 0, null, 'prasanna@nootus.com', cast('2016-01-24' as datetime), 'prasanna@nootus.com', cast('2016-01-24' as datetime), 0)
	Set IDENTITY_INSERT Company OFF
-- End


