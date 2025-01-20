document.addEventListener("DOMContentLoaded", function() {
  console.log('DOMContentLoaded イベントが発生しました。');
  try {
    getSdkToken().then(sdkToken => {
      redirectAgent(sdkToken);
    });
  } catch (error) {
    console.error('トークンの取得中にエラーが発生しました:', error);
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
  
function redirectAgent(sdkToken) {
  const zoomUrl = `https://us01-zcb.zoom.us/sdkapi/zcb/frame-templates/desk?access_token=${sdkToken}`;
  console.log('Zoom URLにリダイレクトします:', zoomUrl);
  document.body.innerHTML = `<iframe src="${zoomUrl}" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">`;
}
  