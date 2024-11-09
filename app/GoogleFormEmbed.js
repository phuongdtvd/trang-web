// app/posts/[id]/GoogleFormEmbed.js
'use client';

import { useEffect, useState } from 'react';

function getPersistedFormSelection() {
  return localStorage.getItem('selectedForm');
}

function persistFormSelection(formUrl) {
  localStorage.setItem('selectedForm', formUrl);
}

function getRandomForm(forms) {
  const randomIndex = Math.floor(Math.random() * forms.length);
  return forms[randomIndex];
}

function appendEmbeddedParam(url) {
  const urlObj = new URL(url);
  urlObj.searchParams.append('embedded', 'true');
  return urlObj.toString();
}

export default function GoogleFormEmbed({ availableForms }) {
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    let form = getPersistedFormSelection();

    if (!form && availableForms.length > 0) {
      form = getRandomForm(availableForms);
      persistFormSelection(form);
    }

    setSelectedForm(form);
  }, [availableForms]);

  if (!selectedForm) {
    return <div>No forms available at this moment.</div>;
  }

  // Ensure the selected form includes the embedded parameter
  const embeddedFormUrl = appendEmbeddedParam(selectedForm);

  return (
    <div className="centered-container">
      <iframe
        className="responsive-iframe"
        src={embeddedFormUrl}
        title="Google Form"
      >
        Loading…
      </iframe>
    </div>
  );
}