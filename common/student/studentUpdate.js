/*
 * @Author: indeex
 * @Date: 2019-05-19 19:54:39
 * @Email: indeex@qq.com
 */
import { prisma } from "../../utils/prisma";

export default async (req, res) => {
    console.log(req.body);
    const updatedData = req.body
    if (req.method !== 'PATCH') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    const studentUpdate = await prisma.student.update({
        where: {
            id: updatedData.id
        },
        data: {
            name: updatedData.name,
            roll_no: updatedData.roll_no,
            city: updatedData.city
        }
    })

    res.status(200).json({ message: 'Student updated successfully.', student: studentUpdate })
}