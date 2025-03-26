import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routeGenerator";
import { studentPaths } from "./student.routes";
import { facultyPaths } from "./faculty.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths)
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenerator(studentPaths)
  },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerator(facultyPaths)
  },
]);

export default router;
