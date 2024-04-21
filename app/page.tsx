'use client';

import { useEffect, useState } from 'react';

const WebViewPage = () => {
  const [value, setValue] = useState(1);

  const handleMessage = (event) => {
    const data = event;
    setValue((prev) => prev + 1);
    alert('Message from Native App ' + event.data);
    console.log('Received message from React Native app:', data);
  };

  useEffect(() => {
    document.addEventListener('message', (event) => {
      handleMessage(event);
    });

    return () => {
      document.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className='h-screen flex flex-col items-center'>
      <h1>Welcome to Next.js!</h1>
      <p>Communication with React Native app is enabled.</p>
      <button
        className='bg-indigo-500 p-2 rounded w-full'
        onClick={() => {
          window?.ReactNativeWebView?.postMessage(
            'Data from WebView / Website'
          );
        }}
      >
        Send Message to Next React Native {value}
      </button>
    </div>
  );
};

export default WebViewPage;
