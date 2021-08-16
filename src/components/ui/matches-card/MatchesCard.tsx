import React from 'react';
import { Box, Paper, Theme, useTheme, withStyles } from '@material-ui/core';
import { Checkbox, TextSmall, Text, Header3, DateChip } from '../../ui';
import { ProviderRanking } from '../provider-ranking';
import { MatchTypes } from '../../../types';
import { PreferencesGrid } from '../preferences-grid';
import { ApprovalButton } from '../approval-button';
import { getCompanyNameById } from '../../../utils/idMappings';

export type MatchesCardProps = {
    isChecked: boolean;
    onCheck: () => void;
    user: MatchTypes.User;
    receivedDate: number | Date;
    rankings: (MatchTypes.Ranking & {
        status: MatchTypes.RankingStatus;
        statusReason?: string;
    })[];
    handleApprove: () => Promise<void>;
    handleCancelApprove?: () => void;
    handleDeleteMatch?: (id: string) => void;
    handleCreateMatch?: () => void;
};
export const MatchesCard = ({
    isChecked,
    onCheck,
    user,
    rankings,
    receivedDate,
    handleApprove,
    handleCancelApprove,
    handleDeleteMatch,
    handleCreateMatch,
}: MatchesCardProps) => {
    const theme = useTheme();
    const {
        emailAddress,
        companyId,
        stateOfResidence,
        genderPreference,
        racePreference,
        issues,
        insuranceProvider,
    } = user;
    const TextButton = makeTextButton(theme);
    return (
        <Paper
            style={{
                borderRadius: theme.shape.borderRadius,
                padding: theme.spacing(3),
                alignItems: 'flex-start',
                display: 'flex',
                marginBottom: theme.spacing(2),
            }}
        >
            <Checkbox data-testid="user-card-checkbox" checked={isChecked} onClick={onCheck} />
            <Box flexGrow="1" style={{ paddingLeft: theme.spacing(3) }}>
                <TextSmall>{getCompanyNameById(companyId)}</TextSmall>
                <Header3>{emailAddress}</Header3>
                <TextSmall style={{ paddingTop: theme.spacing(1) }}>Provider Preferences</TextSmall>
                <PreferencesGrid
                    stateOfResidence={stateOfResidence}
                    genderPreference={genderPreference}
                    racePreference={racePreference}
                    issues={(issues ?? []).join(', ')}
                    insuranceProvider={insuranceProvider}
                />
                <Box display="flex" alignItems="center">
                    <DateChip type="received" date={receivedDate} />
                    <DateChip type="due" date={receivedDate} />
                </Box>
            </Box>
            <Box style={{ width: '45%' }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    style={{ paddingBottom: theme.spacing(1) }}
                >
                    <TextSmall>Matches</TextSmall>
                    <ApprovalButton
                        isHidden={
                            rankings.length === 0 ||
                            rankings.every((r) => r.status === MatchTypes.RankingStatus.INCOMPATIBLE)
                        }
                        onCancel={handleCancelApprove}
                        onApprove={handleApprove}
                        buttonText="Approve"
                    />
                </Box>
                {/* TODO: Disable Box while approving*/}
                <Box>
                    {rankings.length === 0 ? (
                        <Text style={{ opacity: 0.7 }}>No rankings to show.</Text>
                    ) : (
                        rankings.map((ranking, i) => (
                            <ProviderRanking
                                key={ranking.id}
                                id={ranking.id}
                                providerId={ranking.provider.id}
                                status={ranking.status}
                                statusText={ranking.statusReason}
                                displayText={`${ranking.provider.firstName} ${ranking.provider.lastName}`}
                                rank={i + 1}
                                onDelete={handleDeleteMatch}
                            />
                        ))
                    )}
                    {handleCreateMatch && <TextButton onClick={handleCreateMatch}>+ Add Provider</TextButton>}
                </Box>
            </Box>
        </Paper>
    );
};

const makeTextButton = (theme: Theme) =>
    withStyles({
        root: {
            opacity: 0.7,
            cursor: 'pointer',
            margin: 0,
            marginLeft: theme.spacing(5),
            transition: '200ms',
            '&:hover': {
                opacity: 1,
                fontWeight: 500,
                color: theme.palette.primary.main,
            },
        },
    })(TextSmall);
