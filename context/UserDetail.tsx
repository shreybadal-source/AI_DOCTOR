import { createContext } from "react";
import { UseDetail } from "@/app/[locale]/provider";

export const UserDetailContext = createContext<UseDetail | undefined>(undefined);
