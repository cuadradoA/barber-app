const CortePremiumService = require("../works/CortePremiumService")
const BarbaPremiumService = require("../works/BarbaPremiumService")

class PremiumServiceFactory {

  createService(type){

    switch(type){

      case "Corte":
        return new CortePremiumService()

      case "Barba":
        return new BarbaPremiumService()

      default:
        throw new Error("Servicio premium no válido")

    }

  }

}

module.exports = PremiumServiceFactory