const express = require("express")
const router = express.Router()
const Favorite = require("../models/Favorite")
const authMiddleware = require("../middleware/auth")


router.use(authMiddleware)
 

router.get("/", async (req , res )=>{
    try {
        const favorites = await Favorite.find({userId : req.userId})
        res.status(200).json(favorites)
    } catch (error) {
          res.status(500).json({ message: "Server error", error: error.message })
    }
})


router.post("/" , async (req , res) => {
    try {
        const { movieId, title, poster_path, vote_average, release_date } = req.body

       const existing = await Favorite.findOne({
        userId: req.userId,
        movieId:movieId
       })

     if(existing){
        return res.status(400).json({ message: "Already in favorites!" })
     }


     const newFavorite = new Favorite({
            userId: req.userId,
            movieId: movieId,
            title: title,
            poster_path: poster_path,
            vote_average: vote_average,
            release_date: release_date
        })

        await newFavorite.save()

        res.status(201).json({
            message: "Added to favorites!",
            favorite: newFavorite
        })





    } catch (error) {
         res.status(500).json({ message: "Server error", error: error.message })
    }
})



// 3. DELETE - Favorite hatao
router.delete("/:movieId", async (req, res) => {
    try {
        const { movieId } = req.params

        const deleted = await Favorite.findOneAndDelete({
            userId: req.userId,
            movieId: movieId
        })

        if (!deleted) {
            return res.status(404).json({ message: "Favorite not found!" })
        }

        res.status(200).json({ message: "Removed from favorites!" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})

module.exports = router