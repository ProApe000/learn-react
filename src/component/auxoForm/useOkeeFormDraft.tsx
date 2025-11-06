import { useFormDraft, DraftConfig } from '@byted-house/form-draft';
// import { FormInstance } from '@ecom/auxo-pro-form/es/types';
import { FormInstance } from '@ecom/auxo';
import { useEffect } from 'react';

const HOOK_MARK = 'RC_FORM_INTERNAL_HOOKS';
export interface OkeeFormDraftConfig<T> extends Omit<DraftConfig<T>, 'formInstances' | 'key'> {

}
export function watchFormInstance(form: FormInstance, callback: (values: any, allValues?: any) => void) {
    const { registerWatch } = (form as any)?.getInternalHooks?.(HOOK_MARK) ?? {};
    const cancelRegister = registerWatch?.(callback);
    return cancelRegister as () => void;
}
export function useOkeeFormDraft<T>(key: string, form: FormInstance, config: OkeeFormDraftConfig<T>) {
    const formInstances = config?.formInstances ?? { form }
    if (!key) {
        return {}
    }
    const options = useFormDraft({
        key,
        formInstances,
        ...config

    })
    // 监听form变更
    useEffect(() => {
        const cancelActions = Object.entries(!config?.disabled ? formInstances ?? {} : {}).map(
            ([currentFormName, _form]) => {
                console.log('wow form', _form)
                const cancelRegister = watchFormInstance(_form, () => {
                    options.onLife();
                    options.autoSaveDraft()
                });
                return cancelRegister;
            }
        );
        return () => {
            cancelActions.forEach(f => f?.());
        };
    }, []);
    return options

}


