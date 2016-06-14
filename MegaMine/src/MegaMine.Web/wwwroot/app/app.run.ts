module MegaMine.App {

    "use strict";
    @run("megamine")
    @inject("session")
    class Run {
        constructor(session) {
            session.initialize();
        }
    }

}
