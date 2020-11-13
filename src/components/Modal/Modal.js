import React from 'react';

const noop = () => { }

export const Modal = ({ testId, isOpen, title, className, children, onCancel, canSubmit, onSubmit, onCancelText = 'Cancelar', onSubmitText }) => (
    <div style={{ display: isOpen ? 'flex': 'none' }} data-testid={testId} className="boxDialog">
        <section className="boxDialogContent">
            <section className={className}>
                <header>
                    <p>{title}</p>
                </header>
                <section className="contentDialog">
                    {children}
                </section>
                <footer>
                    <button type="button" data-testid={`${testId}-cancel-btn`} onClick={onCancel} >{onCancelText}</button>
                    <button type="submit" data-testid={`${testId}-submit-btn`} style={{ opacity: canSubmit ? '1' : '0.5' }} onClick={canSubmit ? onSubmit : noop} >{onSubmitText}</button>
                </footer>
            </section>
        </section>
    </div>
)