import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../store/reducers';

export type RenderWithStoreProps = {
    initialState?: any;
    store?: any;
} & Record<string, any>;
export function renderWithStore(
    ui: React.ReactElement,
    { initialState, store = createStore(rootReducer, initialState), ...renderOptions }: RenderWithStoreProps = {},
) {
    return render(<Provider store={store}>{ui}</Provider>, { ...renderOptions });
}
