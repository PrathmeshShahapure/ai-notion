import { User } from "./tyoes";

declare global { interface CustomJwtSessionClaims extends User {} }