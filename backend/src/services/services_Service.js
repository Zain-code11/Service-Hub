import Category from "../models/category.js";
import Service from "../models/service.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";

const attachServiceRating = async (serviceDoc) => {
  if (!serviceDoc) return serviceDoc;
  const serviceObj = serviceDoc.toObject ? serviceDoc.toObject() : serviceDoc;
  const reviews = await Review.find({ service: serviceObj._id });
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0);
    serviceObj.rating = Number((totalRating / reviews.length).toFixed(1));
    serviceObj.reviewCount = reviews.length;
  } else {
    serviceObj.rating = 0;
    serviceObj.reviewCount = 0;
  }
  return serviceObj;
};

const attachServicesRatings = async (servicesArray) => {
  return Promise.all(servicesArray.map((s) => attachServiceRating(s)));
};

// Create Service Functionality
export const createService = async ({
  title,
  description,
  category,
  provider,
  price,
  serviceType,
  serviceArea,
  image,
}) => {
  const existingCategory = await Category.findById(category);

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  // Location is required for onsite/both services
  if (
    (serviceType === "onsite" || serviceType === "both") &&
    (!serviceArea?.city || !serviceArea?.areas?.length)
  ) {
    throw new Error(
      "City and at least one area are required for onsite services",
    );
  }

  const service = await Service.create({
    title,
    description,
    category,
    price,
    serviceType,
    serviceArea,
    provider,
    image,
  });

  return attachServiceRating(service);
};

// Get Service Functionality
export const getService = async () => {
  const services = await Service.find()
    .populate("category", "name")
    .populate("provider", "name");
  return attachServicesRatings(services);
};

export const getServiceById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Service not found");
  }
  const service = await Service.findById(id)
    .populate("category", "name")
    .populate("provider", "name");

  if (!service) {
    throw new Error("Service not found");
  }

  return attachServiceRating(service);
};

// Update Service Functionality
export const updateService = async (id, data, providerId) => {
  const service = await Service.findOne({
    _id: id,
    provider: providerId,
  });

  if (!service) {
    throw new Error("Service not found or not owned by you");
  }

  const newServiceType = data.serviceType || service.serviceType;
  const newServiceArea = data.serviceArea || service.serviceArea;

  // Location is required for onsite/both services
  if (
    (newServiceType === "onsite" || newServiceType === "both") &&
    (!newServiceArea?.city || !newServiceArea?.areas?.length)
  ) {
    throw new Error(
      "City and at least one area are required for onsite services",
    );
  }

  Object.assign(service, data);

  await service.save();

  return attachServiceRating(service);
};

// Delete Service Functionality
export const deleteService = async (id, providerId) => {
  const service = await Service.findOneAndDelete({
    _id: id,
    provider: providerId,
  });

  if (!service) {
    throw new Error("Service not found or not owned by you");
  }

  return service;
};

// Search & Filter Services
export const searchServices = async ({
  search,
  category,
  serviceType,
  city,
  minPrice,
  maxPrice,
}) => {
  const filter = {};

  // Search by service title
  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  // Filter by category
  if (category) {
    filter.category = category;
  }

  // Filter by service type
  if (serviceType) {
    filter.serviceType = serviceType;
  }

  // Filter by city
  if (city) {
    filter["serviceArea.city"] = {
      $regex: city,
      $options: "i",
    };
  }

  // Minimum price
  if (minPrice) {
    filter.price = {
      ...filter.price,
      $gte: Number(minPrice),
    };
  }

  // Maximum price
  if (maxPrice) {
    filter.price = {
      ...filter.price,
      $lte: Number(maxPrice),
    };
  }

  const services = await Service.find(filter)
    .populate("category", "name")
    .populate("provider", "name");

  return attachServicesRatings(services);
};

// Get Services Created By Provider
export const getProviderServices = async (providerId) => {
  const services = await Service.find({
    provider: providerId,
  })
    .populate("category", "name")
    .populate("provider", "name");

  return attachServicesRatings(services);
};
