import React, {createRef} from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import {SeasonModal} from '../SeasonModal';
import {Modalize} from 'react-native-modalize';

describe('SeasonModal', () => {
  test('show all season options', () => {
    const modalizeRef = createRef<Modalize>();

    const {getAllByText} = render(
      <SeasonModal
        ref={modalizeRef}
        selectedSeason="1"
        onSelectSeason={season => console.log(season)}
        seasons={['1', '2', '3']}
      />,
    );

    //Usado para quando teremos uma função que vai alterar nosso estado
    act(() => modalizeRef.current?.open());

    //expect(getAllByText('Season', {exact: false}).length).toBe(3);
    expect(getAllByText(/season/i).length).toBe(3);
  });

  test('call onSelectSeason with correct season when season option was pressed', () => {
    const modalizeRef = createRef<Modalize>();

    const onSelectSeasonMock = jest.fn();

    const {getByText} = render(
      <SeasonModal
        ref={modalizeRef}
        selectedSeason="1"
        onSelectSeason={onSelectSeasonMock}
        seasons={['1', '2', '3']}
      />,
    );
    act(() => modalizeRef.current?.open());

    const season2Element = getByText(/season 2/i);
    fireEvent.press(season2Element);

    expect(onSelectSeasonMock).toBeCalledWith('2');
  });
});
