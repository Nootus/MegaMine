-- Not primary claim for Material Colour (being called from QuarryView)
if not exists(select 1 from IdentityPageClaim where id = 171)
begin
	set identity_insert IdentityPageClaim on
	insert into IdentityPageClaim(id, PageId, ClaimId, PrimaryClaimInd) values(171, 57, 47, 0)
	set identity_insert IdentityPageClaim off
end
-- end

-- Quarry Delete
if not exists(select 1 from IdentityClaim where id = 1)
begin
	insert into IdentityClaim(id, ClaimType, ClaimValue, Description) values(62, 'Quarry', 'QuarryDelete', 'Quarry Delete')
	insert into IdentityPage(PageId, [Text], Url, CssClass, SpriteCssClass, Disabled, ParentId, MenuInd, GroupMenuInd, DisplayOrder, Controller, ActionMethod) 
	values(74, 'Quarry Delete', null, null, null, null, 9, 0, 0, 0, 'QuarryController', 'QuarryDelete')
	Set IDENTITY_INSERT IdentityPageClaim ON
	insert into IdentityPageClaim(Id, PageId, ClaimId, PrimaryClaimInd) values(170, 74, 62, 1)
	Set IDENTITY_INSERT IdentityPageClaim Off
end
-- end Quarry Delete
