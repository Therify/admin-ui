import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { MatchTypes } from '../types';
import { sortByNameOfPractice } from './utils/providerHelpers';

const makeFakeRequest = ({ url, config }: any) =>
    new Promise<any>((resolve) => {
        setTimeout(() => {
            console.log('makeFakeRequest:', { url, config });
            resolve({ data: `fake request to ${url}` });
        }, 2000);
    });

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '';
const providersApiCreator = (baseUrl: string) => {
    if (baseUrl === '') throw new Error("Can't create api without a base url!");
    const makeRequest = async (
        url: string,
        config?: AxiosRequestConfig & { shouldFakeRequest?: boolean },
    ): Promise<AxiosPromise<any>> => {
        if (config?.shouldFakeRequest) return makeFakeRequest({ url, config });
        return axios({
            ...(config ?? {}),
            url,
            method: config?.method ?? 'GET',
        });
    };
    const getProviders = async (queryString?: string) => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/providers${queryString}`);
        return sortByNameOfPractice(axiosData.data as MatchTypes.Provider[]);
    };
    const getProviderById = async (id: string) => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/providers/${id}`);
        return axiosData.data as MatchTypes.Provider;
    };
    const createProvider = async (provider: Partial<MatchTypes.Provider>) => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/providers`, {
            method: 'POST',
            data: { ...provider },
        });
        return axiosData.data as MatchTypes.Provider;
    };
    const bulkCreateProviders = async (providers: MatchTypes.ProviderData[]) => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/providers`, {
            method: 'POST',
            data: providers,
        });
        return axiosData.data as MatchTypes.Provider;
    };
    const updateProvider = async (provider: Partial<MatchTypes.Provider & { id: string }>) => {
        if (!provider.id) throw new Error('Id missing in provider data!');
        const { data: axiosData } = await makeRequest(`${baseUrl}/providers/${provider.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            data: { ...provider },
        });
        return axiosData.data as MatchTypes.Provider;
    };
    const deleteProvider = async (providerId: string) => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/providers/${providerId}`, { method: 'DELETE' });
        return axiosData.data as MatchTypes.Provider;
    };

    return { getProviders, getProviderById, createProvider, bulkCreateProviders, updateProvider, deleteProvider };
};
export const ProvidersApi = providersApiCreator(API_BASE_URL);
