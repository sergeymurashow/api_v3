export type DocType = 'contract' | 'manifest';
export type Sample = {
    cellName: string;
    alias: string;
};
declare const samples: {
    contract: string[];
    manifest: string[];
    getWithAliases(docType: DocType): Sample[];
};
export default samples;
