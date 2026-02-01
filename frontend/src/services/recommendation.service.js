const calculateMatchScore = (userSelections = [], productAttributes = []) => {
  if (!userSelections.length || !productAttributes.length) {
    return 0;
  }

  const attributeSet = new Set(productAttributes);
  return userSelections.filter((selection) => attributeSet.has(selection)).length;
};

const calculateProductScore = (product, selectedPreferences, selectedFeatures) => {
  const preferencesScore = calculateMatchScore(selectedPreferences, product.preferences);
  const featuresScore = calculateMatchScore(selectedFeatures, product.features);
  return preferencesScore + featuresScore;
};

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: '' },
  products = []
) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  if (!products || products.length === 0) {
    return [];
  }

  const scoredProducts = products.map((product, index) => ({
    product,
    score: calculateProductScore(product, selectedPreferences, selectedFeatures),
    index,
  }));

  const matchingProducts = scoredProducts.filter(({ score }) => score > 0);

  if (matchingProducts.length === 0) {
    return [];
  }

  if (selectedRecommendationType === 'SingleProduct') {
    const maxScore = Math.max(...matchingProducts.map(({ score }) => score));
    const topProducts = matchingProducts.filter(({ score }) => score === maxScore);
    const winner = topProducts.reduce((prev, current) =>
      current.index > prev.index ? current : prev
    );
    return [winner.product];
  }

  const sortedProducts = matchingProducts
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.index - b.index;
    })
    .map(({ product }) => product);

  return sortedProducts;
};

export default { getRecommendations, calculateMatchScore, calculateProductScore };
