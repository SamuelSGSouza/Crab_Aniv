
function fechaPopup() {
    setTimeout(() => {
        document.querySelector('.popup_bar_left').style.display = 'none';
        document.querySelector('.popup_bar_right').style.display = 'none';
    }, 2000);
}
function closePopup() {
    //passando a height para 0vw
    $('.popup_main').css('display', 'none');
}

function chamaPopup(id) {
    document.querySelector('.popup_bar_left').style.display = 'block';
    document.querySelector('.popup_bar_right').style.display = 'block';
    document.querySelector('#'+id).style.display = 'block';
    fechaPopup();
}

            