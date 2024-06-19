import { useMemo } from 'react';
import { Params, useParams as _useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export function useParams<T extends string | Record<string, string | undefined> = Record<string, string | undefined>>() {
    const params = _useParams<Readonly<T extends string ? Params<T> : Partial<T>>>();

    const memoizedParams = useMemo(() => params, [params]);

    return memoizedParams;
}