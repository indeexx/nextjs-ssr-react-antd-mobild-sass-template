/*
 * @Author: indeex
 * @Date: 2019-05-19 19:54:39
 * @Email: indeex@qq.com
 */
import { prisma } from "../../utils/prisma";

export default async (req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    const data = JSON.parse(req.body)
    if (data.id) {
        await prisma.student.delete({
            where: {
                id: data.id,
            },
        })
        return res.status(200).json({ message: 'Student deleted successfully' })
    } else {
        return res.status(400).json({ message: 'Bad Request' })
    }

}