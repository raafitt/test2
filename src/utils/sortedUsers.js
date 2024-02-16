export const sortUsers = (users, columnIndex, sortOrder, attribute) => {

    const sortedUsers = [...users];// Создаем копию массива пользователей, чтобы не изменять оригинальный массив

    sortedUsers.sort((a, b) => {
        let valueA, valueB;
        if (attribute === 'address') {
            valueA = a[attribute].city;
            valueB = b[attribute].city;
        }
        else {
            valueA = a[attribute];
            valueB = b[attribute];
        }

        if (sortOrder === 'toRise') {
            return valueA > valueB ? 1 : -1; // Сравниваем значения в зависимости от порядка сортировки 
        } else if (sortOrder === 'descend') {
            return valueA < valueB ? 1 : -1;
        } else {
            // Если порядок сортировки не указан или неверен, не изменяем порядок
            return 0;
        }
    });


    return sortedUsers
};

