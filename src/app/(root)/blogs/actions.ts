export const incrementView = async (blogId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?id=${blogId}`, {
        method: 'PUT',
        credentials: 'include',
    });
    return res.json();
};
