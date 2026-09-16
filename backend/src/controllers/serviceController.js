import {
  createService,
  deleteService,
  getService,
  getServiceById,
  updateService,
  searchServices,
  getProviderServices,
} from "../services/services_Service.js";

import { uploadImage } from "../services/cloudinaryService.js";

// Create Service By Provider
export const create = async (req, res) => {
  try {
    let {
      title,
      description,
      category,
      price,
      serviceType,
      serviceArea,
    } = req.body;

    if (typeof serviceArea === "string") {
      try {
        serviceArea = JSON.parse(serviceArea);
      } catch (e) {
        // ignore parse error
      }
    }

    let imageURL = "";

    // Upload image to Cloudinary
    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      imageURL = result.secure_url;
    }

    const service = await createService({
      title,
      description,
      category,
      price,
      serviceType,
      serviceArea,
      provider: req.user.userId,
      image: imageURL,
    });

    res.status(201).json({
      success: true,
      message: "Service Created Successfully",
      service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Services by Any User
export const getAll = async (req, res) => {
  try {
    const services = await getService();

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Specific Service by Any User
export const getOne = async (req, res) => {
  try {
    const service = await getServiceById(req.params.id);

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Service Only Provider
export const update = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (typeof updateData.serviceArea === "string") {
      try {
        updateData.serviceArea = JSON.parse(updateData.serviceArea);
      } catch (e) {}
    }

    const service = await updateService(
      req.params.id,
      updateData,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Service Updated Successfully",
      service,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Service Only Provider
export const remove = async (req, res) => {
  try {
    await deleteService(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const search = async (req, res) => {
  try {
    const services = await searchServices(req.query.search);

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Services Created By Logged-in Provider
export const getMyServices = async (req, res) => {
    try {
        const services = await getProviderServices(
            req.user.userId
        );

        res.status(200).json({
            success: true,
            services,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};