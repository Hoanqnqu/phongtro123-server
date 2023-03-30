import db from '../models'
import { Op } from 'sequelize'
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
export const getPostLimitService = (offset, query,{priceNumber,areaNumber})=> new Promise(async(resolve, reject)=>{
    try {
        let offset_ = (!offset|| +offset<=1)?0:(+offset-1)
        const queries = { ...query }
        if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber }
        if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber }
        const response = await db.Post.findAndCountAll({
            where: queries,
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
export const getNewPostService = ()=> new Promise(async(resolve, reject)=>{
    try {     
        const response = await db.Post.findAll({          
            raw: true,
            nest:true,
            offset:0,
            order:[['createdAt','DESC']],
            limit:+process.env.LIMIT,
            include:[
                {model:db.Image, as:'images', attributes:['id','image']},
                {model:db.Attribute, as:'attributes', attributes:['price', 'acreage', 'published', 'hashtag']},
               
            ],
            attributes:['id', 'title','star','createdAt']
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