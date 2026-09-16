import Category from "../models/category.js";

// * Create Category Functionality
export const createCategory = async ({ name, slug, description, image }) => {
  const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const existingCategory = await Category.findOne({
    $or: [{ name }, { slug: generatedSlug }],
  });
  if (existingCategory) {
    throw new Error("Category already exist");
  }
  const category = await Category.create({
    name,
    slug: generatedSlug,
    description,
    image: image || "",
  });
  return category;
};

//* get Categories Functionality
export const getCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

export const getCategoriesById = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error("Category Not Found");
  }
  return category;
};

//* update Category Functionality
export const updateCategory = async (id, data) => {
  if (data.name && !data.slug) {
    data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

//* delete Category Functionality
export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};
