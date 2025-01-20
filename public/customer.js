document.addEventListener("DOMContentLoaded", function() {
  console.log('DOMContentLoaded');
  try {
    getSdkToken().then(sdkToken => {
      initializeCobrowseSDK(sdkToken);
    });
  } catch (error) {
    console.error('failed to get token:', error);
  }
});
  
async function getSdkToken() {
  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: 1 })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('SDK token:', data.sdkToken);
    return data.sdkToken;
  } catch (error) {
    console.error('failed to get token:', error);
    throw error;
  }
}

function initializeCobrowseSDK(sdkToken) {
  if (typeof ZoomCobrowseSDK === 'undefined') {
    console.log('SDK is not loaded yet.');
    return;
  }
  const settings = {
    allowCustomerAnnotation: true,
    piiMask:{
      maskType: 'custom_input',
      maskCssSelectors: '.hideme',
    }
  };

  ZoomCobrowseSDK.init(settings, function({ success, session, error }) {
    if (success) {
      console.log('SDK has been initialized successfully.');
      const startButton = document.getElementById('startCobrowse');
      startButton.disabled = false;
      startButton.addEventListener('click', function() {
        startCobrowseSession(session, sdkToken);
      });
    } else {
      console.error('Failed to initialize SDK:', error);
    }
  });
}

function startCobrowseSession(session, sdkToken) {
  session.start({
    sdkToken: sdkToken,
    onSuccess: function() {
      console.log('Session has been started successfully.');
    },
    onError: function(error) {
      console.error('Failed to start session:', error);
    }
  });
}
