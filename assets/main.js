var CONFIG={whatsapp:"918140354824",email:"hiteshrathodseo@gmail.com",formEndpoint:""};
// formEndpoint: optional. Paste a free form-service URL here (see README). Leave empty to use WhatsApp and email only.
(function(){var b=document.getElementById('mb'),u=document.getElementById('mn');
if(b)b.addEventListener('click',function(){var o=u.classList.toggle('open');b.setAttribute('aria-expanded',o)});
var f=document.getElementById('cf');if(!f)return;var m=document.getElementById('cm');
function body(){var d=new FormData(f);return 'Name: '+d.get('name')+'\nBusiness: '+d.get('business')+'\nEmail: '+d.get('email')+'\nPhone: '+d.get('phone')+'\nService: '+d.get('service')+'\nMessage: '+d.get('message')}
function say(t){m.textContent=t;m.hidden=false}
if(CONFIG.formEndpoint)document.getElementById('bs').hidden=false;
f.addEventListener('submit',function(e){e.preventDefault();if(!f.checkValidity())return f.reportValidity();
if(!CONFIG.formEndpoint)return say('Please choose Send via WhatsApp or Send via email.');
fetch(CONFIG.formEndpoint,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}}).then(function(r){if(r.ok){f.reset();say('Thank you. Your enquiry was sent.')}else say('Sending failed. Please use WhatsApp or email.')}).catch(function(){say('Sending failed. Please use WhatsApp or email.')})});
document.getElementById('bw').addEventListener('click',function(){if(!f.checkValidity())return f.reportValidity();window.open('https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(body()),'_blank','noopener')});
document.getElementById('be').addEventListener('click',function(){if(!f.checkValidity())return f.reportValidity();location.href='mailto:'+CONFIG.email+'?subject='+encodeURIComponent('Website enquiry')+'&body='+encodeURIComponent(body())})})();