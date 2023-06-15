import { prisma } from "@/script";
import { data } from "autoprefixer";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createSubcategory(req, res);
      break;
    case "PUT":
      await updateSubcategory(req, res);
      break;
    case "PATCH":
      await deleteSubcategory(req, res);
      break;
  }
}

// Create  API
const createSubcategory = async (req, res) => {
  try {
    const { subcategory_title, category_id } = req.body;

    

    const createSubcategory = await prisma.subcategory.create({
      data: {
        subcategory_title,
        category_id: parseInt(category_id)
      },
    });
   

    return res.json(createSubcategory);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
};

// Update  API
const updateSubcategory = async (req, res) => {
  try {
   const { subcategory_id, subcategory_title} = req.body;
   const data = {}
   if(subcategory_title) data.subcategory_title = subcategory_title;

   const update = await prisma.subcategory.update({
    data,
    where:{
        subcategory_id: parseInt(subcategory_id)
    }
   })
    return res.json(update);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
};
// Delete Product API
const deleteSubcategory = async (req, res) => {
  try {
    const { subcategory_id } = req.body;
    
    const deleteCategory = await prisma.subcategory.delete({
      where: {
        subcategory_id: parseInt(subcategory_id),
      },
    });

    return res.json(deleteCategory);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({});
  }
};
