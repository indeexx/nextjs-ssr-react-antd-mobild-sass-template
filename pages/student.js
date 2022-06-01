/*
 * @Author: indeex
 * @Date: 2019-05-19 19:54:39
 * @Email: indeex@qq.com
 */
import StudentForm from '../component/studentForm';
import { prisma } from '../utils/prisma';
import React, { useState, useEffect } from 'react';
import { List, Tag } from 'antd-mobile';
import { EditSOutline, DeleteOutline } from "antd-mobile-icons";
import styles from "./../styles/student/Student.module.scss"

export const getStaticProps = async (ctx) => {
    const students = await prisma.student.findMany()

    return {
        props: {
            students: students
        }
    }
}

const Student = (props) => {
    console.log(props);
    const { students } = props

    const [studentList, setStudentList] = useState([])

    const [studentDetails, setStudentDetails] = useState({
        id: '',
        name: '',
        roll_no: 0,
        city: ''
    })

    useEffect(() => {
        setStudentList(students)
    }, [students])

    const onDelete = async (id) => {
        const deleteId = JSON.stringify({ id })
        await fetch('/api/studentdelete', {
            method: "DELETE",
            body: deleteId
        })
        let studentListDemo = [...studentList]
        let yo = studentListDemo.filter((c => c.id !== id))
        setStudentList(yo)
    }
    const onUpdate = (id) => {
        let yo = studentList.filter((c => c.id === id))
        if (yo.length > 0) {
            setStudentDetails({
                id: id,
                name: yo[0].name,
                roll_no: yo[0].roll_no,
                city: yo[0].city
            })
        }
    }

    return (
        <section className={styles.student}>
            <div className={styles.formDiv}>
                <StudentForm
                    setStudentList={setStudentList}
                    studentList={studentList}
                    setStudentDetails={setStudentDetails}
                    studentDetails={studentDetails} />
            </div>
            <div className={styles.studentList}>
                <div className={styles.tags}>
                    {/* <Tag color='primary' fill='outline' className={styles.tag}>
                        ID
                    </Tag> */}
                    <Tag color='primary' fill='outline' className={styles.tag}>
                        排序
                    </Tag>
                    <Tag color='primary' fill='outline' className={styles.tag}>
                        名字
                    </Tag>
                    <Tag color='primary' fill='outline' className={styles.tag}>
                        籍贯
                    </Tag>
                    <Tag color='primary' fill='outline' className={styles.tag}>
                        编辑
                    </Tag>
                    <Tag color='primary' fill='outline' className={styles.tag}>
                        删除
                    </Tag>
                </div>
                <List header='' className={styles.list}>
                    {studentList.map((c, i) => (
                        <List.Item className={styles.listItem}>
                            {/* <Tag color='primary' fill='outline' className={styles.tag}>
                                {c.id}
                            </Tag> */}
                            <Tag color='primary' fill='outline' className={styles.itemTag}>
                                {c.roll_no}
                            </Tag>
                            <Tag color='primary' fill='outline' className={styles.itemTag}>
                                {c.name}
                            </Tag>
                            <Tag color='primary' fill='outline' className={styles.itemTag}>
                                {c.city}
                            </Tag>
                            <Tag color='primary' fill='outline' className={styles.itemTag + " " + styles.edit}>
                                <EditSOutline onClick={id => onUpdate(c.id)} />
                            </Tag>
                            <Tag color='primary' fill='outline' className={styles.itemTag + " " + styles.delete}>
                                <DeleteOutline onClick={id => onDelete(c.id)} />
                            </Tag>
                        </List.Item>
                    ))}
                </List>
            </div>
        </section>
    )
}
export default Student;