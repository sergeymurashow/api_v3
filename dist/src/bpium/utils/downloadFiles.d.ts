type File = {
    id: number;
    docType: string;
    title: string;
    size: number;
    url: string;
    mimeType: string;
    metadata: string | null;
    fileName?: string;
};
export default function downloadFiles(file: File): Promise<unknown>;
export {};
