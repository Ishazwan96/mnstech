document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id:1,name:'4 Channel', img:'1.jpg', price: 1680,
                features: ['FULL HD','1 x DVR Recorder','1 x 1TB HDD','4 x Camera (Dome/Bullet)','Wiring/Installation']
            },
            { id:2,name:'8 Channel', img:'1.jpg', price: 3080,
                features: ['FULL HD','1 x DVR Recorder','1 x 2TB HDD','8 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:3,name:'16 Channel', img:'1.jpg', price: 5880,
                features: ['FULL HD','1 x DVR Recorder','1 x 4TB HDD','16 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:4,name:'4 Channel', img:'1.jpg', price: 2080,
                features: ['SUPER HD','1 x DVR Recorder','1 x 1TB HDD','4 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:5,name:'8 Channel', img:'1.jpg', price: 3680,
                features: ['SUPER HD','1 x DVR Recorder','1 x 2TB HDD','8 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:6,name:'16 Channel', img:'1.jpg', price: 6580,
                features: ['SUPER HD','1 x DVR Recorder','1 x 4TB HDD','16 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:7,name:'4 Channel', img:'1.jpg', price: 2480,
                features: ['4K Resolution','1 x DVR Recorder','1 x 2TB HDD','4 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:8,name:'8 Channel', img:'1.jpg', price: 4480,
                features: ['4K Resolution','1 x DVR Recorder','1 x 4TB HDD','8 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:9,name:'16 Channel', img:'1.jpg', price: 7880,
                features: ['4K Resolution','1 x DVR Recorder','1 x 6TB HDD','16 x Camera (Dome/Bullet)','Wiring/Installation']
             },
            { id:10,name:'Wiring/Installation', img:'1.jpg', price: 0,
                features: ['Control Panel (Booster/Transfer Pump Panel)','Wiring Soket','Wiring Lampu','Wiring Kipas','Wiring DB']
             },
        ],
        
        calculatePreviousPrice(price) {
            // Example: Previous price is 10% higher than current price
            return Math.round(price / 0.9); // Adjust the logic as per your requirement
        },
        
    }));


    Alpine.store('cart', {
        items:[],
        total:0,
        quantity:0,

add(newItem) {
            //check jika ada barang yang sama

    const cartItem = this.items.find((item)=> item.id === newItem.id);

        //Jika belum ada
    
    if (!cartItem){

            this.items.push({...newItem, quantity: 1, total: newItem.price});
            this.quantity++;
            this.total +=newItem.price;
                        

                // Show thanks modal after adding item
                const thanksModal = document.querySelector('#thanks');
                thanksModal.style.display = 'flex';

                // Close thanks modal when clicking outside it
                window.onclick = (e) => {
                    if (e.target === thanksModal) {
                        thanksModal.style.display = 'none';
                    }
                };t6

        }  else {

        // Jika barang sudah ada, check apakah barang berbeza atau sama
        this.items = this.items.map((item) => {
        
        // Jika barang berbeza
            
        if (item.id !== newItem.id) {
        
            return item;
        
        } else {
        
            //jika barang sudah ada, tambah quantity dan totalnya
            item.quantity ++;
            item.total = item.price * item.quantity;
            this.quantity ++;
            this.total += item.price;
            return item;
        }
        })
    }
        },
remove (id){
    // ambil item yang ingin di remove berdasar kan id
    const cartItem = this.items.find((item) => item.id === id);

    // jika item lebih dari 1
    if (cartItem.quantity > 1 ) {
        // 

        this.items = this.items.map ((item) => {
            // jika bukan barang yang diklik
            if (item.id !== id) {
                return item;

            } else {
                item.quantity --;
                item.total =item.price * item.quantity;
                this.quantity--;
                this.total -= item.price;
                return item;

            }
        })
    } else if (cartItem.quantity === 1){
        //jika barang tinggal 1
        this.items = this.items.filter ((item) => item.id !==id);
        this.quantity--;
        this.total -= cartItem.price;
    }
}
    });
});

/// Form validation ///
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;
const form = document.querySelector('#checkoutForm');
form.addEventListener('keyup', function(){
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.length !==0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        
        } else {
            return false;
        }
    }

    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// Kirim data ketika button checkout di klik

checkoutButton.addEventListener('click', function(e) {
     e.preventDefault();
     const formData = new FormData(form);
     const data = new URLSearchParams(formData);
     const objData = Object.fromEntries(data);
     const message = formatMessage (objData);
     window.open('http://wa.me/60136839091?text=' + encodeURIComponent(message));

});

/// Format pesan Whatsapp ///

const formatMessage = (obj) => {
    // Parse the items from JSON string to array of objects
    const items = JSON.parse(obj.items);

    // Format customer details
    let message = `*Customer Details*\n\n`;
    message += `Name: ${obj.name}\n`;
    message += `Email: ${obj.email}\n`;
    message += `No. Tel: ${obj.phone}\n`;
    message += `Location: ${obj.location}\n\n`;

    // Format order details
    message += `*Order Details*\n\n`;
    items.forEach((item) => {
        message += `${item.name} (${item.quantity} x ${RM(item.total)})\n`;
        message += `Features: ${item.features.join(', ')}\n\n`;
    });

    // Format total
    message += `TOTAL: ${RM(obj.total)}\n\n`;

    // Thank you message
    message += `Terima Kasih!`;

    return message;
};

/// Convert to MYR ///
const RM = (number) => {
    return new Intl.NumberFormat('ms-MY', {
        style: 'currency',
        currency: 'MYR',
        minimumFractionDigits: 0,
    }).format(number);
};

// Form validation Hantar Form

  const hantarButton = document.getElementById('hantar-button');
  const contactForm = document.getElementById('hantarForm');

  // Function to check if all fields are filled
  function checkForm() {
    const inputs = contactForm.querySelectorAll('input, textarea');
    let formIsValid = true;

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        formIsValid = false;
      }
    });

    // Enable/disable button based on form validity
    if (formIsValid) {
      hantarButton.disabled = false;
      hantarButton.classList.remove('disabled');
    } else {
      hantarButton.disabled = true;
      hantarButton.classList.add('disabled');
    }
  }

  // Add event listeners to form inputs
  contactForm.addEventListener('input', checkForm);

  // Initial validation on page load
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


