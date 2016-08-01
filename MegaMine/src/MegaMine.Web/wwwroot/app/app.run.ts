module MegaMine.App {

    "use strict";
    @run("megamine")
    @inject("MegaMine.Shared.Session")
    class Run {
        constructor(session: Shared.Session) {
            session.initialize();
        }
    }

}
