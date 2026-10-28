// 1. COMBINED PRODUCT LIST (Fixed Redeclaration Error)
const products = [
    // South Indian
    { id: 1, name: "Ghee Roast Dosa", cat: "South", price: 120, img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400" },
    { id: 2, name: "Rava Idli (2 pcs)", cat: "South", price: 85, img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400" },
    { id: 3, name: "Medhu Vada", cat: "South", price: 70, img: "https://images.unsplash.com/photo-1624313511393-6997bb1f00b7?w=400" },
    { id: 4, name: "Appam with Stew", cat: "South", price: 160, img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400" },
    { id: 5, name: "Uttapam Platter", cat: "South", price: 140, img: "https://images.unsplash.com/photo-1644831610484-9092498877f8?w=400" },
    
    // North Indian
    { id: 6, name: "Amritsari Kulcha", cat: "North", price: 180, img: "https://images.unsplash.com/photo-1601050633647-8f8f564fb332?w=400" },
    { id: 7, name: "Paneer Paratha", cat: "North", price: 130, img: "https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?w=400" },
    { id: 8, name: "Chole Bhature", cat: "North", price: 150, img: "https://images.unsplash.com/photo-1626132646529-5003375a9f18?w=400" },
    { id: 9, name: "Bedmi Poori Sabzi", cat: "North", price: 120, img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=400" },
    { id: 10, name: "Gobi Paratha", cat: "North", price: 110, img: "https://images.unsplash.com/photo-1505253501701-362bb6bb320c?w=400" },

    // Street Food & Regional
    { id: 11, name: "Indori Poha", cat: "Street", price: 60, img: "https://images.unsplash.com/photo-1626500155553-6147690623d3?w=400" },
    { id: 12, name: "Vada Pav (Set of 2)", cat: "Street", price: 50, img: "https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?w=400" },
    { id: 13, name: "Misal Pav", cat: "Street", price: 140, img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400" },
    { id: 14, name: "Khaman Dhokla", cat: "Street", price: 90, img: "https://images.unsplash.com/photo-1626500155553-6147690623d3?w=400" },
    { id: 15, name: "Sabudana Khichdi", cat: "Healthy", price: 110, img: "https://images.unsplash.com/photo-1621447509371-d6a93326114d?w=400" }
];

// 2. PROCEDURAL GENERATION (Filling up to 30 items)
for(let i=16; i<=30; i++) {
    products.push({
        id: i,
        name: `Nashtaa Special #${i}`,
        cat: i % 2 === 0 ? "Healthy" : "Street",
        price: 90 + (i*2),
        img: `https://loremflickr.com/400/300/indian,breakfast?random=${i}`
    });
}

// 3. UI INITIALIZATION
const menuGrid = document.getElementById('menu-grid');
let cart = [];

function displayMenu(filteredList) {
    if(!menuGrid) return; // Guard clause
    menuGrid.innerHTML = filteredList.map(p => `
        <div class="glass-panel card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <div style="color: #ffd700; margin-bottom:10px">★★★★★</div>
            <span class="price-tag">₹${p.price}</span>
            <button class="btn-add" onclick="addToCart(${p.id})">Add to Basket</button>
        </div>
    `).join('');
}

// Initial Load
displayMenu(products);

// 4. FILTERING LOGIC
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const activeBtn = document.querySelector('.filter-btn.active');
        if(activeBtn) activeBtn.classList.remove('active');
        
        e.target.classList.add('active');
        const cat = e.target.dataset.cat;
        const filtered = (cat === 'All' || !cat) ? products : products.filter(p => p.cat === cat);
        displayMenu(filtered);
    });
});

// 5. CART & ORDER LOGIC
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    if(drawer) drawer.classList.toggle('active');
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    if(item) {
        cart.push(item);
        updateCartUI();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    if(cartCount) cartCount.innerText = cart.length;
    
    if(cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom:5px;">
                <span>${item.name}</span>
                <span>₹${item.price}</span>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if(totalPrice) totalPrice.innerText = total;
}

// 6. LIVE TRACKING LOGIC
function processOrder() {
    if(cart.length === 0) return alert("Basket is empty!");
    
    const trackingModal = document.getElementById('tracking-modal');
    const cartDrawer = document.getElementById('cart-drawer');

    if(trackingModal) trackingModal.classList.remove('hidden');
    if(cartDrawer) cartDrawer.classList.remove('active');
    
    startTracking();
    
    // Clear cart after starting tracking
    cart = [];
    updateCartUI();
}

function startTracking() {
    const steps = document.querySelectorAll('.step');
    // Reset steps if previously used
    steps.forEach(step => step.classList.remove('active'));
    
    let current = 0;
    const interval = setInterval(() => {
        if(current < steps.length) {
            steps[current].classList.add('active');
            current++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                alert("Food is at your door! Enjoy your Nashtaa.");
                const trackingModal = document.getElementById('tracking-modal');
                if(trackingModal) trackingModal.classList.add('hidden');
            }, 500);
        }
    }, 3000);
}

// 7. HUNGER SLIDER
const hungerInput = document.getElementById('hunger');
if(hungerInput) {
    hungerInput.addEventListener('input', (e) => {
        const valSpan = document.getElementById('h-val');
        if(valSpan) valSpan.innerText = e.target.value;
    });
}