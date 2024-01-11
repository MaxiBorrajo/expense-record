import IconService from "../services/Icon.service.js";
export default async function executeIconMock() {
  try {
    await IconService.create({icon:'money-bill-wave'});
    await IconService.create({icon:'paw'});
    await IconService.create({icon:'tv'});
    await IconService.create({icon:'film'});
    await IconService.create({icon:'truck-moving'});
    await IconService.create({icon:'wine-glass-alt'});
    await IconService.create({icon:'taxi'});
    await IconService.create({icon:'gas-pump'});
    await IconService.create({icon:'drumstick-bite'});
    await IconService.create({icon:'beer'});
    await IconService.create({icon:'coffee'});
    await IconService.create({icon:'glass-cheers'});
    await IconService.create({icon:'store'});
    await IconService.create({icon:'house-damage'});
    await IconService.create({icon:'hotel'});
    await IconService.create({icon:'hospital'});
    await IconService.create({icon:'piggy-bank'});
    await IconService.create({icon:'handshake'});
    await IconService.create({icon:'hand-holding-usd'});
    await IconService.create({icon:'gift'});
    await IconService.create({icon:'tshirt'});
    await IconService.create({icon:'mobile'});
    await IconService.create({icon:'laptop'});
    await IconService.create({icon:'satellite'});
    await IconService.create({icon:'wifi'});
    await IconService.create({icon:'lightbulb'});
    await IconService.create({icon:'plane'});
    await IconService.create({icon:'credit-card'});
    await IconService.create({icon:'hammer'});
    await IconService.create({icon:'dumbbell'});
    await IconService.create({icon:'bitcoin'});
    await IconService.create({icon:'chart-line'});
    await IconService.create({icon:'futbol'});
    await IconService.create({icon:'shopping-basket'});
    await IconService.create({icon:'prescription'});
  } catch (error) {
    throw error;
  }
}