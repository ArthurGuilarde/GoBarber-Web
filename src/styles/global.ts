import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *{
    padding:0;
    margin:0;
    border:0;
    box-sizing:border-box;
    outline:0;
  }

  body{
    background:#312e38;
    color: #fff;
  }

  body, button, input{
    font-family: 'Roboto Slab', serif;
    font-size:  16;
  }

  h1,h2,h3,h4,h5,h6,strong{
    font-weight:500;
  }

  button{
    cursor:pointer;
  }
`
