import { Context } from "@azure/functions";
declare function swaManagementFunction(context: Context): Promise<void>;
declare const swaManagementFunctionJson: {
    disabled: boolean;
    bindings: ({
        authLevel: string;
        type: string;
        direction: string;
        name: string;
        route: string;
    } | {
        type: string;
        direction: string;
        name: string;
        authLevel?: undefined;
        route?: undefined;
    })[];
};
export { swaManagementFunction, swaManagementFunctionJson };
//# sourceMappingURL=management.d.ts.map