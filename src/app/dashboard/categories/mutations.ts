import { useMutation } from '@tanstack/react-query';
import { deleteCategory, updateCategory } from './actions';

export const useDeleteCategoryMutation = () => {
    return useMutation({
        mutationFn: deleteCategory,
    });
};

export const useUpdateCategoryMutation = () => {
    return useMutation({
        mutationFn: updateCategory,
    });
};
