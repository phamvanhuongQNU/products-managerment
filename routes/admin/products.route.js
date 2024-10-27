const express = require('express');
const controller = require('../../controllers/admin/products.controller.js')
const multer  = require('multer')
const storage = require('../../helpers/diskStorage.js')
const upload = multer({ storage : storage() })
const route = express.Router();
// In ra giao diện
route.get('/',controller.products);
route.get("/create",controller.createProducts)

// Thay đổi dữ liệu 
route.patch("/change-status/:status/:id",controller.changeStatus)
route.patch("/change-multi",controller.changeMulti)
route.delete("/delete/:id",controller.deleteProduct)
route.post("/create",upload.single('thumbnail'),controller.createPostProducts)

module.exports = route;