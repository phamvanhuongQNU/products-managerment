const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const ProductSchema = new mongoose.Schema(
  {
    title: String,
    // slug ăn theo title
    slug: { type: String, slug: "title", unique: true },
    price: Number,
    description: String,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
      // Nếu không nhập deleted thì mặc định là false
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    // Khi dữ liệu cật nhật hay thêm thì sẽ tự động tạo ra createAt,updateAt
    timestamps: true,
  }
);
const Product = mongoose.model("Product", ProductSchema, "products");
module.exports = Product;
