import { useState } from "react";

export function useForm(initialValue) {
    const [ formValues, setFormValues ] = useState({});

    const getField = (fieldName, defaultValue = '') => formValues[fieldName] || defaultValue;
    const setField = (fieldName) => (e) => {
        const value = e.target.value;
        setFormValues({ ...formValues, [fieldName]: value });
    }

    return {
        getField,
        setField,
        setFormValues,
        formValues
    };
}

export function useModalHandler() {
    
}