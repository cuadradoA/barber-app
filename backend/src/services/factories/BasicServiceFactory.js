const CorteService = require("../works/CorteService")
const BarbaService = require("../works/BarbaService")

class BasicServiceFactory {

  createService(type) {

    switch(type){

      case "Corte":
        return new CorteService()

      case "Barba":
        return new BarbaService()

      default:
        throw new Error("Servicio no válido")

    }

  }

}

module.exports = BasicServiceFactory