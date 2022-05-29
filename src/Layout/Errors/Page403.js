import React from 'react'
import './Style.css'
export default function Page403() {
    return (
         <div id="wrapper">
   
      <div id="content-wrapper" class="d-flex flex-column" style={{height:'100vh'}}>
    
        <div id="content-error">
   
          <div class="container-fluid h-100 " >
            
            <div class="text-center error-div">
              <div class="error mx-auto" data-text="403">403</div>
              <p class="lead text-gray-800 mb-5">Access Denied.!</p>
              <p class="text-gray-500 mb-0">
                It looks like you found a glitch in the matrix...
              </p>
      
            </div>
          </div>
          
        </div>
   
      </div>
     
    </div>
    )
}
