const usernameinput = document.getElementById('usernameinput');
const passwordinput = document.getElementById('passwordinput');
const usernameError = document.getElementById('usernameError');
const passworderror =document.getElementById('passworderror');
const loginbtn = document.getElementById('loginbtn');
const loginresults= document.getElementById('loginresults');
const formlogin =document.getElementById('fromlogin');
const notesection = document.getElementById('notesection')
const writenotesection = document.getElementById('writenotesection')
const onelogin = document.getElementById('onelogin');
const websection = document.getElementById('websection');

formlogin.addEventListener('submit',(e)=>{
e.preventDefault();
})


loginbtn.addEventListener('click',()=>{
    const username= usernameinput.value.trim();
    const password = passwordinput.value.trim();

    if(username==="" || password===""){
        usernameError.classList.remove('hidden');
        passworderror.classList.remove('hidden');


        setTimeout(() => {
        usernameError.classList.add('hidden');
        passworderror.classList.add('hidden');
        }, 4000);
        return;
    }


    fetch('/aunthenticate/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username,password}),
    })
    .then(res=>res.json())
    .then(data=>{

        if(data.token){
            localStorage.setItem('token',data.token);
            formlogin.classList.add('hidden');
            writenotesection.classList.remove('hidden');
            websection.classList.remove('hidden');
            onelogin.classList.add('hidden');
        }
     loginresults.textContent = data.message;
     loginresults.classList.remove('hidden');


     usernameinput.value = "";
     passwordinput.value="";
    })
    .catch(err=>{
        loginresults.textContent = err.message;
          loginresults.classList.remove('hidden');
    })
})

const notesinput =document.getElementById('notesinput');
const addnote = document.getElementById('addnote');
const deletenote  =document.getElementById('deletenote');
const notesresults  =document.getElementById('notesresults');



addnote.addEventListener('click',()=>{
    const token = localStorage.getItem('token');

    if(!token){
        formlogin.classList.remove('hidden');
        notesection.classList.add('hidden');
        writenotesection.classList.add('hidden');


    }
    const notesel = notesinput.value.trim();

    if(!notesel){
   notesresults.textContent = 'please enter a text';
   notesresults.classList.remove('hidden');

   setTimeout(() => {
    notesresults.classList.add('hidden');
   }, 4000);
   return;
    }
    fetch('/notestask/addnote',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token} `

        },
        body:JSON.stringify({notesel}),
    })
    .then(res=>res.json())
    .then(data=>{
        const li = document.createElement('li');
        li.textContent = data.message;
        notesresults.appendChild(li);
        notesresults.classList.remove('hidden');

        notesinput.value ="";
    })
    .catch(err=>{
        notesresults.textContent = err.message;
        notesresults.classList.remove('hidden');
    })

})

deletenote.addEventListener("click",()=>{
  if(notesresults.lastChild){
    notesresults.lastChild.remove();
  }
  if(notesresults.children.length===0){
    notesresults.classList.add('hidden')
  }
})

const socket = io();


const sendnotebtn = document.getElementById('sendnotebtn');
const sharenoteinput  = document.getElementById('sharenoteinput');
const webresults = document.getElementById('webresults');


socket.on('sharenote',data=>{
    const li = document.createElement('li');
    li.textContent = data.message;
    webresults.appendChild(li);
    webresults.classList.remove('hidden');
});

sendnotebtn.addEventListener('click',()=>{
    sharenotes = sharenoteinput.value.trim();
    if(!sharenotes){
        webresults.textContent = 'please enter a note';
        webresults.classList.remove('hidden');

        setTimeout(() => {
               webresults.classList.add('hidden');
        }, 4000);
    }
    socket.emit('sharenote',{sharenotes});
    sharenoteinput.value = '';

})
