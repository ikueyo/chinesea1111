document.addEventListener('DOMContentLoaded', function() {
    // 限制使用者最多只能選擇兩個競賽項目
    const form = document.getElementById('registrationForm');
    const checkboxes = form.querySelectorAll('input[name="category"]');
    const maxAllowed = 2;

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
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 防止表單真的被提交

        const studentName = document.getElementById('studentName').value;
        const checkedCount = Array.from(checkboxes).filter(i => i.checked).length;

        if (checkedCount === 0) {
            alert('請至少選擇一個競賽項目。');
            return;
        }

        // 顯示一個簡單的成功訊息
        alert(`感謝 ${studentName}！您的報名已成功提交。`);

        // 在實際應用中，您會在這裡將數據發送到伺服器
        // 例如：fetch('/api/register', { method: 'POST', body: new FormData(form) });

        form.reset(); // 清空表單
    });
});
