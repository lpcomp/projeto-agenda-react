import React, { useState, useEffect } from 'react';
import './styles.css';
import logo from '../../assets/images/ic-logo.svg';
import searchIcon from '../../assets/images/ic-search.svg';
import plusIcon from '../../assets/images/ic-plus.svg';

import { DeleteModal } from './components/DeleteModal';
import { EditModal } from './components/EditModal';
import { UserList } from './UserList';
import { BUTTON_CREATE_TEST_ID, ContactsMock } from './constants';
import { createColorFromName, filterContactsByQuery } from './utils';

function Notebook() {
  const [modalName, setModalName] = useState('');
  const [modalData, setModalData] = useState(undefined);
  
  const [contacts, setContacts] = useState(ContactsMock);
  const [searchResult, setSearchResult] = useState(contacts);
  const [ query, setQuery ] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {

      const editFresh = contacts.map(contact => {
        if (contact.fresh) {
          return { ...contact, fresh: false }
        } else {
          return contact;
        }
      });

      setContacts(editFresh);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [contacts]);

  useEffect(() => {
    if(query) {
      return setSearchResult(filterContactsByQuery(query, contacts));
    }

    return setSearchResult(contacts);
  }, [ query, contacts ]);

  function searchContacts(e) {
    setQuery(e.target.value);
  }

  function closeModal() {
    setModalName('');
    setModalData(undefined);
  }

  function openEditModal(contact = null) {
    setModalName('edit');
    setModalData(contact);
  }

  function openDeleteModal(contact = null) {
    setModalName('delete');
    setModalData(contact);
  }

  function onContactDelete(contact) {
    setContacts(contacts.filter(it => it.email !== contact.email ));
    closeModal();
  }

  function onContactEdit(contact) {
    const user = contacts.find(it => it.email === contact.email);
    
    if(!user) {
      setContacts([...contacts, {
        ...contact,
        letter: contact.name.split('')[0],
        pickColor: createColorFromName(contact.name),
        fresh: true,
      }]);
    } else {
      setContacts(contacts.map(it => {
        if(it.email !== contact.email) return it;
        return { ...it, ...contact }
      }))
    }
    
    closeModal();
  }

  return (
    <div className="boxNotebook">

      <header className="headerNotebook">
        <img src={logo} className="logoNotebook" alt="Logo" />

        <div className="boxRightHeader">
          <button
            style={{ display: contacts.length > 0 ? 'block' : 'none' }}
            className="btCreate"
            onClick={openEditModal}
            data-testid={BUTTON_CREATE_TEST_ID}
          >
            <img src={plusIcon} alt="Plus" />
            Criar contato
          </button>

          <div className="boxSearchNotebook">
            <input placeholder='Buscar...' onChange={(e) => searchContacts(e)} />
            <img src={searchIcon} alt="Search" />
          </div>
        </div>
      </header>

      <UserList 
        contacts={searchResult} 
        createContact={openEditModal} 
        editContact={openEditModal} 
        deleteContact={openDeleteModal} 
      />

      <DeleteModal onCloseModal={closeModal} isOpen={modalName === 'delete'} userData={modalData} onDelete={onContactDelete} />
      <EditModal onCloseModal={closeModal} isOpen={modalName === 'edit'} userData={modalData} onSave={onContactEdit} />

    </div>
  );
}

export default Notebook;
