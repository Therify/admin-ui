import { MatchTypes, MatchApiTypes } from '../../types';

type MatchRecord = {
    user?: MatchApiTypes.IUser;
    provider?: MatchApiTypes.IProvider;
    match?: MatchApiTypes.IMatch;
};

export const adaptApiMatches = (rawMatches: MatchApiTypes.GetMatchesResponse[]): MatchTypes.Match[] => {
    const matchRecords = groupMatchRecords(rawMatches);
    return groupMatchRecordsByUser(matchRecords);
};

const groupMatchRecords = (matches: MatchApiTypes.GetMatchesResponse[]): MatchRecord[] => {
    const recordsMap = matches.reduce<Record<string, MatchRecord>>((map, item) => {
        if (map[item.PK] === undefined) {
            map[item.PK] = {};
        }
        if (item.type === MatchApiTypes.ResponseType.Match) {
            map[item.PK].match = item;
        } else if (item.type === MatchApiTypes.ResponseType.Provider) {
            map[item.PK].provider = item;
        } else if (item.type === MatchApiTypes.ResponseType.User) {
            map[item.PK].user = item;
        }
        return map;
    }, {});
    return Object.values(recordsMap);
};

const groupMatchRecordsByUser = (matchRecords: MatchRecord[]): MatchTypes.Match[] => {
    const matches = matchRecords.reduce<Record<string, MatchTypes.Match>>((map, record) => {
        const hasAllMatchParts = !!record.user && !!record.provider && !!record.match;
        if (!hasAllMatchParts) return map;
        const userEntry = map[record.user!.details.id];
        if (userEntry) {
            userEntry.matches.push(createMatch(record.match!, record.provider!));
        } else {
            map[record.user!.details.id] = {
                user: record.user!.details,
                created: new Date(record.match!.created).getTime(),
                matches: [createMatch(record.match!, record.provider!)],
            };
        }
        return map;
    }, {});
    return Object.values(matches);
};

const createMatch = (match: MatchApiTypes.IMatch, provider: MatchApiTypes.IProvider): MatchTypes.Ranking => ({
    id: match.PK,
    score: match.score,
    providerEmailAddress: match.providerEmailAddress,
    userEmailAddress: match.userEmailAddress,
    criteria: match.criteria,
    provider: provider.details,
});
