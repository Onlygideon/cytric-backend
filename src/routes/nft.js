import express from "express";
import handlers from "../handlers/index.js";

const api = express.Router({ mergeParams: true });

export default function NftRoute() {
  const handler = handlers.nft;

  /**
   * @swagger
   * /v1/nft/store:
   *   post:
   *     summary: Store NFT metadata
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               logoUrl:
   *                 type: string
   *               nftId:
   *                 type: number
   *               userWalletAddress:
   *                 type: string
   *     responses:
   *       200:
   *         description: NFT data stored successfully
   *       400:
   *         description: Error storing NFT data
   */
  api.route("/nft/store").post((req, res) => {
    handler.creatNft(req, res);
  });

  /**
   * @swagger
   * /v1/nft/{id}:
   *   get:
   *     summary: Get NFT data by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The ID of the NFT
   *     responses:
   *       200:
   *         description: NFT data retrieved successfully
   *       404:
   *         description: NFT not found
   */
  api.route("/nft/:id").get((req, res) => {
    handler.getNftByNftId(req, res);
  });

  /**
   * @swagger
   * /v1/nft/gallery/{walletAddress}:
   *   get:
   *     summary: Get NFT gallery for a user wallet address
   *     parameters:
   *       - in: path
   *         name: walletAddress
   *         required: true
   *         schema:
   *           type: string
   *         description: User's wallet address
   *     responses:
   *       200:
   *         description: NFT gallery retrieved successfully
   *       404:
   *         description: No NFTs found for the provided user wallet address
   */
  api.route("/nft/gallery/:walletAddress").get((req, res) => {
    handler.getUserWalletAddressNft(req, res);
  });

  return api;
}
