import React, { useState, useEffect } from 'react';
import { useTheme, Box, CircularProgress, Button } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
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
import { useCreateRanking, useGetMatches, useDenyMatch, useApproveMatch } from '../../hooks/useMatchesApi';
import { useProvidersApi } from '../../hooks/useProvidersApi';
import { MatchesList, CreateMatchModal, Navigation } from '../../components';
import { countMatchQualities } from '../../utils/MatchQuality';
import { CompanyIds, CompanyNames } from '../../types/company';
import { getCompayNameById } from '../../utils/idMappings';

export const Matches = () => {
    const theme = useTheme();
    const matchesBulkActionsConfig: SplitButtonOption[] = [{ value: 'APPROVE_SELECTED', text: 'Approve Selected' }];
    const [showBulkApproveModal, setShowBulkApproveModal] = useState(false);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const { isLoadingProviders, getProviders, getProvidersError, providers } = useProvidersApi();
    const { approveMatchesForUser, bulkApproveMatchesByUserIds, isApprovingMatch } = useApproveMatch({
        withAlerts: true,
    });
    const { isCreatingRanking, createRanking, createRankingError } = useCreateRanking({ withAlerts: true });
    const { matches: allMatches, getMatches, getMatchesError, isLoadingMatches } = useGetMatches({ withAlerts: true });
    const { denyMatch, isDenyingMatch, denyMatchError } = useDenyMatch({
        withAlerts: true,
    });

    const [companyFilter, setCompanyFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [matches, setMatches] = useState(allMatches);
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
                { value: CompanyIds.Therify, text: CompanyNames.Therify },
                { value: CompanyIds.Thumbtack, text: CompanyNames.Thumbtack },
            ],
            id: 'company-select',
            name: 'Company',
            label: 'Company',
            selectedValue: companyFilter,
            onChange: (val: string) => setCompanyFilter(val),
        },
    ];
    const getNoMatchesMessage = () => {
        let message;
        if (companyFilter !== 'all' && searchTerm !== '') {
            message = `${searchTerm} in ${getCompayNameById(companyFilter)}`;
        } else {
            message = companyFilter !== 'all' ? getCompayNameById(companyFilter) : searchTerm;
        }
        return message ? `No matches for ${message}` : undefined;
    };
    useEffect(() => {
        getMatches();
    }, []);

    useEffect(() => {
        let matches = allMatches;
        if (companyFilter !== 'all') {
            matches = matches.filter((m) => m.user.companyId === companyFilter);
        }
        if (searchTerm !== '') {
            matches = matches.filter((m) => m.user.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setMatches(matches);
        setSelectedUserIds([]);
    }, [allMatches, companyFilter, searchTerm]);

    return (
        <>
            <NavDrawerPage drawer={Navigation} style={{ flexFlow: 'column', display: 'flex', height: '100vh' }}>
                <Box style={{ padding: theme.spacing(3, 6, 0, 6) }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header1>Matches</Header1>
                        <Box>
                            <SearchBar
                                label="Search for matches"
                                value={searchTerm}
                                onChange={(val: string) => setSearchTerm(val.trim())}
                                onClear={() => setSearchTerm('')}
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
                    {allMatches.length > 0 && (
                        <Box marginTop={1} display="flex" alignItems="center">
                            <Box display="flex" alignItems="center">
                                <Checkbox onClick={handleCheckAll} checked={allUsersSelected} />
                                <TextSmall style={{ marginLeft: theme.spacing(1), marginBottom: 0 }}>
                                    {selectedUserIds.length > 0 && selectedUserIds.length === matches.length
                                        ? 'Deselect all'
                                        : 'Select all'}
                                </TextSmall>
                            </Box>
                            <Button
                                variant="text"
                                onClick={getMatches}
                                style={{ textTransform: 'none', marginLeft: theme.spacing(2) }}
                            >
                                <TextSmall style={{ marginRight: theme.spacing(1), marginBottom: 0 }}>
                                    Referesh matches
                                </TextSmall>
                                <Refresh fontSize="small" />
                            </Button>
                        </Box>
                    )}
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
                    noMatchesMessage={getNoMatchesMessage()}
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
