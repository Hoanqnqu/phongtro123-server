import db from "../models";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import chothuecanho from "../../data/chothuecanho.json";
import chothuematbang from "../../data/chothuematbang.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import nhachothue from "../../data/nhachothue.json";

import {dataArea, dataPrice}from '../ultis/data'
import {useSearchParams}from '../ultis/common'

import generateCode from "../ultis/generateCode";
import { stringToDate } from "../ultis/generateCode";



require("dotenv").config();

const hashPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(12));
const datas = [{data:nhachothue,value:'Nhà cho thuê', code:'NCT'},{data:chothuematbang,value:'Cho thuê mặt bằng', code:'CTMB'},{data:chothuephongtro,value:'Cho thuê phòng trọ', code:'CTPT'},{data:chothuecanho, value:'Cho thuê căn hộ', code:'CTCH'}]
export const insertService = () =>
    new Promise(async (resolve, reject) => {
        try {
            var provinceCodes = []
            var labelCodes = []

            datas.forEach( async data=>{
                await db.Category.create({
                    code:  data.code,
                    value: data.value,
                    header: data.data?.header?.title,
                    subheader: data.data?.header?.description,
                });
                
                // data.data.body.forEach(async (item, index) => {

                //     let labelCode = generateCode( item?.header?.class?.classType).trim();
                //     let provinceCode=generateCode(item?.header?.adderss?.split(',')?.slice(-1)[0]).trim()
                //     if(labelCodes?.every(item=> item?.code !== labelCode)){
                //         labelCodes.push({
                //             code:labelCode,
                //             value:item?.header?.class?.classType?.trim()
                //         })
                //     } 
                 
                //     if( provinceCodes?.every(item=> item?.code !== provinceCode)) {
                //         provinceCodes.push({
                //             code:provinceCode,
                //             value:item?.header?.adderss?.split(',')?.slice(-1)[0].trim()
                //     })}
                   
                //     let postId = v4();
                    
                //     let attributesId = v4();
                //     let userId = v4();
                //     let overviewId = v4();
                //     let imagesID = v4();
                //     let currentArea = useSearchParams(item?.header?.attributes?.acreage)
                //     let currentPrice = useSearchParams(item?.header?.attributes?.price)
                   
    
                //     await db.Post.create({
                //         id: postId,
                //         title: item?.header?.title,
                //         star: item?.header?.star,
                //         labelCode,
                //         address: item?.header?.adderss,
                //         attributesId,
                //         categoryCode: data.code,
                //         description: JSON.stringify(item?.mainContent?.content),
                //         userId,
                //         overviewId,
                //         imagesID,
                //         priceCode:dataPrice.find(price => price.max > currentPrice && price.min<= currentPrice)?.code,
                //         areaCode: dataArea.find(area => area.max > currentArea && area.min<= currentArea)?.code,
                //         provinceCode,
                //         priceNumber:currentPrice,
                //         areaNumber:currentArea
                //     });
                //     await db.Attribute.create({
                //         id: attributesId,
                //         price: item?.header?.attributes?.price,
                //         acreage: item?.header?.attributes?.acreage,
                //         published: item?.header?.attributes?.published,
                //         hashtag: item?.header?.attributes?.hashtag,
                //     });
                
                //     await db.User.create({
                //         id: userId,
                //         name: item?.contact?.content.find(
                //             (i) => i.name === "Liên hệ:"
                //         )?.content,
                //         password: hashPassword("123456"),
                //         phone: item?.contact?.content.find(
                //             (i) => i.name === "Điện thoại:"
                //         )?.content,
                //         zalo: item?.contact?.content.find((i) => i.name === "Zalo")
                //             ?.content,
                //     });
                //     await db.Overview.create({
                //         id: overviewId,
                //         code: item?.overview?.content.find(
                //             (i) => i.name === "Mã tin:"
                //         )?.content,
                //         area: item?.overview?.content.find(
                //             (i) => i.name === "Khu vực"
                //         )?.content,
                //         type: item?.overview?.content.find(
                //             (i) => i.name === "Loại tin rao:"
                //         )?.content,
                //         target: item?.overview?.content.find(
                //             (i) => i.name === "Đối tượng thuê:"
                //         )?.content,
                //         bonus: item?.overview?.content.find(
                //             (i) => i.name === "Gói tin:"
                //         )?.content,
                //         created: stringToDate(
                //             item?.overview?.content.find(
                //                 (i) => i.name === "Ngày đăng:"
                //             )?.content
                //         ),
                //         expired: stringToDate(
                //             item?.overview?.content.find(
                //                 (i) => i.name === "Ngày hết hạn:"
                //             )?.content
                //         ),
                //     });
    
                //     await db.Image.create({
                //         id: imagesID,
                //         image: JSON.stringify(item?.images),
                //     });
                // });
               
            })
         
            provinceCodes.forEach(async(item)=>{
                await db.Province.create(item)
            })
            labelCodes.forEach(async(item)=>{
                await db.Label.create(item)
            })
            resolve("Done....");
        } catch (error) {
            reject(error);
        }
    });

    
 export const createPricesAndAreas = ()=> new Promise((resolve, reject)=>{
    try{
        dataPrice.forEach(async(item, index)=>{
            await db.Price.create({
             
                order:index+1,
                code: item.code,
                value:item.value
            })
        })
        dataArea.forEach(async(item, index)=>{
            await db.Area.create({
               
                order:index+1,
                code: item.code,
                value:item.value
            })
        })
        resolve('OK')
    }catch(err){
        reject(err)
    }
})