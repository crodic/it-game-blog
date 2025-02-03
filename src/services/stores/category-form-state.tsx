import { Category } from '@prisma/client';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ICategoryFormState {
    isOpen: boolean;
    editData: Pick<Category, 'description' | 'color' | 'name' | 'id'> | null;
}

interface ICategoryFormStateActions {
    open: () => void;
    close: () => void;
    setEditData: (data: ICategoryFormState['editData'] | null) => void;
}

const initialState: ICategoryFormState = {
    isOpen: false,
    editData: null,
};

export const useCategoryFormState = create<ICategoryFormState & ICategoryFormStateActions>()(
    immer((set) => ({
        ...initialState,
        open: () =>
            set((state) => {
                state.isOpen = true;
            }),
        close: () =>
            set((state) => {
                state.isOpen = false;
                state.editData = null;
            }),
        setEditData: (data) =>
            set((state) => {
                state.editData = data;
            }),
    }))
);
