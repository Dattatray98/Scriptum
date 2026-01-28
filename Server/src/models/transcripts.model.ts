import { url } from "inspector";
import mongoose, { Schema } from "mongoose";

const TranscriptSegmentSchema = new Schema(
    {
        start: { type: Number, required: true },
        end: { type: Number, required: true },
        text: { type: String, required: true },
    },
    { _id: true }
);

const TranscriptVersionSchema = new Schema(
    {
        version: { type: Number },
        is_current: { type: Boolean, default: false },
        transcript: { type: [TranscriptSegmentSchema] },
    },
    { timestamps: true }
);

const TranscriptSchema = new Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            index: true,
        },
        title: { type: String, required: true },

        media: {
            url: { type: String, required: true },
            public_id: { type: String, required: true },
            duration: { type: String, required: true },
            type: { type: String, required: true },
        },

        original_transcript: {
            type: [TranscriptSegmentSchema],
            required: true,
        },

        transcript_versions: {
            type: [TranscriptVersionSchema],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model(
    "Transcript",
    TranscriptSchema,
    "transcripts"
);
