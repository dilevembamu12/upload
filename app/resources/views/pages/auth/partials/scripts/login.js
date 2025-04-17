$(document).on('submit', '#signinForm', function (e) {
    e.preventDefault();
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = {};
    ($(this).serializeArray()).forEach((value, key) => raw[value.name] = value.value);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow"
    };
    fetch("/signin", requestOptions)
        .then((response) => {
            console.log('response',response)
            if(response.status==200){
                window.location.href = BASE_URL+'/admin';
            }else{
                alert("**connexion refusée")
                alert(response.message)
            }
        })
        //.then((result) => alert(result))
        .catch((error) => alert(error.message));
    return true;
});




/*
function aaa(e) {
    alert(122224453454534);
    //alert(e);
    //e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": "emodiembamu@gmail.com",
        "password": "123456789"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:3004/aaab", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

    return true;
};
*/

/*

*/
/*

$(document).on('submit', '#signinForm', function (e) {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email": "emodiembamu@gmail.com",
  "password": "123456789"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3003/signin", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

    return;
    e.preventDefault(); // Pre the default action
    const formData =  $(this).serializeArray() ; //$(this).serializeObject(); // Extract and serialize form data

    console.log('A', formData)
    alert(formData);

    a={"email":"emodiembamu@gmail.com",
        "password":"123456789"
    };
   

    $.ajax({
        url: '/aaa', // Provide the URL to the forms backend
        type: 'POST',
        data: JSON.stringify(a),
        dataType: 'application/json;',
        success: function (response) {
            console.log('Form submitted successfully');
        },
        error: function () {
            alert('Error submitting form');
        }
    });
});
*/