# SEO Optimisation Guide

This document outlines the SEO optimisations implemented for the Rectify website, focusing on both on-page and off-page SEO strategies.

## Implemented Features

### 1. Sitemap Generation
- **File**: `app/sitemap.ts`
- **Access**: Automatically available at `/sitemap.xml`
- **Features**:
  - Dynamic sitemap generation
  - Priority and change frequency settings for each page
  - Automatically updated when pages change

### 2. Robots.txt Configuration
- **File**: `app/robots.ts`
- **Access**: Automatically available at `/robots.txt`
- **Features**:
  - Allows all search engines to crawl the site
  - Blocks API routes and Next.js internal files
  - References the sitemap location

### 3. Comprehensive Metadata
All pages include:
- **Title tags**: Optimised with template for consistent branding
- **Meta descriptions**: Unique, descriptive, and keyword-rich
- **Open Graph tags**: For social media sharing (Facebook, LinkedIn)
- **Twitter Cards**: Optimised for Twitter sharing
- **Canonical URLs**: Prevents duplicate content issues
- **Keywords**: Relevant industry keywords

### 4. Structured Data (JSON-LD)
Schema.org structured data implemented for:
- **Home Page**: ProfessionalService schema
- **Services Page**: Service schema with OfferCatalog
- **Contact Page**: ContactPage schema with ContactPoint

### 5. Page-Specific Optimisations

#### Home Page (`/`)
- ProfessionalService structured data
- Comprehensive service specialties listed
- Geographic coverage (United States primary, Germany secondary)

#### Services Page (`/services`)
- Service schema with detailed offer catalog
- Individual service descriptions
- Timeline and success rate information

#### Contact Page (`/contact`)
- ContactPage schema
- ContactPoint information
- Multiple contact methods

#### Legal Pages (`/privacy`, `/terms`, `/cookies`)
- Proper metadata for legal content
- Canonical URLs
- Indexable but lower priority

## Environment Variables

To ensure all SEO features work correctly, set the following environment variable:

```env
NEXT_PUBLIC_SITE_URL=https://rectifyinternational.com
```

**Important**: Replace with your actual domain URL. This is used for:
- Canonical URLs
- Open Graph images
- Structured data URLs
- Sitemap URLs

## Off-Page SEO Recommendations

### 1. Search Console Setup
1. **Google Search Console**:
   - Verify ownership using the verification meta tag (add to `app/layout.tsx` verification section)
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`
   - Monitor indexing status

2. **Bing Webmaster Tools**:
   - Verify ownership
   - Submit sitemap

### 2. Social Media Profiles
- Ensure LinkedIn company page exists and is linked
- Create Twitter/X profile and update the Twitter card creator handle
- Add Facebook business page if applicable
- Update `sameAs` URLs in structured data with actual social media links

### 3. Backlink Strategy
- **Industry directories**: List in renewable energy and recruitment directories
- **Local citations**: For United States and Germany locations
- **Guest content**: Write articles for industry publications
- **Partnerships**: Link exchanges with complementary businesses
- **Press releases**: For company news and achievements

### 4. Content Marketing
- **Blog section**: Consider adding a blog for SEO content
- **Case studies**: Showcase successful placements
- **Industry insights**: Share knowledge about renewable energy recruitment
- **Resource pages**: Create helpful guides and resources

### 5. Local SEO (if applicable)
- **Google Business Profile**: Create profiles for each office location
- **Local citations**: Ensure consistent NAP (Name, Address, Phone) across directories
- **Location pages**: Create dedicated pages for each geographic region

### 6. Technical SEO
- **Page speed**: Monitor and optimise Core Web Vitals
- **Mobile optimisation**: Ensure responsive design works perfectly
- **HTTPS**: Ensure SSL certificate is properly configured
- **404 pages**: Create custom 404 page with helpful navigation

### 7. Analytics & Monitoring
- **Google Analytics 4**: Set up tracking
- **Search Console**: Monitor search performance
- **Keyword tracking**: Track rankings for target keywords
- **Backlink monitoring**: Use tools like Ahrefs or SEMrush

## Keyword Strategy

### Primary Keywords
- Renewable energy recruitment
- Energy recruitment consultancy
- Solar PV recruitment
- Wind energy recruitment
- Battery storage recruitment

### Secondary Keywords
- Engineering recruitment
- Technology recruitment
- Executive search energy sector
- Permanent placement renewable energy
- Contract recruitment energy

### Long-tail Keywords
- Renewable energy recruitment USA
- Solar PV recruitment consultants United States
- Wind energy talent acquisition Germany
- ESG recruitment specialists Germany
- Data centre recruitment Houston
- Engineering recruitment Berlin

## Next Steps

1. **Set Environment Variable**: Add `NEXT_PUBLIC_SITE_URL` to your `.env.local` and production environment
2. **Verify Domain**: Add verification codes to `app/layout.tsx` for Google Search Console and Bing
3. **Update Social Links**: Replace placeholder social media URLs in structured data
4. **Submit Sitemap**: Submit to Google Search Console and Bing Webmaster Tools
5. **Monitor Performance**: Set up analytics and monitor SEO performance regularly

## Testing Your SEO

### Tools to Use
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

### Checklist
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] All pages have unique titles and descriptions
- [ ] Open Graph tags work on social media
- [ ] Structured data validates correctly
- [ ] Canonical URLs are correct
- [ ] Site is mobile-friendly
- [ ] Page speed is optimised

## Support

For questions about SEO implementation, refer to:
- [Next.js Metadata Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)


