declare module MegaMine.Shared.Models {
    interface IProfileModel {
        userId: string;
        firstName: string;
        lastName: string;
        userName: string;
        fullName: string;
        companyId: number;

        adminRoles: string[];
        claims: IClaimModel[];
        companies: ICompanyModel[];

        menu: IMenuModel[];
    }
}