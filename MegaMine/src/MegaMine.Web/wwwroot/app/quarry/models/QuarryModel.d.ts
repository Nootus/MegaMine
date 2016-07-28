declare module MegaMine.Quarry.Models {
    interface IQuarryModel {
        quarryId: number;
        quarryName: string;
        location: string;
        colourIds: Array<number>;
        colours: string;
    }
}