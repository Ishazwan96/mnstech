document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id:1, name:'4 Channel', img:'1.png', price: 1680,
                features: ['FULL HD','1 x DVR Recorder','1 x 1TB HDD','4 x Camera (Dome/Bullet)','Wiring/Installation']
            },
            { id:2, name:'8 Channel', img:'1.png', price: 3080,
                features: ['FULL HD','1 x DVR Recorder','1 x 2TB HDD','8 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:3, name:'16 Channel', img:'1.png', price: 5880,
                features: ['FULL HD','1 x DVR Recorder','1 x 4TB HDD','16 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:4, name:'4 Channel', img:'1.png', price: 2080,
                features: ['SUPER HD','1 x DVR Recorder','1 x 1TB HDD','4 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:5, name:'8 Channel', img:'1.png', price: 3680,
                features: ['SUPER HD','1 x DVR Recorder','1 x 2TB HDD','8 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:6, name:'16 Channel', img:'1.png', price: 6580,
                features: ['SUPER HD','1 x DVR Recorder','1 x 4TB HDD','16 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:7, name:'4 Channel', img:'1.png', price: 2480,
                features: ['4K Resolution','1 x DVR Recorder','1 x 2TB HDD','4 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:8, name:'8 Channel', img:'1.png', price: 4480,
                features: ['4K Resolution','1 x DVR Recorder','1 x 4TB HDD','8 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:9, name:'16 Channel', img:'1.png', price: 7880,
                features: ['4K Resolution','1 x DVR Recorder','1 x 6TB HDD','16 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:10, name:'Wiring/Installation', img:'db.png', price: 0,
                features: ['Wiring Soket','Wiring Lampu','Wiring Kipas','Wiring DB','dan lain-lain']
             },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,

        add(newItem) {
            const cartItem = this.items.find((item) => item.id === newItem.id);

            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
            } else {
                cartItem.quantity++;
                cartItem.total = cartItem.price * cartItem.quantity;
            }

            this.quantity++;
            this.total += newItem.price;
        },

        remove(id) {
            const cartItem = this.items.find((item) => item.id === id);

            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                cartItem.total = cartItem.price * cartItem.quantity;
            } else {
                this.items = this.items.filter((item) => item.id !== id);
            }

            this.quantity--;
            this.total -= cartItem.price;
        }
    });
});

// Checkout Form Validation
const checkoutButton = document.querySelector('.checkout-button');
const form = document.querySelector('#checkoutForm');

form.addEventListener('input', () => {
    checkoutButton.disabled = [...form.elements].some(input => input.value.trim() === "");
});

// Checkout Button Click
checkoutButton.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const message = formatMessage(data);
    window.open(`https://wa.me/60136839091?text=${encodeURIComponent(message)}`);
});

// Format WhatsApp Message
const formatMessage = (data) => {
    let message = `*Customer Details*\n\n`;
    message += `👤 Name: ${data.name}\n📧 Email: ${data.email}\n📞 No. Tel: ${data.phone}\n📍 Location: ${data.location}\n\n`;
    message += `*Order Details*\n\n`;

    const items = JSON.parse(data.items);
    items.forEach((item) => {
        message += `📦 ${item.name} (${item.quantity} x ${RM(item.total)})\n`;
        message += `🔹 Features: ${item.features.join(', ')}\n\n`;
    });

    message += `💰 TOTAL: ${RM(data.total)}\n\n🙏 Terima Kasih!`;
    return message;
};

// Convert to MYR Format
const RM = (number) => new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR' }).format(number);

// Contact Form Validation
const hantarButton = document.getElementById('hantar-button');
const contactForm = document.getElementById('hantarForm');

function checkContactForm() {
    const inputs = contactForm.querySelectorAll('input, textarea');
    let isValid = [...inputs].every(input => input.value.trim() !== "");

    hantarButton.disabled = !isValid;
    hantarButton.classList.toggle('disabled', !isValid);
}

contactForm.addEventListener('input', checkContactForm);
checkContactForm();

function sendWhatsapp() {
    const name = document.querySelector('.name').value;
    const email = document.querySelector('.email').value;
    const phone = document.querySelector('.phone').value;
    const message = document.querySelector('.message').value;

    const url = `https://wa.me/60136839091?text=${encodeURIComponent(`*Customer Details*\n\n👤 Name: ${name}\n📧 Email: ${email}\n📞 No. Tel: ${phone}\n💬 Message: ${message}\n\n🙏 Terima Kasih!`)}`;
    window.open(url, '_blank').focus();
}