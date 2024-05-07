'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (data: string) => {};
    };
  }
}

const WebViewPage = () => {
  const [value, setValue] = useState('');

  console.log('value', value);
  const handleMessage = (event: MessageEvent) => {
    setValue(event.data);
    window?.ReactNativeWebView?.postMessage(event.data);
  };

  useEffect(() => {
    document.addEventListener('message', handleMessage as EventListener);

    return () => {
      document.removeEventListener('message', handleMessage as EventListener);
    };
  }, []);

  return (
    <div className='h-screen flex flex-col items-center break-all'>
      <h1>Welcome to Next.js!</h1>
      <p>Communication with React Native app is enabled.</p>
      {value}
      <button
        className='bg-indigo-500 p-2 rounded'
        onClick={() => {
          if (window?.ReactNativeWebView)
            window?.ReactNativeWebView?.postMessage('OpenCamera');
          else alert('This function can be accessed only on mobile device');
        }}
      >
        Open Camera
      </button>
    </div>
  );
};

export default WebViewPage;
