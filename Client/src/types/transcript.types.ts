type TranscriptSegment = {
    start: number;
    end: number;
    text: string;
};

export type TranscriptDataTypes = {
    title: string;
    trans_id: string;
    user_id: string;
    original_transcript: TranscriptSegment[];
    version_transcript: any[];
};
