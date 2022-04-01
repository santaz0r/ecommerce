const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        title: { type: String },
        price: { type: Number },
        description: { type: String },
        category: { type: Schema.Types.ObjectId, ref: "Category" },
        image: String,
        rate: Number,
        inStock: Number
    },
    {
        timestamps: true
    }
);

module.exports = model("Product", schema);
