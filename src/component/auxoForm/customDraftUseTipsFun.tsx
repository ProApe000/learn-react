import { Modal } from '@okee-uikit/react';
export const customDraftUseTipsFun = (
    parentInfo: any,
    payload: any,
    apply: () => void,
    cancel: (type: 'cancel' | 'auto_cancel') => void,
) => {
    console.log('wccc payload customDraftUseTipsFun', payload, parentInfo);
    const confirm = Modal.confirm({
        width: '416px',
        height: '176px',
        title: '检测到上次有未提交的信息，继续填写',
        okButtonProps: { variant: ['fill'] },
        cancelButtonProps: { variant: ['fill'] },
        closeable: true,
        children: (
            <div>
                楼盘：
                {parentInfo?.base_info?.court_name ||
                    payload?.data?.form?.offlineName ||
                    payload?.data?.form?.court_name ||
                    '-'}
            </div>
        ),
        okText: '继续填写',
        cancelText: '取消',
        onOk: () => {
            apply();
            confirm.destroy();
        },
        onCancel: () => {
            cancel('cancel');
            confirm.destroy();
        },
    });
};
