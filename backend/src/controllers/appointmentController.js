const BasicServiceFactory = require("../services/factories/BasicServiceFactory");
const PremiumServiceFactory = require("../services/factories/PremiumServiceFactory");
const AppointmentBuilder = require("../builders/AppointmentBuilder");
const db = require("../database/db");

exports.createAppointment = async (req, res) => {
  try {
    const { type, service, name, phone, datetime } = req.body;

    await db.read();

    const exists = db.data.appointments.find((a) => a.datetime === datetime);

    if (exists) {
      return res.status(409).json({
        message: "Horario ocupado",
      });
    }

    let factory;

    if (type === "premium") {
      factory = new PremiumServiceFactory();
    } else {
      factory = new BasicServiceFactory();
    }

    const serviceObj = factory.createService(service);

    const appointment = new AppointmentBuilder()
      .withService(type, service, serviceObj.getPrice())
      .withCustomer(name, phone)
      .withSchedule(datetime)
      .build();

    db.data.appointments.push(appointment);

    await db.write();

    res.status(201).json({ appointment });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno",
    });
  }
};
