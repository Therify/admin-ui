import { MatchTypes } from '../types';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { adaptApiMatches } from './utils';

export type getMatchesOptions = {
    token: string;
};
export type createMatchOptions = {
    userId: string;
    providerId: string;
};

const makeFakeRequest = ({ url, config }: any) =>
    new Promise<any>((resolve) => {
        setTimeout(() => {
            console.log('makeFakeRequest:', { url, config });
            resolve({ data: `fake request to ${url}` });
        }, 2000);
    });

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '';
const MatchesApiCreator = (baseUrl: string) => {
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

    const getMatches = async (): Promise<MatchTypes.Match[]> => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/matches`);
        return adaptApiMatches(axiosData?.data?.Items ?? []);
    };

    const createMatch = async ({ userId, providerId }: createMatchOptions) => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/matches`, {
            method: 'POST',
            data: { userId, providerId },
        });
        return adaptApiMatches(axiosData?.data);
    };
    const approveMatches = async (matchIds: string[]) => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/matches/approve`, {
            method: 'POST',
            data: { matchIds },
        });
        return axiosData?.data ?? [];
    };
    const denyMatch = async (matchId: string, reason?: string) => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/matches`, {
            method: 'DELETE',
            data: {
                matchIds: [matchId],
                reason,
            },
        });
        return axiosData.data;
    };
    const getProviders = async (queryString?: string) => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/providers${queryString}`);
        return axiosData.data as MatchTypes.Provider[];
    };
    return { getMatches, createMatch, approveMatches, denyMatch, getProviders };
};

export const MatchesApi = MatchesApiCreator(API_BASE_URL);
