import React from 'react'

const Footer = () => {
  let footerStyle = {
    position:"relative",
    top:"100vh",
    width: "100%",
    border: "1px solid black",
  }
  return (
    <footer className="bg-dark text-light py-3 text-center" style={footerStyle}>
      <p className="text-center">
        Copyright &copy; MyTodosList.com
      </p>
      
    </footer>
  )
}

export default Footer
