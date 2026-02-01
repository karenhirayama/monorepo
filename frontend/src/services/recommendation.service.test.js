import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  describe('getRecommendations', () => {
    test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
      const formData = {
        selectedPreferences: ['Integração com chatbots'],
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Personalização de funis de vendas',
          'Automação de marketing',
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(2);
      expect(recommendations.map((product) => product.name)).toEqual([
        'RD Station CRM',
        'RD Station Marketing',
      ]);
    });

    test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Station Marketing');
    });

    test('Retorna o último match em caso de empate para SingleProduct', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('Retorna array vazio quando nenhuma preferência ou funcionalidade combina', () => {
      const formData = {
        selectedPreferences: ['Preferência inexistente'],
        selectedFeatures: ['Funcionalidade inexistente'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(0);
    });

    test('Retorna array vazio quando produtos é undefined', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        undefined
      );

      expect(recommendations).toHaveLength(0);
    });

    test('Retorna array vazio quando produtos é array vazio', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(formData, []);

      expect(recommendations).toHaveLength(0);
    });

    test('Retorna array vazio quando formData tem preferências vazias', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(0);
    });

    test('Funciona corretamente apenas com preferências selecionadas', () => {
      const formData = {
        selectedPreferences: ['Análise preditiva de dados'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Mentor AI');
    });

    test('Funciona corretamente apenas com funcionalidades selecionadas', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: ['Gestão de leads e oportunidades'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Station CRM');
    });

    test('Retorna todos os produtos que combinam para MultipleProducts', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
          'Integração com chatbots',
          'Análise preditiva de dados',
        ],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(4);
    });

    test('Ordena produtos por score em MultipleProducts', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Personalização de funis de vendas',
          'Automação de marketing',
        ],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      // RD Station CRM tem 2 matches, RD Station Marketing tem 1
      expect(recommendations[0].name).toBe('RD Station CRM');
      expect(recommendations[1].name).toBe('RD Station Marketing');
    });

    test('Lida com formData com valores undefined', () => {
      const formData = {
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(0);
    });
  });

  describe('calculateMatchScore', () => {
    test('Retorna 0 quando userSelections é vazio', () => {
      const score = recommendationService.calculateMatchScore([], ['item1', 'item2']);
      expect(score).toBe(0);
    });

    test('Retorna 0 quando productAttributes é vazio', () => {
      const score = recommendationService.calculateMatchScore(['item1'], []);
      expect(score).toBe(0);
    });

    test('Calcula corretamente matches parciais', () => {
      const score = recommendationService.calculateMatchScore(
        ['item1', 'item2', 'item3'],
        ['item1', 'item4']
      );
      expect(score).toBe(1);
    });

    test('Calcula corretamente quando todos os itens combinam', () => {
      const score = recommendationService.calculateMatchScore(
        ['item1', 'item2'],
        ['item1', 'item2', 'item3']
      );
      expect(score).toBe(2);
    });
  });

  describe('calculateProductScore', () => {
    test('Calcula score combinando preferências e funcionalidades', () => {
      const product = {
        preferences: ['pref1', 'pref2'],
        features: ['feat1', 'feat2'],
      };

      const score = recommendationService.calculateProductScore(
        product,
        ['pref1'],
        ['feat1', 'feat2']
      );

      expect(score).toBe(3); // 1 preference + 2 features
    });

    test('Retorna 0 quando não há matches', () => {
      const product = {
        preferences: ['pref1'],
        features: ['feat1'],
      };

      const score = recommendationService.calculateProductScore(
        product,
        ['pref2'],
        ['feat2']
      );

      expect(score).toBe(0);
    });
  });
});
