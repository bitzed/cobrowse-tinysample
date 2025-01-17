document.addEventListener("DOMContentLoaded", function() {
    const getTokenButton = document.getElementById('getToken');
    if (getTokenButton) {
      getTokenButton.addEventListener('click', async function() {
        try {
          const sdkToken = await getSdkToken();
          setIframeSrc(sdkToken);
        } catch (error) {
          console.error('トークンの取得中にエラーが発生しました:', error);
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
        body: JSON.stringify({ role: 2 }) // エージェントの役割を指定
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
  
  function setIframeSrc(sdkToken) {
    const iframe = document.getElementById('iframe');
    if (iframe) {
      //const encodedToken = encodeURIComponent(sdkToken);
      iframe.src = `https://us01-zcb.zoom.us/sdkapi/zcb/frame-templates/desk?access_token=${sdkToken}`;
      console.log('iframe の src を設定しました:', iframe.src);
    } else {
      console.error('iframe 要素が見つかりません。');
    }
  }
  