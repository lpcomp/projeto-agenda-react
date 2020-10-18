import React, { useState, useEffect } from 'react';
import './styles.css';
import logo from '../../assets/images/ic-logo.svg';
import searchIcon from '../../assets/images/ic-search.svg';
import plusIcon from '../../assets/images/ic-plus.svg';
import contactlessIcon from '../../assets/images/ic-book.svg';

import Table from '../../components/Table';

function Notebook() {
  const [showModal, setShowModal] = useState('none');
  const [modalContact, setModalContact] = useState('none');
  const [modalDelete, setModalDelete] = useState('none');  
  
  const [opacityBt, setOpacityBt] = useState(0.5);
  const [pointerBt, setPointerBt] = useState('none');
  const [titleModal, setTitleModal] = useState('Criar novo');

  const [emailDeleted, setEmailDeleted] = useState('');
  
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    telephone: ""
  });

  const [searchResult, setSearchResult] = useState([]);
  const [contacts, setContacts] = useState([
    {
      name: 'Luiz',
      email: 'teste@gmail.com',
      telephone: '(11)997013533',
      letter: 'L',
      pickColor: '#fab668'
    },
    {
      name: 'João',
      email: 'joao@gmail.com',
      telephone: '(11)997014533',
      letter: 'J',
      pickColor: '#90d26c'
    },
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {

      const editFresh = contacts.map(contact => {
        if(contact.fresh){
          return { ...contact, fresh: false }
        } else {
          return contact;
        }
      });

      setContacts(editFresh);

    }, 10000);

    return () => clearTimeout(timeout);
  }, [contacts]);

  function newContact() {
    setDataForm({name: "", email: "", telephone: ""});
    setTitleModal('Criar novo');

    setShowModal('flex');
    setModalContact('block');
  }

  function openDeleteModal(email) {
    setEmailDeleted(email);
    setOpacityBt(1);
    setPointerBt('all');

    setShowModal('flex');
    setModalDelete('block');
  }

  function closeContact() {
    setShowModal('none');
    setModalContact('none');
    setModalDelete('none');

    setOpacityBt(0.5);
    setPointerBt('none');
  }  

  const handleChangeInput = e =>{
   
    const { name, value } = e.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value
    }));

    setOpacityBt(1);
    setPointerBt('all');

  }

  function handleContact(event) {
    event.preventDefault();

    const verifyEmail = contacts.find(contact => dataForm.email === contact.email);    

    if(verifyEmail){
      
      const editFormContact = contacts.map(contact => {
        if(contact.email === verifyEmail.email){
          return { 
            name: dataForm.name,
            email: dataForm.email, 
            telephone: dataForm.telephone,
            letter: dataForm.letter,
            pickColor: dataForm.pickColor
          }          
        } else {
          return contact;
        }
      });
      console.log(editFormContact);
      setContacts(editFormContact);

    }else{
      const colors = ['#fa8d68', '#90d26c', '#68a0fa', '#fab668', '#8368fa', '#fa68b5', '#5fe2c4', '#f55a5a'];
      const letter = dataForm.name.split('')[0];
      const pickColor = colors[Math.floor(Math.random() * colors.length)];

      setContacts([...contacts, {...dataForm, fresh: true, letter, pickColor}]);
    }
    
    console.log(contacts);
    
    closeContact();
  }

  function editContact(emailEdit) {
    const contact = contacts.find(contact => emailEdit === contact.email);
    setOpacityBt(1);
    setPointerBt('all');
    
    newContact();
    setTitleModal('Editar');

    setDataForm(
      contact
    );
    
  }

  function deleteContact() {
    setContacts(contacts.filter(contact => contact.email !== emailDeleted));
    closeContact();
  }

  function searchContacts(e) {
    let tempSearch = e.target.value;

    const result = contacts.filter( contact => contact.name.toLowerCase().includes(tempSearch.toLowerCase()) || contact.email.toLowerCase().includes(tempSearch.toLowerCase()));
    console.log(result);
    console.log(tempSearch);
    setSearchResult( tempSearch !== '' ? result : [] );
  }

  return (
    <div className="boxNotebook">

      <header className="headerNotebook">
        <img src={logo} className="logoNotebook" />

        <div className="boxRightHeader">
          <button 
            style={{ display: contacts.length > 0 ? 'block' : 'none' }}
            className="btCreate" 
            onClick={()=> newContact()}
          >
            <img src={plusIcon} />
            Criar contato
          </button>

          <div className="boxSearchNotebook">
            <input placeholder='Buscar...' onChange={(e) => searchContacts(e)} />
            <img src={searchIcon} />
          </div> 
        </div>               
      </header>

      {contacts.length > 0 ? (
        <Table
          contacts={ searchResult.length > 0 ? searchResult : contacts }
          editContact={editContact} 
          openDeleteModal={openDeleteModal} 
        />
      ) : (
        <section className="contactless">
          <img src={contactlessIcon} />
          <p>Nenhum contato foi criado ainda.</p>
          <button className="btCreate" onClick={()=> newContact()}>
            <img src={plusIcon} />
            Criar contato
          </button>
        </section>
      )}      
        
      <div style={{ display: showModal }} className="boxDialog">

          <section className="boxDialogContent">
            
            <section style={{ display: modalContact }} className="contactContent">
              <form onSubmit={handleContact}>
                <header>
                  <p>{titleModal} contato</p>
                </header>
                <section className="contentDialog">

                  <label>
                    Nome
                    <input 
                      name="name"
                      value={dataForm.name}
                      type="text" 
                      onChange={handleChangeInput}
                      required
                    />
                  </label>
                  
                  <label>
                    E-mail
                    <input
                      name="email"
                      value={dataForm.email}
                      type="email" 
                      onChange={handleChangeInput}
                      required
                    />
                  </label>
                  
                  <label>
                    Telefone
                    <input
                      name="telephone"
                      value={dataForm.telephone}
                      type="tel"
                      onChange={handleChangeInput}
                      required
                    />
                  </label>                    
                  
                </section>
                <footer>
                  <button type="button" onClick={()=> closeContact()} >Cancelar</button>
                  <button type="submit" style={{ opacity: opacityBt, pointerEvents: pointerBt }}>Salvar</button>
                </footer>
              </form>
            </section>

            <section style={{ display: modalDelete }} className="deleteContent">
                <header>
                  <p>Excluir contato</p>
                </header>
                <section className="contentDialog">
                  <p>Deseja realmente excluir o contato?</p>
                </section>
                <footer>
                  <button type="button" onClick={()=> closeContact()} >Cancelar</button>
                  <button type="submit" style={{ opacity: opacityBt, pointerEvents: pointerBt }} onClick={()=> deleteContact()} >Excluir</button>
                </footer>              
            </section>
            
          </section>

        </div>
      </div>
  );
}

export default Notebook;
