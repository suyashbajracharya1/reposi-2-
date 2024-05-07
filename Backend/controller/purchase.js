const Purchase = require("../models/purchase");
const purchaseStock = require("./purchaseStock");

// Add Purchase Details
const addPurchase = (req, res) => {
  const addPurchaseDetails = new Purchase({
    userID: req.body.userID,
    ProductID: req.body.productID,
    QuantityPurchased: req.body.quantityPurchased,
    TotalPurchaseAmount: req.body.totalPurchaseAmount,
    PurchaseDate: req.body.purchaseDate,
  });

  addPurchaseDetails
    .save()
    .then((result) => {
      purchaseStock(req.body.productID, req.body.quantityPurchased);
      res.status(200).send(result); // Successfully saved
    })
    .catch((err) => {
      console.error("Error adding purchase details:", err);
      res.status(500).send({ error: "Internal Server Error" }); // Changed status code to 500
    });
};


// Get All Purchase Data
const getPurchaseData = async (req, res) => {
  const findAllPurchaseData = await Purchase.find({"userID": req.params.userID})
    .sort({ _id: -1 })
    .populate("ProductID"); // -1 for descending order
  res.json(findAllPurchaseData);
};

// Get total purchase amount
const getTotalPurchaseAmount = async (req, res) => {
  let totalPurchaseAmount = 0;
  const purchaseData = await Purchase.find({"userID": req.params.userID});
  purchaseData.forEach((purchase) => {
    totalPurchaseAmount += purchase.TotalPurchaseAmount;
  });
  res.json({ totalPurchaseAmount });
};

module.exports = { addPurchase, getPurchaseData, getTotalPurchaseAmount };
