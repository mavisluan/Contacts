import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (e) => {
        this.setState({
            query: e.target.value.trim()
        })
    }

    clearQuery = () => {
        this.setState({
            query: ''
        })
    } 

    render() {
        const { query } = this.state
        const { contacts, onDeleteContact } = this.props

        let showingContacts 
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter((contact) => match.test(contact.name))
        } else {
            showingContacts = contacts
        }
        
        showingContacts.sort(sortBy('name'))
        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input 
                        className='search-contacts'
                        type='text'
                        name='searchContacts' 
                        placeholder='Search contacts' 
                        value={query}
                        onChange={this.updateQuery}
                    />
                    <Link  
                        to='/create'
                        className='add-contact'
                    >
                        Add Contact
                    </Link>
                </div>
               
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                    <span>Now showing {showingContacts.length} of {contacts.length} total</span> 
                    <button onClick={this.clearQuery} >
                        Show all
                    </button>
                  </div>
                )}

                <ol className='contact-list'>
                {showingContacts.map((contact) => {
                    return (
                    <li key={contact.id} className='contact-list-item'>
                        <div className='contact-avatar' style={{
                            backgroundImage:`url(${contact.avatarURL})`
                        }} />
                        <div className='contact-details'>
                            <p>{contact.name}</p>
                            <p>{contact.email}</p>
                        </div>
                        <button 
                            className='contact-remove'
                            onClick={() => onDeleteContact(contact)}
                        >
                            Remove
                        </button>
                    </li>
                    )         
                })}
                </ol>
            </div>
            
        )
    }
}


export default ListContacts