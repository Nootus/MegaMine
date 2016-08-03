declare module MegaMine.Shared.Models {
    interface INtException {
        message: string;
        errors: Error[];
    }

    interface INtError {
        code: string;
        description: string;
    }
}