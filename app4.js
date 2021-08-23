var storage = firebase.storage();
modalBtn.addEventListener("click", function () {
    let ItemNameValue = ItemName.value;
    let priceValue = price.value;
    let CategoryValue = Category.options[Category.selectedIndex].text;
    let deliveryValue = delivery.options[delivery.selectedIndex].text;
    let imageKey = foodimage.files[0];
    var imagesRef = storage.ref().child('images/' + imageKey.name);
    var uploadTask = imagesRef.put(imageKey);
    console.log(ItemNameValue)
    console.log(priceValue)
    console.log(CategoryValue)
    console.log(deliveryValue)
    function foodItems() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid;
                uploadTask.snapshot.ref.getDownloadURL()
                    .then((url) => {
                        console.log("URL", url);
                        firebase.firestore().collection(uid).add({
                            ItemNameValue,
                            priceValue,
                            CategoryValue,
                            deliveryValue,
                            imageUrl: url,
                        })
                            .then(function () {
                                console.log(userid);
                                console.log("Object url", url);
                                console.log("Data Added");
                                getTodo(userid);
                                cards()

                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                // ...
            } else {
                // User is signed out
                // ...
            }
        });

    }
    foodItems()
    cards()
    myModal.style.display = "none"
})

