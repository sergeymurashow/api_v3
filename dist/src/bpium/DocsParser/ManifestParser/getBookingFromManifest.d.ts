import { Headers, Booking, ParseError } from "src/bpium/types";
export default function getBookingFromManifest(data: Headers.Manifest, voyageNumber: string): Booking | ParseError;
