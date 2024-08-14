import customFetch from "./api";

const postWithBody = (url, body) => {
    return customFetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    });
};

export const fetchProfilesByUserIds = (userIds) => {
    return postWithBody('/users-by-ids', { userIds });
};

export const fetchComparisonData = (userIds) => {
    return postWithBody('/compare-users', { userIds });
};

export const fetchUsersWithFilters = (currentPage, pageSize, filters) => {
    const queryParams = new URLSearchParams({
        page: currentPage,
        pageSize: pageSize,
    }).toString();
    return customFetch(`/users?${queryParams}&filters=${filters.join(',')}`);
};

export const fetchCandidateDetails = (userId) => {
    return customFetch(`/user/${userId}`);
};