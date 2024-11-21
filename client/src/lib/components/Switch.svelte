<script>
    export let checked = false;
  </script>
  
  <style>
    .switch {
      position: relative;
      display: inline-block;
      margin: auto;
      width: 40px;
      height: 20px;
    }
  
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #c3c7c6;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 20px;
    }
  
    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 2px;
      bottom: 1px;
      background-color: #484848;
      border-color: #c3c7c6;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
  
    input:checked + .slider {
      background-color: rgb(154, 233, 187);
    }
  
    input:checked + .slider {
      box-shadow: 0 0 1px #31473A;
    }
  
    input:checked + .slider:before {
      -webkit-transform: translateX(18px);
      -ms-transform: translateX(18px);
      transform: translateX(18px);
    }
  </style>

  
  <label class="switch">
   
    <input type="checkbox" bind:checked />
    <span class="slider"></span>
  </label>