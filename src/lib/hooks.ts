import { useFocusEffect } from '@react-navigation/native';
import {
  InfiniteData,
  NotifyOnChangeProps,
  QueryKey,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export function useFocusNotifyOnChangeProps(
  notifyOnChangeProps?: NotifyOnChangeProps,
) {
  const focusedRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      focusedRef.current = true;

      return () => {
        focusedRef.current = false;
      };
    }, []),
  );

  return () => {
    if (!focusedRef.current) {
      return [];
    }

    if (typeof notifyOnChangeProps === 'function') {
      return notifyOnChangeProps();
    }

    return notifyOnChangeProps;
  };
}

export function useResetInfiniteQuery<T = any>(queryKey: QueryKey) {
  const queryClient = useQueryClient();

  const resetQuery = () => {
    queryClient.setQueryData<InfiniteData<T>>(queryKey, oldData => {
      if (!oldData) {
        return undefined;
      }

      return {
        pages: oldData.pages.slice(0, 1),
        pageParams: oldData.pageParams.slice(0, 1),
      };
    });
  };

  return { resetQuery };
}
