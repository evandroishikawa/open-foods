import { model, Schema } from 'mongoose'

const ImportHistorySchema = new Schema({
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: Date,
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  importedCount: {
    type: Number,
    default: 0,
  },
  errors: [
    {
      message: String,
      stack: String,
    },
  ],
});

export const ImportHistory = model('ImportHistory', ImportHistorySchema);
