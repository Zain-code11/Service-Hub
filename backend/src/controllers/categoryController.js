import {
  createCategory,
  getCategories,
  getCategoriesById,
  updateCategory,
  deleteCategory,
} from "../services/categoryService.js";
// *  Create Category By Admin

export const create = async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.status(200).json({
      success: true,
      message: "Category Created Successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//*  Get All Categories By All Users with Any Role 
export const getAll = async (req, res) => {
  try {
    const category = await getCategories(req.body);
    res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//* Get Specific Category

export const getOne = async (req, res) => {
  try {
    const category = await getCategoriesById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Category Fetched Successfully",
      category,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
// *   Update Category Only By Admin
export const update = async (req, res) => {
  try {
    const category = await updateCategory(req.params.id, req.body);
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// * Delete Category Only By Admin
export const remove = async (req, res) => {
  try {
    const category = await deleteCategory(req.params.id);
    res.status(200).json({
      success: true,
      message: "Category deleted Successfully",
      category,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
