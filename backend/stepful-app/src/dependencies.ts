import { CoachController } from "./controllers/CoachController";
import { CoachDatasource } from "./datasource/coach/CoachDatasource";
import { CoachService } from "./service/CoachService";
import { Pool } from "postgresql-client";
import { StudentController } from "./controllers/StudentController";
import { StudentDatasource } from "./datasource/student/StudentDatasource";
import { StudentService } from "./service/StudentService";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "stepful-app",
  password: "stepful-app",
  database: "stepful-app",

  min: 1,
  max: 10,
  idleTimeoutMillis: 15000,
});

export const datasources = {
  coach: new CoachDatasource(pool),
  student: new StudentDatasource(pool),
};

export const services = {
  coach: new CoachService(datasources.coach),
  student: new StudentService(datasources.student),
};

export const controllers = {
  coach: new CoachController(services.coach),
  student: new StudentController(services.student),
};
