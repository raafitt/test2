export const fetchUsers = (limit, skip) => {
    try {
        if (skip === 1) skip = 0
        return fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
            .then(res => res.json())
            .then(res => { return res })
    } catch (e) {
        window.alert(e.message)
    }

}

export const filterUsers = (query, attribute) => {
    try {
        let fetchUrl;
        switch (attribute) {
            case 'phone':
                const encodedPhoneNumber = encodeURIComponent(query);//Кодирование номера в формат URL
                fetchUrl = `https://dummyjson.com/users/filter?key=phone&value=${encodedPhoneNumber}`;
                break;
            case 'flm':
                fetchUrl = `https://dummyjson.com/users/search?q=${query}`;
                break;
            case 'city':
            case 'address':
                fetchUrl = `https://dummyjson.com/users/filter?key=address.${attribute}&value=${query}`;
                break;
            default:
                fetchUrl = `https://dummyjson.com/users/filter?key=${attribute}&value=${query}`;
                break;
        }
        return fetch(fetchUrl)
            .then(res => res.json())
            .then(res => { return res; });
    } catch (e) {
        window.alert(e.message);
    }
};
