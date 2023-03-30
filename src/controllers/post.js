import * as services from '../services/post'

export const getPosts = async(req, res) =>{
    try {
        const response = await services.getPostService()
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:"Failed at post controller"+error
        })
    }
}
export const getLimitPosts = async(req, res) =>{
    const {page,priceNumber, areaNumber,...query} = req.query

    try {
        const response = await services.getPostLimitService(page, query, {priceNumber,areaNumber})
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:"Failed at post controller"+error
        })
    }
}
export const getNewPosts = async(req, res) =>{
   
    try {
        const response = await services.getNewPostService()
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:"Failed at post controller"+error
        })
    }
}