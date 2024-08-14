const API_BASE_URL = 'http://localhost:8090';

export const fetchProfilesByUserIds = (userIds) => {
    return fetch(`${API_BASE_URL}/users-by-ids`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userIds })
    }).then(response => response.json());
};

export const fetchComparisonData = (userIds) => {
    return fetch(`${API_BASE_URL}/compare-users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userIds })
    }).then(response => response.json());
};

export const fetchUsersWithFilters = (currentPage, pageSize, filters) => {
    const queryParams = new URLSearchParams({
        page: currentPage,
        pageSize: pageSize,
    });
    return fetch(`${API_BASE_URL}/users?${queryParams}&filters=${filters.join(',')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
};
