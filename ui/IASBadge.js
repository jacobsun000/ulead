"use client"

import { useEffect } from 'react';

const IASBadge = () => {
  useEffect(() => {
    // Check if the script is already present
    if (!document.querySelector("script[src='https://www-cdn.icef.com/scripts/iasbadgeid.js']")) {
      const script = document.createElement('script');
      script.src = 'https://www-cdn.icef.com/scripts/iasbadgeid.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script); // Cleanup on unmount
      };
    }
  }, []);

  return <span id="iasBadge" data-account-id="6036"></span>;
};

export default IASBadge;
