export default class InformationByVoyage {
    voyageNumber: string;
    constructor(voyageNumber: string);
    findVessel(voyageNumber?: string): Promise<any>;
    getVoyage(voyageNumber?: string): Promise<any>;
}
