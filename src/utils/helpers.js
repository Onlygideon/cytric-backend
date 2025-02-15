import Joi from "joi";

export const validateCreateNft = (nft) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    logoUrl: Joi.string().required(),
    nftId: Joi.number().required(),
    userWalletAddress: Joi.string().required(),
  });
  return schema.validate(nft, { abortEarly: false });
};
