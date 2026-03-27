const BasicServiceFactory = require("../services/factories/BasicServiceFactory");
const PremiumServiceFactory = require("../services/factories/PremiumServiceFactory");

exports.getServices = (req, res) => {
  const { type } = req.query;

  let factory;

  if (type === "premium") {
    factory = new PremiumServiceFactory();
  } else {
    factory = new BasicServiceFactory();
  }

  const services = ["Corte", "Barba"].map((name) => {
    const service = factory.createService(name);

    return {
      type,
      service: name,
      price: service.getPrice(),
    };
  });

  res.json({ services });
};
