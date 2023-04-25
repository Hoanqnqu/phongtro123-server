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
export const createNewPost = async(req, res) =>{
   
    try {
        const {categoryCode, title, priceNumber, areaNumber,label } = req.body
        const {id} = req.user
        if(!categoryCode ||!id || !title || !priceNumber || !areaNumber ||!label) return res.status(400).json({
            err:1,
            msg:'Missing inputs'
        })
        const response = await services.createNewPostService(req.body, id)
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err:-1 ,
            msg:"Failed at post controller"+error
        })
    }
}
export const getLimitPostsAdmin = async(req, res) =>{
    const {page,...query} = req.query
    const {id} = req.user

    try {
        if(!id) return res.status(400).json({
            err:1,
            msg:'Missing inputs'
        })
        const response = await services.getPostLimitAdminService(page,id, query)
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:"Failed at post controller"+error
        })
    }}
export const updatePost = async(req, res) =>{
  const {postId,overviewId, imagesID, attributesId, ...payload}  = req.body
  const {id} = req.user
   
    try {
        if( !postId|| !id|| !overviewId|| !imagesID|| !attributesId) 
        return res.status(400).json({
            err:1,
            msg:'Missing input'
        })
        const response = await services.updatePost(req.body)
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:"Failed at post controller"+error
        })
    }
}
export const deletePost = async(req, res) =>{
    console.log(req)
    const {postId}  = req.query
    console.log(11, postId);
    const {id} = req.user
     
      try {
          if(!postId|| !id) 
          return res.status(400).json({
              err:1,
              msg:'Missing input'
          })
          const response = await services.deletePost(postId)
          return res.status(200).json(response)
          
      } catch (error) {
          return res.status(500).json({
              err:-1,
              msg:"Failed at post controller"+error
          })
      }
  }