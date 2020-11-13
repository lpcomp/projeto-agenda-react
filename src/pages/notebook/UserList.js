import React from 'react';

import plusIcon from '../../assets/images/ic-plus.svg';
import contactlessIcon from '../../assets/images/ic-book.svg';
import Table from '../../components/Table';

const NotFoundContacts = ({ openCreateContactModal }) => (
    <section className="contactless">
        <img src={contactlessIcon} alt="Contactless" />
        <p>Nenhum contato foi criado ainda.</p>
        <button className="btCreate" onClick={openCreateContactModal}>
            <img src={plusIcon} alt="Adicionar" />
            Criar contato
          </button>
    </section>
)

const UserListComponent = ({ openEditModal, openDeleteModal, contacts }) => (
    <Table
        contacts={contacts}
        editContact={openEditModal}
        openDeleteModal={openDeleteModal}
    />
)

export const UserList = ({ contacts, createContact, deleteContact, editContact }) => contacts.length > 0 ?
    <UserListComponent openEditModal={editContact} openDeleteModal={deleteContact} contacts={contacts} /> :
     <NotFoundContacts openCreateContactModal = { createContact } />