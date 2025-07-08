import express from "express";
import Person from "../model/Person.js";

const router = express.Router(); 

// router.get("/", async (req, res) => {
//   try {
//     const person = await Person.find()
//     if(!person)return res.status(404).send(`no user available`)
//         res.status(200).send(person)
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   } 
// });

// Create and Save a Person 
router.post("/", async (req,res)=>{
    try{
        const person = new Person(req.body)
        await person.save()
        if(!person) return res.status(404).send(` no user available`)
            res.status(200).send(person)
    }catch (error){
        res.status(500).send({error: error.message})
    }
})

// create many people
router.post("/many", async (req,res)=>{
      try {
    const result = await Person.create(req.body);
    res.json(result);
    }catch (error){
        res.status(500).send({error: error.message})
    }
})


// Find All People by Name
router.get("/:name", async (req, res) => {
  try {
    const person = await Person.find({name: req.params.name})
    if(!person)return res.status(404).send(`no user available`)
        res.status(200).send(person)
  } catch (error) {
    res.status(500).send({ error: error.message });
  } 
});

//  Find One Person by Favorite Food
router.get("/:food", async (req, res) => {
  try {
    const person = await Person.findOne({favoriteFoods: { $in: [ req.params.food]}})
    if(!person)return res.status(404).send(`no user available`)
        res.status(200).send(person)
  } catch (error) {
    res.status(500).send({ error: error.message });
  } 
});


// Find a Person by _id
router.get("/:id", async (req, res)=>{
    try{
        const person = await Person.findById(req.params.id)
        if(!person) return res.status(404).send(`user not found`)
        res.status(200).send(person)   
    }catch (error){
        res.status(500).send({error: error.message})
    }
})
// Update FavoriteFoods by Adding "Hamburger"
router.put("/update-food/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).send("Person not found");
    
    person.favoriteFoods.push("Hamburger");
    const updated = await person.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update Age with findOneAndUpdate
router.put("/update-age/:name", async (req, res) => {
  try {
    const updated = await Person.findOneAndUpdate(
      { name: req.params.name },
      { age: 20 },
      { new: true } // return updated document
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Delete One Person by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Person.findByIdAndRemove(req.params.id);
    if (!deleted) return res.status(404).send("Person not found");
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete All People Named "Mary"
router.delete("/delete-all-mary", async (req, res) => {
  try {
    const result = await Person.deleteMany({ name: "Mary" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chained Query (Burrito Lovers, limit 2, no age)
router.get("/burrito-lovers", async (req, res) => {
  try {
    const data = await Person.find({ favoriteFoods: "Burrito" })
      .sort({ name: 1 })         // sort by name ascending
      .limit(2)                  // return only 2 results
      .select("-age")            // exclude age field
      .exec();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;

