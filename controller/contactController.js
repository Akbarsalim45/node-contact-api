import expressAsyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";
export const getAllContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ message: "All contact list", contact });
});

export const addContact = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(200).json({ message: "Added new contact", contact });
});

export const getSingleContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  console.log("contact.user_id", contact.user_id);
  if (contact.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res
    .status(200)
    .json({ message: ` single contact  ${req.params.id}`, contact });
});

export const updateContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("update permission is not availabale");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res
    .status(200)
    .json({ message: ` updatted contact -  ${req.params.id}`, updatedContact });
});

export const deleteContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("delete permission is not availabale");
  }

  const deleteContact = await Contact.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ message: `  contact deleted -  ${req.params.id}`, deleteContact });
});
