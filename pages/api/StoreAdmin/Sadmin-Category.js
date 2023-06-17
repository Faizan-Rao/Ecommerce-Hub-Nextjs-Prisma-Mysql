import { prisma } from "@/script";
import { data } from "autoprefixer";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;
    case "PUT":
      await updateCategory(req, res);
      break;
    case "PATCH":
      await deleteCategory(req, res);
      break;
  }
}

// Create Product API
const createCategory = async (req, res) => {
  try {
    const { category_title, store_id } = req.body;

    

    const createCategory = await prisma.categories.create({
      data: {
        category_title,
      },
    });
    const map = await prisma.stores_has_categories.create({
        data:{
            category_id: createCategory.category_id,
            store_id: parseInt(store_id)
        }
    })

    return res.json(createCategory);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
};

// Update Product API
const updateCategory = async (req, res) => {
  try {
   const { category_id, category_title} = req.body;
   const data = {}
   if(category_title) data.category_title = category_title;

   const update = await prisma.categories.update({
    data,
    where:{
        category_id: parseInt(category_id)
    }
   })
    return res.json(update);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
};
// Delete Product API
const deleteCategory = async (req, res) => {
  try {
    const { category_id } = req.body;
    
    const deleteCategory = await prisma.categories.delete({
      where: {
        category_id: parseInt(category_id),
      },
    });

    return res.json(deleteCategory);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
};
