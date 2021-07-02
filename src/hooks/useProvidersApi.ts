import { useState } from 'react';
import { ProvidersApi } from '../api/ProvidersApi';
import { MatchTypes } from '../types';
import { useAlerts } from './useAlerts';
import { MatchesApiConfig } from './useMatchesApi';

export const useProvidersApi = (config?: MatchesApiConfig) => ({
    ...useGetProviders(config),
    ...useGetProviderById(config),
    ...useCreateProvider(config),
    ...useUpdateProvider(config),
    ...useDeleteProvider(config),
});

export const useGetProviders = (config?: MatchesApiConfig) => {
    const { createErrorAlert } = useAlerts();
    const [providers, setProviders] = useState<MatchTypes.Provider[]>([]);
    const [isLoadingProviders, setIsLoadingProviders] = useState(false);
    const [getProvidersError, setGetProvidersError] = useState<string | undefined>(undefined);
    const getProviders = async (queryParams?: Record<string, string>) => {
        const queryString = Object.entries(queryParams ?? {})
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        const query = queryString === '' ? '' : `?${queryString}`;
        setGetProvidersError(undefined);
        setIsLoadingProviders(true);
        try {
            const results = await ProvidersApi.getProviders(query);
            setProviders(results);
        } catch (error) {
            setGetProvidersError(error.message);
            if (config?.withAlerts) createErrorAlert(error.message);
        }
        setIsLoadingProviders(false);
    };
    return { providers, getProviders, isLoadingProviders, getProvidersError };
};

export const useGetProviderById = (config?: MatchesApiConfig) => {
    const { createErrorAlert } = useAlerts();
    const [provider, setProvider] = useState<MatchTypes.Provider | undefined>();
    const [isLoadingProvider, setIsLoadingProvider] = useState(false);
    const [getProviderError, setGetProviderError] = useState<string | undefined>(undefined);
    const getProviderById = async (id: string) => {
        setGetProviderError(undefined);
        setIsLoadingProvider(true);
        try {
            const results = await ProvidersApi.getProviderById(id);
            setProvider(results);
        } catch (error) {
            setGetProviderError(error.message);
            if (config?.withAlerts) createErrorAlert(error.message);
        }
        setIsLoadingProvider(false);
    };
    return { provider, getProviderById, isLoadingProvider, getProviderError };
};

export const useCreateProvider = (config?: MatchesApiConfig) => {
    const { createErrorAlert, createSuccessAlert } = useAlerts();
    const [createdProvider, setCreatedProvider] = useState<MatchTypes.Provider | undefined>();
    const [isCreatingProvider, setIsCreatingProvider] = useState(false);
    const [createProviderError, setCreateProviderError] = useState<string | undefined>(undefined);
    const createProvider = async (provider: Partial<MatchTypes.Provider>) => {
        setCreateProviderError(undefined);
        setIsCreatingProvider(true);
        try {
            const results = await ProvidersApi.createProvider(provider);
            setCreatedProvider(results);
            if (config?.withAlerts)
                createSuccessAlert(`${provider.firstName} ${provider.lastName} created successfully!`);
        } catch (error) {
            setCreateProviderError(error.message);
            if (config?.withAlerts) createErrorAlert(error.message);
        }
        setIsCreatingProvider(false);
    };
    return { createdProvider, createProvider, isCreatingProvider, createProviderError };
};

export const useUpdateProvider = (config?: MatchesApiConfig) => {
    const { createErrorAlert, createSuccessAlert } = useAlerts();
    const [isUpdatingProvider, setIsUpdatingProvider] = useState(false);
    const [updateProviderError, setUpdateProviderError] = useState<string | undefined>(undefined);
    const updateProvider = async (provider: Partial<MatchTypes.Provider & { id: string }>) => {
        setUpdateProviderError(undefined);
        setIsUpdatingProvider(true);
        try {
            await ProvidersApi.updateProvider(provider);
            if (config?.withAlerts) createSuccessAlert('Successfully updated provider data!');
        } catch (error) {
            setUpdateProviderError(error.message);
            if (config?.withAlerts) createErrorAlert(error.message);
        }
        setIsUpdatingProvider(false);
    };
    return { updateProvider, isUpdatingProvider, updateProviderError };
};

export const useDeleteProvider = (config?: MatchesApiConfig) => {
    const { createErrorAlert } = useAlerts();
    const [isDeletingProvider, setIsDeletingProvider] = useState(false);
    const [deletetProviderError, setDeleteProviderError] = useState<string | undefined>(undefined);
    const deleteProvider = async (id: string) => {
        setDeleteProviderError(undefined);
        setIsDeletingProvider(true);
        try {
            await ProvidersApi.getProviderById(id);
        } catch (error) {
            setDeleteProviderError(error.message);
            if (config?.withAlerts) createErrorAlert(error.message);
        }
        setIsDeletingProvider(false);
    };
    return { deleteProvider, isDeletingProvider, deletetProviderError };
};
