import React, { useEffect, useState } from 'react';
import { Card, useTheme, Box, Button, CircularProgress } from '@material-ui/core';
import {
    Header1,
    NavDrawerPage,
    ProviderPreviewCard,
    ProviderDataForm,
    Modal,
    Text,
    ButtonOutline,
    ButtonFill,
} from '../../components';
import { useAlerts } from '../../hooks/useAlerts';
import { MatchTypes } from '../../types';
import { convertCsvToProviders } from '../../utils/csvToJson';
import { ChevronLeft } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useCreateProvider } from '../../hooks/useProvidersApi';

export const ProviderUploadPage = () => {
    const theme = useTheme();
    const history = useHistory();
    const [providers, setProviders] = useState<MatchTypes.ProviderData[]>();
    const [selectedFile, setSelectedfile] = useState<File>();
    const [isConfirmCreateOpened, setIsConfirmCreateOpened] = useState(false);
    const [providerToEditIndex, setProviderToEditIndex] = useState<number>();
    const [providerToDeleteIndex, setProviderToDeleteIndex] = useState<number>();
    const [isLoadingFile, setIsLoadingFile] = useState(false);
    const { createErrorAlert, createSuccessAlert } = useAlerts();
    const { bulkCreateProviders, isCreatingProvider } = useCreateProvider({ withAlerts: true });

    const selectedIndex = providerToEditIndex ?? providerToDeleteIndex;
    const selectedProvider: MatchTypes.ProviderData | undefined =
        providers !== undefined && selectedIndex !== undefined ? providers[selectedIndex] : undefined;
    const selectedProviderName =
        selectedProvider?.firstName || selectedProvider?.lastName
            ? `${selectedProvider?.firstName} ${selectedProvider?.lastName}`
            : selectedProvider?.emailAddress ?? ' this provider';
    const clearSelectedProviderIndex = () => {
        setProviderToEditIndex(undefined);
        setProviderToDeleteIndex(undefined);
    };
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedfile(event.target.files?.[0]);
    const updateProvider = async (provider: MatchTypes.ProviderData, index: number) => {
        setProviders(providers?.map((p, i) => (i === index ? provider : p)));
    };
    const deleteProvider = (index: number) => {
        setProviders(providers?.filter((p, i) => i !== index));
        clearSelectedProviderIndex();
        createSuccessAlert('Removed provider from list');
    };

    const createProviders = async () => {
        if (providers) {
            try {
                await bulkCreateProviders(providers);
                setProviders(undefined);
            } catch (_) {}
        }
    };

    useEffect(() => {
        const handleCsvString = async (readerResult: string) => {
            try {
                setProviders(await convertCsvToProviders(readerResult));
            } catch (e) {
                createErrorAlert(`Could not parse CSV file to provider data. ` + e.message);
            }
            setIsLoadingFile(false);
        };

        if (selectedFile) {
            setIsLoadingFile(true);
            if (selectedFile.type && selectedFile.type !== 'text/csv') {
                createErrorAlert(`File is not a CSV`);
                setIsLoadingFile(false);
                return;
            }
            const reader = new FileReader();
            reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
                const readerResult = event.target?.result;
                if (typeof readerResult === 'string') {
                    handleCsvString(readerResult);
                } else {
                    createErrorAlert(`Could not read file contents`);
                    setIsLoadingFile(false);
                }
            });
            reader.readAsText(selectedFile);
        }
    }, [selectedFile]);

    return (
        <NavDrawerPage>
            <Box flexGrow={1} style={{ padding: theme.spacing(3, 6, 0, 6) }}>
                <Box display="flex" alignItems="center" marginBottom={4} justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Button onClick={() => history.goBack()} style={{ marginRight: theme.spacing(2) }}>
                            <ChevronLeft />
                        </Button>
                        <Header1 style={{ margin: 0 }}>Upload Providers</Header1>
                    </Box>
                    {providers && (
                        <Box>
                            <Button onClick={() => setProviders(undefined)} style={{ marginRight: theme.spacing(2) }}>
                                Clear Providers
                            </Button>
                            <Button
                                onClick={() => setIsConfirmCreateOpened(true)}
                                style={{ marginRight: theme.spacing(2) }}
                            >
                                Upload Providers
                            </Button>
                        </Box>
                    )}
                </Box>
                {!providers && (
                    <Box display="flex" alignItems="center" flexGrow={1} justifyContent="center">
                        <Card style={{ padding: theme.spacing(6) }}>
                            {isLoadingFile ? (
                                <CircularProgress color="primary" />
                            ) : (
                                <Button variant="contained" color="primary" component="label">
                                    Upload CSV
                                    <input type="file" hidden onChange={onFileChange} />
                                </Button>
                            )}
                        </Card>
                    </Box>
                )}
                {providers && providers.length === 0 && <Text>No provider data was found in this file.</Text>}
                {providers && providers.length > 0 && (
                    <Box display="flex">
                        {providers.map((provider, i) => (
                            <ProviderPreviewCard
                                key={i}
                                providerData={provider}
                                onDelete={() => {
                                    console.log('setting to delete', i);
                                    setProviderToDeleteIndex(i);
                                }}
                                onEdit={() => setProviderToEditIndex(i)}
                            />
                        ))}
                        {providerToEditIndex !== undefined && (
                            <Modal isOpen handleClose={clearSelectedProviderIndex}>
                                <ProviderDataForm
                                    provider={providers[providerToEditIndex]}
                                    title="Editor"
                                    isSubmitting={false}
                                    onSubmit={(provider) => updateProvider(provider, providerToEditIndex)}
                                />
                            </Modal>
                        )}
                        {providerToDeleteIndex !== undefined && (
                            <Modal isOpen handleClose={clearSelectedProviderIndex}>
                                <Box>
                                    <Text>Are you sure you want to remove {selectedProviderName}?</Text>
                                    <Box>
                                        <ButtonOutline color="default" onClick={clearSelectedProviderIndex}>
                                            Cancel
                                        </ButtonOutline>
                                        <ButtonFill
                                            onClick={() => deleteProvider(providerToDeleteIndex)}
                                            style={{
                                                background: theme.palette.error.main,
                                                marginLeft: theme.spacing(2),
                                            }}
                                        >
                                            Delete
                                        </ButtonFill>
                                    </Box>
                                </Box>
                            </Modal>
                        )}
                        {isConfirmCreateOpened && (
                            <Modal isOpen handleClose={() => setIsConfirmCreateOpened(false)}>
                                <>
                                    {isCreatingProvider && (
                                        <Box
                                            display="flex"
                                            padding={theme.spacing(1)}
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <CircularProgress color="primary" />
                                        </Box>
                                    )}
                                    {!isCreatingProvider && (
                                        <Box>
                                            <Text>
                                                Are you sure you want to upload {providers.length} provider
                                                {providers.length === 1 ? '' : 's'}?
                                            </Text>
                                            <Box>
                                                <ButtonOutline
                                                    color="default"
                                                    onClick={() => setIsConfirmCreateOpened(false)}
                                                >
                                                    Cancel
                                                </ButtonOutline>
                                                <ButtonFill
                                                    onClick={createProviders}
                                                    style={{
                                                        marginLeft: theme.spacing(2),
                                                    }}
                                                >
                                                    Upload
                                                </ButtonFill>
                                            </Box>
                                        </Box>
                                    )}
                                </>
                            </Modal>
                        )}
                    </Box>
                )}
            </Box>
        </NavDrawerPage>
    );
};
