export const createColorFromName = name => {
    let hash = 0;
    if (name.length === 0) return hash;

    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }

	return `hsl(${hash % 360}, 30%, 60%)`;
}

export const filterContactsByQuery = (query, contacts) => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(query.toLowerCase()) || contact.email.toLowerCase().includes(query.toLowerCase()));
}