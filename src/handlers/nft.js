import NftUsecase from "../usecases/nft.js";
import { validateCreateNft } from "../utils/helpers.js";

export default class NftHandler {
  constructor(usecase, responseHandler) {
    this._usecase = usecase;
    this._handler = responseHandler;
  }

  get usecase() {
    return this._usecase;
  }

  get handler() {
    return this._handler;
  }

  set usecase(usecase) {
    if (usecase instanceof NftUsecase) {
      this._usecase = usecase;
    }
  }

  set handler(responseHandler) {
    this._handler = responseHandler;
  }

  async creatNft(req, res) {
    try {
      const nftDetails = req.body;
      const { error } = validateCreateNft(nftDetails);
      if (error) {
        return this._handler.badRequest(res, error.message);
      }

      const resp = await this._usecase.creatNft(nftDetails);

      if (resp.success) {
        return this._handler.created(res, "NFT data stored successfully");
      } else {
        return this._handler.badRequest(res, resp.error);
      }
    } catch (error) {
      return this._handler.internalServerError(res, error.message);
    }
  }

  async getNftByNftId(req, res) {
    try {
      const nftId = req.params.id;
      if (!nftId) {
        return this._handler.badRequest(res, "NftId is required");
      }

      const resp = await this._usecase.getNftByNftId(nftId);
      if (resp.success) {
        return this._handler.success(res, resp.data);
      } else {
        return this._handler.notFound(res, resp.error);
      }
    } catch (error) {
      return this._handler.internalServerError(res, error.message);
    }
  }

  async getUserWalletAddressNft(req, res) {
    try {
      const walletAddress = req.params.walletAddress;
      if (!walletAddress) {
        return this._handler.badRequest(res, "User Wallet Address Is Required");
      }

      const resp = await this._usecase.getUserWalletAddressNft(walletAddress);
      if (resp.success) {
        return this._handler.success(res, resp.data);
      } else {
        return this._handler.notFound(res, resp.error);
      }
    } catch (error) {
      return this._handler.internalServerError(res, error.message);
    }
  }
}
