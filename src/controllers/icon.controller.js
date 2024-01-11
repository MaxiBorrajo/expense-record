import iconService from "../services/Icon.service.js";
async function getIcons(req, res, next) {
  try {
    const foundIcons = await iconService.getAll(req.params);

    return res.status(200).json({
      resource: foundIcons,
    });
  } catch (error) {
    next(error);
  }
}
export { getIcons };
