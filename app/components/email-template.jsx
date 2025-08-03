import React from 'react';

export function EmailTemplate({ firstName, message }) {
  return (
    <div>
      <h1>New Message from {firstName}</h1>
      <p>{message}</p>
    </div>
  );
}

