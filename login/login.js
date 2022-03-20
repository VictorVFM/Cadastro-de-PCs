const enter = () => {
  const enviar = document.getElementById('login').value
  const password = document.getElementById('password').value
   if(enviar == 'Victor'&& password == '123456'){    
    window.location.href = '../index.html'
    
   }else{
    //  const newP = document.createElement('p')
    //  newP.innerHTML = `Senha incorreta`
     const erro = document.getElementById('erro')
    erro.innerHTML = 'Senha incorreta'   
    console.log('incorreto')
   }
  
}



document.getElementById('enviar')
.addEventListener('click', enter)





