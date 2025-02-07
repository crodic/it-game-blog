import { Metadata } from 'next';
import CategoryForm from './_components/category-form';
import CategoryView from './_components/category-view';

export const metadata: Metadata = {
    title: 'DASHBOARD | Quản lý danh mục',
    description: 'Trang quản lý danh mục',
};

export default function Page() {
    return (
        <div className="flex flex-col gap-8">
            <div className="float-right">
                <CategoryForm />
            </div>
            <CategoryView />
        </div>
    );
}
