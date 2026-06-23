const mongoose = require("mongoose")



const favoritesSchema = new mongoose.Schema({

    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    movieId:{
        type:Number,
        required:true
    },
  
    title: {
        type: String,
        required: true
    },
    
    poster_path: {
        type: String
    },
    
    vote_average: {
        type: Number
    },
    
    release_date: {
        type: String
    }

},{
    timestamps:true
}
)

const Favorite = mongoose.model("Favorite" , favoritesSchema)

module.exports = Favorite