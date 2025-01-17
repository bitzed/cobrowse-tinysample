
document.addEventListener("DOMContentLoaded", function() {
    const getTokenButton = document.getElementById('getToken');
    if (getTokenButton) {
        getTokenButton.addEventListener('click', async function() {
        try {
            getTokenButton.disabled = true;
            const sdkToken = await getSdkToken();
            initializeCobrowseSDK(sdkToken);
        } catch (error) {
            console.error('Coud not get a token:', error);
        } finally {
            getTokenButton.disabled = false;
        }
        });
    } else {
        console.error('Get Token ボタンが見つかりません。');
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
        throw new Error(`HTTP エラー! ステータス: ${response.status}`);
      }
      const data = await response.json();
      console.log('SDK トークンを取得しました:', data.sdkToken);
      return data.sdkToken;
    } catch (error) {
      console.error('トークンの取得中にエラーが発生しました:', error);
      throw error;
    }
  }
  
  function initializeCobrowseSDK(sdkToken) {
    console.log('Cobrowse SDK の初期化を開始します。');
    if (typeof ZoomCobrowseSDK === 'undefined') {
      console.log('ZoomCobrowseSDK が読み込まれていません。');
      return;
    }
    console.log('ZoomCobrowseSDK が読み込まれました。');
    const settings = {
      allowCustomerAnnotation: true,
      piiMask:{
        maskType: 'custom_input',
        maskCssSelectors: '.hideme',
     }
    };
  
    ZoomCobrowseSDK.init(settings, function({ success, session, error }) {
        console.log('Cobrowse SDK の初期化が完了しました。');
      if (success) {
        console.log('Cobrowse SDK の初期化に成功しました。');
        const startButton = document.getElementById('startCobrowse');
        startButton.disabled = false;
        startButton.addEventListener('click', function() {
          startCobrowseSession(session, sdkToken);
        });
      } else {
        console.error('Cobrowse SDK の初期化中にエラーが発生しました:', error);
      }
    });
  }
  
  function startCobrowseSession(session, sdkToken) {
    session.start({
      sdkToken: sdkToken,
      onSuccess: function() {
        console.log('Cobrowse セッションの開始に成功しました。');
      },
      onError: function(error) {
        console.error('Cobrowse セッションの開始中にエラーが発生しました:', error);
      }
    });
  }
  