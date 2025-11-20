'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClass } from '@/lib/api/ClassApi';
import { ClassFormData } from '@/types/Kelas';

export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClassFormData) => createClass(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    }
  });
}
