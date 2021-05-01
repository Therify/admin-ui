import React, { useState, useEffect } from 'react';
import {
    NavDrawerPage,
    Header1,
    SearchBar,
    SplitButton,
    MatchCounter,
    SelectGroup,
    SelectConfig,
    Divider,
    Modal,
    Text,
    ButtonOutline,
    ButtonFill,
} from '../../components/ui';
import { MatchTypes } from '../../types';
import { useTheme, Box, CircularProgress } from '@material-ui/core';
import {
    useMatchesApi,
    useCreateRanking,
    useGetMatches,
    useDenyMatch,
    useApproveMatch,
} from '../../hooks/useMatchesApi';
import { MatchesList, CreateMatchModal, Navigation } from '../../components';
import { countMatchQualities } from '../../utils/MatchQuality';

export const Matches = () => {
    const theme = useTheme();
    const { isLoadingProviders, getProviders, getProvidersError, providers } = useMatchesApi();
    const { approveMatchesForUser } = useApproveMatch({ withAlerts: true });
    const { isCreatingRanking, createRanking, createRankingError } = useCreateRanking({ withAlerts: true });
    const { matches, getMatches, getMatchesError, isLoadingMatches } = useGetMatches({ withAlerts: true });
    const { denyMatch, isDenyingMatch, denyMatchError } = useDenyMatch({
        withAlerts: true,
    });

    const [companyFilter, setCompanyFilter] = useState('all');
    const [createMatchTarget, setCreateMatchTarget] = useState<MatchTypes.Match | null>(null);
    const [matchIdToDeny, setMatchIdToDeny] = useState<string | null>(null);
    const matchTypeCounts = countMatchQualities(matches);
    const handleOpenCreateMatchModal = (match: MatchTypes.Match) => {
        setCreateMatchTarget(match);
        getProviders({
            licensedState: match.user.stateOfResidence,
        });
    };
    const handleCreateRanking = async (providerId: string) => {
        if (!createMatchTarget) return;
        await createRanking({
            userId: createMatchTarget.user.id,
            providerId,
        });
        setCreateMatchTarget(null);
    };

    const selectConfigs: SelectConfig[] = [
        {
            options: [
                { value: 'all', text: 'all' },
                { value: 'CriticalMass', text: 'Critical Mass' },
                { value: 'Thumbtack', text: 'Thumbtack' },
            ],
            id: 'company-select',
            name: 'Company',
            label: 'Company',
            selectedValue: companyFilter,
            onChange: (val: string) => setCompanyFilter(val),
        },
    ];
    useEffect(() => {
        getMatches();
    }, []);
    return (
        <>
            <NavDrawerPage drawer={Navigation} style={{ flexFlow: 'column', display: 'flex', height: '100vh' }}>
                <Box style={{ padding: theme.spacing(3, 6, 0, 6) }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header1>Matches</Header1>
                        <Box>
                            <SearchBar
                                label="Search for matches"
                                value={''}
                                onChange={(val: string) => {
                                    console.log(val);
                                }}
                                style={{ marginRight: theme.spacing(1) }}
                            />
                            <SplitButton options={[]} onClick={(option: any) => console.log(option?.text)} />
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={3}>
                        <MatchCounter
                            good={matchTypeCounts.good}
                            warnings={matchTypeCounts.warnings}
                            incompatibilities={matchTypeCounts.incompatibilities}
                        />
                        <SelectGroup configs={selectConfigs} />
                    </Box>
                    <Divider margin={`${theme.spacing(2)}px 0 0`} />
                </Box>
                <MatchesList
                    onCheck={() => {
                        console.log('checked...');
                    }}
                    handleApprove={approveMatchesForUser}
                    handleDeleteMatch={(id) => setMatchIdToDeny(id)}
                    handleCreateMatch={handleOpenCreateMatchModal}
                    isLoading={isLoadingMatches}
                    errorMessage={getMatchesError}
                    handleRetry={getMatches}
                    matches={matches}
                />
            </NavDrawerPage>
            {createMatchTarget && (
                <CreateMatchModal
                    selectedUser={createMatchTarget.user}
                    isOpen={!!createMatchTarget}
                    isLoading={isCreatingRanking || isLoadingProviders}
                    createError={createRankingError}
                    getProvidersError={getProvidersError}
                    providers={providers}
                    handleCreate={handleCreateRanking}
                    handleClose={() => setCreateMatchTarget(null)}
                ></CreateMatchModal>
            )}
            {matchIdToDeny && (
                <Modal
                    isOpen={!!matchIdToDeny}
                    title={isDenyingMatch ? '' : 'Deny match'}
                    handleClose={() => setMatchIdToDeny(null)}
                >
                    {isDenyingMatch ? (
                        <Box
                            display="flex"
                            padding={theme.spacing(0, 4)}
                            justifyContent="center"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Text>Denying...</Text>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : (
                        <>
                            {denyMatchError ? (
                                <Text color="error">There was a problem: {denyMatchError}</Text>
                            ) : (
                                <Text>Are you sure you want to deny match {matchIdToDeny}?</Text>
                            )}
                            <ButtonOutline onClick={() => setMatchIdToDeny(null)}>cancel</ButtonOutline>
                            <ButtonFill
                                onClick={() => {
                                    denyMatch(matchIdToDeny).then(() => setMatchIdToDeny(null));
                                }}
                                style={{ marginLeft: theme.spacing(1) }}
                            >
                                {denyMatchError ? 'Try again' : 'Deny'}
                            </ButtonFill>
                        </>
                    )}
                </Modal>
            )}
        </>
    );
};
