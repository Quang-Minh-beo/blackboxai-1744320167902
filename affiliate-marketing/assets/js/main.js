// AI Chat Widget functionality
class AIChatWidget {
    constructor() {
        this.messages = [];
        this.isOpen = false;
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        const chatButton = document.getElementById('chat-button');
        
        if (chatWindow && chatButton) {
            chatWindow.classList.toggle('hidden');
            chatButton.classList.toggle('hidden');
            this.isOpen = !this.isOpen;

            if (this.isOpen) {
                const input = document.getElementById('chat-input');
                if (input) input.focus();
            }
        }
    }

    async sendMessage(message) {
        if (!message.trim()) return;

        // Add user message
        this.addMessage(message, 'user');

        // Simulate AI thinking
        await this.simulateTyping();

        // Generate AI response
        const response = this.generateResponse(message);
        this.addMessage(response, 'ai');
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'mb-4';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'flex items-start ' + (sender === 'user' ? 'justify-end' : '');
        
        const messageBubble = document.createElement('div');
        messageBubble.className = sender === 'user' 
            ? 'bg-blue-600 text-white rounded-lg py-2 px-4 max-w-[80%]'
            : 'bg-blue-100 text-gray-800 rounded-lg py-2 px-4 max-w-[80%]';
        
        messageBubble.innerHTML = `<p class="text-sm">${this.escapeHtml(message)}</p>`;
        messageContent.appendChild(messageBubble);
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Store message
        this.messages.push({ sender, message });
    }

    async simulateTyping() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'mb-4';
        typingDiv.innerHTML = `
            <div class="flex items-start">
                <div class="bg-gray-200 rounded-lg py-2 px-4">
                    <div class="flex space-x-2">
                        <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate AI thinking time
        await new Promise(resolve => setTimeout(resolve, 1500));
        messagesContainer.removeChild(typingDiv);
    }

    generateResponse(message) {
        // Simple response generation based on keywords
        const responses = {
            default: "Xin chào! Tôi có thể giúp gì cho bạn?",
            greeting: "Chào bạn! Rất vui được hỗ trợ bạn hôm nay.",
            product: "Tôi có thể giúp bạn tìm sản phẩm phù hợp nhất. Bạn quan tâm đến danh mục nào?",
            price: "Chúng tôi có nhiều mức giá khác nhau để phù hợp với ngân sách của bạn. Bạn muốn tìm sản phẩm trong khoảng giá nào?",
            shipping: "Chúng tôi hỗ trợ giao hàng toàn quốc và miễn phí cho đơn hàng từ 500.000đ.",
            help: "Tôi có thể giúp bạn tìm kiếm sản phẩm, xem thông tin chi tiết và so sánh giá. Bạn cần hỗ trợ gì?"
        };

        const lowercaseMsg = message.toLowerCase();
        
        if (lowercaseMsg.includes('xin chào') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hello')) {
            return responses.greeting;
        } else if (lowercaseMsg.includes('sản phẩm') || lowercaseMsg.includes('mua')) {
            return responses.product;
        } else if (lowercaseMsg.includes('giá') || lowercaseMsg.includes('tiền')) {
            return responses.price;
        } else if (lowercaseMsg.includes('giao hàng') || lowercaseMsg.includes('ship')) {
            return responses.shipping;
        } else if (lowercaseMsg.includes('giúp') || lowercaseMsg.includes('hỗ trợ')) {
            return responses.help;
        }

        return responses.default;
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '<')
            .replace(/>/g, '>')
            .replace(/"/g, '"')
            .replace(/'/g, '&#039;');
    }
}

// Initialize chat widget
const chatWidget = new AIChatWidget();

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Chat input handler
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = this.value.trim();
                if (message) {
                    chatWidget.sendMessage(message);
                    this.value = '';
                }
            }
        });
    }

    // Product image gallery (for product.html)
    const productThumbnails = document.querySelectorAll('.product-thumbnail');
    const mainProductImage = document.querySelector('.main-product-image');
    
    if (productThumbnails.length && mainProductImage) {
        productThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                mainProductImage.src = this.src;
                productThumbnails.forEach(thumb => thumb.classList.remove('border-blue-500'));
                this.classList.add('border-blue-500');
            });
        });
    }

    // Filter handling (for category.html)
    const filterForm = document.getElementById('filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle filter application
            console.log('Filters applied');
        });
    }

    // Product search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                // Handle search
                console.log('Searching for:', this.value);
            }, 500);
        });
    }
});

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for use in other scripts
window.chatWidget = chatWidget;
window.utils = {
    formatPrice,
    debounce
};

// Make chat functions globally available
window.toggleChat = () => chatWidget.toggleChat();
window.sendMessage = () => {
    const input = document.getElementById('chat-input');
    if (input) {
        chatWidget.sendMessage(input.value);
        input.value = '';
    }
};

// Admin functionality
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (demo purposes only)
    if (email === 'admin@example.com' && password === 'admin123') {
        document.getElementById('loginModal').classList.add('hidden');
        document.getElementById('adminDashboard').classList.remove('hidden');
    } else {
        alert('Email hoặc mật khẩu không đúng!');
    }
}

function handleLogout() {
    document.getElementById('loginModal').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
}

// Modal controls
function toggleLoginModal() {
    document.getElementById('loginModal').classList.toggle('hidden');
}

function showAddProductModal() {
    document.getElementById('addProductModal').classList.remove('hidden');
}

function hideAddProductModal() {
    document.getElementById('addProductModal').classList.add('hidden');
}

function showAddCategoryModal() {
    document.getElementById('addCategoryModal').classList.remove('hidden');
}

function hideAddCategoryModal() {
    document.getElementById('addCategoryModal').classList.add('hidden');
}

// Add event listeners for admin functionality when on admin page
document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('addProductForm');
    const addCategoryForm = document.getElementById('addCategoryForm');
    
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Handle product form submission
            hideAddProductModal();
            alert('Sản phẩm đã được thêm thành công!');
        });
    }

    if (addCategoryForm) {
        addCategoryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Handle category form submission
            hideAddCategoryModal();
            alert('Danh mục đã được thêm thành công!');
        });
    }
});

// Make admin functions globally available
window.admin = {
    handleLogin,
    handleLogout,
    toggleLoginModal,
    showAddProductModal,
    hideAddProductModal,
    showAddCategoryModal,
    hideAddCategoryModal
};
