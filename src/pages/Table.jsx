import React, { useEffect, useState } from 'react';
import styles from '../styles/table.module.css'
import '../styles/App.css'
import { filterUsers, fetchUsers } from '../http/users';
import TableRow from '../components/TableRow';
import { sortUsers } from '../utils/sortedUsers';
import MyModal from '../components/MyModal';
import UserInfo from '../components/UserInfo';
import { usePages } from '../hooks/usePages';
const Table = () => {
    const [users, setUsers] = useState([])//Состояние для хранения пользователей
    const [isLoading, setIsLoading] = useState(true)//Состояние для отображения загрузки
    const [flmQuery, setFlmQuery] = useState('') //состояние для поиска по ФИО
    const [ageQuery, setAgeQuery] = useState(null) //состояние для поиска по возрасту
    const [gender, setGender] = useState('') //состояние для поиска по полу
    const [phone, setPhone] = useState('') //состояние для поиска по номеру
    const [address, setAddress] = useState({ city: '', address: '' }) //состояние для поиска по адресу
    const [modalVisible, setModalVisible] = useState(false)//Состояние для отображения модального окна
    const [userIndex, setUserIndex] = useState(0)//Состояние для отображения информации о пользователе
    const [totalCount, setTotalCount] = useState(0)// Общее количество пользователей
    const [limit, setLimit] = useState(30)// Лимит для отображения пользователей
    const [page, setPage] = useState(1)//Состояние для пагинации


    const [filter, setFilter] = useState([
        { sort: '' },
        { sort: '' },
        { sort: '' },
        { sort: '' },
        { sort: '' },

    ]);//Состояние для рабыты с сортировкой 
    const options = [
        { value: 'without', name: 'без сортировки' },
        { value: 'toRise', name: 'по возрастанию' },
        { value: 'descend', name: 'по убыванию' },

    ]
    const columns = [
        {
            title: 'ФИО',
            input: { value: flmQuery, placeholder: 'Введите ФИО', onchange: function (value) { setFlmQuery(value) } },
            button: { onclick: function () { searchUsers(flmQuery, 'flm'); setFlmQuery('') } },
            sort: { filter: filter[0], attribute: 'firstName' }
        },

        {
            title: 'Возраст',
            input: { value: ageQuery, placeholder: 'Введите возраст', onchange: function (value) { setAgeQuery(value) } },
            button: { onclick: function () { searchUsers(ageQuery, 'age'); setAgeQuery(null) } },
            sort: { filter: filter[1], attribute: 'age' }
        },

        {
            title: 'Пол',
            input: { value: gender, placeholder: 'Введите пол', onchange: function (value) { setGender(value) } },
            button: { onclick: function () { searchUsers(gender, 'gender'); setGender('') } },
            sort: { filter: filter[2], attribute: 'gender' }
        },

        {
            title: 'Номер телефона',
            input: { value: phone, placeholder: 'Введите номер', onchange: function (value) { setPhone(value) } },
            button: { onclick: function () { searchUsers(phone, 'phone'); setPhone('') } },
            sort: { filter: filter[3], attribute: '' }
        },

        {
            title: 'Адрес',
            input: { value: address.city, placeholder: 'Введите город', onchange: function (value) { setAddress({ ...address, city: value }) } },
            button: { onclick: function () { searchUsers(address.city, 'city'); setAddress({ ...address, city: '' }) } },
            sort: { filter: filter[4], attribute: 'address' }
        },
    ]

    useEffect(() => {

        fetchUsers(limit, page).then(data => {
            setTotalCount(data.total)
            setUsers(data.users)
            setIsLoading(false)
        })

    },
        [page, limit])

    const pagesArray = usePages(totalCount, limit)//Кастомный хук, возвращающий массив для пагинации

    const searchUsers = (query, attribute) => {
        if (query === '' || query === null) return
        setIsLoading(true)
        filterUsers(query, attribute).then(data => {
            setUsers(data.users)
            setIsLoading(false)
        })
    }//Функция для поиска пользователей

    const sortChange = (event, columnIndex, attribute) => {
        const selectedSort = event.target.value;
        if (selectedSort == 'without') {
            fetchUsers(limit, page).then(data => {
                setTotalCount(data.total)
                setUsers(data.users)
                setIsLoading(false)
            })
        }
        setFilter(prevState => {
            const newState = [...prevState];
            newState[columnIndex] = { sort: selectedSort };
            return newState;
        });//Обновляется значение поля sort выбранного столбца
        const sortedUsers = sortUsers(users, columnIndex, selectedSort, attribute)//Кастомный хук, возвращающий отсортированный массив 
        setUsers(sortedUsers)

    }//Функция для сортировки


    if (isLoading) {
        return (
            <h1>
                Загрузка
            </h1>
        )
    }
    return (
        <div className={styles.tableContainer}>
            <MyModal
                setUserIndex={setUserIndex}
                visible={modalVisible}
                setVisible={setModalVisible}>
                {users.length !== 0 &&
                    <UserInfo user={users[userIndex]} />}
            </MyModal>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((elem, index) =>
                            <th
                                className={styles.th}
                                key={index}>
                                <h2>{elem.title}</h2>
                                <input
                                    value={elem.input.value}
                                    onChange={e => elem.input.onchange(e.target.value)}
                                    placeholder={elem.input.placeholder} />

                                <button
                                    style={{ marginLeft: '2px' }}
                                    onClick={elem.button.onclick}
                                >Поиск
                                </button>
                                {elem.title === 'Адрес' &&
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                        <input
                                            style={{ marginRight: '2px' }}
                                            value={address.address}
                                            onChange={e => setAddress({ ...address, address: e.target.value })}
                                            placeholder='Введите улицу' />

                                        <button

                                            onClick={() => {
                                                searchUsers(address.address, 'address');
                                                setAddress({ ...address, address: '' })
                                            }}>
                                            Поиск улицы
                                        </button>

                                    </div>
                                }
                                {elem.title !== 'Номер телефона' &&
                                    <div>
                                        <select
                                            id={index}
                                            value={elem.sort.filter.sort}
                                            onChange={e => sortChange(e, index, elem.sort.attribute)}>
                                            <option disabled value=''>Сортировка</option>
                                            {options.map(option =>
                                                <option
                                                    key={option.value}
                                                    value={option.value}>
                                                    {option.name}
                                                </option>)}
                                        </select>
                                    </div>}
                            </th>

                        )
                        }


                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 && <h1>Пользователи не найдены</h1>}
                    {users.map((user, index) =>
                        <TableRow
                            index={index}
                            setUserIndex={setUserIndex}
                            setVisible={setModalVisible}
                            key={user.key}
                            user={user} />)}
                </tbody>
            </table>
            <div className={styles.paginationContainer}>
                {pagesArray.map(p =>
                    <div
                        className={p == page ? styles.activePage : styles.page}
                        onClick={() => setPage(p)}>
                        {p}
                    </div>)}
            </div>
        </div>
    );
};

export default Table;