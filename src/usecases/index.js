import repos from "../repos/index.js";
import NftUsecase from "./nft.js";

export default {
  nft: new NftUsecase(repos.nft),
};
