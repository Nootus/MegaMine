declare module MegaMine.Shared.Models {
    interface IMenuModel {
        pageId: number;
        menuText: string;
        parentPageId: number;
        groupMenuInd: boolean;
        displayOrder: number;
        url: string;
        iconCss: string;

        items: Array<IMenuModel>;
    }
}