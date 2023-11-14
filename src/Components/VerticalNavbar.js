import React from 'react';

//we need links to multiple things on clickup 
function VerticalNavbar() {
    return(
        <nav class="navbar">
            <div class="vertical-nav bg-dark" id="sidebar">
              <div class="py-4 px-3 mb-4 bg-dark"> 
                <div class="media-body">
                <h4 class="font-weight-white text-muted mb-0">Verical Navbar</h4>
                </div>
                </div>
                   <p class="text-white font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>
                <ul class="nav flex-column bg-dark mb-0">
                    <li class="nav-item"><a href="#" class="nav-link text-light font-italic bg-dark">NewProdect</a></li>
                    <li class="nav-item"><a href="#" class="nav-link text-light font-italic">ShowProductst</a></li>
                    <li class="nav-item"><a href="#" class="nav-link text-light font-italic">Warehouse</a></li>

           </ul>
          </div>
        </nav>
    );
}


export default VerticalNavbar;