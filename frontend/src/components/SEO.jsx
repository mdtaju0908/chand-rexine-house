import React, { useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, pageKey }) => {
  const { getContentByKey, loading } = useContent();
  const location = useLocation();

  // Determine the effective page key if not provided
  const effectivePageKey = pageKey || (() => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/about') return 'about';
    if (path === '/products') return 'products';
    if (path === '/manufacturing') return 'manufacturing';
    if (path === '/agency-supply') return 'agency_supply';
    if (path === '/why-us') return 'why_us';
    if (path === '/dealer-registration') return 'dealer_registration';
    if (path === '/contact') return 'contact';
    return null;
  })();

  // We need to handle the case where content might not be loaded yet
  // But typically context provides default values or empty strings.
  
  const globalTitle = getContentByKey('meta_title', 'Chand Rexine House');
  const globalDesc = getContentByKey('meta_description', 'Premium Rexine & Upholstery Solutions');

  const pageTitleKey = effectivePageKey ? `seo_${effectivePageKey}_title` : null;
  const pageDescKey = effectivePageKey ? `seo_${effectivePageKey}_description` : null;

  const pageTitle = pageTitleKey ? getContentByKey(pageTitleKey) : null;
  const pageDesc = pageDescKey ? getContentByKey(pageDescKey) : null;

  // Logic: 
  // 1. If pageTitle from CMS exists, use it (maybe append brand).
  // 2. Else if prop `title` exists, use it (maybe append brand).
  // 3. Else use globalTitle.
  
  const brandSuffix = ' | Chand Rexine House'; // Could also be from CMS if needed, but keeping simple.
  
  let finalTitle = globalTitle;
  if (pageTitle) {
      // If the page title already contains the brand, don't append. 
      // But usually user enters "Home", so we append.
      // However, my default data was "Home | Chand Rexine House", so maybe I shouldn't append if it's long?
      // Let's just use it as is if it comes from CMS.
      finalTitle = pageTitle;
  } else if (title) {
      finalTitle = `${title}${brandSuffix}`;
  }

  const finalDesc = pageDesc || description || globalDesc;

  useEffect(() => {
    if (loading) return;

    // Update Title
    document.title = finalTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = finalDesc;

    // Update Open Graph tags
    const updateMeta = (property, content) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
        }
        tag.content = content;
    };

    updateMeta('og:title', finalTitle);
    updateMeta('og:description', finalDesc);
    updateMeta('og:type', 'website');
    updateMeta('og:url', window.location.href);

  }, [finalTitle, finalDesc, loading, location.pathname]);

  return null;
};

export default SEO;
