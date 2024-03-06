const express = require('express');
const bakeryRouter = express.Router();
const BakeryEntryModel = require('./model');

// GET all bakery entries
bakeryRouter.get("/", async (req, res) => {
    try {
        const bakeryEntries = await BakeryEntryModel.find({});
        res.status(200).send(bakeryEntries);
    } catch (error) {
        res.status(500).send(error.message);
    }
});





// GET bakery entry by ID
bakeryRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const bakeryEntry = await BakeryEntryModel.findById(id);
        if (bakeryEntry) {
            res.status(200).send(bakeryEntry);
        } else {
            res.status(404).send(`Failed to find a bakery entry with ID: `);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// PUT update bakery entry by ID
bakeryRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedBakeryEntry = await BakeryEntryModel.findByIdAndUpdate(id, req.body, { new: true }); // Ensure to return the updated document
        if (updatedBakeryEntry) {
            res.status(200).json(updatedBakeryEntry); // Send the updated bakery entry as JSON
        } else {
            res.status(404).send(`Failed to find a bakery entry with ID: ${id}`);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});



// POST a new bakery entry
bakeryRouter.post("/", async (req, res) => {
    try {
      const bakeryEntry = new BakeryEntryModel(req.body); // Assuming req.body contains the product data
      await bakeryEntry.save();
      // Send a JSON response with the created bakery entry
      res.status(201).json({ message: 'Created a new bakery entry', bakeryEntry });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



// DELETE bakery entry by ID
bakeryRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBakeryEntry = await BakeryEntryModel.findByIdAndDelete(id);
        if (deletedBakeryEntry) {
            res.status(202).send('Removed bakery entry with ID:' + id);
        } else {
            res.status(404).send(`Failed to find a bakery entry with ID: ${id}`);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = bakeryRouter; // Don't forget to export the router
