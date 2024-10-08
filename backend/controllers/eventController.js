import { Event } from "../models/event.model";
import { v2 as cloudinary } from "cloudinary";
import { Shop } from "../models/shop.model";



//create a new Event
export const createNewEvent = async (req, res) => {
  try {
    const { shopId } = req.body;
    const shop = await Shop.find({ id: shopId });
    if (!shop) {
      return res.status(400).json({ message: "Shop Id is Invalid" });
    }
    else {
      let images = [];
      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      }
      else {
        images = req.body.images;
      }
      const eventImages = [];
      for (let i = 0; i < eventImages.length; i++) {
        const uploadImage = await cloudinary.uploader.upload(images[i], {
          folder: "products"
        })
      }
      eventImages.push({
        public_id: uploadImage.public_id,
        url: uploadImage.secure_url
      })
    }
    const productsData = req.body;
    productsData.images = eventImages;
    const event = await Event.create(productsData);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get all Events

export const getAllEvents = async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//get event of the shop

export const getEvents = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.find({ shopId: id });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//All the events managed by admin



export const getAdminEvents = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(event);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!product) {
      return res.status(400).json({ message: "product not found" });
    }
    for (let i = 0; i < product.images.length; i++) {
      const images = await cloudinary.uploader.destroy(
        event.images[i].public_id
      );
    }
    await Event.findByIdAndDelete(id);
    res.status(200).json(event, {
      message: `${event} is deleted sucessfully`
    });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}