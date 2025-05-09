import Item from "../models/itemModel.js";

export const listitem = async(req,res) => {
   const{title,tagline,description,imdb,imgURL} = req.body;
 try{
   const newItem = new Item ({
    title,
    tagline,
    description,
    imdb,
    imgURL
   })

   const savedItem = await newItem.save()

   return res.status(201).json({
    success:true,
    message:"Item added successfully",
    body:{
       title,
       tagline,
       description,
       imdb,
       imgURL 
    }
   })
}catch(error){
  return res.status(500).json({success:false,message:"Internal server error"})
}
}

export const getItemDetails = async(req,res) => {
   try {

    const items = await Item.find();
    const result = items.map(item => ({
        title: item.title,
        tagline: item.tagline,
        description: item.description,
        imdb:item.imdb,
        imgURL:item.imgURL
        }));

     return res.status(200).json({
        success:true,
        message:"Item fetched successfully",
        body:result
     })
   } catch (error) {
      return res.status(500).json({success:true,message:"Internal server error"})
   }
}