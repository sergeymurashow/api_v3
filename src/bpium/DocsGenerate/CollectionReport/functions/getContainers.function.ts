import GetContainer from "../../../GetDataFromBpium/GetContainer.class";

export default async function getContainersByVoyage(voyageLink: {
	catalogId: string,
	recordId: string,
}): Promise<any> {
	return new GetContainer('', [voyageLink]).containersData
}