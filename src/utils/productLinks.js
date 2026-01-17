/**
 * Product Links for Makeup Recommendations
 * Maps makeup colors to real products on popular retailers
 */

/**
 * Generate product search URLs based on color name and type
 */
export const getProductSearchUrl = (colorName, productType, finish = '') => {
  // Clean up the search term
  const searchTerm = `${finish} ${colorName} ${productType}`.trim().replace(/\s+/g, '+')

  return {
    sephora: `https://www.sephora.com/search?keyword=${searchTerm}`,
    ulta: `https://www.ulta.com/search?q=${searchTerm}`,
    amazon: `https://www.amazon.com/s?k=${searchTerm}+makeup`,
  }
}

/**
 * Get curated product recommendations for specific makeup items
 * These are affiliate-ready links that can be monetized
 */
export const getCuratedProducts = (productType) => {
  const products = {
    lips: [
      {
        brand: 'MAC',
        name: 'Lipstick',
        url: 'https://www.sephora.com/brand/m-a-c',
        affiliate: true
      },
      {
        brand: 'NARS',
        name: 'Lipstick',
        url: 'https://www.sephora.com/brand/nars',
        affiliate: true
      },
      {
        brand: 'Charlotte Tilbury',
        name: 'Matte Revolution',
        url: 'https://www.sephora.com/brand/charlotte-tilbury',
        affiliate: true
      }
    ],
    eyes: [
      {
        brand: 'Urban Decay',
        name: 'Eyeshadow Palette',
        url: 'https://www.sephora.com/brand/urban-decay',
        affiliate: true
      },
      {
        brand: 'Anastasia Beverly Hills',
        name: 'Eyeshadow',
        url: 'https://www.sephora.com/brand/anastasia-beverly-hills',
        affiliate: true
      },
      {
        brand: 'Huda Beauty',
        name: 'Eyeshadow Palette',
        url: 'https://www.sephora.com/brand/huda-beauty',
        affiliate: true
      }
    ],
    cheeks: [
      {
        brand: 'NARS',
        name: 'Blush',
        url: 'https://www.sephora.com/brand/nars',
        affiliate: true
      },
      {
        brand: 'Fenty Beauty',
        name: 'Cheek Color',
        url: 'https://www.sephora.com/brand/fenty-beauty',
        affiliate: true
      },
      {
        brand: 'Rare Beauty',
        name: 'Soft Pinch Blush',
        url: 'https://www.sephora.com/brand/rare-beauty',
        affiliate: true
      }
    ],
    highlights: [
      {
        brand: 'Becca',
        name: 'Highlighter',
        url: 'https://www.sephora.com/search?keyword=highlighter',
        affiliate: true
      },
      {
        brand: 'Fenty Beauty',
        name: 'Killawatt Highlighter',
        url: 'https://www.sephora.com/brand/fenty-beauty',
        affiliate: true
      }
    ],
    bronzer: [
      {
        brand: 'Benefit',
        name: 'Hoola Bronzer',
        url: 'https://www.sephora.com/brand/benefit-cosmetics',
        affiliate: true
      },
      {
        brand: 'Charlotte Tilbury',
        name: 'Filmstar Bronze & Glow',
        url: 'https://www.sephora.com/brand/charlotte-tilbury',
        affiliate: true
      }
    ]
  }

  return products[productType] || []
}

/**
 * Generate Amazon affiliate link (placeholder - replace with actual affiliate ID)
 */
export const getAmazonAffiliateLink = (searchTerm) => {
  // TODO: Replace 'your-affiliate-id' with actual Amazon Associates ID
  const affiliateId = 'your-affiliate-id-20'
  const cleanSearch = searchTerm.replace(/\s+/g, '+')
  return `https://www.amazon.com/s?k=${cleanSearch}+makeup&tag=${affiliateId}`
}

/**
 * Track product click for analytics
 */
export const trackProductClick = (productType, colorName, retailer) => {
  // This can be integrated with Google Analytics or other analytics platforms
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'product_click', {
      product_type: productType,
      color_name: colorName,
      retailer: retailer
    })
  }

  console.log(`Product click: ${productType} - ${colorName} - ${retailer}`)
}
