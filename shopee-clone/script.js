// Data mock untuk produk
let products = JSON.parse(localStorage.getItem('allProducts')) || [
    { id: 1, name: 'Smartphone Samsung', price: 3000000, image: 'https://via.placeholder.com/300x300/28a745/ffffff?text=Samsung', category: 'Elektronik', flashSale: true },
    { id: 2, name: 'Kaos Polos', price: 50000, image: 'https://via.placeholder.com/300x300/20c997/ffffff?text=Kaos', category: 'Fashion', flashSale: false },
    { id: 3, name: 'Blender Philips', price: 250000, image: 'https://via.placeholder.com/300x300/17a2b8/ffffff?text=Blender', category: 'Rumah Tangga', flashSale: true },
    { id: 4, name: 'Sepatu Running', price: 150000, image: 'https://via.placeholder.com/300x300/28a745/ffffff?text=Sepatu', category: 'Olahraga', flashSale: false },
    { id: 5, name: 'Vitamin C', price: 30000, image: 'https://via.placeholder.com/300x300/20c997/ffffff?text=Vitamin', category: 'Kesehatan', flashSale: true },
];

// Fungsi untuk memuat produk flash sale
function loadFlashSaleProducts() {
    const flashSaleContainer = document.getElementById('flashSaleProducts');
    if (!flashSaleContainer) return;
    const flashSaleProducts = products.filter(product => product.flashSale);
    
    flashSaleProducts.forEach(product => {
        const productCard = createProductCard(product);
        flashSaleContainer.appendChild(productCard);
    });
}

// Fungsi untuk memuat produk rekomendasi
function loadRecommendedProducts() {
    const recommendedContainer = document.getElementById('recommendedProducts');
    if (!recommendedContainer) return;
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        recommendedContainer.appendChild(productCard);
    });
}

// Fungsi untuk membuat kartu produk
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-3';
    
    col.innerHTML = `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h5>${product.name}</h5>
            <p class="price">Rp ${product.price.toLocaleString()}</p>
            <button class="btn btn-success" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
            <a href="product.html?id=${product.id}" class="btn btn-outline-success mt-2">Lihat Detail</a>
        </div>
    `;
    
    return col;
}

// Fungsi untuk menambah produk ke keranjang
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produk ditambahkan ke keranjang!');
    }
}

// Fungsi pencarian
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.category.toLowerCase().includes(query)
        );
        
        // Update tampilan produk berdasarkan pencarian
        // (Implementasi sederhana, bisa diperbaiki)
    });
}

// Inisialisasi halaman
document.addEventListener('DOMContentLoaded', function() {
    loadFlashSaleProducts();
    loadRecommendedProducts();
});
