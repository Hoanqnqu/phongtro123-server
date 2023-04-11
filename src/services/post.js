import db from '../models'
import { Op } from 'sequelize'
import {v4 as generateId} from 'uuid'
import generateCode from "../ultis/generateCode";
import moment  from 'moment/moment';

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
            order:[['createdAt','DESC']],
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
export const createNewPostService = (body, userId)=> new Promise(async(resolve, reject)=>{
    try {   
        
        const attributesId = generateId()
        const imagesId =generateId()
        const overviewId = generateId()
        const labelCode = generateCode(body.label)
        const hashtag = `#${Math.floor(Math.random()* Math.pow(10,6))}`
        const currentData = new Date()
       await db.Post.create({
            id:generateId(),
            title:body.title,     
            labelCode,
            address: body.address||null,
            attributesId,
            categoryCode: body.categoryCode,
            description: JSON.stringify(body.description)||null,
            userId,
            overviewId,
            imagesID:imagesId,
            priceCode:body.priceCode||null,
            areaCode: body.areaCode||null,
            provinceCode:body?.province?.includes('Thành phố')? generateCode(body.province?.replace('Thành phố', '')): generateCode(body?.province?.replace('Tỉnh', ''))||null,
            priceNumber: body.priceNumber,
            areaNumber:body.areaNumber
        })
        await db.Attribute.create({
            id: attributesId,
            price: +body.priceNumber < 1? `${+body.priceNumber * 1000000} đồng/ tháng`:`${body.priceNumber} triệu/ tháng`,
            acreage: `${body.areaNumber} m2`,
            published: moment(new Date).format('DD/MM/YYYY'),
            hashtag
        });
    
        await db.Overview.create({
            id: overviewId,
            code: hashtag,
            area: body.label,
            type: body?.category,
            target: body?.target,
            bonus: 'Tin thường',
            created: currentData,
            expired: currentData.setDate(currentData.getDate()+10),
                    });
        await db.Image.create({
            id: imagesId,
            image: JSON.stringify(body.images),
        });
        await db.Province.findOrCreate({
            where:{
                [Op.or]:[
                    {value:body?.province?.replace('Thành phố', '')},
                    {value:body?.province?.replace('Tỉnh', '')}
                ]
            },
            defaults:{
                code:body?.province?.includes('Thành phố')? generateCode(body.province?.replace('Thành phố', '')): generateCode(body?.province?.replace('Tỉnh', '')),
                value:body?.province?.includes('Thành phố')?body.province?.replace('Thành phố', ''): body?.province?.replace('Tỉnh', '')
            }
        })
        await db.Label.findOrCreate({
            where:{
                code: labelCode
            },
            defaults:{
                code:labelCode,
                value:body?.label
            }
        })
        resolve({
            err:0,
            msg:'Ok',
           
        })
    } catch (error) {
        reject(error)
    }
})