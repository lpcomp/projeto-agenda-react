import React, { useCallback, useEffect, useState } from 'react';

import { Modal } from '../../../components/Modal';
import { useForm } from '../hooks';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export const EditModal = ({
    onSave,
    onCloseModal,
    isOpen,
    userData = {}
}) => {
    const [ canSubmit, setCanSubmit ] = useState(false);
    const { getField, setField, formValues, setFormValues } = useForm(userData);

    useEffect(() => {
        setCanSubmit(!!formValues.name && !!formValues.email && !!formValues.telephone);
    }, [ formValues ]);

    useEffect(() => {

        if(!isOpen && formValues) {
            setFormValues({});
        } else if(isOpen && formValues !== userData) {
            setFormValues(userData);
        }
        
    }, [ isOpen ]) //eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = useCallback((e) => {
        if(e) e.preventDefault();

        onSave(formValues);
    }, [ formValues ]); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Modal
            className="contactContent"
            title={`${isEmpty(userData) ? 'Editar' : 'Criar'} contato`}
            isOpen={isOpen}
            onCancel={onCloseModal}
            onSubmit={onSubmit}
            testId={`${isEmpty(userData) ? 'edit' : 'create'}-modal`}
            onSubmitText="Salvar"
            canSubmit={canSubmit}
        >
            <form onSubmit={onSubmit}>
                <section className="contentDialog">
                    <label>
                        Nome
                    <input
                            name="name"
                            value={getField('name')}
                            onChange={setField('name')}
                            type="text"
                            data-testid="create-modal-name"
                            required
                        />
                    </label>

                    <label>
                        E-mail
                    <input
                            name="email"
                            value={getField('email')}
                            onChange={setField('email')}
                            type="email"
                            data-testid="create-modal-email"
                            required
                        />
                    </label>

                    <label>
                        Telefone
                    <input
                            name="telephone"
                            value={getField('telephone')}
                            onChange={setField('telephone')}
                            type="tel"
                            data-testid="create-modal-phone"
                            required
                        />
                    </label>
                </section>
            </form>
        </Modal>
    )
}