import React from 'react';

//we need a link to the home of our reporting controller (owner info)

// we need kims logo
function HorizontalNavbar() {
    return (
    <nav class="navbar">
<a href="#" class="logo">LOGO</a>  
<input type="checkout" id="toggler">
    <label form="toggler"> 
        <i class="ri-menu-line"></i> 
     </label>
        <div class="menue">
           <ul class="List">
             <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
             </ul>
       </div>
  </input>
</nav>
            
       
    )
}
export default HorizontalNavbar;