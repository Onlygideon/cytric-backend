import Nft from "../models/Nft.js";

export default class NftRepo {
  async creatNft(nft) {
    try {
      const data = await Nft.create(nft);

      return data ? data.toJSON() : null;
    } catch (error) {
      throw error;
    }
  }

  async getNftByNftId(id) {
    try {
      const data = await Nft.findOne({ nftId: id });

      return data ? data.toJSON() : null;
    } catch (error) {
      throw error;
    }
  }

  async getUserWalletAddressNft(walletAddress) {
    try {
      const data = await Nft.find({ userWalletAddress: walletAddress });

      return data && data.length > 0 ? data.map((item) => item.toJSON()) : null;
    } catch (error) {
      throw error;
    }
  }
}
