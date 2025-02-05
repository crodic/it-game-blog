import UpdateBlogForm from './_components/update-blog-form';

export default function Page({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold">Cập Nhật Bài Viết</h3>
            <UpdateBlogForm blogId={id} />
        </div>
    );
}
