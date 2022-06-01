/*
 * @Author: indeex
 * @Date: 2019-05-19 19:54:39
 * @Email: indeex@qq.com
 */
import React, { useRef, useState } from 'react'
import { Form, Input, Button } from 'antd-mobile'
import styles from "./../styles/student/studentForm.module.scss"

const StudentForm = (props) => {
    const { setStudentList, studentList, setStudentDetails, studentDetails } = props

    const [form] = Form.useForm()

    const { id, name, roll_no, city } = studentDetails
    console.log(typeof (id), id);
    console.log(name, roll_no, city)
    const lock = useRef(false);

    const handleCompositionStart = (e) => {//是否在使用输入法
        lock.current = true;
    }

    const handleCompositionEnd = (e) => {
        lock.current = false;
        //Chrome浏览器执行顺序：compositionstart onChange compositionend
        //Firefox浏览器执行顺序：compositionstart compositionend onChange
        if (navigator.userAgent.indexOf('Chrome') > -1)//const isChrome = !!window.chrome && !!window.chrome.webstore
            setStudentDetails({
                ...studentDetails
            })
    }

    const onChange = (value) => {
        console.log(value, name, roll_no, city, lock.current)
        if (!lock.current) setStudentDetails({
            ...studentDetails
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        let {name, city, roll_no} = form.getFieldsValue()//注意和全局的同名变量区别
        roll_no = parseInt(roll_no);
        form.resetFields()
        if (id === '') {
            const body = JSON.stringify({ name, roll_no, city })
            const res = await fetch('/api/studentcreate', {
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                },
                body: body
            })
            const data = await res.json()
            console.log(data);
            if (data.student) {
                setStudentList(prev => [...prev, data.student])
            }
        } else {
            const body = JSON.stringify({ id, name, roll_no, city })
            await fetch('/api/studentupdate', {
                method: "PATCH",
                headers: {
                    'content-Type': 'application/json'
                },
                body: body
            })
            const studentListt = [...studentList]
            const index = studentList.findIndex(v => v.id === id)
            studentListt[index].name = name
            studentListt[index].roll_no = roll_no
            studentListt[index].city = city
            setStudentList(studentListt)


        }

    }
    return (
        <div className={styles.studentForm}>
            <h1>大学生信息录入</h1>
            <small className={styles.tip}>一般先输入姓名，后设置学好会符合习惯一点</small>
            <Form layout='horizontal' mode='card' form={form} footer={
                <Button block type='submit' color='primary' size='large' onClick={onSubmit}>
                    提交
                </Button>
            }>
                <Form.Header />
                <Form.Header />
                <Form.Header />
                <Form.Item label='姓名' name="name">
                    <Input maxLength={4} placeholder='请输入姓名' onCompositionStart={handleCompositionStart} onCompositionEnd={handleCompositionEnd} onChange={onChange} defaultValue={name} />
                </Form.Item>
                <Form.Item label='籍贯' name="city">
                    <Input maxLength={10} placeholder='请输入籍贯' onChange={onChange} defaultValue={city} />
                </Form.Item>
                <Form.Item label='排序' name="roll_no">
                    <Input type={"number"} placeholder='请输入序号' onChange={onChange} defaultValue={roll_no || ""} />
                </Form.Item>
                <Form.Header />
                <Form.Header />
            </Form>
        </div>
    )
}
export default StudentForm