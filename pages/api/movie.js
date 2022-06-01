/*
 * @Author: indeex
 * @Date: 2019-05-19 19:58:15
 * @Email: indeex@qq.com
 */
import { prisma } from "../../utils/prisma"

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" })
    }

    const movieData = JSON.parse(req.body)

    const savedContact = await prisma.movie.create({
        data: movieData
    })
    res.status(201).json(savedContact)
}