import {episode1, episode2, episode22, episode23, episodeList} from './mocks';
import {api} from '../../api';
import {showService} from './../showService';

describe('showService', () => {
  describe('getEpisodes', () => {
    beforeAll(() => {
      //Quando utilizamos o mockImplementation para retorar uma Promisse podemos usar o mockResolvedValue diretamente
      jest.spyOn(api, 'get').mockResolvedValue({data: episodeList});
    });
    test('when API return episodes list return all season names', async () => {
      /* Quando não nos importarmos com a implementação podemos fazer uso do mockImplementation.
        const spyFn = jest
          .spyOn(api, 'get')
          .mockImplementation(() => Promise.resolve({data: episodeList}));
      */

      const groupedEpisodes = await showService.getEpisodes('250');

      expect(groupedEpisodes.seasonNames.includes('1')).toBeTruthy();
      expect(groupedEpisodes.seasonNames.includes('2')).toBeTruthy();
      expect(groupedEpisodes.seasonNames.length).toBe(2);
    });

    test('when API return episode list return the episodes grouped by season', async () => {
      const groupedEpisodes = await showService.getEpisodes('250');

      const temp1 = groupedEpisodes.seasons[1];
      const temp2 = groupedEpisodes.seasons[2];

      expect(temp1.includes(episode1)).toBeTruthy();
      expect(temp1.includes(episode2)).toBeTruthy();

      expect(temp2.includes(episode22)).toBeTruthy();
      expect(temp2.includes(episode23)).toBeTruthy();
    });
  });
});
