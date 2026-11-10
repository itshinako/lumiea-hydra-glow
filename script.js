"use strict";
// Demo-only shopping experience: no network calls, real checkout, or card data.
(() => {
 const dialog=document.getElementById('cart-dialog');
 const cartToggle=document.getElementById('cart-toggle');
 const qtyOut=document.getElementById('cart-qty');
 const count=document.getElementById('cart-count');
 const total=document.getElementById('cart-total');
 const checkout=document.getElementById('checkout-step');
 const payment=document.getElementById('payment-step');
 const success=document.getElementById('success-step');
 let qty=0;
 const update=()=>{qtyOut.textContent=qty;count.textContent=qty;total.textContent=new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY'}).format(qty*7140);document.getElementById('checkout-next').disabled=qty===0;};
 const showStep=(step)=>{checkout.hidden=step!=='cart';payment.hidden=step!=='payment';success.hidden=step!=='success';};
 const open=()=>{showStep('cart');dialog.showModal();};
 document.querySelectorAll('[data-buy]').forEach(button=>button.addEventListener('click',()=>{qty=Math.max(1,qty+1);update();open();}));
 cartToggle.addEventListener('click',open);
 document.querySelector('.cart-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
 document.getElementById('qty-minus').addEventListener('click',()=>{qty=Math.max(0,qty-1);update();});
 document.getElementById('qty-plus').addEventListener('click',()=>{qty=Math.min(20,qty+1);update();});
 document.getElementById('checkout-next').addEventListener('click',()=>{if(qty>0)showStep('payment');});
 document.getElementById('payment-back').addEventListener('click',()=>showStep('cart'));
 document.getElementById('demo-confirm').addEventListener('click',()=>{qty=0;update();showStep('success');});
 document.getElementById('success-close').addEventListener('click',()=>dialog.close());
 document.querySelectorAll('[data-social]').forEach(button=>button.addEventListener('click',()=>{button.title='公式SNSのURLは未設定です';button.blur();}));
 if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.08});
  document.querySelectorAll('.ingredients-ab,.product-ab,.visual,.how-ab,.offer,.faq,.last,.follow').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
 }
 update();
})();
