const Service = require("../models/Service");

const serviceValidator = async (req, res, next) => {
  const serviceFound = await Service.findOne({ _id: req.query.id });
  if (!serviceFound) {
    return res.status(401).json({
      status: false,
      msg: "Id no encontrado",
    });
  }
  try {
    req.id = serviceFound.id;
  } catch (error) {
    console.log({
      name: error.name,
      msg: error.message,
    });
    return res.status(400).json({
      status: false,
      msg: "error middleware",
    });
  }
  next();
};

module.exports = {
  serviceValidator,
};
