import { query } from "express";
import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";

export const createListing=async(req,res,next)=>{
    try {
        const listing=await Listing.create(req.body);
        return res.status(200).json(listing)
        
    } catch (error) {
        next(error)
    }
}

export const deleteListing=async(req,res,next)=>{
    console.log("listing deeete")
    const listing=await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(401,"Listing not found"))
    }
    if(req.user.id!==listing.userRef){
        return next(errorHandler(401,"You can only delete own listings!"))
    }
    try {
        
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("listing deleted successfully")
        
    } catch (error) {
        next(error)
    }
}


export const updateListing=async(req,res,next)=>{
    const listing=await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(401,"Listing not found"))

    }
    if(req.user.id!==listing.userRef){
        return next(errorHandler(401,"You can only update own listings!"))
    }
    try {
        const updatedListing=await Listing.findByIdAndUpdate(
            req.params.id,
            req.body, 
            {new:true}
        )
        return res.status(200).json(updatedListing)
        
    } catch (error) {
        next(error)
        
    }



}


export const getListing=async(req,res,next)=>{
   try {
     const listing=await Listing.findById(req.params.id)
     if(!listing){
         return next(errorHandler(401,"Listing not found"))
 
     }
     return res.status(200).json(listing)

    
   } catch (error) {
      next(error)
    
   }

}


//search
export const getListings=async(req,res,next)=>{
    try {
        const limit=parseInt(req.query.limit) || 9;
        const startIndex=parseInt(req.query.startIndex) || 0;
        let offer=req.query.offer;

        if(offer===undefined || offer==='false'){
            offer={$in:[false,undefined]}   // in is used for value searching in dataase
        }

        let furnished=req.query.furnished;
        if(furnished===undefined || furnished==='false'){
            furnished={$in:[false,undefined]}   

        }
        let parking=req.query.parking;
        if(parking===undefined || parking==='false'){
            parking={$in:[false,undefined]}   

        }
        let type=req.query.type;
        if(type===undefined || type==='all'){
            parking={$in:['sale','rent']}   

        }

        const searchTerm=req.query.searchTerm || '';
        const sort=req.query.sort || 'createdAt';
        const order=req.query.order || 'desc';

        const listings=await Listing.find({
            name:{$regex:searchTerm,$options:'i'},  // 'i' dont care about lowercase or upppercase
            offer,
            furnished,
            parking,
            type
        }).sort({
            [sort]:order
        }).limit(limit).skip(startIndex)

        return res.status(200).json(listings)


        
    } catch (error) {
        next(error)
    }
}