import express from "express";
import {addProduct,listProducts,removeProduct,singleProducts,updateProduct} from '../controllers/productController.js'
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuthen.js"

const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.post('/update',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),updateProduct);
productRouter.get('/list',listProducts);
productRouter.post('/single',singleProducts);

export default productRouter;