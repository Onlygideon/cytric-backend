import NftRepo from "../repos/NftRepo.js";
import logger from "../utils/logger.js";

export default class NftUsecase {
  constructor(repo) {
    this._repo = repo;
  }

  get repo() {
    return this._repo;
  }

  set repo(repo) {
    if (this._repo instanceof NftRepo) {
      this._repo = repo;
    }
  }

  async creatNft(nft) {
    try {
      const data = await this._repo.creatNft(nft);
      if (!data) {
        return {
          success: false,
          error: "Error storing NFT data",
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      logger.error(error.message);
      if (error.code === 11000) {
        return {
          success: false,
          error: `An nft with same Id already exists`,
        };
      }

      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getNftByNftId(id) {
    try {
      const data = await this._repo.getNftByNftId(id);
      if (!data) {
        return { success: false, error: "Invalid NFT Id" };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      logger.error(error.message);

      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getUserWalletAddressNft(walletAddress) {
    try {
      const data = await this._repo.getUserWalletAddressNft(walletAddress);
      if (!data) {
        return { success: false, error: "No NFT found for wallet address!" };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      logger.error(error.message);

      return {
        success: false,
        error: error.message,
      };
    }
  }
}
