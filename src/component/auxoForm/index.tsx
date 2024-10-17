import React from 'react';
import { Form } from '@ecom/auxo-pro-form';
import { Slider, Space, Button, Modal } from '@ecom/auxo';
import styles from './index.module.less'

const MyForm = () => {
    return (
        <Form
            layout="horizontal"
            labelCol={{ span: 4 }}
            pJson={[
                {
                    label: '文本',
                    name: 'Input',
                    type: 'text',
                    rules: [{ required: true }],
                },
                {
                    label: '数字',
                    name: 'InputNumber',
                    type: 'number',
                },
                {
                    label: '下拉选择',
                    name: 'Select',
                    type: 'enum',
                    enums: [
                        {
                            label: 'Demo',
                            value: 'demo',
                        },
                    ],
                },
                {
                    label: '级联选择',
                    name: 'Cascader',
                    type: 'cascader',
                    props: {
                        options: [
                            {
                                value: 'zhejiang',
                                label: 'Zhejiang',
                                children: [
                                    {
                                        value: 'hangzhou',
                                        label: 'Hangzhou',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    label: '日期',
                    name: 'DatePicker',
                    type: 'date',
                },
                {
                    label: '开关',
                    name: 'Switch',
                    type: 'switch',
                },
                {
                    label: '自定义',
                    name: 'Slider',
                    type: 'custom',
                    children: <Slider />,
                },
            ]}
            onFinish={values => {
                Modal.info({
                    title: 'onFinish',
                    content: <pre>{JSON.stringify(values, null, 2)}</pre>,
                });
            }}>
            <Form.Item wrapperCol={{ span: 18, offset: 2 }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                    <Button htmlType="reset">重置</Button>
                </Space>
            </Form.Item>
        </Form>

    );
};

export default MyForm;