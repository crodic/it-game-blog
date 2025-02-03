import { useMutation } from '@tanstack/react-query';
import { deleteBlog } from './actions';

export const useDeleteBlogMutation = () => {
    return useMutation({
        mutationFn: deleteBlog,
    });
};
