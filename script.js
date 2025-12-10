document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const checkboxes = form.querySelectorAll('input[name="category"]');
    const maxAllowed = 2;

    // 您部署的 Google Apps Script Web App URL
    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/a/macros/zyi.kh.edu.tw/s/AKfycbxcKDuQrn1sE5fprRSWy-AX8-jY5vbslEE88oMq3qyHRya-S6Ir94J6h_ajazBRMePu/exec';

    // 限制使用者最多只能選擇兩個競賽項目
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedCount = Array.from(checkboxes).filter(i => i.checked).length;
            if (checkedCount > maxAllowed) {
                alert(`您最多只能選擇 ${maxAllowed} 個競賽項目。`);
                checkbox.checked = false;
            }
        });
    });

    // 處理表單提交
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // 防止表單真的被提交

        const studentName = document.getElementById('studentName').value;
        const checkedCount = Array.from(checkboxes).filter(i => i.checked).length;

        if (checkedCount === 0) {
            alert('請至少選擇一個競賽項目。');
            return;
        }

        // 建立 FormData 物件，用於發送資料
        const formData = new FormData(form);

        // 將所有選中的報名項目組合成一個字串
        const selectedCategories = Array.from(checkboxes)
                                      .filter(cb => cb.checked)
                                      .map(cb => cb.value)
                                      .join(', ');
        formData.set('category', selectedCategories); // 將組裝好的字串設定到 FormData 中

        // 顯示提交中訊息
        alert('報名資料提交中，請稍候...');

        try {
            // 將 FormData 轉換為 URL 編碼的字串
            const urlEncodedData = new URLSearchParams(formData).toString();

            const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlEncodedData
            });

            const result = await response.json();

            if (result.result === 'success') {
                alert(`感謝 ${studentName}！您的報名已成功提交，資料已記錄。`);
                form.reset(); // 清空表單
            } else if (result.message === 'Bot detected') {
                alert('偵測到可疑活動，您的報名未被處理。如果您是真人，請清除瀏覽器快取後再試。');
            } else {
                alert(`報名提交失敗：${result.message || '未知錯誤'}`);
            }
        } catch (error) {
            console.error('提交報名時發生錯誤:', error);
            alert('網路錯誤或伺服器問題，請稍後再試。');
        }
    });
});