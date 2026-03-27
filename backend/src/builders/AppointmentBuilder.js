class AppointmentBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.appointment = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    return this;
  }

  withCustomer(name, phone) {
    this.appointment.name = name;
    this.appointment.phone = phone;

    return this;
  }

  withSchedule(datetime) {
    this.appointment.datetime = datetime;

    return this;
  }

  withService(type, service, price) {
    this.appointment.type = type;
    this.appointment.service = service;
    this.appointment.price = price;

    return this;
  }

  build() {
    const requiredFields = ["type", "service", "name", "phone", "datetime", "price"];
    const missingFields = requiredFields.filter(
      (field) =>
        this.appointment[field] === undefined || this.appointment[field] === null || this.appointment[field] === ""
    );

    if (missingFields.length > 0) {
      throw new Error(`Faltan campos obligatorios en la cita: ${missingFields.join(", ")}`);
    }

    const builtAppointment = { ...this.appointment };

    this.reset();

    return builtAppointment;
  }
}

module.exports = AppointmentBuilder;
