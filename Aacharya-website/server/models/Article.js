const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String }, // Used as excerpt
    content: { type: String },
    category: {
        name: { type: String },
        slug: { type: String }
    },
    authorName: { type: String },
    imageUrl: { type: String },
    tags: [String],
    status: { type: String },
    publishDate: { type: Date },
    views: { type: Number, default: 0 },
}, { timestamps: true });

articleSchema.index({ 'category.name': 1 });
articleSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Article', articleSchema, 'published_blogs');
