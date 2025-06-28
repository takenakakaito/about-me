// ========== Contact Form JavaScript ==========

document.addEventListener('DOMContentLoaded', function() {
    
    // コンタクトフォームの処理
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // フォーム送信を一旦停止
            
            // フォームデータを取得
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // バリデーション
            if (!name || !email || !message) {
                showMessage('必須項目を入力してください。', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('正しいメールアドレスを入力してください。', 'error');
                return;
            }
            
            // 送信処理をシミュレート
            showMessage('送信中...', 'info');
            
            setTimeout(() => {
                showMessage('メッセージが送信されました！ありがとうございます。', 'success');
                contactForm.reset(); // フォームをリセット
            }, 2000);
        });
    }
    
    // フォーム入力時のリアルタイムバリデーション
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // エラー状態をクリア
            this.classList.remove('error');
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
});

// メールアドレスのバリデーション
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// フィールドのバリデーション
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    let errorMessage = '';
    
    // 必須フィールドのチェック
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'この項目は必須です。';
    }
    
    // メールアドレスのチェック
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = '正しいメールアドレスを入力してください。';
    }
    
    // エラー表示/非表示
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// フィールドエラーの表示
function showFieldError(field, message) {
    field.classList.add('error');
    
    // 既存のエラーメッセージを削除
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // 新しいエラーメッセージを追加
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);
}

// フィールドエラーのクリア
function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// メッセージ表示関数
function showMessage(message, type) {
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 新しいメッセージを作成
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // フォームの上に挿入
    const form = document.querySelector('.contact-form');
    if (form) {
        form.parentElement.insertBefore(messageElement, form);
        
        // 3秒後に自動削除（エラー以外）
        if (type !== 'error') {
            setTimeout(() => {
                if (messageElement.parentElement) {
                    messageElement.remove();
                }
            }, 3000);
        }
    }
}

// ========== スムーススクロール ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});