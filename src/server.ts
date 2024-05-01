import { App } from "./app";
import { TaskRoutes } from "./routes/task.routes";
import { UserRoutes } from "./routes/user.routes";
import { ValidateEnv } from "./utils/envalid";

ValidateEnv();

const app = new App([new TaskRoutes(), new UserRoutes()]);
app.listen(3006);
