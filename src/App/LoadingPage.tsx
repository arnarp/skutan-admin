import * as React from 'react'
import './LoadingPage.css'
const logo = require('./logo.svg')

export const LoadingPage = () => (
  <div aria-busy="true" className="LoadingPage">
    <img src={logo} className="App-logo" alt="" />
    <h1>Hleður</h1>
  </div>
)
