function responsive() {
    var x = document.getElementById("nav_bar");
    if (x.className === "horizontal_nav_bar") {
        x.className += " responsive";
    } else {
         x.className = "horizontal_nav_bar";
    }
}
