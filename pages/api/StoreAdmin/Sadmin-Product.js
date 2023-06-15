import { prisma } from "@/script";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "PATCH":
      await deleteProduct(req, res);
      break;
  }
}

// Create Product API
const createProduct = async (req, res) => {
  try {
    const {
      product_desc,
      product_image,
      product_price,
      product_title,
      product_stock_status,
      product_warranty,
      subcategory_id,
      store_id,
    } = req.body;

    const data = {
      product_desc,
      product_image,
      product_price: parseFloat(product_price),
      product_stock_status: parseFloat(product_stock_status),
      product_title,
      product_warranty,
      store_id: parseInt(store_id),
      subcategory_id: parseInt(subcategory_id),
    };

    const createProduct = await prisma.products.create({
      data,
    });

    return res.json(createProduct);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
};

// Update Product API
const updateProduct = async (req, res) => {
  try {
    const {
      product_desc,
      product_image,
      product_price,
      product_title,
      product_stock_status,
      product_warranty,
      product_id,
    } = req.body;

    const data = {};
    if (product_title) data.product_title = product_title;
    if (product_desc) data.product_desc = product_desc;
    if (product_image) data.product_image = product_image;
    if (product_stock_status)
      data.product_stock_status = parseFloat(product_stock_status);
    if (product_price) data.product_price = parseFloat(product_price);
    if (product_warranty) data.product_warranty = product_warranty;

    const update = await prisma.products.update({
      where: {
       product_id
      },
      data,
    });

    return res.json(update);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
};
// Delete Product API
const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.body;
    console.log(product_id)
    const deleteProduct = await prisma.products.delete({
      where: {
        product_id : parseInt(product_id),
      },
    });

    return res.json(deleteProduct);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
};
