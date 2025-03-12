document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id:1,name:'4 Channel', img:'1.png', price: 1680,
                features: ['FULL HD','1 x DVR Recorder','1 x 1TB HDD','4 x Camera (Dome/Bullet)','Wiring/Installation']
            },
            { id:2,name:'8 Channel', img:'1.png', price: 3080,
                features: ['FULL HD','1 x DVR Recorder','1 x 2TB HDD','8 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:3,name:'16 Channel', img:'1.png', price: 5880,
                features: ['FULL HD','1 x DVR Recorder','1 x 4TB HDD','16 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:4,name:'4 Channel', img:'1.png', price: 2080,
                features: ['SUPER HD','1 x DVR Recorder','1 x 1TB HDD','4 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:5,name:'8 Channel', img:'1.png', price: 3680,
                features: ['SUPER HD','1 x DVR Recorder','1 x 2TB HDD','8 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:6,name:'16 Channel', img:'1.png', price: 6580,
                features: ['SUPER HD','1 x DVR Recorder','1 x 4TB HDD','16 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:7,name:'4 Channel', img:'1.png', price: 2480,
                features: ['4K Resolution','1 x DVR Recorder','1 x 2TB HDD','4 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:8,name:'8 Channel', img:'1.png', price: 4480,
                features: ['4K Resolution','1 x DVR Recorder','1 x 4TB HDD','8 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:9,name:'16 Channel', img:'1.png', price: 7880,
                features: ['4K Resolution','1 x DVR Recorder','1 x 6TB HDD','16 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:10,name:'Wiring/Installation', img:'db.png', price: 0,
                features: ['Wiring Soket','Wiring Lampu','Wiring Kipas','Wiring DB','dan lain-lain']
             },
        ],
        
        calculatePreviousPrice(price) {
            return Math.round(price / 0.9);
        },
        
    }));

    Alpine.store('cart', {
        items:[],
        total:0,
        quantity:0,

        add(newItem) {
            const cartItem = this.items.find((item)=> item.id === newItem.id);
    
            if (!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;

                const thanksModal = document.querySelector('#thanks');
                thanksModal.style.display = 'flex';

                window.onclick = (e) => {
                    if (e.target === thanksModal) {
                        thanksModal.style.display = 'none';
                    }
                };
    
            } else {
                this.items = this.items.map((item) => {
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                })
            }
        },

        remove(id){
            const cartItem = this.items.find((item) => item.id === id);
    
            if (cartItem.quantity > 1 ) {
                this.items = this.items.map ((item) => {
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1){
                this.items = this.items.filter ((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});

const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;
const form = document.querySelector('#checkoutForm');
form.addEventListener('keyup', function(){
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

checkoutButton.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    window.open('http://wa.me/60136839091?text=' + encodeURIComponent(message));
});

const formatMessage = (obj) => {
    const items = JSON.parse(obj.items);
    let message = `*Customer Details*\n\n`;
    message += `Name: ${obj.name}\n`;
    message += `Email: ${obj.email}\n`;
    message += `No. Tel: ${obj.phone}\n`;
    message += `Location: ${obj.location}\n\n`;
    message += `*Order Details*\n\n`;

    items.forEach((item) => {
        message += `${item.name} (${item.quantity} x ${RM(item.total)})\n`;
        message += `Features: ${item.features.join(', ')}\n\n`;
    });

    message += `TOTAL: ${RM(obj.total)}\n\n`;
    message += `Terima Kasih!`;

    return message;
};

const RM = (number) => {
    return new Intl.NumberFormat('ms-MY', {
        style: 'currency',
        currency: 'MYR',
        minimumFractionDigits: 0,
    }).format(number);
};

const hantarButton = document.getElementById('hantar-button');
const contactForm = document.getElementById('hantarForm');

function checkForm() {
    const inputs = contactForm.querySelectorAll('input, textarea');
    let formIsValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            formIsValid = false;
        }
    });

    if (formIsValid) {
        hantarButton.disabled = false;
        hantarButton.classList.remove('disabled');
    } else {
        hantarButton.disabled = true;
        hantarButton.classList.add('disabled');
    }
}

contactForm.addEventListener('input', checkForm);
checkForm();

function sendWhatsapp() {
    var name = document.querySelector('.name').value;
    var email = document.querySelector('.email').value;
    var phone = document.querySelector('.phone').value;
    var message = document.querySelector('.message').value;

    var url = "https://wa.me/60136839091?text=" +
        "Customer Details %0a%0a" +
        "Name : " + name + "%0a" +
        "Email : " + email + "%0a" +
        "No.Tel : " + phone + "%0a" +
        "Message : " + message + "%0a%0a" +
        "Thank you!";
  
    window.open(url, '_blank').focus();
}