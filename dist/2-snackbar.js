import{i as c,a as F}from"./assets/hello-C3GKaUyz.js";/* empty css                      */import{i as t}from"./assets/vendor-CZ7H4dAk.js";const m="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='22'%20fill='none'%3e%3cpath%20fill='%23fff'%20d='M11.907%202.024A.195.195%200%200%201%2012.003%202c.033%200%20.066.008.095.024.034.02.062.05.08.085l10.286%2017.5c.054.09.053.187.003.275a.243.243%200%200%201-.081.09.174.174%200%200%201-.099.026H1.719a.173.173%200%200%201-.099-.026.244.244%200%200%201-.081-.09.264.264%200%200%201%20.003-.274l10.284-17.5a.221.221%200%200%201%20.081-.086Zm1.566-.675a1.694%201.694%200%200%200-2.94%200L.248%2018.849c-.686%201.167.136%202.65%201.47%202.65h20.569c1.334%200%202.157-1.484%201.47-2.65L13.473%201.35Z'/%3e%3c/svg%3e",u="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='22'%20height='20'%20fill='none'%3e%3cpath%20fill='%23fff'%20d='M1.75%2010a8.25%208.25%200%200%201%2012.375-7.146.75.75%200%200%200%20.75-1.299A9.75%209.75%200%201%200%2019.75%2010a.75.75%200%201%200-1.5%200%208.25%208.25%200%201%201-16.5%200Z'/%3e%3cpath%20fill='%23fff'%20d='M21.031%203.031a.752.752%200%200%200-.531-1.282.751.751%200%200%200-.531.22L10%2011.939%206.031%207.97a.75.75%200%201%200-1.062%201.062l4.5%204.5a.75.75%200%200%200%201.062%200l10.5-10.5Z'/%3e%3c/svg%3e",i={form:document.querySelector(".form"),delayInput:document.querySelector('input[type="number"]'),radioButtons:document.querySelectorAll('input[name="state"]'),btnCreate:document.querySelector('button[type="submit"]')};setTimeout(()=>{t.show({title:"Hello",message:"Welcome to Snackbar!",titleColor:"#FFFFFF",messageColor:"#FFFFFF",position:"bottomRight",backgroundColor:"#0099FF",iconUrl:c})},1e3);i.form.addEventListener("submit",g);function g(r){r.preventDefault();const l=document.querySelector('input[name="state"]:checked'),e=Number(i.delayInput.value);if(!l||e<0){t.show({title:"Caution",message:"You forgot important data",titleColor:"#FFFFFF",messageColor:"#FFFFFF",position:"topRight",backgroundColor:"#FFA000",iconUrl:m});return}const a=l.value,s=new Promise((o,n)=>{setTimeout(()=>a==="fulfilled"?o(e):n(e),e)});i.delayInput.value="",i.radioButtons.forEach(o=>{o.checked=!1}),s.then(o=>{t.show({title:"OK",message:`✅ Fulfilled promise in ${e}ms`,titleColor:"#FFFFFF",messageColor:"#FFFFFF",position:"topRight",backgroundColor:" #326101",iconUrl:u})}).catch(o=>{t.show({title:"Error",message:`❌ Rejected promise in ${e}ms`,titleColor:"#FFFFFF",messageColor:"#FFFFFF",position:"topRight",backgroundColor:"#EF4040",iconUrl:F})})}
//# sourceMappingURL=2-snackbar.js.map
