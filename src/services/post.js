import db from '../models'

export const getPostService = ()=> new Promise(async(resolve, reject)=>{
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest:true,
            include:[
                {model:db.Image, as:'images', attributes:['id','image']},
                {model:db.Attribute, as:'attributes', attributes:['price', 'acreage', 'published', 'hashtag']},
                {model:db.User, as:'user', attributes:['name', 'zalo', 'phone']}
            ],
            attributes:['id', 'title','star', 'address','description']
        })
        resolve({
            err: response? 0:1,
            msg: response? 'Ok': 'Failed to get postService',
            response
        })
    } catch (error) {
        reject(error)
    }
})
export const getPostLimitService = (offset, query)=> new Promise(async(resolve, reject)=>{
    try {
        let offset_ = (!offset|| +offset<=1)?0:(+offset-1)
        const response = await db.Post.findAndCountAll({
            where:query,
            raw: true,
            nest:true,
            offset:offset_ * +process.env.LIMIT,
            limit:+process.env.LIMIT,
            include:[
                {model:db.Image, as:'images', attributes:['id','image']},
                {model:db.Attribute, as:'attributes', attributes:['price', 'acreage', 'published', 'hashtag']},
                {model:db.User, as:'user', attributes:['name', 'zalo', 'phone']}
            ],
            attributes:['id', 'title','star', 'address','description']
        })
        resolve({
            err: response? 0:1,
            msg: response? 'Ok': 'Failed to get postService',
            response
        })
    } catch (error) {
        reject(error)
    }
})