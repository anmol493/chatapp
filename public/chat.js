//document objects
const $butt=document.querySelector('button');
const $input=document.querySelector('input');
const $message=document.querySelector('#message')
const $messTemplate=document.querySelector('#message-template').innerHTML
const $location=document.querySelector('#location')
const $sidebar=document.querySelector('.chat__sidebar')


//Forming a new socket
const socket=io();

//error
// socket.on("error",(msg)=>{
//     const html=`<p class='message__name'>Admin  ${moment(msg.createdAt).format('hh:mm A')}</p>
//     <p class='message__meta'>${msg.message}</p>`
//     $message.insertAdjacentHTML('beforebegin',html);
// })
//Received when connected
socket.on("message",(msg)=>{
    console.log(msg);
    const html=`<p class='message__name'>Admin  ${moment(msg.createdAt).format('hh:mm A')}</p>
    <p class='message__meta'>${msg.message}</p>`
    $message.insertAdjacentHTML('beforeend',html);
});

socket.on('userlist',(message)=>{
    var str='';
    for(var i=0;i<message.length;i++)
    {
        str+=`<p>${message[i].username}</p>`;
    }
    $sidebar.innerHTML=str;
});
//Attributes from URL
const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix : true});
console.log(username);
console.log(room);
// let params = new URLSearchParams(location.search);
// console.log(params);

$butt.addEventListener('click',function(event){
    event.preventDefault();
    const val=$input.value;
    $input.value=""
    socket.emit('newmessage',val);
    // const html=Mustache.render($messTemplate,{
    //     message:val
    // });
});

//autoscroll
function autoscroll(){
    // $newmessage=$message.lastElementChild;
    // const messageHeight=$newmessage.offsetHeight+getComputedStyle($newmessage).marginBottom;
    
    // //Visible Height
    // const visibleHeight=$message.offsetHeight;
    // //Container Height
    // const containerHeight=$message.scrollHeight;
    // const scrollOffset=$message.scrollTop+visibleHeight;

    // if(scrollOffset+messageHeight==containerHeight){
    $message.scrollTop = $message.scrollHeight;
}

socket.on('broadmess',(message)=>{
    console.log(message);
    const html=`<p class='message__name'>${message.name}   ${moment(message.msg.createdAt).format('hh:mm A')}</p>
    <p class='message__meta'>${message.msg.message}</p>`
    $message.insertAdjacentHTML('beforeend',html);
    autoscroll();
});
socket.on('broadmess1',(message)=>{
    console.log(message);
    const html=`<p class='message__name'>${message.name}   ${moment(message.msg.createdAt).format('hh:mm A')}</p>
    <p class='message__meta'><a href=${message.msg.message} target='_blank'>For location</a></p>`
    $message.insertAdjacentHTML('beforeend',html);
    autoscroll();
});
$location.addEventListener('click',function(event){
    event.preventDefault();
    //console.log(event);
    if(!navigator.geolocation) {
        console.log('a');
        status.textContent = 'Geolocation is not supported by your browser';
      } else {
        console.log('b');
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position);
            const site=`https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`
            console.log(site);
            socket.emit('newmessage1',site);
        });
      }
});

//Message to server for join
socket.emit('join',{username,room});