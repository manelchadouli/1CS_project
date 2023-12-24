const form = document.querySelector('form');
const Errors = document.querySelector('.Errors');
const changePassword = document.querySelector('.changePassword');
changePassword.addEventListener('click', e => {
    e.preventDefault();
    location.assign("/mot_de_pass_oublie");
});
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    Errors.textContent = '';
    const email = form.email.value;
    const password = form.password.value;
    try {
        const res = await fetch('/Inscrire', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        const data = await res.json();
        if (res.status === 400 || res.status === 401) {
            return Errors.textContent = `${data.message}`
        }
        /* if(data.message==="Email not present"){
                        return  emailError.textContent=`${data.message}`;
                    }
                    else if(data.message==="Password not present"){
                        return  emailError.textContent=`${data.message}`;   
                    }
                    else if(data.message==="Email not valide") {
					return  emailError.textContent=`${data.message}`;
                }
                    else if(data.message==="Passwrod must be at least of 7 characters long"){
                        return  emailError.textContent=`${data.message}`;   
                    }
                    else if(data.message==="Wrong Credentials"){
                        return  emailError.textContent=`${data.message}`;
                    }
                    else if(data.message==="Login not successful"){
                        return  emailError.textContent=`${data.message}.${data.error ? data.error:''}`;
                    }*/
        else if (data.result) {
            location.assign("/DashBord");
        }

    } catch (err) {
        console.log(err.message)
        location.assign("/Inscrire");
    }
})