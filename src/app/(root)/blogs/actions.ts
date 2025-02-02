export const incrementView = async (blogId: string) => {
    const res = await fetch(`http://localhost:3000/api/blogs?id=${blogId}`, { method: 'PUT', credentials: 'include' });
    return res.json();
};
