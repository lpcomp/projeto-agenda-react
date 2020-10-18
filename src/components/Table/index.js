import React from 'react';
import './styles.css';
import editIcon from '../../assets/images/ic-edit.svg';
import deleteIcon from '../../assets/images/ic-delete.svg';

function Table(props) {   
    
    return (
        <section className="tableContacts">
          <table>
            <thead>
              <tr>
                <th>Contatos</th>  
                <th>E-mail</th>
                <th>Telefone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {            
                props.contacts.map(contact => (
                  <tr key={contact.email} style={{ backgroundColor: contact.fresh? '#fff3f2' : '#fff' }}>
                    <td>
                      <span 
                        style={{ backgroundColor: contact.pickColor }}
                        className="firstLettername">
                          {contact.letter}
                      </span>
                      {contact.name}
                    </td>
                    <td>{contact.email}</td>
                    <td>{contact.telephone}</td>
                    <td>
                      <button className="btConfigTable" onClick={()=> props.editContact(contact.email)}>
                        <img src={editIcon} />
                      </button>
                      <button className="btConfigTable" onClick={()=> props.openDeleteModal(contact.email)}>
                        <img src={deleteIcon} />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </section>
    );
}

export default Table;