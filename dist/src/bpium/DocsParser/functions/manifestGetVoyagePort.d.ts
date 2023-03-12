import { Headers } from "../../types";
interface manifestGetVoyagePortOut {
    vesselVoyage: string;
    portCountry: string;
    loadingPort: string;
}
/**
 *
 * @param table Parsed table in Type Headers.Manifest
 * @return vesselVoyage and portCountry
 *
 */
export default function manifestGetVoyagePort(table: Headers.Manifest[]): manifestGetVoyagePortOut;
export {};
