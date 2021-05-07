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
    Checkbox,
    TextSmall,
    SplitButtonOption,
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
import { CompanyIds, CompanyNames } from '../../types/company';

export const Matches = () => {
    const theme = useTheme();
    const matchesBulkActionsConfig: SplitButtonOption[] = [{ value: 'APPROVE_SELECTED', text: 'Approve Selected' }];
    const [showBulkApproveModal, setShowBulkApproveModal] = useState(false);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const { isLoadingProviders, getProviders, getProvidersError, providers } = useMatchesApi();
    const { approveMatchesForUser, bulkApproveMatchesByUserIds, isApprovingMatch } = useApproveMatch({
        withAlerts: true,
    });
    const { isCreatingRanking, createRanking, createRankingError } = useCreateRanking({ withAlerts: true });
    const { matches, getMatches, getMatchesError, isLoadingMatches } = useGetMatches({ withAlerts: true });
    const { denyMatch, isDenyingMatch, denyMatchError } = useDenyMatch({
        withAlerts: true,
    });

    const [companyFilter, setCompanyFilter] = useState('all');
    const [createMatchTarget, setCreateMatchTarget] = useState<MatchTypes.Match | null>(null);
    const [matchIdToDeny, setMatchIdToDeny] = useState<string | null>(null);

    const matchTypeCounts = countMatchQualities(matches);
    const allUsersSelected = selectedUserIds.length > 0 && selectedUserIds.length === matches.length;
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

    const handleCheck = (userId: string) => {
        const isChecked = selectedUserIds.includes(userId);
        isChecked
            ? setSelectedUserIds(selectedUserIds.filter((id) => id !== userId))
            : setSelectedUserIds([...selectedUserIds, userId]);
    };
    const handleCheckAll = () => {
        allUsersSelected ? setSelectedUserIds([]) : setSelectedUserIds(matches.map((m) => m.user.id));
    };
    const selectConfigs: SelectConfig[] = [
        {
            options: [
                { value: 'all', text: 'all' },
                { value: CompanyIds.CriticalMass, text: CompanyNames.CriticalMass },
                { value: CompanyIds.Thumbtack, text: CompanyNames.Thumbtack },
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
                            <SplitButton
                                options={matchesBulkActionsConfig}
                                isDisabled={selectedUserIds.length === 0}
                                onClick={() => setShowBulkApproveModal(true)}
                            />
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
                    <Box marginTop={1} display="flex" alignItems="center">
                        <Checkbox onClick={handleCheckAll} checked={allUsersSelected} />
                        <TextSmall style={{ marginLeft: theme.spacing(1), marginBottom: 0 }}>
                            {selectedUserIds.length === matches.length ? 'Deselect all' : 'Select all'}
                        </TextSmall>
                    </Box>
                    <Divider margin={`${theme.spacing(2)}px 0 0`} />
                </Box>
                <MatchesList
                    selectedItemsIds={selectedUserIds}
                    onCheck={handleCheck}
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
            {showBulkApproveModal && (
                <Modal
                    isOpen={!!showBulkApproveModal}
                    title={isApprovingMatch ? '' : 'Bulk Approve Matches'}
                    handleClose={() => setShowBulkApproveModal(false)}
                >
                    {isApprovingMatch ? (
                        <Box
                            display="flex"
                            padding={theme.spacing(0, 4)}
                            justifyContent="center"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Text>approving matches...</Text>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : (
                        <>
                            <Text>
                                Are you sure you want to bulk approve {selectedUserIds.length} match
                                {selectedUserIds.length === 1 ? '' : 'es'}?
                            </Text>
                            <ButtonOutline onClick={() => setShowBulkApproveModal(false)}>cancel</ButtonOutline>
                            <ButtonFill
                                onClick={() => {
                                    bulkApproveMatchesByUserIds(selectedUserIds).then(() =>
                                        setShowBulkApproveModal(false),
                                    );
                                }}
                                style={{ marginLeft: theme.spacing(1) }}
                            >
                                Approve
                            </ButtonFill>
                        </>
                    )}
                </Modal>
            )}
        </>
    );
};
