"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react';


const IASBadge = ({ certNum }) => {
  const [masterAccountId, setMasterAccountId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!certNum) {
      console.error('IAS Badge: Cert ID is missing');
      setError('Cert ID is missing.');
      return;
    }

    const url = `https://icef.com/scripts/iasbadge.php?certId=${certNum}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!Array.isArray(data.records)) {
          console.warn('Not an IAS Agent');
          setError('Not an IAS Agent.');
          return;
        }

        const masterAccountId = data.records[0]?.Master_Account__c;
        if (!masterAccountId) {
          console.warn('No Master Account found');
          setError('No Master Account found.');
          return;
        }
        setMasterAccountId(masterAccountId);

      })
      .catch(err => {
        console.error('Error:', err);
        setError('Error fetching IAS badge.');
      });
  }, [certNum]);

  return (
    <div id="iasBadge">
      <a href={`https://www.icef.com/agency/${masterAccountId}`} target="_blank">
        <Image src="/img/ICEF_Badge.png" alt="ICEF Badge" width="120" height="120" />
      </a>
    </div>
  );
};

export default IASBadge;
