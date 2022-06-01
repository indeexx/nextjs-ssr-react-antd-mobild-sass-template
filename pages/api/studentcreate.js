/*
 * @Author: indeex
 * @Date: 2019-05-19 19:58:15
 * @Email: indeex@qq.com
 */
import { prisma } from "../../utils/prisma"

export default async (req, res)=> {
    if(req.method !== 'POST'){
        return res.status(405).json({message:'Method not allowed'})
    }
    console.log(req.body);
    const studentCreate=await prisma.student.create({data:req.body})
    console.log(studentCreate);
    
    return res.status(201).json({message:'Student saved successu',student:studentCreate})
}