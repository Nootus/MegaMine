module MegaMine.Shared {

    @service("megamine", "MegaMine.Shared.Template")
    @inject()
    export class Template {

        public getButtonDefaultColumnDefs(field: string, editClaim: string,
                        deleteClaim: string, hide: string | boolean): uiGrid.IColumnDef {
            const self: Template = this;

            var buttons: Models.IButton[] = [<Models.IButton>{ buttonType: Models.ButtonType.view },
                                                <Models.IButton>{ buttonType: Models.ButtonType.edit, claim: editClaim }];
            if (deleteClaim !== undefined) {
                buttons.push(<Models.IButton>{ buttonType: Models.ButtonType.delete, claim: deleteClaim });
            }

            return self.getButtonColumnDefs(field, buttons, hide);
        }

        public getButtonColumnDefs(field: string, buttons: Models.IButton[], hide: string | boolean): uiGrid.IColumnDef {
            var buttonColumnDef: uiGrid.IColumnDef = {
                name: field,
                field: field,
                displayName: "",
                enableColumnMenu: false,
                type: "string",
                exporterSuppressExport: true,
                cellTemplate: "",
                cellClass: "text-center", enableHiding: false
            };

            var toolTip: string;
            var iconCss: string;

            angular.forEach(buttons, function(button: Models.IButton): void {
                button.ngClick = button.ngClick === undefined ?
                    `grid.appScope.grid.view(row.entity, ${button.buttonType}, $event, grid.appScope.grid.context)`
                    : button.ngClick;

                switch (button.buttonType) {
                    case Models.ButtonType.view:
                        toolTip = "View";
                        iconCss = "eye";
                        break;
                    case Models.ButtonType.edit:
                        toolTip = "Edit";
                        iconCss = "pencil-square-o";
                        break;
                    case Models.ButtonType.delete:
                        toolTip = "Delete";
                        iconCss = "trash";
                        break;
                }

                buttonColumnDef.cellTemplate += `<nt-button type="grid" tool-tip="${ toolTip }" icon-css="${ iconCss }"`;
                if (button.claim !== undefined) {
                    buttonColumnDef.cellTemplate += ` claim="${ button.claim }"`;
                }
                buttonColumnDef.cellTemplate += ` ng-click="${ button.ngClick }"></nt-button>`;
            });

            if (hide !== undefined) {
                buttonColumnDef.cellTemplate = `<span ng-hide="${ hide }">${ buttonColumnDef.cellTemplate }</span>`;
            }

            return buttonColumnDef;

        }

    }
}