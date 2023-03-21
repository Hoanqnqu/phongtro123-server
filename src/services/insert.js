import db from "../models";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import chothuecanho from "../../data/chothuecanho.json";
import chothuematbang from "../../data/chothuematbang.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import nhachothue from "../../data/nhachothue.json";

import generateCode from "../ultis/generateCode";
import { stringToDate } from "../ultis/generateCode";
const data = nhachothue;
const dataBody = data.body;
require("dotenv").config();

const hashPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = () =>
    new Promise(async (resolve, reject) => {
        try {
            await db.Category.create({
                code: "NCT",
                value: "Nhà cho thuê",
                header: data?.header?.title,
                subheader: data?.header?.description,
            });
            dataBody.forEach(async (item) => {
                let postId = v4();
                let labelCode = generateCode( item?.header?.class?.classType);
                let attributesId = v4();
                let userId = v4();
                let overviewId = v4();
                let imagesID = v4();

                await db.Post.create({
                    id: postId,
                    title: item?.header?.title,
                    star: item?.header?.star,
                    labelCode,
                    address: item?.header?.adderss,
                    attributesId,
                    categoryCode: "NCT",
                    description: JSON.stringify(item?.mainContent?.content),
                    userId,
                    overviewId,
                    imagesID,
                });
                await db.Attribute.create({
                    id: attributesId,
                    price: item?.header?.attributes?.price,
                    acreage: item?.header?.attributes?.acreage,
                    published: item?.header?.attributes?.published,
                    hashtag: item?.header?.attributes?.hashtag,
                });
                await db.Label.findOrCreate({
                    where: { code: labelCode },
                    defaults: {
                        code: labelCode,
                        value: item?.header?.class?.classType
                    },
                });
                await db.User.create({
                    id: userId,
                    name: item?.contact?.content.find(
                        (i) => i.name === "Liên hệ:"
                    )?.content,
                    password: hashPassword("123456"),
                    phone: item?.contact?.content.find(
                        (i) => i.name === "Điện thoại:"
                    )?.content,
                    zalo: item?.contact?.content.find((i) => i.name === "Zalo")
                        ?.content,
                });
                await db.Overview.create({
                    id: overviewId,
                    code: item?.overview?.content.find(
                        (i) => i.name === "Mã tin:"
                    )?.content,
                    area: item?.overview?.content.find(
                        (i) => i.name === "Khu vực"
                    )?.content,
                    type: item?.overview?.content.find(
                        (i) => i.name === "Loại tin rao:"
                    )?.content,
                    target: item?.overview?.content.find(
                        (i) => i.name === "Đối tượng thuê:"
                    )?.content,
                    bonus: item?.overview?.content.find(
                        (i) => i.name === "Gói tin:"
                    )?.content,
                    created: stringToDate(
                        item?.overview?.content.find(
                            (i) => i.name === "Ngày đăng:"
                        )?.content
                    ),
                    expired: stringToDate(
                        item?.overview?.content.find(
                            (i) => i.name === "Ngày hết hạn:"
                        )?.content
                    ),
                });

                await db.Image.create({
                    id: imagesID,
                    image: JSON.stringify(item?.images),
                });
            });
            resolve("Done....");
        } catch (error) {
            reject(error);
        }
    });
