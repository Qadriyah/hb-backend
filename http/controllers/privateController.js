import * as jsonpatch from 'fast-json-patch';
import Jimp from 'jimp';

const privateController = {};

/**
 * Applies a json patch to a json object and returns
 * the updated json object
 * @param {*} req
 * @param {*} res
 */
const update = async (req, res) => {
  const { document, patch } = req.body;
  const newDocument = jsonpatch.applyPatch(document, patch).newDocument;
  return res.status(201).json({ document: newDocument });
};

/**
 * Downloads the image from a public url optionally provided
 * as a query parameter
 * @param {*} req
 * @param {*} res
 */
const getThumbnail = async (req, res) => {
  let defaulImageSrc = 'https://i.picsum.photos/id/0/5616/3744.jpg';
  const { imageSrc } = req.query;
  if (imageSrc) {
    defaulImageSrc = imageSrc;
  }
  const name = 'media/' + Math.round(new Date().getTime() / 1000) + '.jpg';
  res.attachment(name);
  const image = await Jimp.read(defaulImageSrc);
  image.resize(50, 50);
  await image.writeAsync(name);
  return res.download(name);
};

privateController.update = update;
privateController.getThumbnail = getThumbnail;

export default privateController;
