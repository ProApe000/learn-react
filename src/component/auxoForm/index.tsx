import React, { useEffect } from 'react';
import { Form as AuxoForm } from '@ecom/auxo-pro-form';
import { Slider, Space, Button, Modal, Form } from '@ecom/auxo';
// import { useAuxoFormDraft } from '@ecom/logistics-supply-chain-form-template';
// import { useFormDraft } from '@byted-house/form-draft';
import { useOkeeFormDraft } from './useOkeeFormDraft'
// import styles from './index.module.less'
import { sum } from '@/utils/math';
import { customDraftUseTipsFun } from './customDraftUseTipsFun'
const MyForm = () => {
    const [form] = Form.useForm();
    // useEffect(() => {
    //     form?.onValuesChange(() => {
    //         console.log('changedValues changedValues'); 
    //     })

    // }, [form])
    const { onSubmit, removeDraft } = useOkeeFormDraft('test-draft', form, {
        duration: 5,
        useId: '001',
        autoApplyModal: false,
        messageProps: {
            duration: 60
        },
        customMessageTips: (...rest) => customDraftUseTipsFun(null, ...rest),
        customGetFormDataFun: (form: any) => {
            console.log('wow field change', form?.getFieldsValue())
            return form?.getFieldsValue();
        },
        customSetFormDataFun: (form: any, data: any) => {
            console.log('wow form data', form, data)
            form?.setFieldsValue(data);
        },
    })
    // const { onSubmit, removeDraft } = useFormDraft({
    //     useId: '001',
    //     autoApplyModal: true,
    //     customGetFormDataFun: (form: any) => {
    //         return form?.getFieldsValue();
    //     },
    //     customSetFormDataFun: (form: any, data: any) => {
    //         form?.setFieldsValue(data);
    //     },
    //     formInstances: { 'test-draft': form },
    //     duration: 5,
    // })
    console.log('sum', sum(1, 2));
    return (
        <div style={{ height: '500px', width: '500px', marginTop: '20px' }}>
            <AuxoForm
                form={form as any}
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
                        <Button type="primary" onClick={() => {
                            const values = form.getFieldsValue();
                            console.log('values', values);
                        }}>
                            提交
                        </Button>
                        <Button htmlType="reset">重置</Button>
                    </Space>
                </Form.Item>
            </AuxoForm>

        </div >
    );
};

export default MyForm;